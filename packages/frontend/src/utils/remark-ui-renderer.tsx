import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import {
  Link as ChakraLink,
  LinkProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ReactNode } from "react";

type Props = {
  isExternal?: boolean;
  to: string;
} & LinkProps;

export const RLink = ({ isExternal, to, children, ...props }: Props) => {
  const color = useColorModeValue("blue.500", "blue.200");
  const Component = (
    <ChakraLink as="span" color={color} {...props}>
      {children}
    </ChakraLink>
  );

  return isExternal ? (
    <a href={to} target="_blank" rel="noreferrer">
      {Component}
    </a>
  ) : (
    <RouterLink to={to}>{Component}</RouterLink>
  );
};

const sliceHref = (href: string, pattern: string): string => {
  if (href.indexOf(pattern) === 0) {
    return href.slice(pattern.length, href.length);
  }
  return href;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const remarkTheme: any = {
  a: (props: { href: string; children: ReactNode }) => {
    const { href, children } = props;
    let slicedHref = href;
    slicedHref = sliceHref(slicedHref, "https://bsstudio.hu");
    slicedHref = sliceHref(slicedHref, "bsstudio.hu");
    if (slicedHref.length === 0) slicedHref = "/";
    const isInternal = slicedHref.startsWith("/");
    return (
      <RLink isExternal={!isInternal} to={slicedHref}>
        {children}
      </RLink>
    );
  },
};

export const RemarkUIRenderer = () => ChakraUIRenderer(remarkTheme);
