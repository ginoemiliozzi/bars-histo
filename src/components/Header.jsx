import React from "react";
import { Flex, Heading } from "@chakra-ui/core";

const Header = () => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mb={5}
    >
      <Heading color="green.500">Barshisto</Heading>
      <Heading as="h2" size="xs">
        Dynamic historical graph bar
      </Heading>
    </Flex>
  );
};

export default Header;
