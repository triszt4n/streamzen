import { User } from "@/api/types";
import {
  Badge,
  Box,
  HStack,
  Heading,
  Image,
  VStack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  title: string;
  folderName: string;
  path: string;
  state?: string;
  user?: User;
};

export const VideoCard: React.FC<Props> = ({
  title,
  folderName,
  path,
  state,
  user,
}) => {
  const navigate = useNavigate();
  const openVideo = () => {
    navigate(path);
  };
  const getColorSchemeForState = (state: string) => {
    switch (state) {
      case "PROCESSING":
        return "yellow";
      case "PROCESSED":
        return "green";
      case "FAILED":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <VStack
      flex="0 0 auto"
      align="stretch"
      w="15rem"
      h="full"
      p={6}
      cursor="pointer"
      onClick={openVideo}
    >
      <Image
        src={`/api/public/_thumbnails/${folderName}_thumb.png`}
        fallbackSrc="/public/images/placeholder.svg"
        alt={`Video thumbnail: ${title}`}
        borderRadius="lg"
        aspectRatio="600/400"
        objectFit="cover"
      />
      <HStack mt={2} spacing={2}>
        <FaPlay size="0.75rem" />
        <Heading size="sm">{title}</Heading>
      </HStack>
      <Box>
        {state && (
          <Badge colorScheme={getColorSchemeForState(state)}>{state}</Badge>
        )}
        {user && (
          <Text>
            Creator: <Link to={`/users/${user?.id}`}>{user?.fullName}</Link>
          </Text>
        )}
      </Box>
    </VStack>
  );
};
