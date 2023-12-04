import { useAuthContext } from "@/api/contexts/use-auth-context";
import { CreateVodDto } from "@/api/types";
import { VideoApi } from "@/api/video.api";
import { DatetimeField } from "@/components/datetime-field";
import { FileUpload } from "@/components/file-upload";
import Layout from "@/components/layout";
import { RemarkEditor } from "@/components/remark-editor";
import { SimpleAlert } from "@/components/simple-alert";
import { TextField } from "@/components/text-field";
import { queryClient } from "@/main";
import { Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FaCheck, FaChevronLeft, FaUpload } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";

type UploadMutationParams = { file: File; dto: CreateVodDto };
type FormParams = { files: FileList | undefined } & CreateVodDto;

export const NewLivePage: React.FC = () => {
  const { data } = useQuery("folderNames", () =>
    VideoApi.getInstance().getFolderNames(),
  );
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const methods = useForm<FormParams>({
    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isValid },
    setError,
  } = methods;

  const mutation = useMutation(
    ({ file, dto }: UploadMutationParams) =>
      VideoApi.getInstance().uploadVideo(file, dto),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("videos");
        navigate("/");
      },
    },
  );

  const onSubmitFile: SubmitHandler<FormParams> = (values) => {
    const { files, ...dto } = values;
    if (!files) {
      setError("files", {
        type: "custom",
        message: "Please choose a file to upload.",
      });
      return;
    }
    const [fileName, ext] = dto.fileName.split(".");
    mutation.mutate({ file: files[0], dto: { ...dto, fileName, ext } });
  };

  if (!isLoggedIn) {
    return (
      <Navigate to="/" state={{ alert: "Please log in to upload videos." }} />
    );
  }

  return (
    <Layout>
      {!!mutation.error && (
        <SimpleAlert
          desc={(mutation.error as Error).message}
          status="error"
          title="Error confirming upload."
        />
      )}
      <Heading mb={8}>Uploading video as a VoD</Heading>
      <FormProvider {...methods}>
        <VStack
          align="stretch"
          spacing={8}
          as="form"
          onSubmit={handleSubmit(onSubmitFile)}
        >
          <FileUpload
            required
            fieldName="files"
            fieldTitle="Video file"
            buttonIcon={<FaUpload />}
            helper={<>Choose a video to upload.</>}
          />
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
            fieldName="originalDate"
            fieldTitle="Original date"
            helper={<>The original date and time when the video was created.</>}
          />
          <RemarkEditor
            formDetails={{
              id: "descMarkdown",
              promptText: "Add a description to your video.",
              maxChar: 1000,
            }}
          />
          <TextField
            validationOptions={{
              maxLength: 20,
              minLength: 3,
              required: true,
              pattern: {
                value: /^[a-z0-9-]+$/,
                message: "Invalid folder name",
              },
              validate: (value) =>
                !data?.includes(value) || "Folder name exists",
            }}
            fieldName="folderName"
            fieldTitle="Project name"
            helper={<>Name of the project (must be a valid folder name).</>}
          />
          <TextField
            validationOptions={{
              maxLength: 20,
              minLength: 3,
              required: true,
              pattern: {
                value: /^[a-z0-9-]+\.[a-z0-9]+$/,
                message: "Invalid file name",
              },
            }}
            fieldName="fileName"
            fieldTitle="File name"
            helper={<>Rename the uploaded filename.</>}
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
