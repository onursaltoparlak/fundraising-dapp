"use client";

import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Grid,
  GridItem,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Image,
} from '@chakra-ui/react';

interface Performance {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  category: 'play' | 'concert' | 'comedy' | 'special';
  price: string;
  image?: string;
  cast?: string[];
  director?: string;
  duration?: string;
}

const PerformanceCalendar: React.FC = () => {
  const [performances] = useState<Performance[]>([
    {
      id: '1',
      title: 'Romeo & Juliet',
      date: '2024-03-15',
      time: '7:30 PM',
      description: 'Shakespeare\'s timeless tale of star-crossed lovers, reimagined for the modern stage.',
      category: 'play',
      price: '$25-45',
      cast: ['Sarah Johnson', 'Michael Chen', 'Emma Rodriguez'],
      director: 'David Thompson',
      duration: '2h 30m',
    },
    {
      id: '2',
      title: 'Jazz Under the Stars',
      date: '2024-03-22',
      time: '8:00 PM',
      description: 'An evening of classic jazz standards performed by the local jazz ensemble.',
      category: 'concert',
      price: '$20-35',
      duration: '1h 45m',
    },
    {
      id: '3',
      title: 'Laugh Factory',
      date: '2024-03-29',
      time: '8:30 PM',
      description: 'Stand-up comedy night featuring local comedians and special guests.',
      category: 'comedy',
      price: '$15-25',
      duration: '2h',
    },
    {
      id: '4',
      title: 'The Nutcracker',
      date: '2024-04-05',
      time: '2:00 PM',
      description: 'A magical holiday classic performed by the community ballet company.',
      category: 'special',
      price: '$30-50',
      cast: ['Community Ballet Company'],
      director: 'Maria Santos',
      duration: '2h 15m',
    },
    {
      id: '5',
      title: 'Hamlet',
      date: '2024-04-12',
      time: '7:00 PM',
      description: 'Shakespeare\'s greatest tragedy, featuring stunning performances and innovative staging.',
      category: 'play',
      price: '$25-45',
      cast: ['James Wilson', 'Lisa Park', 'Robert Davis'],
      director: 'Jennifer Lee',
      duration: '3h',
    },
    {
      id: '6',
      title: 'Classical Symphony',
      date: '2024-04-19',
      time: '7:30 PM',
      description: 'Beethoven\'s Symphony No. 9 performed by the community orchestra.',
      category: 'concert',
      price: '$20-40',
      duration: '1h 30m',
    },
  ]);

  const [selectedPerformance, setSelectedPerformance] = useState<Performance | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handlePerformanceClick = (performance: Performance) => {
    setSelectedPerformance(performance);
    onOpen();
  };

  const handleBookTickets = () => {
    if (!selectedPerformance) return;
    
    toast({
      title: "🎭 Booking Coming Soon!",
      description: `Tickets for ${selectedPerformance.title} will be available after restoration.`,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'play': return 'blue';
      case 'concert': return 'purple';
      case 'comedy': return 'orange';
      case 'special': return 'green';
      default: return 'gray';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'play': return '🎭';
      case 'concert': return '🎵';
      case 'comedy': return '😄';
      case 'special': return '⭐';
      default: return '🎪';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
      <VStack spacing={6} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="var(--primary-red)">
          🎪 Upcoming Performances
        </Text>
        
        <Text fontSize="md" textAlign="center" color="gray.600">
          Our exciting lineup of shows after the restoration is complete. Book your tickets early!
        </Text>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
          {performances.map((performance) => (
            <GridItem key={performance.id}>
              <Box
                border="1px"
                borderColor="gray.200"
                borderRadius="lg"
                p={4}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                  borderColor: 'var(--primary-red)',
                }}
                onClick={() => handlePerformanceClick(performance)}
              >
                <VStack align="stretch" spacing={3}>
                  <HStack justify="space-between">
                    <Badge colorScheme={getCategoryColor(performance.category)}>
                      {getCategoryIcon(performance.category)} {performance.category.toUpperCase()}
                    </Badge>
                    <Text fontSize="sm" fontWeight="bold" color="var(--primary-red)">
                      {performance.price}
                    </Text>
                  </HStack>

                  <Text fontSize="lg" fontWeight="bold" color="var(--primary-red)">
                    {performance.title}
                  </Text>

                  <VStack align="stretch" spacing={1}>
                    <Text fontSize="sm" color="gray.600">
                      📅 {formatDate(performance.date)}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      🕒 {performance.time}
                    </Text>
                    {performance.duration && (
                      <Text fontSize="sm" color="gray.600">
                        ⏱️ {performance.duration}
                      </Text>
                    )}
                  </VStack>

                  <Text fontSize="sm" color="gray.700" noOfLines={3}>
                    {performance.description}
                  </Text>

                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    bg="var(--primary-red)"
                    color="var(--primary-gold)"
                    _hover={{
                      bg: 'var(--primary-gold)',
                      color: 'var(--primary-red)',
                    }}
                  >
                    Book Tickets
                  </Button>
                </VStack>
              </Box>
            </GridItem>
          ))}
        </Grid>

        <Box textAlign="center" mt={6}>
          <Text fontSize="lg" fontWeight="bold" color="var(--primary-red)">
            🎭 {performances.length} Upcoming Shows
          </Text>
          <Text fontSize="sm" color="gray.600">
            More performances will be announced as restoration progresses
          </Text>
        </Box>
      </VStack>

      {/* Performance Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <VStack align="stretch" spacing={2}>
              <Text color="var(--primary-red)">{selectedPerformance?.title}</Text>
              <Badge colorScheme={getCategoryColor(selectedPerformance?.category || '')} alignSelf="flex-start">
                {getCategoryIcon(selectedPerformance?.category || '')} {selectedPerformance?.category?.toUpperCase()}
              </Badge>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedPerformance && (
              <VStack align="stretch" spacing={4}>
                <HStack justify="space-between">
                  <Text fontWeight="bold">📅 Date:</Text>
                  <Text>{formatDate(selectedPerformance.date)}</Text>
                </HStack>
                
                <HStack justify="space-between">
                  <Text fontWeight="bold">🕒 Time:</Text>
                  <Text>{selectedPerformance.time}</Text>
                </HStack>

                {selectedPerformance.duration && (
                  <HStack justify="space-between">
                    <Text fontWeight="bold">⏱️ Duration:</Text>
                    <Text>{selectedPerformance.duration}</Text>
                  </HStack>
                )}

                <HStack justify="space-between">
                  <Text fontWeight="bold">💰 Price:</Text>
                  <Text color="var(--primary-red)" fontWeight="bold">{selectedPerformance.price}</Text>
                </HStack>

                {selectedPerformance.director && (
                  <HStack justify="space-between">
                    <Text fontWeight="bold">🎬 Director:</Text>
                    <Text>{selectedPerformance.director}</Text>
                  </HStack>
                )}

                {selectedPerformance.cast && selectedPerformance.cast.length > 0 && (
                  <Box>
                    <Text fontWeight="bold" mb={2}>🎭 Cast:</Text>
                    <VStack align="stretch" spacing={1}>
                      {selectedPerformance.cast.map((actor, index) => (
                        <Text key={index} fontSize="sm" color="gray.600">• {actor}</Text>
                      ))}
                    </VStack>
                  </Box>
                )}

                <Box>
                  <Text fontWeight="bold" mb={2}>📖 Description:</Text>
                  <Text>{selectedPerformance.description}</Text>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button 
              colorScheme="red" 
              onClick={handleBookTickets}
              bg="var(--primary-red)"
              color="var(--primary-gold)"
            >
              Book Tickets
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PerformanceCalendar; 