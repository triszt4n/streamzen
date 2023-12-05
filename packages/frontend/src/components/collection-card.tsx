import { User } from "@/api/types";
import { Box, Card, HStack, Heading, Text } from "@chakra-ui/react";
import { FaList } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  title: string;
  path: string;
  user?: User;
};

export const CollectionCard: React.FC<Props> = ({ title, path, user }) => {
  const navigate = useNavigate();
  const openColl = () => {
    navigate(path);
  };

  return (
    <Card
      flex="0 0 auto"
      align="stretch"
      w="15rem"
      h="full"
      p={6}
      cursor="pointer"
      onClick={openColl}
    >
      <HStack spacing={2}>
        <FaList size="0.75rem" />
        <Heading size="sm">{title}</Heading>
      </HStack>
      <Box>
        {user && (
          <Text>
            Creator: <Link to={`/users/${user?.id}`}>{user?.fullName}</Link>
          </Text>
        )}
      </Box>
    </Card>
  );
};
