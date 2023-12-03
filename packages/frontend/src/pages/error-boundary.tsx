import Layout from "@/components/layout";
import { Flex, Heading } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

export const ErrorBoundary: React.FC = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Layout>
      <Flex justifyContent="center">
        <Heading my={12}>Error occured!</Heading>
      </Flex>
    </Layout>
  );
};
