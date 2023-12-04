import {
  Alert,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Layout from "../components/layout";
import { VideoPlayer } from "@/components/video-player";
import { useParams } from "react-router-dom";
import { VideoApi } from "@/api/video.api";
import { useMutation, useQuery } from "react-query";
import { SimpleAlert } from "@/components/simple-alert";
import { RemarkUIRenderer } from "@/utils/remark-ui-renderer";
import ReactMarkdown from "react-markdown";

export const VodPage: React.FC = () => {
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useQuery(["vod", id], () =>
    VideoApi.getInstance().getVodById(parseInt(id!)),
  );
  const { data: processPercent } = useQuery(
    ["processPercent", id],
    () => VideoApi.getInstance().getProcessPercent(parseInt(id!)),
    {
      refetchInterval: (data) => {
        if (data == 100) {
          refetch();
          return false;
        }
        return 2000;
      },
    },
  );
  const mutedColor = useColorModeValue("gray.400", "gray.600");

  const mutation = useMutation(VideoApi.getInstance().startProcess, {
    onSuccess: () => {
      refetch();
    },
  });
  const onProc = () => {
    if (confirm("Start processing of this video?")) {
      mutation.mutate(parseInt(id!));
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <Heading>Loading...</Heading>
      </Layout>
    );
  }

  return (
    <Layout>
      {!!error && (
        <SimpleAlert
          desc={(error as Error).message}
          status="error"
          title="Error loading videos."
        />
      )}
      <Heading mb={4}>{data?.title}</Heading>
      {data?.state == "PROCESSING" && (
        <HStack>
          <Heading fontSize="md">
            Video is under processing...
            {processPercent &&
              ` ${Math.ceil(processPercent * 100) / 100} % done.`}
          </Heading>
        </HStack>
      )}
      {data?.state == "UNPROCESSED" && (
        <HStack>
          <Heading fontSize="md">
            Video is not processed. Start processing here:
          </Heading>
          <Button onClick={onProc}>Start processing</Button>
        </HStack>
      )}
      {data?.state == "FAILED" && (
        <>
          <Alert status="error" gap={4}>
            <Heading fontSize="md">Video processing failed. Restart?</Heading>
            <Button onClick={onProc}>Restart processing</Button>
          </Alert>
        </>
      )}
      {data?.state == "PROCESSED" && (
        <Flex justifyContent="center">
          <VideoPlayer
            src={`/api/stream/${data?.folderName}/${data?.fileName}.m3u8`}
          />
        </Flex>
      )}
      {data && (
        <Box mt={10}>
          <Box textAlign="end">
            <Text fontStyle="italic" color={mutedColor}>
              Uploaded at: {data?.createdAt.toLocaleDateString("hu-HU")}
            </Text>
            <Text fontStyle="italic" color={mutedColor} mb={6}>
              Original date: {data?.originalDate.toLocaleDateString("hu-HU")}
            </Text>
          </Box>
          <ReactMarkdown
            components={RemarkUIRenderer()}
            children={data?.descMarkdown}
            skipHtml
          />
        </Box>
      )}
    </Layout>
  );
};
