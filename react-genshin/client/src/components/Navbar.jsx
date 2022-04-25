import { AppBar, Box, Container, List, ListItem, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import { useState } from "react";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "white",
  "&:hover": {
    color: theme.palette.primary.light,
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    padding: 0,
  },
}));

const StyledList = styled(List)(({ theme }) => ({
  padding: 0,
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    backgroundColor: "rgba(0,0,0,0.9)",
    position: "absolute",
    top: "100%",
    right: "0",
    flexDirection: "column",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    height: "60px",
    "&:hover": {
      backgroundColor: "teal",
    },
  },
}));

const Navbar = ({ character, setColor }) => {
  const pages = ["Characters", "Weapons", "Artifacts"];
  const [open, setOpen] = useState(false);
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: `${setColor || "#333"}`,
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <StyledContainer maxWidth="x1">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Link to="/">
            <Box
              component="img"
              src="/images/logo.png"
              sx={{ height: "64px", objectFit: "contain", marginRight: "16px" }}
            />
          </Link>
          <StyledList
            sx={{ display: { md: "flex", xs: `${open ? "flex" : "none"}` } }}
          >
            <StyledListItem>
              <StyledLink to="/">Home</StyledLink>
            </StyledListItem>
            {pages.map((page) => (
              <StyledListItem key={page}>
                <StyledLink to={`/${page.toLowerCase()}`}>{page}</StyledLink>
              </StyledListItem>
            ))}
          </StyledList>
          <Search />
          <MenuIcon
            size="large"
            sx={{
              width: "32px",
              height: "32px",
              padding: "12px",
              marginLeft: "16px",
              display: { md: "none", xs: "block" },
            }}
            onClick={() => setOpen(!open)}
          />
        </Toolbar>
      </StyledContainer>
    </AppBar>
  );
};

export default Navbar;
