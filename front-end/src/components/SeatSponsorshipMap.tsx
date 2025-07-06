"use client";

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Button,
  Text,
  VStack,
  HStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

interface Seat {
  id: string;
  row: string;
  number: number;
  section: string;
  price: number;
  isSponsored: boolean;
  sponsoredBy?: string;
}

const SeatSponsorshipMap: React.FC = () => {
  const [seats, setSeats] = useState<Seat[]>([
    // Orchestra Section
    { id: 'A1', row: 'A', number: 1, section: 'Orchestra', price: 50, isSponsored: false },
    { id: 'A2', row: 'A', number: 2, section: 'Orchestra', price: 50, isSponsored: false },
    { id: 'A3', row: 'A', number: 3, section: 'Orchestra', price: 50, isSponsored: false },
    { id: 'A4', row: 'A', number: 4, section: 'Orchestra', price: 50, isSponsored: false },
    { id: 'A5', row: 'A', number: 5, section: 'Orchestra', price: 50, isSponsored: false },
    { id: 'B1', row: 'B', number: 1, section: 'Orchestra', price: 50, isSponsored: false },
    { id: 'B2', row: 'B', number: 2, section: 'Orchestra', price: 50, isSponsored: false },
    { id: 'B3', row: 'B', number: 3, section: 'Orchestra', price: 50, isSponsored: false },
    { id: 'B4', row: 'B', number: 4, section: 'Orchestra', price: 50, isSponsored: false },
    { id: 'B5', row: 'B', number: 5, section: 'Orchestra', price: 50, isSponsored: false },
    // Balcony Section
    { id: 'C1', row: 'C', number: 1, section: 'Balcony', price: 50, isSponsored: false },
    { id: 'C2', row: 'C', number: 2, section: 'Balcony', price: 50, isSponsored: false },
    { id: 'C3', row: 'C', number: 3, section: 'Balcony', price: 50, isSponsored: false },
    { id: 'C4', row: 'C', number: 4, section: 'Balcony', price: 50, isSponsored: false },
    { id: 'C5', row: 'C', number: 5, section: 'Balcony', price: 50, isSponsored: false },
  ]);

  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSeatClick = (seat: Seat) => {
    if (seat.isSponsored) {
      toast({
        title: "Seat Already Sponsored",
        description: `Seat ${seat.id} is sponsored by ${seat.sponsoredBy}`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setSelectedSeat(seat);
    onOpen();
  };

  const handleSponsorSeat = () => {
    if (!selectedSeat) return;

    setSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.id === selectedSeat.id
          ? { ...seat, isSponsored: true, sponsoredBy: "Anonymous Donor" }
          : seat
      )
    );

    toast({
      title: "🎭 Seat Sponsored!",
      description: `Thank you for sponsoring seat ${selectedSeat.id}!`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    onClose();
    setSelectedSeat(null);
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.isSponsored) return 'green.500';
    return 'gray.300';
  };

  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
      <VStack spacing={6} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="var(--primary-red)">
          🎭 Theater Seating Chart
        </Text>
        
        <Text fontSize="md" textAlign="center" color="gray.600">
          Click on any seat to sponsor it for $50. Sponsored seats will be marked with a plaque.
        </Text>

        {/* Stage */}
        <Box
          bg="var(--primary-red)"
          color="var(--primary-gold)"
          p={4}
          borderRadius="lg"
          textAlign="center"
          fontWeight="bold"
          fontSize="lg"
          mb={4}
        >
          🎪 STAGE 🎪
        </Box>

        {/* Seating Chart */}
        <Box>
          {/* Balcony Section */}
          <Text fontSize="lg" fontWeight="bold" mb={2} color="var(--primary-red)">
            Balcony Section
          </Text>
          <Grid templateColumns="repeat(5, 1fr)" gap={2} mb={6}>
            {seats.filter(seat => seat.section === 'Balcony').map(seat => (
              <Button
                key={seat.id}
                size="sm"
                bg={getSeatColor(seat)}
                color={seat.isSponsored ? "white" : "black"}
                onClick={() => handleSeatClick(seat)}
                _hover={{
                  bg: seat.isSponsored ? 'green.600' : 'gray.400'
                }}
                position="relative"
              >
                {seat.id}
                {seat.isSponsored && (
                  <Box
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    bg="var(--primary-gold)"
                    color="var(--primary-red)"
                    borderRadius="full"
                    width="16px"
                    height="16px"
                    fontSize="10px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                  >
                    ✓
                  </Box>
                )}
              </Button>
            ))}
          </Grid>

          {/* Orchestra Section */}
          <Text fontSize="lg" fontWeight="bold" mb={2} color="var(--primary-red)">
            Orchestra Section
          </Text>
          <Grid templateColumns="repeat(5, 1fr)" gap={2}>
            {seats.filter(seat => seat.section === 'Orchestra').map(seat => (
              <Button
                key={seat.id}
                size="sm"
                bg={getSeatColor(seat)}
                color={seat.isSponsored ? "white" : "black"}
                onClick={() => handleSeatClick(seat)}
                _hover={{
                  bg: seat.isSponsored ? 'green.600' : 'gray.400'
                }}
                position="relative"
              >
                {seat.id}
                {seat.isSponsored && (
                  <Box
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    bg="var(--primary-gold)"
                    color="var(--primary-red)"
                    borderRadius="full"
                    width="16px"
                    height="16px"
                    fontSize="10px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                  >
                    ✓
                  </Box>
                )}
              </Button>
            ))}
          </Grid>
        </Box>

        {/* Legend */}
        <HStack justify="center" spacing={4} mt={4}>
          <HStack>
            <Box w={4} h={4} bg="gray.300" borderRadius="sm" />
            <Text fontSize="sm">Available</Text>
          </HStack>
          <HStack>
            <Box w={4} h={4} bg="green.500" borderRadius="sm" />
            <Text fontSize="sm">Sponsored</Text>
          </HStack>
        </HStack>

        {/* Stats */}
        <Box textAlign="center" mt={4}>
          <Text fontSize="lg" fontWeight="bold" color="var(--primary-red)">
            {seats.filter(s => s.isSponsored).length} of {seats.length} seats sponsored
          </Text>
          <Text fontSize="sm" color="gray.600">
            ${seats.filter(s => s.isSponsored).length * 50} raised from seat sponsorships
          </Text>
        </Box>
      </VStack>

      {/* Sponsorship Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sponsor Seat {selectedSeat?.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Text>
                Would you like to sponsor seat <strong>{selectedSeat?.id}</strong> for ${selectedSeat?.price}?
              </Text>
              <Text fontSize="sm" color="gray.600">
                This seat will be marked with a plaque bearing your name (or "Anonymous Donor" if you prefer).
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="red" 
              onClick={handleSponsorSeat}
              bg="var(--primary-red)"
              color="var(--primary-gold)"
            >
              Sponsor Seat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SeatSponsorshipMap; 