import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RarityFilter from "../components/RarityFilter";
import Search from "../components/Search";
import axios from "axios";
import Character from "../components/Character";
import CharacterPreview from "../components/CharacterPreview";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "8px 8px 0 0",
  fontWeight: 600,
  fontSize: "16px",
  padding: "4px",
  textTransform: "none",
  fontWeightAbsolute: "500",
}));

const Characters = () => {
  const rarity = [4, 5];
  const elements = [
    "Pyro",
    "Hydro",
    "Anemo",
    "Electro",
    "Dendro",
    "Cryo",
    "Geo",
  ];
  const weaponTypes = ["Sword", "Bow", "Polearm", "Catalyst", "Claymore"];
  const [characters, setCharacters] = useState([]);
  const [filter, setFilter] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [show, setShow] = useState("");

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const res = await axios.get(
          "https://gidatabase.herokuapp.com/api/characters"
        );
        setCharacters(res.data);
        setFilter(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCharacters();
  }, []);

  const handleElementsFilter = (elem) => {
    const updatedData = characters.filter((char) => char.vision === elem);
    setFilter(updatedData.sort((a, b) => b.rarity - a.rarity));
  };

  const handleWeaponsFilter = (type) => {
    const updatedData = characters.filter((char) => char.weapon === type);
    setFilter(updatedData.sort((a, b) => b.rarity - a.rarity));
  };

  return (
    <Box sx={{ backgroundColor: "#222222", minHeight: "100vh" }}>
      <Navbar />
      <Grid container>
        <Grid item lg={3} xs={12} p={2}>
          <Box
            p={2}
            sx={{ backgroundColor: "#23252a" }}
            position="sticky"
            top="80px"
          >
            <Typography variant="h4" mb={4} color="white">
              CHARACTERS
            </Typography>
            <Search
              value={searchInput}
              changeInput={(e) => setSearchInput(e.target.value)}
            />
            <RarityFilter
              list={rarity}
              data={characters}
              setFilter={setFilter}
            />
            <Typography variant="h6" color="white" mt={2}>
              ELEMENTS
            </Typography>
            <Box sx={{ flex: 1, display: "flex", flexWrap: "wrap" }}>
              <StyledButton onClick={() => setFilter(characters)}>
                All
              </StyledButton>
              {elements.map((elem) => (
                <StyledButton
                  key={elem}
                  onClick={() => handleElementsFilter(elem)}
                >
                  {elem}
                </StyledButton>
              ))}
            </Box>
            <Typography variant="h6" color="white" mt={2}>
              WEAPONS
            </Typography>
            <Box sx={{ flex: 1, display: "flex", flexWrap: "wrap" }}>
              <StyledButton onClick={() => setFilter(characters)}>
                All
              </StyledButton>
              {weaponTypes.map((type) => (
                <StyledButton
                  key={type}
                  onClick={() => handleWeaponsFilter(type)}
                >
                  {type}
                </StyledButton>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          lg={6}
          xs={12}
          sx={{ padding: { md: "16px 0", xs: "16px" } }}
        >
          <Grid
            container
            sx={{
              backgroundColor: "#23252a",
              padding: "8px",
              minHeight: "100vh",
              display: "flex",
              justifyContent: "flex-start",
              alignContent: "flex-start",
            }}
          >
            {filter.map((char) => (
              <Character
                key={char.name}
                char={char}
                rarity={char.rarity}
                setShow={setShow}
              />
            ))}
          </Grid>
        </Grid>
        <Grid item lg={3} p={2} sx={{ display: { lg: "block", xs: "none" } }}>
          {filter.map((char) => (
            <CharacterPreview key={char.name} char={char} show={show} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Characters;
