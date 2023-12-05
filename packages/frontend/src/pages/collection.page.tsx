import { CollectionApi } from "@/api/collection.api";
import { AddVideoModal } from "@/components/add-video-modal";
import { SimpleAlert } from "@/components/simple-alert";
import { VideoCard } from "@/components/video-card";
import { RemarkUIRenderer } from "@/utils/remark-ui-renderer";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Layout from "../components/layout";

export const CollectionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, error, data } = useQuery(["collection", id!], () =>
    CollectionApi.getInstance().getCollection(id!),
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          title="Error loading collection."
        />
      )}
      <Heading mb={4}>{data?.title}</Heading>
      <HStack justifyContent="end" mb={3}>
        <Button variant="outline" leftIcon={<FaPlus />} onClick={onOpen}>
          Add Videos
        </Button>
      </HStack>
      <Box>
        <ReactMarkdown
          components={RemarkUIRenderer()}
          children={data?.descMarkdown}
          skipHtml
        />
      </Box>
      <Flex
        py={3}
        overflowX="auto"
        flexWrap="nowrap"
        w="full"
        alignItems="stretch"
        mt={4}
      >
        {data?.vods?.length
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
      <AddVideoModal
        isOpen={isOpen}
        collectionId={id!}
        onClose={onClose}
        alreadySelectedIds={data?.vods?.map((v) => v.id) ?? []}
      />
    </Layout>
  );
};
