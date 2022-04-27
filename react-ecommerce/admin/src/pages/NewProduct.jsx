import styled from "styled-components";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { Button } from "@mui/material";

const Container = styled.div``;

const Bottom = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 5;
  padding: 20px;
`;

const Title = styled.h1``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const FormInputContainer = styled.div`
  display: flex;
`;

const ImageUploadContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
`;

const ImageUpload = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  border: 0.5px solid lightgray;
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  color: #fdd835;
`;

const InputContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const InputItem = styled.div`
  flex: 1;
  width: 40%;
  margin: 20px 20px 0px 0px;
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 1px solid lightgray;
  outline: none;
`;

const Select = styled.select`
  padding: 10px;
  outline: none;
`;

const Option = styled.option``;

const NewProduct = () => {
  return (
    <Container>
      <TopBar />
      <Bottom>
        <Sidebar />
        <Main>
          <Title>New Product</Title>
          <Form>
            <FormInputContainer>
              <ImageUploadContainer>
                <ImageUpload src="/images/Ayaka.jpg" alt="" />
                <UploadInput type="file" id="file" />
                <UploadLabel htmlFor="file">
                  <DriveFolderUploadIcon
                    sx={{ width: "40px", height: "40px" }}
                  />
                </UploadLabel>
              </ImageUploadContainer>
              <InputContainer>
                <InputItem>
                  <InputLabel>Product Name</InputLabel>
                  <Input type="text" />
                </InputItem>
                <InputItem>
                  <InputLabel>Stock</InputLabel>
                  <Input type="text" />
                </InputItem>
                <InputItem>
                  <InputLabel>Active</InputLabel>
                  <Select name="active" id="active">
                    <Option value="yes">Yes</Option>
                    <Option value="no">No</Option>
                  </Select>
                </InputItem>
              </InputContainer>
            </FormInputContainer>
            <Button
              type="summit"
              variant="contained"
              sx={{
                marginTop: "60px",
                width: "150px",
                alignSelf: "center",
                backgroundColor: "teal",
              }}
            >
              CREATE
            </Button>
          </Form>
        </Main>
      </Bottom>
    </Container>
  );
};

export default NewProduct;
