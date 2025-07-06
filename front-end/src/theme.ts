import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      500: "#2D3748",
    },
    theater: {
      red: "#8B0000",
      gold: "#FFD700",
      darkRed: "#2d0101",
    },
  },
  styles: {
    global: {
      body: {
        bg: "var(--background)",
        color: "var(--foreground)",
      },
    },
  },
});

export default theme;
