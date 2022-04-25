import { Button } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
// import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Container = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url(/images/Register.jpg);
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

const Notify = styled.p`
  color: red;
  margin-bottom: 12px;
  margin-left: 4px;
  /* display: ${(props) => (props.error ? "block" : "none ")}; */
`;

// const StyledLink = styled(Link)`
//   color: inherit;
//   text-decoration: none;
// `;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <>
      <Navbar />
      <Container>
        <LoginWrapper>
          <Title>Register</Title>
          <Form onSubmit={handleSubmit}>
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Label>Email</Label>
            <Input
              type="text"
              name="Email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Notify error={error}>Something when wrong!</Notify>}
            <Button type="submit" variant="contained">
              Register
            </Button>
          </Form>
        </LoginWrapper>
        {/* <StyledLink to="/login">
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              top: "20px",
              right: "20px",
              backgroundColor: "#4db6ac",
            }}
          >
            Login
          </Button>
        </StyledLink> */}
      </Container>
    </>
  );
};

export default Register;
