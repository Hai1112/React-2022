import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import Sidebar from "../components/Sidebar";
import SendIcon from "@mui/icons-material/Send";
import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import { Context } from "../context/Context";
import axios from "axios";

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

const SettingDelete = styled.p`
  font-size: 16px;
  font-family: "Valera", sans-serif;
  color: red;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const UpdatePicture = styled.div`
  display: flex;
  margin: 10px 0;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
`;

const IconLabel = styled.label``;

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

const Notify = styled.p`
  color: teal;
  margin-top: 18px;
  text-align: center;
  font-family: "Lora", serif;
`;

const Setting = () => {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/" + user._id,
        updatedUser
      );
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <>
      <Navbar />
      <Container>
        <SettingWrapper>
          <SettingTitle>
            <SettingUpdate>Update account</SettingUpdate>
            <SettingDelete>Delete account</SettingDelete>
          </SettingTitle>
          <Form onSubmit={handleSubmit}>
            <UpdatePicture>
              <Image
                src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                alt=""
              />
              <FileInput
                type="file"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <IconLabel htmlFor="fileInput">
                <AccountCircleIcon
                  sx={{ width: "30px", height: "30px", color: "teal" }}
                />
              </IconLabel>
            </UpdatePicture>
            <Label>Username</Label>
            <Input
              type="text"
              name="name"
              placeholder="Yui"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Label>Email</Label>
            <Input
              type="text"
              name="email"
              placeholder="yui@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {success && <Notify>Profile has been updated...</Notify>}
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              sx={{
                alignSelf: "center",
                padding: "10px 30px",
                marginTop: "20px",
              }}
            >
              Update
            </Button>
          </Form>
        </SettingWrapper>
        <Sidebar />
      </Container>
    </>
  );
};

export default Setting;
