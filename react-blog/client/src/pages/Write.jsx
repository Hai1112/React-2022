import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { addPost } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { mobile } from "../responsive";

const Container = styled.div`
  padding: 50px 0;
  ${mobile({ padding: "10px" })}
`;

const Image = styled.img`
  margin-left: 150px;
  width: 70%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
  ${mobile({ width: "100%", objectFit: "cover", margin: 0 })}
`;

const Form = styled.form`
  position: relative;
`;

const FormGroup = styled.div`
  margin-left: 150px;
  display: flex;
  align-items: center;
  ${mobile({ margin: 0 })}
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
  ${mobile({ width: "80vw", padding: "20px 10px" })}
`;

const CategoryLabel = styled.label`
  padding: 10px 10px 0;
  margin-bottom: 20px;
  font-size: 18px;
  font-family: "Lora", serif;
  color: #666;
`;

const CategoryInput = styled.input`
  padding-top: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  margin-bottom: 20px;
  font-family: "Lora", serif;
  min-width: 25%;
  border-bottom: 1px solid lightgrey;
  ${mobile({ flex: 1, marginRight: "10px" })}
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
  ${mobile({ width: "100%", height: "60vh" })}
`;

const ButtonWrap = styled.div`
  position: absolute;
  top: 20px;
  right: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({
    position: "inherit",
    width: "100vw",
    justifyContent: "flex-start",
    top: 0,
    right: 0,
    marginTop: "12px",
  })}
`;

const Write = () => {
  const [inputs, setInputs] = useState("");
  const [category, setCategory] = useState([]);
  const [file, setFile] = useState();
  const [previewImage, setPreviewImage] = useState();
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCategory = (e) => {
    setCategory(e.target.value.split(","));
  };

  useEffect(() => {
    return () => {
      previewImage && URL.revokeObjectURL(previewImage.preview);
    };
  }, [previewImage]);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    const FILE = e.target.files[0];
    FILE.preview = URL.createObjectURL(FILE);
    setPreviewImage(FILE);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;

          default:
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
          default:
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const post = { ...inputs, image: downloadURL, categories: category };
          addPost(post, dispatch);
        });
      }
    );
  };

  return (
    <>
      <Navbar />
      <Container>
        {previewImage && <Image src={previewImage.preview} alt="" />}
        <Form>
          <FormGroup>
            <Label htmlFor="fileInput">
              <AddIcon sx={{ color: "white" }} />
            </Label>
            <FileUpload type="file" id="fileInput" onChange={handleFile} />
            <Input
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleInput}
            />
          </FormGroup>
          <FormGroup>
            <CategoryLabel>Categories: </CategoryLabel>
            <CategoryInput type="text" onChange={handleCategory} />
          </FormGroup>
          <FormGroup>
            <TextArea
              placeholder="Tell your story..."
              type="text"
              name="content"
              autoFocus={true}
              onChange={handleInput}
            />
          </FormGroup>
          <ButtonWrap>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleCreate}
              sx={{ backgroundColor: "teal" }}
            >
              Publish
            </Button>
          </ButtonWrap>
        </Form>
      </Container>
    </>
  );
};

export default Write;
