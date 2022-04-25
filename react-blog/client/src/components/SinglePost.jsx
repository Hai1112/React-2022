import styled from "styled-components";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Container = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 8px;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 4px;
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
`;

const AuthorWrapper = styled.div`
  display: flex;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  margin-left: 8px;
`;

const Author = styled.p`
  font-weight: bold;
  &::first-letter {
    text-transform: uppercase;
  }
`;

const Time = styled.p``;

const Description = styled.p`
  font-size: 14px;
  line-height: 24px;
  font-family: "Varela Round", sans-serif;
  text-align: justify;
  color: #444;
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
`;

const SinglePost = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`http://localhost:5000/api/posts/` + id);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/api/posts/" + id, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:5000/api/posts/" + id, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };
  return (
    <Container>
      {post.photo && <Image src={PF + post.photo} alt="image" />}
      <Content>
        {updateMode ? (
          <TitleInput
            type="text"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <Title>
            {title}
            {post.username === user?.username && (
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
          </Title>
        )}
        <Create>
          <AuthorWrapper>
            Author:
            <StyledLink to={`/?user=${post.username}`}>
              <Author>{post.username}</Author>
            </StyledLink>
          </AuthorWrapper>
          <Time>{new Date(post.createdAt).toDateString()}</Time>
        </Create>
        {updateMode ? (
          <DescTextArea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <Description>{desc}</Description>
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
