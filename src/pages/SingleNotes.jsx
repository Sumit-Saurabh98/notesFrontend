import { Box, Button, Container, Heading, Stack, Text, useToast, Textarea } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SingleNotes(props) {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const [notesData, setNotesData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const getSingleNotes = async (id) => {
    try {
      const token = localStorage.getItem("myToken");
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/notes/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotesData(data.singleNotes);
      setEditedTitle(data.singleNotes.title);
      setEditedDescription(data.singleNotes.description);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getSingleNotes(id);
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("myToken");
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/notes/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res);
          toast({
            title: "Notes deleted",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        })
        .then(() => {
          navigate("/notes");
        });
    } catch (error) {
      toast({
        title: "Internal Error",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("myToken");
      await axios.put(`${process.env.REACT_APP_BASE_URL}/notes/update/${id}`, {
        title: editedTitle,
        description: editedDescription
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(()=>{
         toast({
        title: "Note updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      })
      setIsEditing(false);
      })
     .then(()=>{
        navigate("/notes")
     })
    } catch (error) {
      toast({
        title: "Internal Error",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <Box bg="#262626" color="#fff" w="100vw" h="100vh">
      <Heading
        fontWeight="600"
        fontSize="32px"
        color={"white"}
        textAlign="center"
      >
        {isEditing ? (
          <Textarea
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            rows={1}
          />
        ) : (
          notesData.title
        )}
      </Heading>
      <Box my="20px">
        {isEditing ? (
          <Textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        ) : (
          <Text>
            {notesData.description}
          </Text>
        )}
      </Box>
      <Container>
        {isEditing ? (
          <Stack direction='row' spacing={4}>
            <Button
              onClick={handleSave}
              colorScheme='orange'
              variant='solid'
            >
              Save
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              colorScheme='orange'
              variant='solid'
            >
              Cancel
            </Button>
          </Stack>
        ) : (
          <Stack direction='row' spacing={4}>
            <Button
              onClick={handleEdit}
              leftIcon={<GrEdit />}
              colorScheme='orange'
              variant='solid'
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(notesData._id)}
              leftIcon={<MdDelete />}
              colorScheme='orange'
              variant='solid'
            >
              Delete
            </Button>
          </Stack>
        )}
      </Container>
    </Box>
  );
}

export default SingleNotes;
