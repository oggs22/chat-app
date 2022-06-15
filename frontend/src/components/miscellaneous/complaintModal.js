import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Input,
    useToast,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";

const ComplaintModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);
    const [description, setDescription] = useState();

    const { user } = ChatState();

    const handleSubmit = async () => {

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      setPicLoading(true);
      if (!description) {
        toast({
          title: "Please fill description field",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setPicLoading(false);
        return;
      }

      try {
          const config = {
              headers: {
              Authorization: `Bearer ${user.token}`,
              },
          };
          await axios.post(
              `/api/complaint`,
              {
                  sender: userInfo._id,
                  description,
                  pic
              },
              config
          );
          onClose();
          toast({
              title: "Complaint registered successfully!",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom",
          });
          setPicLoading(false);
      } catch (error) {
          toast({
              title: "Failed to register complaint!",
              description: error.response.data,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
          });
          setPicLoading(false);
      }
    };

    const postDetails = (pics) => {
      setPicLoading(true);
      if (pics === undefined) {
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "dnhjao2mj");
        fetch("https://api.cloudinary.com/v1_1/dnhjao2mj/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setPic(data.url.toString());
            console.log(data.url.toString());
            setPicLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setPicLoading(false);
          });
      } else {
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setPicLoading(false);
        return;
      }
    };

    return (
      <>
        <span onClick={onOpen}>{children}</span>

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
                fontSize="20px"
                fontFamily="Poppins"
                d="flex"
                justifyContent="center"
            >
                Complaint Form
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                placeholder="Enter a description"
                onChange={(e) => setDescription(e.target.value)}
                />
            </FormControl>
            <FormControl id="pic">
                <FormLabel>Upload your Picture</FormLabel>
                    <Input
                        type="file"
                        p={1.5}
                        accept="image/*"
                        onChange={(e) => postDetails(e.target.files[0])}
                    />
            </FormControl>
            
            </ModalBody>
            <ModalFooter>
            <Button
                colorScheme="pink"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={handleSubmit}
                isLoading={picLoading}
            >
                Send complaint
            </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
};

export default ComplaintModal;
  