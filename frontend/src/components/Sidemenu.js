import { Box, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { useHistory } from "react-router-dom";

const Sidemenu = ({ fetchAgain }) => {

  const { notification } = ChatState();

  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  return (
    <Box
      d={{ base: "none", lg: "flex"  }}
      flexDir="column"
      alignItems="center"
      justifyContent="space-between"
      bg="white"
      w={{ lg: "15%" }}
      borderWidth="1px"
    >
      <Box
          d="flex"
          w="100%"
          justifyContent="flex-start"
          alignItems="flex-start"
      >
        <Box
          marginTop="20px"
          p="8px"
          fontSize={{ base: "20px" }}
          fontFamily="Poppins"
          d="flex"
          w="80%"
          justifyContent="space-between"
          bgGradient='linear(#FD749B 0%, #281AC8 100%)'
          borderRightRadius="20px"
        >
          <Text color="white" fontWeight="bold" fontSize={{ base: "12px" }}>
            My Chats 
          </Text>
          <Box 
            fontSize="12px"
            fontWeight="bold"
            backgroundColor="white" 
            borderRadius="100px" 
            paddingLeft="3px" 
            paddingRight="3px"
          >
            {notification.length}
          </Box>
        </Box>
      </Box>
      <Button  colorScheme="pink" variant="ghost" onClick={logoutHandler}>
        <Text color="#858585" fontSize={{ base: "12px" }} >Logout</Text>
      </Button>
    </Box>
  );
};

export default Sidemenu;
