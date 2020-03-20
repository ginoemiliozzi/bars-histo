import React from "react";
import { Flex, Heading, Button } from "@chakra-ui/core";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();
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
      {location.pathname === "/histobars" && (
        <Link to="/">
          <Button mt={3} variant="outline" variantColor="green">
            Use other data
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default Header;
