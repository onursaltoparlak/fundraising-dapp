"use client";

import PerformanceCalendar from "@/components/PerformanceCalendar";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

export default function CalendarPage() {
  return (
    <Container maxW="container.xl" py="8">
      <Box mb={8}>
        <Heading 
          color="var(--primary-gold)" 
          fontSize={{ base: "3xl", md: "4xl" }}
          textAlign="center"
          textShadow="2px 2px 4px rgba(0,0,0,0.5)"
          fontFamily="Georgia, serif"
          mb={4}
        >
          🎪 Performance Calendar
        </Heading>
        <Text 
          color="var(--primary-gold)" 
          fontSize={{ base: "lg", md: "xl" }}
          textAlign="center"
          opacity={0.9}
          fontFamily="Georgia, serif"
          fontStyle="italic"
        >
          Experience the magic of live theater after our restoration is complete
        </Text>
      </Box>
      
      <PerformanceCalendar />
    </Container>
  );
} 