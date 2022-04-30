import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 1;
  display: flex;
  background-color: #fdfbfb;
  margin: 20px;
  padding: 0 10px 30px;
  height: fit-content;
  ${mobile({ display: "none" })}
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
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Description = styled.p`
  width: 90%;
  font-family: "Lora", serif;
  font-size: 14px;
  color: #444;
  text-align: justify;
  margin-top: 12px;
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

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
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
  const about = useSelector((state) => state.about.currentAbout);
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
          <Image src={about?.[0]?.image} alt="Profile"></Image>
        </ImageWrapper>
        <Description>{about?.[0]?.quote}</Description>
        <Title>CATEGORIES</Title>
        <List>
          {cats.map((cat) => (
            <ListItem key={cat.name}>
              <StyledLink to={`/${cat.name}`}>{cat.name}</StyledLink>
            </ListItem>
          ))}
        </List>
        <Title>FOLLOW ME</Title>
        <Social>
          <Icon>
            <Anchor href={about?.[0]?.facebook}>
              <FacebookIcon />
            </Anchor>
          </Icon>
          <Icon>
            <Anchor
              href={about?.[0]?.twitter === "" ? "#" : about?.[0]?.twitter}
            >
              <TwitterIcon />
            </Anchor>
          </Icon>
          <Icon>
            <Anchor
              href={about?.[0]?.instagram === "" ? "#" : about?.[0]?.instagram}
            >
              <InstagramIcon />
            </Anchor>
          </Icon>
        </Social>
      </Content>
    </Container>
  );
};

export default Sidebar;
