import styled from "styled-components";
import Header from "../components/Header";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/apiCalls";
import { useLocation } from "react-router-dom";

const Container = styled.div``;
const Content = styled.div`
  display: flex;
  margin-top: 16px;
`;

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const location = useLocation();
  const category = location.pathname.split("/")[1];

  useEffect(() => {
    getPosts(dispatch, category);
  }, [dispatch, category]);

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
