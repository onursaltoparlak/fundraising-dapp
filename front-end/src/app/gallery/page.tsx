import PhotoGallerySlider from "@/components/PhotoGallerySlider";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { getGalleryImages } from "@/lib/getGalleryImages.server";

export default async function GalleryPage() {
  const images = await getGalleryImages();
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
            📸 Photo Gallery
          </Heading>
          <Text 
            color="var(--primary-gold)" 
            fontSize={{ base: "lg", md: "xl" }}
            opacity={0.9}
            fontFamily="Georgia, serif"
            fontStyle="italic"
            mb={4}
          >
            A visual journey through our theater's history and restoration
          </Text>
          <Text 
            color="var(--primary-gold)" 
            fontSize="md"
            opacity={0.8}
            maxW="2xl"
            mx="auto"
          >
            From the theater's grand opening in 1924 to the current restoration work, 
            our photo gallery captures the rich history and ongoing transformation 
            of our beloved community theater.
          </Text>
        </Box>
        
        <PhotoGallerySlider images={images} />
        
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
            🎭 Share Your Memories
          </Text>
          <Text 
            color="var(--primary-gold)" 
            fontSize="md"
            textAlign="center"
            opacity={0.9}
          >
            Do you have photos or memories from our theater's past? We'd love to see them! 
            Share your historical photos, playbills, or memories to help us preserve 
            the complete story of our community theater.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
} 