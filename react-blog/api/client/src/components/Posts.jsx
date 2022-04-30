import styled from "styled-components";
import Post from "./Post";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 3;
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  ${mobile({ width: "100%", margin: "20px 0", padding: "20px" })}
`;

const Posts = ({ posts }) => {
  return (
    <Container>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Container>
  );
};

export default Posts;
