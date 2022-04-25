import styled from "styled-components";
import Post from "./Post";

const Container = styled.div`
  flex: 3;
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
`;

const Posts = ({ posts }) => {
  return (
    <Container>
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </Container>
  );
};

export default Posts;
