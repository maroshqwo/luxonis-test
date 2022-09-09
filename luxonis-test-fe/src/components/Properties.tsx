import { Box, Flex, Wrap } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Property } from "../types";
import PropertyAd from "./PropertyAd";

export type PropertiesProps = {
    /* insert props */
  }

export const Properties: FC<PropertiesProps> = (props) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const location = useLocation();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/properties${location.pathname === "/" ? "/1" : location.pathname}`)
      .then((response) => response.json())
      .then((data) => setProperties(data));
  }, [location]);


  return (
    <Wrap w={["90%","92%","94%", "86%", "88%", "1200px"]} justify={"space-around"}>
      {properties.map((property) => (
        <PropertyAd key={property.id} property={property} />
      ))}
    </Wrap>
  );
};


export default Properties;