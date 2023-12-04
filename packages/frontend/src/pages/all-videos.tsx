import { useAuthContext } from "@/api/contexts/use-auth-context";
import { VideoApi } from "@/api/video.api";
import { SimpleAlert } from "@/components/simple-alert";
import { VideoCard } from "@/components/video-card";
import { routeMap } from "@/utils/routes";
import { Box, Button, Flex, HStack, Heading } from "@chakra-ui/react";
import { FaUpload, FaVideo } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Layout from "../components/layout";

export const AllVideosPage: React.FC = () => {
  const { isLoading, error, data } = useQuery("allVideos", () =>
    VideoApi.getInstance().getAllVideoList(),
  );
  const { isLoggedIn } = useAuthContext();

  return (
    <Layout>
      {!!error && (
        <SimpleAlert
          desc={(error as Error).message}
          status="error"
          title="Error loading videos."
        />
      )}
      <Heading mb={4}>Manage videos, collections</Heading>
      {isLoggedIn && (
        <HStack justifyContent="end" mb={3}>
          <Button leftIcon={<FaUpload />} as={Link} to={routeMap.upload.path!}>
            Upload Video
          </Button>
          <Button leftIcon={<FaVideo />} as={Link} to={routeMap.newLive.path!}>
            New Live
          </Button>
        </HStack>
      )}
      <Box>
        <Heading size="lg" my={4}>
          All VoDs Created
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
        {data?.vods
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) // desc
          .map((vod) => (
            <VideoCard
              key={vod.id}
              path={`/vods/${vod.id}`}
              title={vod.title}
              folderName={vod.folderName}
              state={vod.state}
              user={vod.createdBy}
            />
          ))}
      </Flex>
      <Box>
        <Heading size="lg" my={4}>
          All Lives Created
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
        {data?.lives
          ?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) // desc
          .map((live) => (
            <VideoCard
              key={live.id}
              path={`/lives/${live.id}`}
              title={live.title}
              folderName="todo" // <------------------- todo
              state="PROCESSED" // <------------------- todo
            />
          ))}
      </Flex>
    </Layout>
  );
};
