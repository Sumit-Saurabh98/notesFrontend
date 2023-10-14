import React, { useContext } from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import logo from "../logo/logo.png";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import CreateNotes from "./CreateNotes";

const Navbar = () => {
    const navigate = useNavigate()
    const {auth, setAuth} = useContext(AuthContext)

    const handleLogout = ()=>{
        setAuth(false)
        navigate("/")
    }
  return (
    <Box
      h="8vh"
      w="100vw"
      backgroundColor={"#000000"}
      display="flex"
      alignItems="center"
      gap="2%"
      justifyContent="space-between"
      padding="0 30px"
    >
      <Box w="70px">
        <Image  src={logo} />
      </Box>
      <Box display="flex" columnGap="20px">
        <CreateNotes/>
        <Text
          fontSize="xl"
          color="#888888"
          _hover={{ color: "gold", cursor: "pointer" }}
        >
          {auth ? <span onClick={handleLogout}>Log out</span> : <span>Log in</span> }
        </Text>
      </Box>
    </Box>
  );
};

export default Navbar;
