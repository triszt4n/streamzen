import { Box, Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { Helmet } from "react-helmet-async";

const Head: React.FC = () => {
  return (
    <Helmet>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <title>BSStreaming</title>
    </Helmet>
  );
};

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head />
      <Flex direction="column" minHeight="100vh">
        <Navbar />
        <Box flex={1} pb={24}>
          <Flex
            flexDirection="column"
            px={4}
            py={4}
            mx="auto"
            maxWidth={["100%", "48rem", "48rem", "64rem"]}
          >
            {children}
          </Flex>
        </Box>
        <Footer />
      </Flex>
    </>
  );
};

export default Layout;
