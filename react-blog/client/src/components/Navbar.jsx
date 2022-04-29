import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiCalls";

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
  justify-content: space-between;
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

const Logout = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 24px;
  padding: 0 20px;
  font-family: "Josefin Sans", sans-serif;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    logout(dispatch);
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
          {user && (
            <ListItem>
              <StyledLink to="/write">WRITE</StyledLink>
            </ListItem>
          )}
          <ListItem>
            <StyledLink to="">CONTACT</StyledLink>
          </ListItem>
        </List>
      </Center>
      <Right>
        <SearchIcon />
        {user && (
          <Logout to="/login" onClick={handleLogout}>
            LOGOUT
          </Logout>
        )}
      </Right>
    </Container>
  );
};

export default Navbar;
