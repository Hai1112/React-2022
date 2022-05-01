import { styled } from "@mui/material/styles";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import CharacterProfile from "../components/CharacterProfile";
import CharacterSkill from "../components/CharacterSkill";

const Background = styled(Box)(({ theme }) => ({
  position: "fixed",
  height: "135vh",
  objectFit: "cover",
  paddingRight: "100vw",
  top: "-10vh",
  overflow: "hidden",
  backgroundColor: "#222222",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}));

const Heading = styled(Typography)(({ theme }) => ({
  minWidth: "300px",
  textAlign: "center",
  position: "absolute",
  top: "90px",
  textTransform: "uppercase",
  fontWeight: 400,
  borderTopRightRadius: "16px",
  borderBottomRightRadius: "16px",
  padding: "0 20px",
  fontFamily: "Bebas Neue, cursive",
  [theme.breakpoints.down("sm")]: {
    fontSize: "42px",
    padding: "10px 20px",
    width: "100vn",
  },
}));

const StyledList = styled(List)(({ theme }) => ({
  borderTopRightRadius: "8px",
  borderBottomRightRadius: "8px",
  minWidth: "180px",
}));

const Character = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [character, setCharacter] = useState({});
  const [show, setShow] = useState("");
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    const getCharacter = async () => {
      const res = await axios.get(
        `https://gidatabase.herokuapp.com/api/characters/find/` + id
      );
      setCharacter(res.data);
    };
    getCharacter();
  }, [id]);

  const setColor = () => {
    switch (character.vision) {
      case "Pyro":
        return "#E25A1E";
      case "Hydro":
        return "#2892EC";
      case "Electro":
        return "#A355D6";
      case "Dendro":
        return null;
      case "Anemo":
        return "#3DADAD";
      case "Cryo":
        return "#96B3DF";
      case "Geo":
        return "#F6B33F";
      default:
        return "#333";
    }
  };

  const setBackgroundColor = () => {
    switch (character.vision) {
      case "Pyro":
        return "#33251FE6";
      case "Hydro":
        return "#1F2833E6";
      case "Electro":
        return "#2D1F33E6";
      case "Dendro":
        return null;
      case "Anemo":
        return "#153030E6";
      case "Cryo":
        return "#252D36E6";
      case "Geo":
        return "#2E2921E6";
      default:
        return null;
    }
  };

  const handleClick = (value) => {
    setShow(value);
    setShowPanel(true);
  };

  const StyledListItem = styled(ListItem)(({ theme }) => ({
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      background: `linear-gradient(to right, ${setColor()} , rgba(246,179,63,0))`,
    },
  }));

  return (
    <Box
      sx={{
        backgroundColor: "#222222",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Background sx={{ backgroundImage: `url(${character.image?.wish})` }} />
      <Navbar setColor={setBackgroundColor()} />
      <Heading
        variant="h2"
        color="white"
        backgroundColor={setBackgroundColor()}
      >
        {character.name}
      </Heading>
      <Grid container position="relative" display={showPanel ? "none" : ""}>
        <Grid item xs={8} display="none"></Grid>
        <CharacterProfile
          character={character}
          setColor={setColor()}
          setBackgroundColor={setBackgroundColor()}
        />
      </Grid>

      <Grid container position="absolute" zIndex="1" sx={{ top: "184px" }}>
        <Grid item xs={2} pr={2}>
          <StyledList sx={{ backgroundColor: `${setBackgroundColor()}` }}>
            <StyledListItem onClick={() => handleClick("talents")}>
              Talents
            </StyledListItem>
            <StyledListItem onClick={() => handleClick("constellations")}>
              Constellations
            </StyledListItem>
            <StyledListItem
              sx={{ display: `${showPanel ? "" : "none"}` }}
              onClick={() => setShowPanel(false)}
            >
              Close
            </StyledListItem>
          </StyledList>
        </Grid>
        <CharacterSkill
          character={character}
          show={show}
          showPanel={showPanel}
          setColor={setColor()}
          setBackgroundColor={setBackgroundColor()}
        />
      </Grid>
    </Box>
  );
};

export default Character;
