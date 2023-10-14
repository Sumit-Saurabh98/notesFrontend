import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  ButtonGroup,
  useToast,
  Input,
  FormLabel,
  Box,
  FormControl,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

function CreateNotes(props) {
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createNotes = async () => {
    const new_notes = { title, description };
    const token = localStorage.getItem("myToken")
    try {
      setLoading(true);
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/notes/create`, new_notes, {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data)
          setLoading(false);
          toast({
            title: "Notes Created",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Notes already Present with title",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNotes();
  };
  return (
    <Box>
      <Text
        color="#888888"
        fontSize="xl"
        _hover={{ color: "gold", cursor: "pointer" }}
        onClick={onOpen}
      >
        Create Notes
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#262626" color="#fff">
          <ModalHeader>Create Notes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit} style={{ color: "white" }}>
              <FormControl>
                <FormLabel mb={"5px"}> Title </FormLabel>
                <Input
                  id="title"
                  mb={"10px"}
                  type="text"
                  placeholder="Email"
                  focusBorderColor="yellow.600"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <br />

                <FormLabel mb={"5px"}> Description </FormLabel>
                <Textarea
                  id="description"
                  placeholder="Enter description"
                  focusBorderColor="yellow.600"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <br/>
                <Box
                  className="item_display_corner"
                  fontSize={{ base: "sm", sm: "md" }}
                ></Box>
                <br/>
                <ButtonGroup variant="outline" width="100%">
                  <Button type="submit" className="btn" colorScheme="yellow">
                    {loading ? "Creating..." : "Create"}
                  </Button>
                </ButtonGroup>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CreateNotes;
