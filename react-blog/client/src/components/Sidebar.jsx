import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  display: flex;
  background-color: #fdfbfb;
  margin: 20px;
  padding: 0 10px 30px;
  height: fit-content;
`;

const Content = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  width: 100%;
  font-family: "Varela", sans-serif;
  line-height: 24px;
  padding: 4px 0;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  text-align: center;
  margin: 8px 0;
  font-weight: 600;
  color: #444;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 250px;
  position: relative;
  margin-bottom: 8px;
  overflow: hidden;
`;
const Image = styled.img`
  position: absolute;
  top: -50px;
  right: -50px;
  height: 400px;
`;
const Description = styled.p`
  width: 90%;
  font-family: "Lora", serif;
  font-size: 14px;
  color: #444;
  text-align: justify;
`;
const List = styled.ul`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
`;
const ListItem = styled.li`
  width: 50%;
  margin: 12px 0;
  text-align: center;
  cursor: pointer;
  font-family: "Josefin Sans", sans-serif;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Social = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  margin: 12px 12px;
  cursor: pointer;
`;

const Sidebar = () => {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCats();
  }, []);
  return (
    <Container>
      <Content>
        <Title>ABOUT ME</Title>
        <ImageWrapper>
          <Image src="/images/Profile.jpg" alt="Profile"></Image>
        </ImageWrapper>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione
          voluptatem sint quas voluptatibus quisquam ex nobis. Corrupti cumque
          amet obcaecati?
        </Description>
        <Title>CATEGORIES</Title>
        <List>
          {cats.map((cat) => (
            <ListItem key={cat.name}>
              <StyledLink to={`/${cat.name}`}>{cat.name}</StyledLink>
            </ListItem>
          ))}
        </List>
        <Title>FOLLOW US</Title>
        <Social>
          <Icon>
            <FacebookIcon />
          </Icon>
          <Icon>
            <TwitterIcon />
          </Icon>
          <Icon>
            <PinterestIcon />
          </Icon>
          <Icon>
            <InstagramIcon />
          </Icon>
        </Social>
      </Content>
    </Container>
  );
};

export default Sidebar;
