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
  Badge,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: 'historic' | 'current' | 'restoration' | 'future';
  date?: string;
}

interface PhotoGallerySliderProps {
  images?: string[];
}

const PhotoGallerySlider: React.FC<PhotoGallerySliderProps> = ({ images }) => {
  const defaultImages: GalleryImage[] = [
    {
      id: '1',
      src: '/gallery/Imageslide1_fx.jpg',
      alt: 'Tiyatro salonu 1',
      title: 'Tiyatro Salonu 1',
      description: 'Tarihi tiyatro salonunun genel görünümü.',
      category: 'historic',
      date: '1924'
    },
    {
      id: '2',
      src: '/gallery/Imageslide2_fx.jpg',
      alt: 'Tiyatro salonu 2',
      title: 'Tiyatro Salonu 2',
      description: 'Restorasyon öncesi tiyatro.',
      category: 'historic',
      date: '1950'
    },
    {
      id: '3',
      src: '/gallery/Imageslide3_fx.jpg',
      alt: 'Tiyatro salonu 3',
      title: 'Tiyatro Salonu 3',
      description: 'Restorasyon çalışmaları sırasında.',
      category: 'restoration',
      date: '2023'
    },
    {
      id: '4',
      src: '/gallery/Imageslider4_fx.jpg',
      alt: 'Tiyatro salonu 4',
      title: 'Tiyatro Salonu 4',
      description: 'Yenilenen koltuklar.',
      category: 'current',
      date: '2024'
    },
    {
      id: '5',
      src: '/gallery/Imageslider5_fx.jpg',
      alt: 'Tiyatro salonu 5',
      title: 'Tiyatro Salonu 5',
      description: 'Sahne arkası.',
      category: 'current',
      date: '2024'
    },
    {
      id: '6',
      src: '/gallery/Imageslider6_fx.jpg',
      alt: 'Tiyatro salonu 6',
      title: 'Tiyatro Salonu 6',
      description: 'Gösteri hazırlıkları.',
      category: 'current',
      date: '2024'
    },
    {
      id: '7',
      src: '/gallery/Imageslider7_fx.jpg',
      alt: 'Tiyatro salonu 7',
      title: 'Tiyatro Salonu 7',
      description: 'Tiyatroda bir etkinlik.',
      category: 'current',
      date: '2024'
    },
    {
      id: '8',
      src: '/gallery/Imageslider8_fx.jpg',
      alt: 'Tiyatro salonu 8',
      title: 'Tiyatro Salonu 8',
      description: 'Tiyatroda kalabalık bir gün.',
      category: 'current',
      date: '2024'
    }
  ];

  const galleryImages: GalleryImage[] = images && images.length > 0
    ? images.map((src, idx) => ({
        id: String(idx + 1),
        src,
        alt: `Gallery image ${idx + 1}`,
        title: `Fotoğraf ${idx + 1}`,
        description: '',
        category: 'current',
      }))
    : defaultImages;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    onOpen();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'historic': return 'blue';
      case 'current': return 'red';
      case 'restoration': return 'green';
      case 'future': return 'purple';
      default: return 'gray';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'historic': return '📜';
      case 'current': return '📸';
      case 'restoration': return '🔧';
      case 'future': return '🔮';
      default: return '🖼️';
    }
  };

  const currentImage = galleryImages[currentIndex];

  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
      <VStack spacing={6} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="var(--primary-red)">
          📸 Photo Gallery
        </Text>
        
        <Text fontSize="md" textAlign="center" color="gray.600">
          Journey through time with photos of our theater's history, current state, and restoration progress
        </Text>

        {/* Main Image Display */}
        <Box position="relative" minH="400px" borderRadius="lg" overflow="hidden">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            width="100%"
            height="400px"
            objectFit="cover"
            fallbackSrc="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop"
            cursor="pointer"
            onClick={() => handleImageClick(currentImage)}
            transition="transform 0.3s"
            _hover={{ transform: 'scale(1.02)' }}
          />
          
          {/* Image Overlay */}
          <Box
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            bg="linear-gradient(transparent, rgba(0,0,0,0.8))"
            p={4}
            color="white"
          >
            <VStack align="stretch" spacing={2}>
              <HStack justify="space-between">
                <Text fontSize="lg" fontWeight="bold">
                  {currentImage.title}
                </Text>
                <Badge colorScheme={getCategoryColor(currentImage.category)}>
                  {getCategoryIcon(currentImage.category)} {currentImage.category.toUpperCase()}
                </Badge>
              </HStack>
              <Text fontSize="sm" noOfLines={2}>
                {currentImage.description}
              </Text>
              {currentImage.date && (
                <Text fontSize="xs" opacity={0.8}>
                  📅 {currentImage.date}
                </Text>
              )}
            </VStack>
          </Box>

          {/* Navigation Arrows */}
          <IconButton
            aria-label="Previous image"
            icon={<span>‹</span>}
            position="absolute"
            left="4"
            top="50%"
            transform="translateY(-50%)"
            onClick={prevImage}
            colorScheme="blackAlpha"
            variant="solid"
            size="lg"
            fontSize="2xl"
            fontWeight="bold"
          />
          <IconButton
            aria-label="Next image"
            icon={<span>›</span>}
            position="absolute"
            right="4"
            top="50%"
            transform="translateY(-50%)"
            onClick={nextImage}
            colorScheme="blackAlpha"
            variant="solid"
            size="lg"
            fontSize="2xl"
            fontWeight="bold"
          />

          {/* Image Counter */}
          <Box
            position="absolute"
            top="4"
            right="4"
            bg="blackAlpha.700"
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="sm"
          >
            {currentIndex + 1} / {galleryImages.length}
          </Box>
        </Box>

        {/* Image Indicators */}
        <HStack justify="center" spacing={2}>
          {galleryImages.map((_, index) => (
            <Button
              key={index}
              size="sm"
              variant={index === currentIndex ? "solid" : "outline"}
              colorScheme="red"
              onClick={() => goToImage(index)}
              minW="12px"
              h="12px"
              borderRadius="full"
            />
          ))}
        </HStack>

        {/* Category Filter */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4} color="var(--primary-red)">
            Browse by Category
          </Text>
          <HStack spacing={2} flexWrap="wrap" justify="center">
            {['historic', 'current', 'restoration', 'future'].map((category) => (
              <Button
                key={category}
                size="sm"
                colorScheme={getCategoryColor(category)}
                variant="outline"
                onClick={() => {
                  const categoryIndex = galleryImages.findIndex(img => img.category === category);
                  if (categoryIndex !== -1) goToImage(categoryIndex);
                }}
              >
                {getCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </HStack>
        </Box>

        {/* Thumbnail Grid */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4} color="var(--primary-red)">
            All Photos
          </Text>
          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(8, 1fr)" }} gap={2}>
            {galleryImages.map((image, index) => (
              <GridItem key={image.id}>
                <Box
                  position="relative"
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{
                    transform: "scale(1.05)",
                    boxShadow: "lg",
                  }}
                  onClick={() => goToImage(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width="100%"
                    height="80px"
                    objectFit="cover"
                    borderRadius="md"
                    fallbackSrc="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=100&h=80&fit=crop"
                  />
                  <Badge
                    position="absolute"
                    top="2"
                    right="2"
                    colorScheme={getCategoryColor(image.category)}
                    size="sm"
                  >
                    {getCategoryIcon(image.category)}
                  </Badge>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>

        <Box textAlign="center" mt={4}>
          <Text fontSize="lg" fontWeight="bold" color="var(--primary-red)">
            📸 {galleryImages.length} Photos
          </Text>
          <Text fontSize="sm" color="gray.600">
            Click any photo to view in full size
          </Text>
        </Box>
      </VStack>

      {/* Full Size Image Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalCloseButton color="white" zIndex={10} />
          <ModalBody p={0}>
            {selectedImage && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                minH="100vh"
                bg="blackAlpha.900"
              >
                <VStack spacing={4} maxW="90vw" maxH="90vh">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    maxW="100%"
                    maxH="70vh"
                    objectFit="contain"
                    fallbackSrc="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop"
                  />
                  <Box textAlign="center" color="white" p={4}>
                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                      {selectedImage.title}
                    </Text>
                    <Text fontSize="md" mb={2}>
                      {selectedImage.description}
                    </Text>
                    <Badge colorScheme={getCategoryColor(selectedImage.category)}>
                      {getCategoryIcon(selectedImage.category)} {selectedImage.category.toUpperCase()}
                    </Badge>
                    {selectedImage.date && (
                      <Text fontSize="sm" mt={2} opacity={0.8}>
                        📅 {selectedImage.date}
                      </Text>
                    )}
                  </Box>
                </VStack>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PhotoGallerySlider; 