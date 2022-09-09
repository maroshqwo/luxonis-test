import { Box, Heading, VStack } from "@chakra-ui/react";
import React, { FC } from "react";
import Pagination from "../components/Pagination";
import Properties from "../components/Properties";

export type LandingProps = {
    /* insert props */
  }

export const Landing: FC<LandingProps> = (props) => {
  const [count, setCount] = React.useState(0);

  return (
    <VStack minH={"100vh"} justify="space-between" py={4}>
      <Pagination />
      <Properties />
      <Pagination />
    </VStack>
  );
};


export default Landing;