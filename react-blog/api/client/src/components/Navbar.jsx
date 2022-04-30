import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiCalls";
import { mobile } from "../responsive";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

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
  ${mobile({
    justifyContent: "space-between",
    width: "100vw",
  })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ display: "none" })}
`;

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
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
  ${mobile({ display: "none" })}
`;

const Icon = styled.div`
  margin: 0 6px;
  cursor: pointer;
`;

const ListItem = styled.li`
  margin: 0 12px;
  cursor: pointer;
  font-family: "Josefin Sans", sans-serif;
  ${mobile({
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px 0",
    borderBottom: "1px solid lightgray",
  })}
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #444;
  text-decoration: none;
  width: 100%;
  height: 100%;
`;

const MenuIconWrapper = styled.div`
  height: 60px;
  width: 60px;
  justify-content: center;
  align-items: center;
  display: none;
  ${mobile({ display: "flex" })}
`;

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const about = useSelector((state) => state.about.currentAbout);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(dispatch);
    navigate("/login");
  };

  const List = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    ${mobile({
      position: "absolute",
      top: "100%",
      left: "0",
      right: "0",
      flexDirection: "column",
      backgroundColor: "white",
      display: `${open ? "flex" : "none"}`,
    })}
  `;

  return (
    <Container>
      <Left>
        <Icon>
          <Anchor href={about?.[0]?.facebook}>
            <FacebookIcon />
          </Anchor>
        </Icon>
        <Icon>
          <Anchor href={about?.[0]?.twitter === "" ? "#" : about?.[0]?.twitter}>
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
      </Left>
      <Center>
        <List onClick={() => setOpen(false)}>
          <ListItem>
            <StyledLink to="/">HOME</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/About">ABOUT</StyledLink>
          </ListItem>
          {user && (
            <>
              <ListItem>
                <StyledLink to="/write">WRITE</StyledLink>
              </ListItem>

              <ListItem>
                <StyledLink to="/settings">SETTING</StyledLink>
              </ListItem>
              <ListItem to="/login" onClick={handleLogout}>
                LOGOUT
              </ListItem>
            </>
          )}
        </List>
      </Center>
      <Right>
        <SearchIcon />
      </Right>
      <MenuIconWrapper onClick={() => setOpen(!open)}>
        <MenuIcon />
      </MenuIconWrapper>
    </Container>
  );
};

export default Navbar;
