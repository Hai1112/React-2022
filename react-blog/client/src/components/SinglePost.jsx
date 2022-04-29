import styled from "styled-components";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, deletePost } from "../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

const Container = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 8px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const UploadWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: all 0.3s ease-in;
  &:hover {
    opacity: ${(props) => props.opa};
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 4px;
  overflow: hidden;
`;

const FileUpload = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  position: absolute;
  bottom: 0;
  left: 8px;
  width: 100px;
  height: 60px;
  display: ${(props) => props.display};
  align-items: flex-end;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const TitleInput = styled.input`
  font-family: "Varela", sans-serif;
  color: gray;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  border: none;
  border-bottom: 1px solid lightgrey;
  outline: none;
  padding: 10px;
`;

const Title = styled.h1`
  font-family: "Varela", sans-serif;
  text-align: center;
  margin-bottom: 10px;
`;

const Action = styled.div`
  display: flex;
  float: right;
`;
const Icon = styled.div`
  margin-left: 12px;
  cursor: pointer;
  &:first-child {
    color: teal;
  }
  &:last-child {
    color: tomato;
  }
`;

const Create = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  padding: 0 6px;
  font-family: "Lora", serif;
  color: #f9a825;
  position: relative;
`;

const Categories = styled.div`
  display: flex;
`;

const CategoryLabel = styled.label``;

const List = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-left: 10px;
`;

const Time = styled.p`
  position: ${(props) => props.pos};
  left: 50%;
  transform: translateX(-50%);
`;

const Description = styled.p`
  padding: 0 30px;
  font-size: 14px;
  line-height: 24px;
  font-family: "Varela Round", sans-serif;
  text-align: justify;
  color: #444;
  white-space: pre-line;
  &::first-letter {
    font-size: 30px;
    font-weight: bold;
    font-family: "Lora", serif;
    margin-left: 30px;
    text-transform: uppercase;
  }
`;

const DescTextArea = styled.textarea`
  font-size: 14px;
  line-height: 24px;
  font-family: "Varela Round", sans-serif;
  text-align: justify;
  color: #444;
  border: none;
  outline: none;
  min-height: 60vh;
`;

const SinglePost = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [post, setPost] = useState({});
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [updateMode, setUpdateMode] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [file, setFile] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`http://localhost:5000/api/posts/find/${id}`);
      setPost(res.data);
      setTitle(res.data.title);
      setContent(res.data.content);
    };
    getPost();
  }, [id]);

  const handleDelete = async () => {
    deletePost(dispatch, id);
    navigate("/");
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateMode(false);
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
          const post = { title, content, image: downloadURL };
          updatePost(post, dispatch, id);
        });
      }
    );
  };

  return (
    <Container>
      <ImageWrapper>
        {post.image && (
          <Image
            src={previewImage ? previewImage.preview : post.image}
            alt=""
          />
        )}
        {updateMode && (
          <UploadWrapper opa={user ? 1 : 0}>
            <FileUpload type="file" id="file" onChange={handleFile} />
            <UploadLabel htmlFor="file" display={user ? "flex" : "none"}>
              <DriveFolderUploadIcon
                sx={{ color: "#fbc02d", width: "40px", height: "40px" }}
              />
            </UploadLabel>
          </UploadWrapper>
        )}
      </ImageWrapper>
      <Content>
        {updateMode ? (
          <TitleInput
            type="text"
            defaultValue={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <Title>{title}</Title>
        )}
        <Create>
          <Categories>
            <CategoryLabel>Categories: </CategoryLabel>
            <List>
              <ListItem>Music</ListItem>
              <ListItem>Study</ListItem>
            </List>
          </Categories>
          <Time pos={user && "absolute"}>
            {new Date(post.createdAt).toDateString()}
          </Time>
          {user && (
            <Action>
              <Icon>
                <DriveFileRenameOutlineIcon
                  onClick={() => setUpdateMode(true)}
                />
              </Icon>
              <Icon>
                <DeleteIcon onClick={handleDelete} />
              </Icon>
            </Action>
          )}
        </Create>
        {updateMode ? (
          <DescTextArea
            defaultValue={post.content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <Description>{content}</Description>
        )}
        {updateMode && (
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              width: "100px",
              alignSelf: "flex-end",
              marginTop: "20px",
              backgroundColor: "teal",
            }}
            onClick={handleUpdate}
          >
            Update
          </Button>
        )}
      </Content>
    </Container>
  );
};

export default SinglePost;
