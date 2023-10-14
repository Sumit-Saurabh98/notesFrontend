import React, { useState } from "react";
import "../style/accountpage.css";
import {
  FormLabel,
  Input,
  Heading,
  Checkbox,
  Button,
  ButtonGroup,
  InputGroup,
  InputRightElement,
  Box,
  Link,
  Text,
  FormControl,
  Icon,
  useToast
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios"

 const Signup = () => {
    const toast = useToast()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async (e) => {
  e.preventDefault();
  const userData = { email, password };
  console.log(userData);
  try {
    setLoading(true)
    await axios.post(`${process.env.REACT_APP_BASE_URL}/user/register`, userData)
    .then(()=>{
    setLoading(false)
    setEmail("")
    setPassword("")
    toast({
          title: "Account created",
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        navigate("/")
    })
    
  } catch (error) {
    setLoading(false)
    setEmail("")
    setPassword("")
    toast({
          title: 'Email is already registered',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
  }
};


  return (
    <Box bg="#262626" w="100vw" h="100vh" display="flex" justifyContent="center">
      <Box
        w={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }}
        p={{ base: "25px" }}
      >
        <Heading fontWeight="600" fontSize="32px" color={"white"} textAlign="center">
          Create a new Account
        </Heading>
        <br />
        <form onSubmit={handleSubmit} style={{ color: "white" }}>
          <FormControl>
            <FormLabel mb={"5px"}> Email </FormLabel>
            <Input
            id="email"
              mb={"10px"}
              type="email"
              placeholder="Email"
              focusBorderColor="yellow.600"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <br />

            <FormLabel mb={"5px"}> Password </FormLabel>
            <InputGroup size="md">
              <Input
              id="password"
                type={show ? "text" : "password"}
                placeholder="Password"
                focusBorderColor="yellow.600"
                required
                value={password}
              onChange={(e)=>setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  colorScheme="yellow"
                  onClick={handleClick}
                >
                  {show ? <Icon as={FiEye}/> : <Icon as={FiEyeOff}/>}
                </Button>
              </InputRightElement>
            </InputGroup>

            <br />
            <br />
            <Box
              className="item_display_corner"
              mb={"10px"}
              fontSize={{ base: "sm", sm: "md" }}
            >
              <div>
                <Checkbox
                id="rememberMe"
                  colorScheme="yellow"
                  fontSize={{ base: "sm", sm: "md" }}
                >
                  Remember Me
                </Checkbox>
              </div>
            </Box>

            <Box className="item_center" my={"10px"}>
              <Text className="small_font" color={"grey"}>
                I accept the Specialized
                <Link className="hover_text_color">Terms of Use</Link> and
                acknowledge Specialized will use my information in accordance
                with its{" "}
                <a
                  href="https://www.specialized.com/sg/en/privacy-policy"
                  className="hover_text_color"
                >
                  Privacy Policy.
                </a>
              </Text>
            </Box>
            <br />
            <ButtonGroup variant="outline" width="100%">
              <Button type="submit" className="btn" colorScheme="yellow">
                {loading ? "creating..." : "Create Account"}
              </Button>
            </ButtonGroup>

            <br />
            <br />
            <ButtonGroup variant="outline" width="100%">
              <Button onClick={()=>navigate("/")} className="btn" colorScheme="yellow">
                Already have an Account
              </Button>
            </ButtonGroup>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
}

export default Signup;