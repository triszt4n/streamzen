import { CollectionApi } from "@/api/collection.api";
import { useAuthContext } from "@/api/contexts/use-auth-context";
import { CreateCollectionDto } from "@/api/types";
import Layout from "@/components/layout";
import { RemarkEditor } from "@/components/remark-editor";
import { SimpleAlert } from "@/components/simple-alert";
import { TextField } from "@/components/text-field";
import { queryClient } from "@/main";
import { Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FaCheck, FaChevronLeft } from "react-icons/fa";
import { useMutation } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";

export const NewCollectionPage: React.FC = () => {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const methods = useForm<CreateCollectionDto>({
    mode: "all",
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const mutation = useMutation(CollectionApi.getInstance().createCollection, {
    onSuccess: () => {
      queryClient.invalidateQueries("videos");
      navigate("/");
    },
  });

  const onSubmit: SubmitHandler<CreateCollectionDto> = (dto) => {
    mutation.mutate(dto);
  };

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/"
        state={{ alert: "Please log in to create a collection." }}
      />
    );
  }

  return (
    <Layout>
      {!!mutation.error && (
        <SimpleAlert
          desc={(mutation.error as Error).message}
          status="error"
          title="Error confirming creation."
        />
      )}
      <Heading mb={8}>Create a collection</Heading>
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
            helper={<>The title of collection.</>}
          />
          <RemarkEditor
            formDetails={{
              id: "descMarkdown",
              promptText: "Add a description to your collection.",
              maxChar: 1000,
            }}
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
