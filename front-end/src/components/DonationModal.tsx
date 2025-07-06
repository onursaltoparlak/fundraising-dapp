import { useExistingDonation } from "@/hooks/campaignQueries";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  NumberInput,
  NumberInputField,
  useToast,
  HStack,
  VStack,
  RadioGroup,
  Radio,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useContext } from "react";
import HiroWalletContext from "./HiroWalletProvider";
import {
  executeContractCall,
  isDevnetEnvironment,
  isTestnetEnvironment,
  openContractCall,
} from "@/lib/contract-utils";
import { useDevnetWallet } from "@/lib/devnet-wallet-context";
import { ConnectWalletButton } from "./ConnectWallet";
import { DevnetWalletButton } from "./DevnetWalletButton";
import { getContributeSbtcTx, getContributeStxTx } from "@/lib/campaign-utils";
import { getStacksNetworkString } from "@/lib/stacks-api";
import {
  btcToSats,
  satsToSbtc,
  stxToUstx,
  usdToSbtc,
  usdToStx,
  useCurrentPrices,
  ustxToStx,
} from "@/lib/currency-utils";

export default function DonationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => undefined;
}) {
  const { mainnetAddress, testnetAddress } = useContext(HiroWalletContext);
  const {
    currentWallet: devnetWallet,
    wallets: devnetWallets,
    setCurrentWallet: setDevnetWallet,
  } = useDevnetWallet();
  const currentWalletAddress = isDevnetEnvironment()
    ? devnetWallet?.stxAddress
    : isTestnetEnvironment()
    ? testnetAddress
    : mainnetAddress;

  const { data: previousDonation } = useExistingDonation(currentWalletAddress);
  const { data: prices } = useCurrentPrices();

  const hasMadePreviousDonation =
    previousDonation &&
    (previousDonation?.stxAmount > 0 || previousDonation?.sbtcAmount > 0);

  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stx");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const toast = useToast();

  const presetAmounts = [10, 25, 50, 100];

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const amount = selectedAmount || Number(customAmount);

    if (!amount || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid donation amount",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Handle donation
    try {
      const txOptions =
        paymentMethod === "sbtc"
          ? getContributeSbtcTx(getStacksNetworkString(), {
              address: currentWalletAddress || "",
              amount: Math.round(
                btcToSats(usdToSbtc(amount, prices?.sbtc || 0))
              ),
            })
          : getContributeStxTx(getStacksNetworkString(), {
              address: currentWalletAddress || "",
              amount: Math.round(
                Number(stxToUstx(usdToStx(amount, prices?.stx || 0)))
              ),
            });

      const doSuccessToast = (txid: string) => {
        toast({
          title: "🎭 Thank you for helping raise the curtain!",
          description: (
            <Flex direction="column" gap="4">
              <Box>Your donation brings us closer to showtime.</Box>
              <Box fontSize="xs">
                Transaction ID: <strong>{txid}</strong>
              </Box>
            </Flex>
          ),
          status: "success",
          isClosable: true,
          duration: 30000,
        });
      };

      // Devnet uses direct call, Testnet/Mainnet needs to prompt with browser extension
      if (isDevnetEnvironment()) {
        const { txid } = await executeContractCall(txOptions, devnetWallet);
        doSuccessToast(txid);
      } else {
        await openContractCall({
          ...txOptions,
          onFinish: (data) => {
            doSuccessToast(data.txId);
          },
          onCancel: () => {
            toast({
              title: "🎭 Transaction Cancelled",
              description: "The donation transaction was cancelled",
              status: "info",
              duration: 3000,
            });
          },
        });
      }
      setCustomAmount("");
      setSelectedAmount(null);
    } catch (e) {
      console.error(e);
      
      // Check if it's a user rejection error
      if (e instanceof Error && e.message.includes('User rejected')) {
        toast({
          title: "🎭 Transaction Cancelled",
          description: "The donation was cancelled",
          status: "info",
          duration: 3000,
        });
      } else {
        toast({
          title: "🎭 Error",
          description: "Failed to make contribution. Please try again.",
          status: "error",
          duration: 5000,
        });
      }
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent
        sx={{
          background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.05) 0%, rgba(255, 215, 0, 0.05) 100%)',
          borderColor: 'rgba(139, 0, 0, 0.2)',
          boxShadow: '0 8px 32px rgba(139, 0, 0, 0.3)'
        }}
      >
        <ModalHeader color="#8B0000" fontWeight="bold">🎭 Support the Restoration</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="8">
          <Flex direction="column" gap="3">
            {!currentWalletAddress ? (
              <Flex
                p={6}
                borderWidth="1px"
                borderRadius="lg"
                align="center"
                justify="center"
                direction="column"
                gap="4"
              >
                <Box color="#8B0000" fontWeight="bold">🎭 Please connect a STX wallet to support the restoration.</Box>
                {isDevnetEnvironment() ? (
                  <DevnetWalletButton
                    currentWallet={devnetWallet}
                    wallets={devnetWallets}
                    onWalletSelect={setDevnetWallet}
                  />
                ) : (
                  <ConnectWalletButton />
                )}
              </Flex>
            ) : (
              <>
                {hasMadePreviousDonation ? (
                  <Alert mb="4">
                    <Box>
                      <AlertTitle>
                        🎭 Thank you for your previous contribution to the restoration!
                      </AlertTitle>
                      <AlertDescription>
                        <Box>
                          STX:{" "}
                          {Number(
                            ustxToStx(previousDonation?.stxAmount)
                          ).toFixed(2)}
                        </Box>
                        <Box>
                          sBTC:{" "}
                          {satsToSbtc(previousDonation?.sbtcAmount).toFixed(8)}
                        </Box>
                      </AlertDescription>
                    </Box>
                  </Alert>
                ) : null}
                <Box mx="auto" p={6} borderWidth="1px" borderRadius="lg">
                  <VStack spacing={6} align="stretch">
                    <Text fontSize="lg" fontWeight="bold" color="#8B0000">
                      🎭 Choose Payment Method
                    </Text>

                    <RadioGroup
                      value={paymentMethod}
                      onChange={setPaymentMethod}
                    >
                      <div>
                        <Radio value="stx" id="stx">
                          STX
                        </Radio>
                      </div>
                      <div>
                        <Radio value="sbtc" id="sbtc">
                          sBTC
                        </Radio>
                      </div>
                    </RadioGroup>

                    <Text fontSize="lg" fontWeight="bold" color="#8B0000">
                      🎭 Choose Contribution Amount
                    </Text>

                    <HStack spacing={4} justify="center" wrap="wrap">
                      {presetAmounts.map((amount) => (
                        <Button
                          key={amount}
                          size="lg"
                          variant={
                            selectedAmount === amount ? "solid" : "outline"
                          }
                          onClick={() => handlePresetClick(amount)}
                          sx={{
                            background: selectedAmount === amount 
                              ? 'linear-gradient(135deg, #8B0000 0%, #a83232 100%)'
                              : 'transparent',
                            color: selectedAmount === amount ? '#FFD700' : '#8B0000',
                            borderColor: '#8B0000',
                            fontWeight: 'bold',
                            _hover: {
                              background: selectedAmount === amount 
                                ? 'linear-gradient(135deg, #a83232 0%, #8B0000 100%)'
                                : 'rgba(139, 0, 0, 0.1)',
                              transform: 'translateY(-1px)'
                            }
                          }}
                        >
                          ${amount}
                        </Button>
                      ))}
                    </HStack>

                    <Text fontSize="md">Or enter custom amount:</Text>

                    <NumberInput
                      min={1}
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                    >
                      <NumberInputField
                        placeholder="Enter amount"
                        textAlign="center"
                        fontSize="lg"
                      />
                    </NumberInput>

                    <Text fontSize="lg" fontWeight="bold" color="#8B0000">
                      🪑 Optional: Sponsor a Seat
                    </Text>
                    
                    <Text fontSize="sm" color="gray.600">
                      Choose a specific seat to sponsor (additional $50)
                    </Text>

                    <select 
                      style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '16px'
                      }}
                      defaultValue=""
                    >
                      <option value="">No seat sponsorship</option>
                      <option value="A1">Orchestra A1 - $50</option>
                      <option value="A2">Orchestra A2 - $50</option>
                      <option value="A3">Orchestra A3 - $50</option>
                      <option value="B1">Orchestra B1 - $50</option>
                      <option value="B2">Orchestra B2 - $50</option>
                      <option value="B3">Orchestra B3 - $50</option>
                      <option value="C1">Balcony C1 - $50</option>
                      <option value="C2">Balcony C2 - $50</option>
                      <option value="C3">Balcony C3 - $50</option>
                    </select>

                    <Flex direction="column" gap="1">
                      <Button
                        size="lg"
                        onClick={handleSubmit}
                        isDisabled={
                          (!selectedAmount && !customAmount) || isLoading
                        }
                        isLoading={isLoading}
                        sx={{
                          background: 'linear-gradient(135deg, #8B0000 0%, #a83232 100%)',
                          color: '#FFD700',
                          fontWeight: 'bold',
                          fontSize: 'lg',
                          _hover: {
                            background: 'linear-gradient(135deg, #a83232 0%, #8B0000 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(139, 0, 0, 0.4)'
                          },
                          _active: {
                            transform: 'translateY(0)'
                          }
                        }}
                      >
                        🎭 Support the Restoration - ${selectedAmount || customAmount || "0"}
                      </Button>
                      <Box mx="auto" fontSize="sm" fontWeight="bold">
                        (≈
                        {paymentMethod === "stx"
                          ? `${usdToStx(
                              Number(selectedAmount || customAmount || "0"),
                              prices?.stx || 0
                            ).toFixed(2)} STX`
                          : `${usdToSbtc(
                              Number(selectedAmount || customAmount || "0"),
                              prices?.sbtc || 0
                            ).toFixed(8)} sBTC`}
                        )
                      </Box>
                    </Flex>
                  </VStack>
                </Box>
              </>
            )}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button 
            onClick={onClose}
            sx={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              color: '#8B0000',
              fontWeight: 'bold',
              _hover: {
                background: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)',
                transform: 'translateY(-1px)'
              }
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
