"use client";

import { Box, Container, Flex, Link } from "@chakra-ui/react";
import { isDevnetEnvironment } from "@/lib/contract-utils";
import { useDevnetWallet } from "@/lib/devnet-wallet-context";
import { DevnetWalletButton } from "./DevnetWalletButton";
import { ConnectWalletButton } from "./ConnectWallet";

export const Navbar = () => {
  const { currentWallet, wallets, setCurrentWallet } = useDevnetWallet();

  return (
    <Box 
      as="nav" 
      sx={{
        background: 'linear-gradient(135deg, #8B0000 0%, #a83232 100%)',
        boxShadow: '0 2px 8px rgba(139, 0, 0, 0.3)',
        borderBottom: '2px solid #FFD700'
      }}
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" h={16} align="center">
          <Flex align="center">
            <Flex
              bg="var(--primary-red)"
              borderRadius="md"
              border="2px"
              borderColor="var(--primary-gold)"
              letterSpacing="-.05em"
              fontSize="xl"
              fontWeight="bold"
              w="52px"
              h="52px"
              justify="center"
              align="center"
              color="var(--primary-gold)"
              shrink="0"
            >
              🎭
            </Flex>
            <Link href="/" textDecoration="none">
              <Box 
                fontSize="lg" 
                fontWeight="bold" 
                color="var(--primary-gold)" 
                ml={4}
                fontFamily="Georgia, serif"
                textShadow="1px 1px 2px rgba(0,0,0,0.5)"
              >
                Revive the Grand Stage
              </Box>
            </Link>
          </Flex>
          <Flex align="center" gap={8}>
            <Link 
              href="/" 
              color="var(--primary-gold)" 
              fontWeight="bold"
              _hover={{ color: '#FFA500', textDecoration: 'underline' }}
            >
              Home
            </Link>
            <Link 
              href="/calendar" 
              color="var(--primary-gold)" 
              fontWeight="bold"
              _hover={{ color: '#FFA500', textDecoration: 'underline' }}
            >
              Calendar
            </Link>
            <Link 
              href="/sponsor-seat" 
              color="var(--primary-gold)" 
              fontWeight="bold"
              _hover={{ color: '#FFA500', textDecoration: 'underline' }}
            >
              Sponsor a Seat
            </Link>
            <Link 
              href="/artists" 
              color="var(--primary-gold)" 
              fontWeight="bold"
              _hover={{ color: '#FFA500', textDecoration: 'underline' }}
            >
              Meet the Artists
            </Link>
            <Link 
              href="/gallery" 
              color="var(--primary-gold)" 
              fontWeight="bold"
              _hover={{ color: '#FFA500', textDecoration: 'underline' }}
            >
              Gallery
            </Link>
            {isDevnetEnvironment() ? (
              <DevnetWalletButton
                currentWallet={currentWallet}
                wallets={wallets}
                onWalletSelect={setCurrentWallet}
              />
            ) : (
              <ConnectWalletButton />
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
