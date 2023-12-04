import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type Props = {
  fieldName: string;
  fieldTitle?: string;
  helper?: JSX.Element;
  defaultValue?: string;
  validationOptions?: {
    required?: boolean;
    setValueAs?: (value: unknown) => unknown;
  };
};

export const DatetimeField = ({
  fieldTitle,
  fieldName,
  helper,
  defaultValue,
  validationOptions: { required, setValueAs } = {},
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isRequired={required} isInvalid={!!errors[fieldName]}>
      {fieldTitle && <FormLabel htmlFor={fieldName}>{fieldTitle}</FormLabel>}
      <Input
        id={fieldName}
        type="datetime-local"
        {...register(fieldName, {
          required: required ? "Required field" : false,
          setValueAs,
        })}
        defaultValue={defaultValue}
      />
      {errors?.[fieldName] ? (
        <FormErrorMessage>
          {errors[fieldName]?.message?.toString()}
        </FormErrorMessage>
      ) : (
        helper && <FormHelperText>{helper}</FormHelperText>
      )}
    </FormControl>
  );
};
