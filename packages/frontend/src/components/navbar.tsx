import { useAuthContext } from "@/api/contexts/use-auth-context";
import { NavRouteObject, routes } from "@/utils/routes";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaBars, FaSignInAlt, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../assets/bss_logo_nounderline.svg?react";
import { UserMenu } from "./user-menu";

const NavLink: React.FC<{ route: NavRouteObject }> = ({
  route: { label, path, icon: Icon },
}) => {
  return (
    <Button
      flexDir="column"
      alignItems="center"
      as={Link}
      to={path}
      variant="ghost"
    >
      <HStack>
        {Icon && <Icon size="1.5rem" />}
        <Box>{label}</Box>
      </HStack>
    </Button>
  );
};

const MobileNav: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
  return (
    <Stack
      display={{ md: "none" }}
      fontWeight={700}
      fontSize="xl"
      ml={6}
      mb={6}
    >
      {routes
        .filter((item) => item.label && item.icon)
        .map(({ label, path, icon: Icon }) => (
          <HStack py={2} key={label} as={Link} to={path} onClick={onNavigate}>
            {Icon && <Icon />}
            <Text textAlign="center">{label}</Text>
          </HStack>
        ))}
    </Stack>
  );
};

export const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoggedIn, loginPath } = useAuthContext();
  const bg = useColorModeValue("white", "gray.800");
  const onLoginStarted = () => {
    window.location.pathname = loginPath;
  };
  const { isOpen, onToggle } = useDisclosure();
  const onNavigate = () => onToggle();

  return (
    <>
      <Box bg={bg}>
        <Flex
          px={4}
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Flex display={{ base: "flex", md: "none" }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <FaTimes size="1.5rem" /> : <FaBars size="1.5rem" />
              }
              variant="ghost"
              aria-label="Open navigation"
            />
          </Flex>
          <Flex display={{ base: "none", md: "flex" }}>
            <Logo width="100" />
            <HStack as={"nav"} spacing={4} ml={8}>
              {routes
                .filter((item) => item.label && item.icon)
                .map((route) => (
                  <NavLink key={route.label} route={route} />
                ))}
            </HStack>
          </Flex>
          <Flex alignItems="center">
            <HStack spacing={6}>
              <Button py={6} onClick={toggleColorMode} variant="ghost">
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {isLoggedIn ? (
                <UserMenu />
              ) : (
                <Button
                  flexDir="column"
                  alignItems="center"
                  onClick={onLoginStarted}
                  variant="ghost"
                >
                  <HStack>
                    <FaSignInAlt size="1.5rem" />
                    <Box>Log in</Box>
                  </HStack>
                </Button>
              )}
            </HStack>
          </Flex>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav onNavigate={onNavigate} />
        </Collapse>
      </Box>
    </>
  );
};
