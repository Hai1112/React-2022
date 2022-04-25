import styled from "styled-components";
import Header from "../components/Header";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Container = styled.div``;
const Content = styled.div`
  display: flex;
  margin-top: 16px;
`;

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <Container>
      <Navbar />
      <Header />
      <Content>
        <Posts posts={posts} />
        <Sidebar />
      </Content>
    </Container>
  );
};

export default Home;
