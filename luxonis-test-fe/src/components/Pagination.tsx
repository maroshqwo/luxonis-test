import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React, { FC, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export type PaginationProps = {
    /* insert props */
  }

export const Pagination: FC<PaginationProps> = (props) => {
  const [propertiesCount, setPropertiesCount] = React.useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();
  const [pagination, setPagination] = React.useState<any[]>();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/propertiesCount`)
      .then((response) => response.json())
      .then((data) => setPropertiesCount(data));
  }, []);

  useEffect(() => {
    const lastPage = Math.ceil(propertiesCount / 24);
    const currentPage = parseInt(location.pathname.split("/")[1]) || 1;
    var pages = [];
    if (currentPage === 1 || currentPage === 2) {
      pages = [1, 2, 3, 0, lastPage];
    } else if (currentPage === lastPage || currentPage === lastPage - 1) {
      pages = [1, 0, lastPage - 2, lastPage - 1, lastPage];
    } else if (currentPage === 3) {
      pages = [1, 2, 3, 4, 0, lastPage];
    } else if (currentPage === lastPage - 2) {
      pages = [1, 0, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
    } else {
      pages = [1, 0, currentPage - 1, currentPage, currentPage + 1, 0, lastPage];
    }
    console.log(pages);
    setPagination(pages);

  }, [location, propertiesCount]);


  return (
    <Box>
      <VStack>
      <HStack marginInlineStart={"2px"}>
        {pagination?.map((page) => (
          page =! NaN &&
          page != 0 ? (
            <Button
            key={page}
            variant="ghost"
            colorScheme="teal"
            size="sm"
            className={page === (parseInt(location.pathname.split("/")[1]) || 1) ? "active" : ""}
            onClick={() => {
              if (page !== 0) {
                 window.scrollTo(0,0)
                 navigate(`/${page.key}`);
              }
            }}
          >
            {page}
          </Button>
          ) : (
            <Text key={Math.ceil(Math.random()*10000)} fontSize="sm" color="gray.500" marginInlineStart={"2px"} marginInlineEnd={"2px"}>
              ...
            </Text>
          )
          ))}
      </HStack>
      </VStack>
    </Box>
  );
};


export default Pagination;