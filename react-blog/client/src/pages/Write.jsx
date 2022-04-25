import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import { Context } from "../context/Context";
import axios from "axios";

const Container = styled.div`
  padding: 50px 0;
`;

const Image = styled.img`
  margin-left: 150px;
  width: 70%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  position: relative;
`;

const FormGroup = styled.div`
  margin-left: 150px;
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0db8b8;
`;

const FileUpload = styled.input`
  display: none;
`;

const Input = styled.input`
  font-size: 30px;
  padding: 20px;
  border: none;
  outline: none;
  color: #666;
  font-family: "Varela", sans-serif;
  width: 70vw;
  &::placeholder {
    color: #ccc;
  }
`;

const TextArea = styled.textarea`
  width: 70vw;
  height: 100vh;
  outline: none;
  border: none;
  color: #666;
  font-family: "Lora", serif;
  font-size: 16px;
  line-height: 24px;
`;

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("http://localhost:5000/api/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <>
      <Navbar />
      <Container>
        {file && <Image src={URL.createObjectURL(file)} />}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="fileInput">
              <AddIcon sx={{ color: "white" }} />
            </Label>
            <FileUpload
              type="file"
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Input
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <TextArea
              placeholder="Tell your story..."
              type="text"
              autoFocus={true}
              onChange={(e) => setDesc(e.target.value)}
            />
          </FormGroup>
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              position: "absolute",
              top: "20px",
              right: "50px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "teal",
            }}
          >
            Publish
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Write;
