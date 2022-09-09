import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Image, Heading, WrapItem, VStack, IconButton } from "@chakra-ui/react";
import React, { FC } from "react";
import { Image as ImageType, Property } from "../types";

export type PropertyAdProps = {
    property: Property
  }

export const PropertyAd: FC<PropertyAdProps> = (props) => {
  const [selectedImage, setSelectedImage] = React.useState<ImageType>(props.property.images[0] || { url: "" });

  const prevImage = () => {
    const index = props.property.images.indexOf(selectedImage);
    if (index > 0) {
      setSelectedImage(props.property.images[index - 1]);
    } else {
      setSelectedImage(props.property.images[props.property.images.length - 1]);
    }
  };

  const nextImage = () => {
    const index = props.property.images.indexOf(selectedImage);
    if (index < props.property.images.length - 1) {
      setSelectedImage(props.property.images[index + 1]);
    } else {
      setSelectedImage(props.property.images[0]);
    }
  };

  return (
    <WrapItem>
      <VStack my={1} px="32px" py={"16px"} h="250px" w="270px" bgColor="gray.100" flex="6" boxShadow={"1px 1px 8px black"} borderRadius={"10px"}>
        <VStack w="100%" h={"150px"} justify="" position="relative">
          <Box h="100%" w="100%" maxW="234px" maxH={"150px"}>
            <Image w="100%" h="100%" src={`${selectedImage.url}`} alt={"cant be loaded:("} />
          </Box>
          <IconButton variant={"ghost"} size="sm" colorScheme="teal" aria-label="prev" h="100%" position={"absolute"} left="-32px" top="-8px" onClick={() => prevImage()} icon={<ChevronLeftIcon/>}/>
          <IconButton variant={"ghost"} size="sm" colorScheme="teal" aria-label="next" h="100%" position={"absolute"} right="-32px" top="-8px" onClick={() => nextImage()} icon={<ChevronRightIcon />} />
        </VStack>
        <Heading size="md">
        {props.property.name}
        </Heading>
      </VStack>
    </WrapItem>
  );
};


export default PropertyAd;