import { useAuthContext } from "@/api/contexts/use-auth-context";
import { routeMap } from "@/utils/routes";
import {
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const UserMenu: React.FC = () => {
  const { loggedInUser, onLogout } = useAuthContext();
  const navigate = useNavigate();
  const menuBg = useColorModeValue("gray.200", "gray.700");

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="link"
        cursor="pointer"
        rounded="md"
        px={4}
        py={2}
        _hover={{
          textDecoration: "none",
          bg: menuBg,
        }}
        minW={0}
      >
        <Avatar size="sm" name={loggedInUser?.fullName} />
      </MenuButton>
      <MenuList alignItems="center">
        <br />
        <Center>
          <Avatar
            size={"2xl"}
            src={"https://avatars.dicebear.com/api/male/username.svg"}
          />
        </Center>
        <br />
        <Center>
          <p>{loggedInUser?.firstName}</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem
          onClick={() => {
            alert("Not implemented yet");
          }}
        >
          Your Videos
        </MenuItem>
        <MenuItem
          onClick={() => {
            alert("Not implemented yet");
          }}
        >
          Account Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            onLogout();
            navigate(routeMap.home.path!);
          }}
        >
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
