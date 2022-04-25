import { Button } from "@mui/material";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRef, useContext } from "react";
import { Context } from "../context/Context.js";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

const Container = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url(/images/Login.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const LoginWrapper = styled.div`
  width: 20%;
  background-color: rgba(227, 242, 253, 0.8);
  padding: 20px;
  border-radius: 6px;
`;

const Title = styled.h1`
  margin-bottom: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 10px 0;
  font-family: "Josefin Sans", sans-serif;
`;
const Input = styled.input`
  padding: 10px;
  margin-bottom: 16px;
  outline: none;
  border: 1px solid lightgrey;
  border-radius: 4px;
`;

// const StyledLink = styled(Link)`
//   color: inherit;
//   text-decoration: none;
// `;

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  console.log(user);
  return (
    <>
      <Navbar />
      <Container>
        <LoginWrapper>
          <Title>Login</Title>
          <Form onSubmit={handleSubmit}>
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              ref={userRef}
            />
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              ref={passwordRef}
            />
            <Button variant="contained" type="submit" disabled={isFetching}>
              Login
            </Button>
          </Form>
        </LoginWrapper>
        {/* <StyledLink to="/register">
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              top: "20px",
              right: "20px",
              backgroundColor: "#4db6ac",
            }}
          >
            Register
          </Button>
        </StyledLink> */}
      </Container>
    </>
  );
};

export default Login;
