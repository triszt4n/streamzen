import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const components = {
  Link: {
    baseStyle: {
      color: "blue.500",
      fontWeight: "600",
      _hover: {
        color: "blue.800",
      },
    },
  },
};

export const theme = extendTheme({ colors, components });
