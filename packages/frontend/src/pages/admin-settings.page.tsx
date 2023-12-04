import { useAuthContext } from "@/api/contexts/use-auth-context";
import { UserApi } from "@/api/user.api";
import { SimpleAlert } from "@/components/simple-alert";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Link, Navigate } from "react-router-dom";
import Layout from "../components/layout";

export const AdminSettingsPage: React.FC = () => {
  const { isLoading, error, data } = useQuery("users", () =>
    UserApi.getInstance().getAllUsers(),
  );
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      {!!error && (
        <SimpleAlert
          desc={(error as Error).message}
          status="error"
          title="Error loading users."
        />
      )}
      <Heading mb={4}>Administrator settings</Heading>
      <Box>
        <Heading size="lg" my={4}>
          Manage Users
        </Heading>
      </Box>
      {isLoading && <Box>Loading...</Box>}
      <Flex
        py={3}
        overflowX="auto"
        flexWrap="nowrap"
        w="full"
        alignItems="stretch"
      >
        {data
          ?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) // desc
          .map((user) => (
            <LinkBox key={user.id} as={Card} maxW="10rem">
              <CardBody as={VStack} align="stretch" gap={0}>
                <Center>
                  <Avatar
                    size="lg"
                    src="https://avatars.dicebear.com/api/male/username.svg"
                    name={user.fullName}
                  />
                </Center>
                <Box mt={4}>
                  <LinkOverlay as={Link} to={`/users/${user.id}`}>
                    {user.fullName}
                  </LinkOverlay>
                </Box>
                <Box alignSelf="end">
                  <Badge colorScheme={user.role === "ADMIN" ? "green" : "gray"}>
                    {user.role}
                  </Badge>
                </Box>
              </CardBody>
            </LinkBox>
          ))}
      </Flex>
    </Layout>
  );
};
