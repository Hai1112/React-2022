import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/Context";

const Container = styled.div`
  display: flex;
  height: 60px;
  background-color: white;
  color: #444;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Center = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  margin: 0 6px;
  cursor: pointer;
`;

const List = styled.ul`
  display: flex;
  list-style: none;
`;

const ListItem = styled.li`
  margin: 0 12px;
  cursor: pointer;
  font-family: "Josefin Sans", sans-serif;
`;

const StyledLink = styled(Link)`
  color: #444;
  text-decoration: none;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

const Navbar = () => {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <Container>
      <Left>
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
      </Left>
      <Center>
        <List>
          <ListItem>
            <StyledLink to="/">HOME</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="">ABOUT</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/write">WRITE</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="">CONTACT</StyledLink>
          </ListItem>
          {user && (
            <ListItem>
              <StyledLink to="/login" onClick={handleLogout}>
                LOGOUT
              </StyledLink>
            </ListItem>
          )}
        </List>
      </Center>
      <Right>
        {user ? (
          <Link to="/settings">
            <Avatar src={PF + user.profilePic} alt="Avatar"></Avatar>
          </Link>
        ) : (
          <List>
            <ListItem>
              <StyledLink to="/login">LOGIN</StyledLink>
            </ListItem>
            <ListItem>
              <StyledLink to="/register">REGISTER</StyledLink>
            </ListItem>
          </List>
        )}
        <SearchIcon />
      </Right>
    </Container>
  );
};

export default Navbar;
