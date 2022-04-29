import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 385px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px 40px 20px;
  background-color: #fdfbfb;
  border-radius: 8px;
`;

const Image = styled.img`
  width: 385px;
  height: 280px;
  object-fit: cover;
  border-radius: 8px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px 10px;
`;

const Categories = styled.div`
  display: flex;
`;

const Category = styled.div`
  font-family: "Lora", serif;
  margin: 10px 12px;
  cursor: pointer;
  color: #fdd835;
  font-size: 14px;
  &::first-letter {
    text-transform: uppercase;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #444;
`;

const Title = styled.p`
  margin-top: 12px;
  font-family: "Josefin Sans", sans-serif;
  font-size: 24px;
`;

const Time = styled.p`
  font-family: "Lora", serif;
  margin: 8px 0;
  color: #444;
  font-size: 14px;
`;

const Description = styled.p`
  line-height: 24px;
  font-family: "Varela Round", sans-serif;
  font-size: 14px;
  color: #444;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-align: justify;
`;

const Post = ({ post }) => {
  return (
    <Container>
      {post.image && <Image src={post.image} alt="image" />}
      <Content>
        <Categories>
          {post.categories.map((category) => (
            <Category key={category}>{category}</Category>
          ))}
        </Categories>
        <StyledLink to={`/post/${post._id}`}>
          <Title>{post.title}</Title>
        </StyledLink>
        <Time>{new Date(post.createdAt).toDateString()}</Time>
        <Description>{post.desc}</Description>
      </Content>
    </Container>
  );
};

export default Post;
