"use client";

import SeatSponsorshipMap from "@/components/SeatSponsorshipMap";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

export default function SponsorSeatPage() {
  return (
    <Container maxW="container.xl" py="8">
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" mb={8}>
          <Heading 
            color="var(--primary-gold)" 
            fontSize={{ base: "3xl", md: "4xl" }}
            textShadow="2px 2px 4px rgba(0,0,0,0.5)"
            fontFamily="Georgia, serif"
            mb={4}
          >
            🪑 Sponsor a Seat
          </Heading>
          <Text 
            color="var(--primary-gold)" 
            fontSize={{ base: "lg", md: "xl" }}
            opacity={0.9}
            fontFamily="Georgia, serif"
            fontStyle="italic"
            mb={4}
          >
            Leave your mark on our historic theater
          </Text>
          <Text 
            color="var(--primary-gold)" 
            fontSize="md"
            opacity={0.8}
            maxW="2xl"
            mx="auto"
          >
            Every seat tells a story. By sponsoring a seat for $50, you'll have a brass nameplate 
            permanently affixed to your chosen seat, creating a lasting legacy in our community theater. 
            Your sponsorship helps fund the restoration and ensures your name is remembered for generations to come.
          </Text>
        </Box>
        
        <SeatSponsorshipMap />
        
        <Box 
          p={6} 
          borderRadius="lg" 
          sx={{
            background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(255, 215, 0, 0.1) 100%)',
            borderColor: 'rgba(139, 0, 0, 0.3)',
            borderWidth: '1px'
          }}
        >
          <Text 
            color="var(--primary-gold)" 
            fontSize="lg" 
            fontWeight="bold" 
            textAlign="center"
            mb={4}
          >
            🎭 Sponsorship Benefits
          </Text>
          <Box 
            color="var(--primary-gold)" 
            fontSize="md"
            sx={{
              display: 'grid',
              gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' },
              gap: '1rem'
            }}
          >
            <Box>• Brass nameplate on your sponsored seat</Box>
            <Box>• Recognition in our program booklets</Box>
            <Box>• Priority booking for opening night</Box>
            <Box>• Special invitation to restoration events</Box>
            <Box>• Tax-deductible donation receipt</Box>
            <Box>• Legacy recognition in theater history</Box>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
} 