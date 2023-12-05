import { CollectionApi } from "@/api/collection.api";
import { useAuthContext } from "@/api/contexts/use-auth-context";
import { VideoApi } from "@/api/video.api";
import { queryClient } from "@/main";
import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";

type Props = {
  collectionId: string;
  alreadySelectedIds: number[];
  isOpen: boolean;
  onClose: () => void;
};

export const AddVideoModal = ({
  collectionId,
  alreadySelectedIds,
  isOpen,
  onClose,
}: Props) => {
  const { loggedInUser } = useAuthContext();
  const mutation = useMutation(
    (ids: number[]) => CollectionApi.getInstance().bulkAdd(collectionId, ids),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["collection", collectionId]);
      },
    },
  );
  const { data, /* error, */ isLoading } = useQuery("vods", async () => {
    const vodList = await VideoApi.getInstance().getVodList();
    return vodList.filter(({ id }) => !alreadySelectedIds.includes(id));
  });
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const onSubmit = () => {
    mutation.mutate(selectedIds);
    onClose();
  };

  if (!loggedInUser) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You are not logged in!</ModalHeader>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add videos to collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            {isLoading && <div>Loading videos...</div>}
            {data?.length &&
              data.map((vod) => (
                <Checkbox
                  key={vod.id}
                  onChange={(e) => {
                    const newSelectedIds = [...selectedIds];
                    if (e.target.checked) newSelectedIds.push(vod.id);
                    setSelectedIds(newSelectedIds);
                  }}
                >
                  {vod.title}
                </Checkbox>
              ))}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            colorScheme="theme"
            mr={3}
            onClick={onClose}
            type="button"
          >
            Cancel
          </Button>
          <Spacer />
          <Button
            rightIcon={<FaCheckCircle />}
            isLoading={mutation.isLoading}
            onClick={onSubmit}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
