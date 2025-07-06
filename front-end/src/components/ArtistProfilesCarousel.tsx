"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  IconButton,
  useToast,
  Avatar,
  Badge,
  Flex,
  Grid,
  GridItem,
  Link,
} from '@chakra-ui/react';

interface Artist {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  experience: string;
  image?: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}

const ArtistProfilesCarousel: React.FC = () => {
  const [artists] = useState<Artist[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Lead Actress',
      bio: 'Sarah has been performing on our stage for over 15 years, bringing life to countless characters from Shakespeare to modern drama. Her powerful voice and emotional depth have made her a favorite among our audience.',
      specialties: ['Shakespeare', 'Musical Theater', 'Drama'],
      experience: '15+ years',
      socialMedia: {
        instagram: '@sarahjohnson_actress',
        website: 'www.sarahjohnson.com'
      }
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Musical Director',
      bio: 'Michael brings classical training and contemporary flair to every production. His innovative arrangements and passionate conducting have elevated our musical performances to new heights.',
      specialties: ['Classical Music', 'Jazz', 'Musical Direction'],
      experience: '12+ years',
      socialMedia: {
        instagram: '@michaelchen_music',
        twitter: '@mchen_music'
      }
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      role: 'Dance Choreographer',
      bio: 'Emma\'s graceful choreography has transformed our stage into a world of movement and emotion. Her background in ballet and contemporary dance brings a unique perspective to every production.',
      specialties: ['Ballet', 'Contemporary', 'Choreography'],
      experience: '10+ years',
      socialMedia: {
        instagram: '@emmarodriguez_dance',
        website: 'www.emmarodriguez.com'
      }
    },
    {
      id: '4',
      name: 'David Thompson',
      role: 'Artistic Director',
      bio: 'David\'s visionary leadership has guided our theater through both triumphs and challenges. His commitment to artistic excellence and community engagement has made our theater a cultural cornerstone.',
      specialties: ['Direction', 'Playwriting', 'Production'],
      experience: '20+ years',
      socialMedia: {
        twitter: '@davidthompson_arts',
        website: 'www.davidthompson.com'
      }
    },
    {
      id: '5',
      name: 'Lisa Park',
      role: 'Costume Designer',
      bio: 'Lisa\'s creative vision brings characters to life through stunning costumes that blend historical accuracy with artistic innovation. Her attention to detail and passion for storytelling shine in every garment.',
      specialties: ['Historical Costumes', 'Modern Design', 'Fabric Arts'],
      experience: '8+ years',
      socialMedia: {
        instagram: '@lisapark_costumes'
      }
    },
    {
      id: '6',
      name: 'Robert Davis',
      role: 'Technical Director',
      bio: 'Robert ensures that every performance runs smoothly behind the scenes. His expertise in lighting, sound, and stage management creates the perfect environment for our artists to shine.',
      specialties: ['Lighting Design', 'Sound Engineering', 'Stage Management'],
      experience: '18+ years',
      socialMedia: {
        twitter: '@robertdavis_tech'
      }
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const toast = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % artists.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [artists.length]);

  const nextArtist = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % artists.length);
  };

  const prevArtist = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + artists.length) % artists.length);
  };

  const goToArtist = (index: number) => {
    setCurrentIndex(index);
  };

  const handleContactArtist = (artist: Artist) => {
    const socialLinks = [];
    if (artist.socialMedia?.instagram) {
      socialLinks.push(`Instagram: ${artist.socialMedia.instagram}`);
    }
    if (artist.socialMedia?.twitter) {
      socialLinks.push(`Twitter: ${artist.socialMedia.twitter}`);
    }
    if (artist.socialMedia?.website) {
      socialLinks.push(`Website: ${artist.socialMedia.website}`);
    }
    
    const description = socialLinks.length > 0 
      ? `Contact ${artist.name} through: ${socialLinks.join(', ')}`
      : `Contact ${artist.name} for collaboration opportunities.`;
    
    toast({
      title: "🎭 Contact Information",
      description: description,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  const currentArtist = artists[currentIndex];

  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
      <VStack spacing={6} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="var(--primary-red)">
          🎭 Meet Our Artists
        </Text>
        
        <Text fontSize="md" textAlign="center" color="gray.600">
          Discover the talented performers and creative minds behind our productions
        </Text>

        {/* Main Artist Display */}
        <Box position="relative" minH="400px">
          <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6} alignItems="center">
            <GridItem>
              <VStack spacing={4}>
                <Avatar
                  size="2xl"
                  name={currentArtist.name}
                  src={currentArtist.image}
                  bg="var(--primary-red)"
                  color="var(--primary-gold)"
                  fontSize="3xl"
                />
                <VStack spacing={2}>
                  <Text fontSize="xl" fontWeight="bold" color="var(--primary-red)">
                    {currentArtist.name}
                  </Text>
                  <Badge colorScheme="red" fontSize="md" px={3} py={1}>
                    {currentArtist.role}
                  </Badge>
                  <Text fontSize="sm" color="gray.600">
                    {currentArtist.experience} experience
                  </Text>
                </VStack>
              </VStack>
            </GridItem>

            <GridItem>
              <VStack align="stretch" spacing={4}>
                <Text fontSize="lg" color="gray.700" lineHeight="1.6">
                  {currentArtist.bio}
                </Text>

                <Box>
                  <Text fontWeight="bold" mb={2} color="var(--primary-red)">
                    🎨 Specialties:
                  </Text>
                  <HStack spacing={2} flexWrap="wrap">
                    {currentArtist.specialties.map((specialty, index) => (
                      <Badge key={index} colorScheme="orange" variant="subtle">
                        {specialty}
                      </Badge>
                    ))}
                  </HStack>
                </Box>

                {currentArtist.socialMedia && (
                  <Box>
                    <Text fontWeight="bold" mb={2} color="var(--primary-red)">
                      📱 Connect:
                    </Text>
                    <HStack spacing={2}>
                      {currentArtist.socialMedia.instagram && (
                        <Link 
                          href={`https://instagram.com/${currentArtist.socialMedia.instagram.replace('@', '')}`}
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          <Button 
                            size="sm" 
                            colorScheme="pink" 
                            variant="outline"
                            _hover={{
                              bg: 'pink.50',
                              transform: 'translateY(-1px)',
                              boxShadow: 'md'
                            }}
                          >
                            📸 Instagram
                          </Button>
                        </Link>
                      )}
                      {currentArtist.socialMedia.twitter && (
                        <Link 
                          href={`https://twitter.com/${currentArtist.socialMedia.twitter.replace('@', '')}`}
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          <Button 
                            size="sm" 
                            colorScheme="blue" 
                            variant="outline"
                            _hover={{
                              bg: 'blue.50',
                              transform: 'translateY(-1px)',
                              boxShadow: 'md'
                            }}
                          >
                            🐦 Twitter
                          </Button>
                        </Link>
                      )}
                      {currentArtist.socialMedia.website && (
                        <Link 
                          href={`https://${currentArtist.socialMedia.website}`}
                          isExternal
                          _hover={{ textDecoration: 'none' }}
                        >
                          <Button 
                            size="sm" 
                            colorScheme="green" 
                            variant="outline"
                            _hover={{
                              bg: 'green.50',
                              transform: 'translateY(-1px)',
                              boxShadow: 'md'
                            }}
                          >
                            🌐 Website
                          </Button>
                        </Link>
                      )}
                    </HStack>
                  </Box>
                )}

                <Button
                  colorScheme="red"
                  bg="var(--primary-red)"
                  color="var(--primary-gold)"
                  onClick={() => handleContactArtist(currentArtist)}
                >
                  Contact {currentArtist.name}
                </Button>
              </VStack>
            </GridItem>
          </Grid>

          {/* Navigation Arrows */}
          <IconButton
            aria-label="Previous artist"
            icon={<span>‹</span>}
            position="absolute"
            left="-4"
            top="50%"
            transform="translateY(-50%)"
            onClick={prevArtist}
            colorScheme="red"
            variant="ghost"
            size="lg"
            fontSize="2xl"
            fontWeight="bold"
          />
          <IconButton
            aria-label="Next artist"
            icon={<span>›</span>}
            position="absolute"
            right="-4"
            top="50%"
            transform="translateY(-50%)"
            onClick={nextArtist}
            colorScheme="red"
            variant="ghost"
            size="lg"
            fontSize="2xl"
            fontWeight="bold"
          />
        </Box>

        {/* Artist Indicators */}
        <HStack justify="center" spacing={2}>
          {artists.map((_, index) => (
            <Button
              key={index}
              size="sm"
              variant={index === currentIndex ? "solid" : "outline"}
              colorScheme="red"
              onClick={() => goToArtist(index)}
              minW="12px"
              h="12px"
              borderRadius="full"
            />
          ))}
        </HStack>

        {/* Artist Grid */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4} color="var(--primary-red)">
            All Artists
          </Text>
          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(6, 1fr)" }} gap={4}>
            {artists.map((artist, index) => (
              <GridItem key={artist.id}>
                <VStack
                  spacing={2}
                  p={3}
                  border="1px"
                  borderColor={index === currentIndex ? "var(--primary-red)" : "gray.200"}
                  borderRadius="lg"
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{
                    borderColor: "var(--primary-red)",
                    transform: "scale(1.05)",
                  }}
                  onClick={() => goToArtist(index)}
                >
                  <Avatar
                    size="md"
                    name={artist.name}
                    src={artist.image}
                    bg="var(--primary-red)"
                    color="var(--primary-gold)"
                  />
                  <Text fontSize="sm" fontWeight="bold" textAlign="center" color="var(--primary-red)">
                    {artist.name}
                  </Text>
                  <Text fontSize="xs" color="gray.600" textAlign="center">
                    {artist.role}
                  </Text>
                </VStack>
              </GridItem>
            ))}
          </Grid>
        </Box>

        <Box textAlign="center" mt={4}>
          <Text fontSize="lg" fontWeight="bold" color="var(--primary-red)">
            🎭 {artists.length} Talented Artists
          </Text>
          <Text fontSize="sm" color="gray.600">
            Join our community of performers and creators
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default ArtistProfilesCarousel; 