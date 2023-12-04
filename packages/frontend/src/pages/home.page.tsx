import { VideoApi } from "@/api/video.api";
import { SimpleAlert } from "@/components/simple-alert";
import { VideoCard } from "@/components/video-card";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import Layout from "../components/layout";

export const HomePage: React.FC = () => {
  const { isLoading, error, data } = useQuery("videos", () =>
    VideoApi.getInstance().getPublicVideoList(),
  );
  const { state } = useLocation();

  return (
    <Layout>
      {state?.alert && (
        <SimpleAlert
          desc={state.alert}
          status="warning"
          title="You've been redirected."
        />
      )}
      {error && (
        <SimpleAlert
          desc={(error as Error).message}
          status="error"
          title="Error loading videos."
        />
      )}
      <Heading mb={4}>Budavári Schönherz Stúdió</Heading>
      <Box>
        <Heading size="lg" my={4}>
          Latest VoDs
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
        {data?.vods.length
          ? data?.vods
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) // desc
              .map((vod) => (
                <VideoCard
                  key={vod.id}
                  path={`/vods/${vod.id}`}
                  title={vod.title}
                  folderName={vod.folderName}
                  state=""
                />
              ))
          : "None."}
      </Flex>
      <Box>
        <Heading size="lg" my={4}>
          Upcoming and on air Lives
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
        {data?.lives.length
          ? data?.lives
              ?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) // desc
              .map((live) => (
                <VideoCard
                  key={live.id}
                  path={`/lives/${live.id}`}
                  title={live.title}
                  folderName="todo" // <------------------- todo
                  state=""
                />
              ))
          : "None."}
      </Flex>
      <Box>
        <Heading size="lg" my={4}>
          All Collections
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
        {data?.collections.length
          ? data?.collections
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) // desc
              .map((vod) => (
                <VideoCard
                  key={vod.id}
                  path={`/vods/${vod.id}`}
                  title={vod.title}
                  folderName={vod.folderName}
                  state={vod.state}
                />
              ))
          : "None."}
      </Flex>
    </Layout>
  );
};
