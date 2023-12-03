import { useAuthContext } from "@/api/contexts/use-auth-context";
import { routeMap } from "@/utils/routes";
import { Flex, HStack, Heading, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const WelcomePage: React.FC = () => {
  const { onLoginSuccess } = useAuthContext();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.has("jwt")) {
      onLoginSuccess(params.get("jwt")!);
      navigate(routeMap.home.path!);
    }
  }, [navigate, onLoginSuccess, params]);

  return (
    <>
      <Flex direction="column" minHeight="100vh">
        <Flex flex={1} justifyContent="center">
          <HStack spacing={10}>
            <Spinner size="xl" />
            <Heading>Logging you in...</Heading>
          </HStack>
        </Flex>
      </Flex>
    </>
  );
};
