import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deletePost } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  display: ${(props) => props.display};
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(227, 242, 253, 0.85);
  border-radius: 8px;
  ${mobile({ width: "80%" })}
`;

const Title = styled.h1`
  font-family: "Varela", sans-serif;
`;

const Desc = styled.p`
  font-family: "Josefin Sans", sans-serif;
  font-size: 20px;
  margin: 30px 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const ConfirmModal = ({ open, setOpen, id, dispatch }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    deletePost(dispatch, id);
    navigate("/");
  };

  return (
    <Container display={open ? "flex" : "none"}>
      <Wrapper>
        <Title>Delete?</Title>
        <Desc>Are you sure to delete this post?</Desc>
        <ButtonWrapper>
          <Button
            variant="contained"
            onClick={handleDelete}
            sx={{ margin: "0 12px", backgroundColor: "lightcoral" }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            sx={{ margin: "0 12px" }}
            onClick={() => setOpen(false)}
          >
            No
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
};

export default ConfirmModal;
