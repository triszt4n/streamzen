import { Box, Container, Flex, Link, Text, VStack } from "@chakra-ui/react";
import Logo from "../assets/bss_logo.svg?react";

export const Footer = () => (
  <Box as="footer">
    <Container
      py={8}
      as={Flex}
      justifyContent="space-between"
      direction={{ base: "column", sm: "row" }}
      maxW="6xl"
    >
      <Flex
        mb={{ base: 4, sm: 0 }}
        justifyContent={{ base: "center", sm: "flex-start" }}
      >
        <Box mr={6}>
          <Logo width="6rem" />
        </Box>
        <VStack alignItems="start" gap={0} justifyContent="center">
          <Text fontWeight={700}>Budavári Schönherz Stúdió.</Text>
          <Text>
            Kapcsolat: <Link href="mailto:bss@sch.bme.hu">bss@sch.bme.hu</Link>
          </Text>
        </VStack>
      </Flex>
      <Flex
        direction="column"
        justifyContent={{ base: "center", sm: "flex-end" }}
      >
        <Text mt={2} textAlign={{ base: "center", sm: "right" }}>
          Készült: {new Date().getFullYear()} • bsstudio.hu
        </Text>
      </Flex>
    </Container>
  </Box>
);
