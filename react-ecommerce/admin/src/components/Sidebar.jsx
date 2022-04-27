import styled from "styled-components";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DynamicFeedOutlinedIcon from "@mui/icons-material/DynamicFeedOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import ReportIcon from "@mui/icons-material/Report";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  height: calc(100vh - 50px);
  position: sticky;
  top: 50px;
  background-color: rgb(251, 251, 255);
  border-right: 1px solid lightgray;
`;

const Wrapper = styled.div`
  padding: 20px;
  color: #555;
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  padding: 0 5px 0 20px;
`;

const ListItem = styled.li`
  padding: 6px 0 6px 20px;
  font-size: 14px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgb(240, 240, 255);
  }
`;

const ListItemText = styled.span`
  margin-left: 12px;
`;

const Title = styled.p`
  font-size: 10px;
  font-weight: bold;
  margin: 20px 0 10px 0;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Sidebar = () => {
  return (
    <Container>
      <Wrapper>
        <List>
          <Title>DASHBOARD</Title>
          <ListItem>
            <StyledLink to="/">
              <LineStyleIcon />
              <ListItemText>Home</ListItemText>
            </StyledLink>
          </ListItem>
          <ListItem>
            <TimelineIcon />
            <ListItemText>Analytics</ListItemText>
          </ListItem>
          <ListItem>
            <TrendingUpIcon />
            <ListItemText>Sales</ListItemText>
          </ListItem>
          <Title>QUICK MENU</Title>
          <ListItem>
            <StyledLink to="/users">
              <PersonOutlineOutlinedIcon />
              <ListItemText>Users</ListItemText>
            </StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/products">
              <StorefrontOutlinedIcon />
              <ListItemText>Products</ListItemText>
            </StyledLink>
          </ListItem>
          <ListItem>
            <AttachMoneyOutlinedIcon />
            <ListItemText>Transactions</ListItemText>
          </ListItem>
          <ListItem>
            <BarChartOutlinedIcon />
            <ListItemText>Reports</ListItemText>
          </ListItem>
          <Title>NOTIFICATIONS</Title>
          <ListItem>
            <EmailOutlinedIcon />
            <ListItemText>Mail</ListItemText>
          </ListItem>
          <ListItem>
            <DynamicFeedOutlinedIcon />
            <ListItemText>Feedback</ListItemText>
          </ListItem>
          <ListItem>
            <ChatBubbleOutlineOutlinedIcon />
            <ListItemText>Messages</ListItemText>
          </ListItem>
          <Title>STAFF</Title>
          <ListItem>
            <WorkOutlineOutlinedIcon />
            <ListItemText>Manage</ListItemText>
          </ListItem>
          <ListItem>
            <TimelineIcon />
            <ListItemText>Analytics</ListItemText>
          </ListItem>
          <ListItem>
            <ReportIcon />
            <ListItemText>Report</ListItemText>
          </ListItem>
        </List>
      </Wrapper>
    </Container>
  );
};

export default Sidebar;
