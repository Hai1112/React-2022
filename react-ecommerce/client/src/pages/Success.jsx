import { Button } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Success = () => {
  return (
    <Container>
      <Button variant="contained">SUCCESS</Button>
    </Container>
  );
};

export default Success;
