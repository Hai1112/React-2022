import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import Sidebar from "../components/Sidebar";
import SendIcon from "@mui/icons-material/Send";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { logout, updateUser } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
`;

const SettingWrapper = styled.div`
  flex: 3;
  padding: 20px;
`;

const SettingTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 20px;
`;

const SettingUpdate = styled.p`
  font-size: 30px;
  color: #00b0ff;
  font-family: "Varela", sans-serif;
`;

const Form = styled.form`
  display: flex;
  padding: 0 40px;
  ${mobile({ flexDirection: "column", padding: "0 10px" })}
`;

const UpdatePicture = styled.div`
  flex: 1;
  display: flex;
  margin: 10px 0;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
  ${mobile({ marginRight: 0 })}
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
`;

const IconLabel = styled.label``;

const UpdateInput = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

const FileInput = styled.input`
  display: none;
`;
const Label = styled.label`
  font-size: 20px;
  font-family: "Josefin Sans", sans-serif;
  margin-top: 20px;
`;

const Input = styled.input`
  margin-top: 10px;
  height: 30px;
  border: none;
  border-bottom: 1px solid lightgrey;
  outline: none;
  font-size: 16px;
  font-family: "Josefin Sans", sans-serif;
`;

const Setting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const id = user?._id;
  const [file, setFile] = useState();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [previewImage, setPreviewImage] = useState();

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
    if (file) {
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
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
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
            const newInfo = {
              username: username === "" ? user.username : username,
              email: email === "" ? user.email : email,
              password: password === "" ? user.password : password,
              avatar: downloadURL,
            };
            updateUser(dispatch, newInfo, id);
          });
        }
      );
    } else {
      const newInfo = {
        username: username === "" ? user.username : username,
        email: email === "" ? user.email : email,
        password: password === "" ? user.password : password,
      };
      updateUser(dispatch, newInfo, id);
    }
    setTimeout(() => {
      logout(dispatch);
      navigate("/login");
    }, 3000);
  };
  return (
    <>
      <Navbar />
      <Container>
        <SettingWrapper>
          <SettingTitle>
            <SettingUpdate>Update account</SettingUpdate>
          </SettingTitle>
          <Form>
            <UpdatePicture>
              <Image
                src={previewImage ? previewImage.preview : user?.avatar}
                alt=""
              />
              <FileInput type="file" id="fileInput" onChange={handleFile} />
              <IconLabel htmlFor="fileInput">
                <AccountCircleIcon
                  sx={{ width: "30px", height: "30px", color: "teal" }}
                />
              </IconLabel>
            </UpdatePicture>
            <UpdateInput>
              <Label>Username</Label>
              <Input
                type="text"
                name="name"
                defaultValue={user.username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Label>Email</Label>
              <Input
                type="text"
                name="email"
                defaultValue={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleUpdate}
                sx={{
                  alignSelf: "center",
                  padding: "10px 30px",
                  marginTop: "40px",
                }}
              >
                Update
              </Button>
            </UpdateInput>
          </Form>
        </SettingWrapper>
        <Sidebar />
      </Container>
    </>
  );
};

export default Setting;
