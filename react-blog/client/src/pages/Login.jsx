import { Button } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls.js";

const Container = styled.div`
  height: 100vh;
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

const Error = styled.p`
  color: red;
  margin: 12px 0;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  const handleLogin = () => {
    login(dispatch, { username: username, password: password });
  };

  return (
    <Container>
      <LoginWrapper>
        <Title>Login</Title>
        <Form>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Error>Wrong username or password</Error>}
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </Form>
      </LoginWrapper>
    </Container>
  );
};

export default Login;
