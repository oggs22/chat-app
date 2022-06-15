import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect } from "react";
import { getSender, getSenderImage } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import { Button, Divider } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { Avatar } from "@chakra-ui/avatar";
import UserChatModal from "./miscellaneous/userChatModal";

const MyChats = ({ fetchAgain }) => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        fontFamily="Poppins"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
           <Box
            d="flex"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
            color="#858585"
            p={3}
            key={user._id}
          >
            <Avatar
              size="sm"
              cursor="pointer"
              name={user.name}
              src={user.pic}
            />
            <Box paddingLeft="15px">
              <Text fontSize="12px" fontWeight="bold">
                {user.name}
              </Text>
              <Text fontSize="12px" >
                Online
              </Text>
            </Box>
          </Box>
      </Box>
      <Divider />
      <Box
        d="flex"
        flexDir="column"
        alignItems="flex-start"
        justifyContent="space-between"
        p={3}
        bg="white"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll" width="100%">
            {chats.map((chat) => (
              <Box
                d="flex"
                width="100%"
                flexDirection="row"
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#DEDEDE" : "#white"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Avatar
                  size="sm"
                  cursor="pointer"
                  name={getSender(user, chat.users)}
                  src={getSenderImage(user, chat.users)}
                />
                <Box d="flex" flexDirection="column" paddingLeft="15px">
                  <Text color="#858585" fontWeight="bold" fontSize="12px">
                    {getSender(user, chat.users)}
                  </Text>
                  {chat.latestMessage && (
                    <Text color="black" fontSize="10px">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
        <Box   
          d="flex"
          flexDirection="row"
          width="100%"
          justifyContent="center">
            <UserChatModal>
              <Button
                d="flex"
                w="150px"
                h="50px"
                bgGradient='linear(#FD749B 0%, #281AC8 100%)'
                borderRadius="20px"
              >
                <Text
                  fontSize={{ base: "14px" }}
                  fontFamily="Poppins"
                  fontWeight="bold"
                  color="white"
                >
                  New Chat
                </Text>
              </Button>
            </UserChatModal>
        </Box>
      </Box>
    </Box>
  );
};

export default MyChats;
