import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";

type Props = {
  desc: string;
  title?: string;
  status: "error" | "info" | "warning" | "success" | "loading";
};

export const SimpleAlert: React.FC<Props> = ({ desc, title, status }) => {
  const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    isVisible && (
      <Alert status={status} display="flex" mb={4}>
        <AlertIcon />
        <HStack flex={1}>
          {title && <AlertTitle>{title}</AlertTitle>}
          <AlertDescription>{desc}</AlertDescription>
        </HStack>
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={onClose}
        />
      </Alert>
    )
  );
};
