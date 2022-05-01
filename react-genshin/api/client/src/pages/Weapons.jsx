import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RarityFilter from "../components/RarityFilter";
import Search from "../components/Search";
import { styled } from "@mui/material/styles";
import Weapon from "../components/Weapon";
import WeaponPreview from "../components/WeaponPreview";
import axios from "axios";

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

const Weapons = () => {
  const weaponTypes = ["Sword", "Bow", "Polearm", "Catalyst", "Claymore"];
  const rarity = [1, 2, 3, 4, 5];
  const [show, setShow] = useState();
  const [weapons, setWeapons] = useState([]);
  const [filter, setFilter] = useState(weapons);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const getWeapons = async () => {
      try {
        const res = await axios.get(
          "https://gidatabase.herokuapp.com/api/weapons"
        );
        setWeapons(
          [...res.data].sort((a, b) => {
            if (b.type < a.type) {
              return -1;
            }
            if (b.type > a.type) {
              return 1;
            }
            return 0;
          })
        );
        setFilter(
          [...res.data].sort((a, b) => {
            if (b.type < a.type) {
              return -1;
            }
            if (b.type > a.type) {
              return 1;
            }
            return 0;
          })
        );
      } catch (err) {
        console.error(err);
      }
    };
    getWeapons();
  }, []);

  useEffect(() => {
    const searchArtifact = () => {
      let searchResult = weapons;
      if (searchInput) {
        searchResult = weapons.filter(
          (weapon) =>
            weapon.name
              .toLowerCase()
              .search(searchInput.toLowerCase().trim()) !== -1
        );
      }
      setFilter(searchResult);
    };
    searchArtifact();
  }, [weapons, searchInput]);

  const handleTypeFilter = (type) => {
    const updatedData = weapons.filter((weapon) => weapon.type === type);
    setFilter(updatedData.sort((a, b) => b.rarity - a.rarity));
  };

  return (
    <Box sx={{ backgroundColor: "#222222", minHeight: "100vh" }}>
      <Navbar />
      <Grid container>
        <Grid item md={3} xs={12} p={2}>
          <Box
            p={2}
            sx={{ backgroundColor: "#23252a" }}
            position="sticky"
            top="80px"
          >
            <Typography variant="h4" mb={4} color="white">
              WEAPONS
            </Typography>
            <Search
              value={searchInput}
              changeInput={(e) => setSearchInput(e.target.value)}
            />
            <RarityFilter list={rarity} data={weapons} setFilter={setFilter} />
            <Typography variant="h6" color="white" mt={2}>
              TYPES
            </Typography>
            <Box sx={{ flex: 1, display: "flex", flexWrap: "wrap" }}>
              <StyledButton onClick={() => setFilter(weapons)}>
                All
              </StyledButton>
              {weaponTypes.map((type) => (
                <StyledButton key={type} onClick={() => handleTypeFilter(type)}>
                  {type}
                </StyledButton>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          lg={6}
          md={9}
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
            {filter.map((weapon) => (
              <Weapon
                key={weapon.name}
                item={weapon}
                rarity={weapon.rarity}
                setShow={setShow}
              />
            ))}
          </Grid>
        </Grid>
        <Grid item lg={3} p={2} sx={{ display: { lg: "block", xs: "none" } }}>
          {filter.map((weapon) => (
            <WeaponPreview key={weapon.name} item={weapon} show={show} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Weapons;
