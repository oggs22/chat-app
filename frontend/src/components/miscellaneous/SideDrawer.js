import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { BellIcon, WarningIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import { ChatState } from "../../Context/ChatProvider";
import ComplaintModal from "./complaintModal";

function SideDrawer() {

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
  } = ChatState();

  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  return (
    <>
      <Box
        d="flex"
        alignItems="center"
        justifyContent="flex-end"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="1px"
      >
        
        <Box
          d="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <ComplaintModal>
            <Button
              d="flex"
            >
              <WarningIcon fontSize="2xl" m={1} />
            </Button>
          </ComplaintModal>

          <Box
            marginLeft="15px"
            d={{ base: "none", lg: "flex"  }} 
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              size="sm"
              cursor="pointer"
              name={user.name}
              src={user.pic}
            />

            <Text
              color="#858585"
              fontSize={{ base: "12px" }}
              fontFamily="Poppins"
              fontWeight={{base:"bold"}}
              paddingRight="30px"
              paddingLeft="10px"
            >
              {user.name}
            </Text>
          </Box>
          
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {`New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Button
            fontSize={{base: "12px"}}
            d={{ base: "flex", lg: "none"  }}
            variant="ghost"
            colorScheme="pink"
            color="#858585"
            onClick={logoutHandler}>
            Logout
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default SideDrawer;
