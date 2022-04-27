import styled from "styled-components";
import SettingsIcon from "@mui/icons-material/Settings";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Badge from "@mui/material/Badge";

const Container = styled.div`
  background-color: white;
  width: 100%;
  height: 50px;
  border-bottom: 0.5px solid lightgray;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: #1565c0;
  cursor: pointer;
`;

const Right = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
  min-width: 40px;
  margin: 0 8px;
  cursor: pointer;
  color: #333;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

const TopBar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>ADMIN PANEL</Logo>
        </Left>
        <Right>
          <List>
            <ListItem>
              <LanguageOutlinedIcon sx={{ marginRight: "2px" }} />
              EN
            </ListItem>
            <ListItem>
              <DarkModeOutlinedIcon />
            </ListItem>
            <ListItem>
              <Badge badgeContent={4} color="primary">
                <ChatBubbleOutlineIcon />
              </Badge>
            </ListItem>
            <ListItem>
              <Badge badgeContent={4} color="primary">
                <NotificationsActiveIcon />
              </Badge>
            </ListItem>
            <ListItem>
              <Image src="/images/Ayaka.jpg" alt="" />
            </ListItem>
            <ListItem>
              <SettingsIcon />
            </ListItem>
          </List>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default TopBar;
