import { Box, Button, Card, CardFooter, CardHeader, Center, Heading, SimpleGrid} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Notes(props) {
    const navigate = useNavigate()
    const [notes, setNotes] = useState([])
    const getNotes = async()=>{
       try {
         const token = localStorage.getItem("myToken")
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/notes/get`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        setNotes(data.notes);
       } catch (error) {
        console.error(error)
       }
    }

    useEffect(()=>{
        getNotes()
    },[notes])
    return (
       <Box w="100vw" h="100vh">
  <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={4}>
    {notes &&
      notes.map((note) => {
        return (
          <Box key={note._id} p="4" borderWidth="1px" borderRadius="md">
            <Card >
                <Center>
        <CardHeader>
          <Heading size="md">{note.title}</Heading>
        </CardHeader>
         </Center>
         <Center>
        <CardFooter>
          <Button onClick={()=>navigate(`/notes/${note._id}`)}>View Notes</Button>
        </CardFooter>
        </Center>
      </Card>
          </Box>
        );
      })}
  </SimpleGrid>
</Box>
    );
}

export default Notes;