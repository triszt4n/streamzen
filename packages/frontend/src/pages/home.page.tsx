import { Flex, Heading } from "@chakra-ui/react";
import Layout from "../components/layout";
import { VideoPlayer } from "@/components/video-player";

export const HomePage: React.FC = () => {
  return (
    <Layout>
      <Heading my={12}>Hello there</Heading>
      <Flex justifyContent="center">
        <VideoPlayer src="/api/stream/title/output.m3u8" />
      </Flex>
    </Layout>
  );
};
