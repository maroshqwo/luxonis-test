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
    if (!propertiesCount) return;
    const fp = 1
    const lp = Math.ceil(propertiesCount / 24);
    const cp = parseInt(location.pathname.split("/")[1]) || 1;
    const pages = [];
    if (lp >= 5) {
    for(let i = fp; i <= lp; i++) {
      if (i === cp || i === cp - 1 || i === cp + 1 || i === fp || i === lp) {
        pages.push(i);
      }
      if (cp === 1 && i === 2) {
        pages.push(3);
        pages.push(4);
      }
      if (cp === 2 && i === 3) {
        pages.push(4);
      }
      if (cp === lp - 1 && i === lp - 3) {
        pages.push(lp - 3);
      }
      if (cp === lp && i === lp - 2) {
        pages.push(lp - 3);
        pages.push(lp - 2);
      }
    }
  } else {
    for(let i = fp; i <= lp; i++) {
      pages.push(i);
    }
  }
    
    setPagination(pages);

  }, [location, propertiesCount]);


  return (
    <Box>
      <VStack>
      <HStack marginInlineStart={"2px"}>
        {pagination?.map((page) => (
          page =! NaN &&
          (
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
          )
          ))}
      </HStack>
      </VStack>
    </Box>
  );
};


export default Pagination;