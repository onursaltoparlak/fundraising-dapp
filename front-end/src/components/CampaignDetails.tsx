"use client";
import {
  Container,
  Box,
  IconButton,
  Image,
  Text,
  Flex,
  useBreakpointValue,
  Heading,
  Progress,
  Button,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Alert,
  AlertTitle,
  AlertDescription,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon, InfoIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { CAMPAIGN_SUBTITLE, CAMPAIGN_TITLE } from "@/constants/campaign";
import StyledMarkdown from "./StyledMarkdown";
import { useCampaignInfo, useExistingDonation } from "@/hooks/campaignQueries";
import { useCurrentBtcBlock } from "@/hooks/chainQueries";
import { format } from "timeago.js";
import DonationModal from "./DonationModal";
import HiroWalletContext from "./HiroWalletProvider";
import { useDevnetWallet } from "@/lib/devnet-wallet-context";
import {
  isDevnetEnvironment,
  isTestnetEnvironment,
} from "@/lib/contract-utils";
import { satsToSbtc, useCurrentPrices, ustxToStx } from "@/lib/currency-utils";
import { FUNDRAISING_CONTRACT } from "@/constants/contracts";
import { getRefundTx } from "@/lib/campaign-utils";
import { getStacksNetworkString } from "@/lib/stacks-api";
import useTransactionExecuter from "@/hooks/useTransactionExecuter";
import CampaignAdminControls from "./CampaignAdminControls";

export default function CampaignDetails({
  images,
  markdownContent,
}: {
  images: string[];
  markdownContent: string;
}) {
  const { mainnetAddress, testnetAddress } = useContext(HiroWalletContext);
  const { currentWallet: devnetWallet } = useDevnetWallet();
  const currentWalletAddress = isDevnetEnvironment()
    ? devnetWallet?.stxAddress
    : isTestnetEnvironment()
    ? testnetAddress
    : mainnetAddress;

  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const slideSize = useBreakpointValue({ base: "100%", md: "500px" });

  const { data: currentPrices } = useCurrentPrices();
  const { data: campaignInfo, error: campaignFetchError } =
    useCampaignInfo(currentPrices);
  const { data: currentBlock } = useCurrentBtcBlock();

  const campaignIsUninitialized = campaignInfo?.start === 0;
  const campaignIsExpired = !campaignIsUninitialized && campaignInfo?.isExpired;
  const campaignIsCancelled =
    !campaignIsUninitialized && campaignInfo?.isCancelled;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const progress = campaignInfo
    ? (campaignInfo.usdValue / campaignInfo.goal) * 100
    : 0;

  const blocksLeft = campaignInfo ? campaignInfo?.end - (currentBlock || 0) : 0;
  const secondsLeft = blocksLeft * 600; // estimate each block is 10 minutes
  const secondsLeftTimestamp = new Date(Date.now() - secondsLeft * 1000);

  const { data: previousDonation } = useExistingDonation(currentWalletAddress);

  const hasMadePreviousDonation =
    previousDonation &&
    (previousDonation?.stxAmount > 0 || previousDonation?.sbtcAmount > 0);

  const executeTx = useTransactionExecuter();

  const handleRefund = async () => {
    const txOptions = getRefundTx(
      getStacksNetworkString(),
      currentWalletAddress || ""
    );
    await executeTx(
      txOptions,
      devnetWallet,
      "Refund requested",
      "Refund not requested"
    );
  };

  return (
    <Container maxW="container.xl" py="8">
      <Flex direction="column" gap="6">
        {/* Hero Section with Theater Curtain Background */}
        <Box
          position="relative"
          borderRadius="lg"
          p={8}
          mb={6}
          overflow="hidden"
          sx={{
            background: 'linear-gradient(135deg, #8B0000 0%, #a83232 50%, #8B0000 100%)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(139, 0, 0, 0.3) 20px, rgba(139, 0, 0, 0.3) 40px),
                radial-gradient(ellipse at center, rgba(255, 215, 0, 0.1) 0%, transparent 70%)
              `,
              pointerEvents: 'none'
            }
          }}
        >
          {/* Multiple Spotlight Effects */}
          <Box
            position="absolute"
            top="-30%"
            left="25%"
            width="150px"
            height="150px"
            borderRadius="50%"
            background="radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%)"
            animation="spotlight1 4s ease-in-out infinite alternate"
            sx={{
              '@keyframes spotlight1': {
                '0%': { opacity: 0.2, transform: 'scale(1)' },
                '100%': { opacity: 0.6, transform: 'scale(1.3)' }
              }
            }}
          />
          <Box
            position="absolute"
            top="-40%"
            right="20%"
            width="180px"
            height="180px"
            borderRadius="50%"
            background="radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)"
            animation="spotlight2 3.5s ease-in-out infinite alternate"
            sx={{
              '@keyframes spotlight2': {
                '0%': { opacity: 0.3, transform: 'scale(1.1)' },
                '100%': { opacity: 0.7, transform: 'scale(1.4)' }
              }
            }}
          />
          <Box
            position="absolute"
            top="-35%"
            left="50%"
            transform="translateX(-50%)"
            width="200px"
            height="200px"
            borderRadius="50%"
            background="radial-gradient(circle, rgba(255, 215, 0, 0.5) 0%, transparent 70%)"
            animation="spotlight3 3s ease-in-out infinite alternate"
            sx={{
              '@keyframes spotlight3': {
                '0%': { opacity: 0.4, transform: 'translateX(-50%) scale(1)' },
                '100%': { opacity: 0.8, transform: 'translateX(-50%) scale(1.2)' }
              }
            }}
          />
          
          {/* Theater Masks Decoration */}
          <Box
            position="absolute"
            top="10px"
            left="20px"
            fontSize="2xl"
            color="var(--primary-gold)"
            opacity={0.7}
          >
            🎭
          </Box>
          <Box
            position="absolute"
            top="10px"
            right="20px"
            fontSize="2xl"
            color="var(--primary-gold)"
            opacity={0.7}
          >
            🎭
          </Box>
          
          <Flex direction="column" gap="1" position="relative" zIndex={1}>
            <Heading 
              color="var(--primary-gold)" 
              fontSize={{ base: "3xl", md: "5xl" }}
              textAlign="center"
              textShadow="2px 2px 4px rgba(0,0,0,0.5)"
              fontFamily="Georgia, serif"
              fontWeight="bold"
            >
              {CAMPAIGN_TITLE}
            </Heading>
            <Text 
              color="var(--primary-gold)" 
              fontSize={{ base: "lg", md: "xl" }}
              textAlign="center"
              opacity={0.9}
              fontFamily="Georgia, serif"
              fontStyle="italic"
            >
              {CAMPAIGN_SUBTITLE}
            </Text>
            <Text 
              color="var(--primary-gold)" 
              fontSize={{ base: "sm", md: "md" }}
              textAlign="center"
              opacity={0.8}
              fontFamily="Georgia, serif"
              mt={2}
            >
              🎟️ Help us restore our historic community theater — a beacon of culture, memory, and performance 🎟️
            </Text>
          </Flex>
        </Box>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} alignItems="start">
          {/* Left column: Image carousel */}
          <Box position="relative" width="full" overflow="hidden">
            <Flex width={slideSize} mx="auto" position="relative">
              <Image
                src={images[currentIndex]}
                alt={`Campaign image ${currentIndex + 1}`}
                objectFit="cover"
                width="full"
                height="auto"
              />
              <IconButton
                aria-label="Previous image"
                icon={<ChevronLeftIcon boxSize="5" />}
                onClick={prevSlide}
                position="absolute"
                left="2"
                top="50%"
                transform="translateY(-50%)"
                colorScheme="gray"
                rounded="full"
              />
              <IconButton
                aria-label="Next image"
                icon={<ChevronRightIcon boxSize="5" />}
                onClick={nextSlide}
                position="absolute"
                right="2"
                top="50%"
                transform="translateY(-50%)"
                colorScheme="gray"
                rounded="full"
              />
              <Text
                position="absolute"
                bottom="2"
                right="2"
                bg="blackAlpha.700"
                color="white"
                px="2"
                py="1"
                rounded="md"
                fontSize="sm"
              >
                {currentIndex + 1} / {images.length}
              </Text>
            </Flex>
          </Box>

          {/* Right column: Campaign stats & donation */}
          <Box>
            {campaignInfo &&
            currentWalletAddress === FUNDRAISING_CONTRACT.address ? (
              <CampaignAdminControls
                campaignIsUninitialized={campaignIsUninitialized}
                campaignIsExpired={!!campaignIsExpired}
                campaignIsCancelled={!!campaignIsCancelled}
                campaignIsWithdrawn={!!campaignInfo?.isWithdrawn}
              />
            ) : null}
            <Box 
              p={6} 
              borderRadius="lg" 
              borderWidth="1px"
              sx={{
                background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.05) 0%, rgba(255, 215, 0, 0.05) 100%)',
                borderColor: 'rgba(139, 0, 0, 0.2)',
                boxShadow: '0 4px 12px rgba(139, 0, 0, 0.1)'
              }}
            >
                              {campaignIsUninitialized ? (
                  <Flex direction="column" gap="4">
                    <Text color="#8B0000" fontWeight="bold" textAlign="center">
                      🎭 The curtain hasn't risen yet! This campaign will begin soon.
                    </Text>
                  </Flex>
                ) : null}

              {campaignInfo && !campaignIsUninitialized ? (
                <Flex direction="column" gap={6}>
                  <SimpleGrid columns={2} spacing={4}>
                    <Stat>
                      <StatLabel color="#8B0000" fontWeight="bold">🎭 Raised</StatLabel>
                      <StatNumber color="#8B0000">
                        $
                        {campaignInfo?.usdValue?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </StatNumber>
                      <StatHelpText color="#8B0000" opacity={0.8}>
                        of ${campaignInfo?.goal?.toLocaleString()} goal
                      </StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel color="#8B0000" fontWeight="bold">🎟️ Patrons</StatLabel>
                      <StatNumber color="#8B0000">{campaignInfo?.donationCount}</StatNumber>
                      <StatHelpText color="#8B0000" opacity={0.8}>
                        {campaignIsExpired ? (
                          <Flex direction="column">
                            <Box>
                              Campaign expired
                              <Tooltip
                                label={
                                  <Flex direction="column" gap="1">
                                    <Box>
                                      Expired at: Block #{campaignInfo?.end}
                                    </Box>
                                    <Box>Current: Block #{currentBlock}</Box>
                                  </Flex>
                                }
                              >
                                <InfoIcon ml="1.5" mt="-3px" />
                              </Tooltip>
                            </Box>
                          </Flex>
                        ) : (
                          <Flex direction="column">
                            <Box>
                              {blocksLeft.toLocaleString()} BTC blocks left
                              <Tooltip
                                label={
                                  <Flex direction="column" gap="1">
                                    <Box>
                                      Started: Block #{campaignInfo?.start}
                                    </Box>
                                    <Box>Ends: Block #{campaignInfo?.end}</Box>
                                    <Box>Current: Block #{currentBlock}</Box>
                                  </Flex>
                                }
                              >
                                <InfoIcon ml="1.5" mt="-3px" />
                              </Tooltip>
                            </Box>
                            <Box>
                              (About{" "}
                              {format(secondsLeftTimestamp)?.replace(
                                " ago",
                                ""
                              )}
                              )
                            </Box>
                          </Flex>
                        )}
                      </StatHelpText>
                    </Stat>
                  </SimpleGrid>

                  <Box>
                    <Progress
                      value={progress}
                      size="lg"
                      borderRadius="full"
                      sx={{
                        '& > div': {
                          background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 100%)',
                        }
                      }}
                    />
                  </Box>

                  {campaignIsExpired || campaignIsCancelled ? (
                    <Flex direction="column" gap="2">
                      <Box color="#8B0000" fontWeight="bold">
                        🎭 This fundraiser{" "}
                        {campaignIsCancelled ? "was cancelled" : "has ended"}.
                        {campaignIsCancelled
                          ? " Contributors are eligible for a refund."
                          : null}
                      </Box>
                      {hasMadePreviousDonation ? (
                        <Alert mb="4">
                          <Box>
                            <AlertTitle>
                              You contributed to this fundraiser.
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
                                {satsToSbtc(
                                  previousDonation?.sbtcAmount
                                ).toFixed(8)}
                              </Box>
                            </AlertDescription>
                            <Box mt="4">
                              {!campaignIsCancelled ? (
                                <Box color="#8B0000" fontWeight="bold">🎭 Thank you for helping raise the curtain! Your donation brings us closer to showtime.</Box>
                              ) : (
                                <Button
                                  onClick={handleRefund}
                                  sx={{
                                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                                    color: '#8B0000',
                                    fontWeight: 'bold',
                                    _hover: {
                                      background: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)',
                                      transform: 'translateY(-2px)',
                                      boxShadow: '0 4px 12px rgba(255, 215, 0, 0.4)'
                                    },
                                    _active: {
                                      transform: 'translateY(0)'
                                    }
                                  }}
                                >
                                  Request a Refund
                                </Button>
                              )}
                            </Box>
                          </Box>
                        </Alert>
                      ) : null}
                    </Flex>
                  ) : (
                    <Flex direction="column" gap="4">
                      <Button
                        size="lg"
                        width="full"
                        onClick={() => {
                          setIsDonationModalOpen(true);
                        }}
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
                        🎭 Support the Restoration
                      </Button>
                      <Box fontSize="xs" color="#8B0000" opacity={0.8}>
                        <Box mb="2">
                          <strong>🎭 Flexible funding</strong>: The restoration committee keeps
                          whatever funds are raised, even if we don&apos;t hit
                          our target. No refunds to patrons if the campaign
                          falls short.
                        </Box>
                        <Box>
                          The committee can always choose to cancel this
                          fundraiser and provide refunds.
                        </Box>
                      </Box>
                    </Flex>
                  )}
                </Flex>
              ) : campaignFetchError ? (
                <Box>
                  <Alert status="warning">
                    <Box>
                      <AlertTitle>Campaign Data Unavailable</AlertTitle>
                      <AlertDescription>
                        Unable to retrieve campaign data from the blockchain.
                        This could be due to network issues or the campaign may
                        no longer exist.
                      </AlertDescription>
                    </Box>
                  </Alert>
                </Box>
              ) : !campaignIsUninitialized ? (
                <Box w="full" textAlign="center">
                  <Spinner size="lg" />
                </Box>
              ) : null}
            </Box>
          </Box>
        </SimpleGrid>

        {/* Markdown content */}
        <StyledMarkdown>{markdownContent}</StyledMarkdown>
      </Flex>
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => {
          setIsDonationModalOpen(false);
        }}
      />
    </Container>
  );
}
