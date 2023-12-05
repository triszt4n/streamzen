import { useAuthContext } from "@/api/contexts/use-auth-context";
import { CreateLiveDto } from "@/api/types";
import { VideoApi } from "@/api/video.api";
import { DatetimeField } from "@/components/datetime-field";
import Layout from "@/components/layout";
import { RemarkEditor } from "@/components/remark-editor";
import { SimpleAlert } from "@/components/simple-alert";
import { TextField } from "@/components/text-field";
import { queryClient } from "@/main";
import {
  Button,
  Flex,
  FormLabel,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FaCheck, FaChevronLeft } from "react-icons/fa";
import { useMutation } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";

export const NewLivePage: React.FC = () => {
  // const { data } = useQuery("streamKeys", () =>
  //   VideoApi.getInstance().getStreamKeys(),
  // );
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const methods = useForm<CreateLiveDto>({
    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isValid },
    register,
  } = methods;

  const mutation = useMutation(VideoApi.getInstance().createLive, {
    onSuccess: () => {
      queryClient.invalidateQueries("videos");
      navigate("/");
    },
  });

  const onSubmit: SubmitHandler<CreateLiveDto> = (dto) => {
    console.log(dto);
    mutation.mutate(dto);
  };

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/"
        state={{ alert: "Please log in to start live streams." }}
      />
    );
  }

  return (
    <Layout>
      {!!mutation.error && (
        <SimpleAlert
          desc={(mutation.error as Error).message}
          status="error"
          title="Error confirming live stream."
        />
      )}
      <Heading mb={8}>Starting a live stream</Heading>
      <FormProvider {...methods}>
        <VStack
          align="stretch"
          spacing={8}
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            validationOptions={{
              maxLength: 64,
              minLength: 3,
              required: true,
            }}
            fieldName="title"
            fieldTitle="Title"
            helper={<>The title of your video</>}
          />
          <DatetimeField
            validationOptions={{
              required: true,
            }}
            fieldName="airDate"
            fieldTitle="Air date"
            helper={
              <>The airing date and time when the video will be available.</>
            }
          />
          <RemarkEditor
            formDetails={{
              id: "descMarkdown",
              promptText: "Add a description to your video.",
              maxChar: 1000,
            }}
          />
          {/* <TextField
            validationOptions={{
              maxLength: 20,
              minLength: 3,
              required: true,
              pattern: {
                value: /^[a-z0-9-]+$/,
                message: "Invalid stream key",
              },
              validate: (value) => !data?.includes(value) || "Stream key taken",
            }}
            defaultValue={new ReRegExp(/^[a-z0-9-]{16}$/).build()}
            fieldName="localRtmpStreamKey"
            fieldTitle="Stream key"
            helper={
              <>Stream key (randomized) for your RTMP streamer endpoint.</>
            }
          /> */}
          <FormLabel htmlFor="liveType">Type of live stream</FormLabel>
          <Stack
            as={RadioGroup}
            {...register("liveType")}
            defaultValue="EMBED_YOUTUBE"
          >
            <Radio value="EMBED_YOUTUBE">Embedded: YouTube</Radio>
            <Radio value="EMBED_TWITCH">Embedded: Twitch</Radio>
          </Stack>

          <FormLabel htmlFor="state">Status of the live</FormLabel>
          <Stack as={RadioGroup} {...register("state")} defaultValue="ON_AIR">
            <Radio value="PREMIERE">Premiere</Radio>
            <Radio value="ON_AIR">On air</Radio>
            <Radio value="OFF_AIR">Off air</Radio>
          </Stack>

          <TextField
            validationOptions={{
              required: true,
            }}
            fieldName="embedUrl"
            fieldTitle="Embedded URL"
            helper={<>URL of the embedded live stream.</>}
          />
          <Flex justifyContent="space-between" flexWrap="wrap">
            <Button
              variant="outline"
              leftIcon={<FaChevronLeft />}
              onClick={() => navigate(-1)}
              type="button"
            >
              Back
            </Button>
            <Button
              disabled={!isValid}
              rightIcon={<FaCheck />}
              isLoading={mutation.isLoading}
              type="submit"
            >
              Save
            </Button>
          </Flex>
        </VStack>
      </FormProvider>
    </Layout>
  );
};
