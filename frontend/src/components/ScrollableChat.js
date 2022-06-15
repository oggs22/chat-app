import { Avatar } from "@chakra-ui/avatar";
import { Box } from "@chakra-ui/layout";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />

            )}
            <Box 
              d="flex" 
              flexDirection="column" 
              justifyContent="space-between" 
              width="100%">
              <span style={{
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 10 : 40,
                  fontSize: "10px",
                  color: "#858585",
                }}>
                {m.createdAt.split('T')[0] + " " +  m.createdAt.split('T')[1].split('.')[0]}
              </span>
              <span
                style={{
                  backgroundColor: "#F6F6F6",
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: 10,
                  borderRadius: "15px",
                  padding: "18px",
                  maxWidth: "70%",
                  fontSize: "12px",
                  color: "#858585"
                }}
              >
                {m.content}
              </span>
            </Box>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
