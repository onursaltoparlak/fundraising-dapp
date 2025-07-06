"use client";

import ArtistProfilesCarousel from "@/components/ArtistProfilesCarousel";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

export default function ArtistsPage() {
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
            🎭 Meet the Artists
          </Heading>
          <Text 
            color="var(--primary-gold)" 
            fontSize={{ base: "lg", md: "xl" }}
            opacity={0.9}
            fontFamily="Georgia, serif"
            fontStyle="italic"
            mb={4}
          >
            The talented performers who bring our stage to life
          </Text>
          <Text 
            color="var(--primary-gold)" 
            fontSize="md"
            opacity={0.8}
            maxW="2xl"
            mx="auto"
          >
            Our community theater is home to incredible local talent. From seasoned performers 
            to rising stars, these artists dedicate their passion and creativity to creating 
            unforgettable theatrical experiences for our community.
          </Text>
        </Box>
        
        <ArtistProfilesCarousel />
        
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
            🎪 Join Our Artistic Community
          </Text>
          <Text 
            color="var(--primary-gold)" 
            fontSize="md"
            textAlign="center"
            opacity={0.9}
          >
            Are you a local performer, musician, or artist? We're always looking for new talent 
            to join our community theater family. Contact us to learn about upcoming auditions 
            and performance opportunities after our restoration is complete.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
} 