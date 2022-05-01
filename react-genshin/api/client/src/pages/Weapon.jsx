import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "../components/Navbar";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  width: "60px",
  margin: "0 20px",
  padding: 0,
  backgroundColor: "#1e1f23",
  border: "2px solid #444",
  borderRadius: "4px",
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  width: "256px",
  height: "256px",
  margin: "16px auto",
  backgroundColor: "#1e1f23",
  border: "2px solid #444",
  borderRadius: "8px",
}));

const Material = styled(Box)(({ theme }) => ({
  width: "50px",
  height: "50px",
  margin: "4px 8px 0 0",
  backgroundColor: "#1e1f23",
  border: "1px solid #444",
}));

const Stats = styled(Box)(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.up("lg")]: {
    marginRight: theme.spacing(3),
    borderRight: "1px solid #444",
  },
}));

const Weapon = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [weapon, setWeapon] = useState({});
  const [show, setShow] = useState("Base");

  useEffect(() => {
    const getWeapon = async () => {
      const res = await axios.get(
        `https://gidatabase.herokuapp.com/api/weapons/find/` + id
      );
      setWeapon(res.data);
    };
    getWeapon();
  }, [id]);

  const Rarity = () => {
    let rarity = [];
    for (let i = 0; i < weapon.rarity; i += 1) {
      rarity = rarity.concat(
        <StarIcon key={i} sx={{ color: "#f9a825", width: "24px" }} />
      );
    }
    return rarity;
  };
  return (
    <Box sx={{ backgroundColor: "#222222", minHeight: "100vh" }}>
      <Navbar />
      <Grid container>
        <Grid item md={5} xs={12} p={2}>
          <Box p={2} sx={{ position: "sticky", top: "80px" }}>
            <Typography variant="h4" color="white" mb={1}>
              {weapon.name}
            </Typography>
            <Rarity />
            <List sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              {weapon.icon?.map((state) => (
                <StyledListItem
                  key={state._id}
                  onClick={() => setShow(state.state)}
                >
                  <Box
                    component="img"
                    src={state.image}
                    alt={state.state}
                    sx={{
                      width: "100%",
                      opacity: `${show === state.state ? "1" : "0.5"}`,
                    }}
                  />
                </StyledListItem>
              ))}
            </List>
            {weapon.icon?.map((state) => (
              <>
                <Typography
                  key={state.state}
                  variant="h5"
                  color="white"
                  sx={{
                    my: 2,
                    textAlign: "center",
                    display: `${show === state.state ? "block" : "none"}`,
                  }}
                >
                  {state.state}
                </Typography>
                <ImageWrapper
                  sx={{
                    width: "256px",
                    display: `${show === state.state ? "block" : "none"}`,
                  }}
                >
                  <Box
                    component="img"
                    key={state.image}
                    src={state.image}
                    alt={state.state}
                    sx={{ width: "100%" }}
                  />
                </ImageWrapper>
              </>
            ))}
            <Typography
              color="white"
              fontStyle="italic"
              sx={{
                textAlign: "center",
                mt: 4,
              }}
            >
              {weapon.lore}
            </Typography>
          </Box>
        </Grid>
        <Grid item md={7} xs={12} p={2}>
          <Box p={2} color="white">
            <Box>
              <Typography variant="h5" mb={1}>
                Description
              </Typography>
              <Box p={2} backgroundColor="#23252a" mb={3}>
                <Typography>{weapon.description}</Typography>
              </Box>
            </Box>
            <Box>
              <Box>
                <Typography variant="h5" mb={1}>
                  Stats
                </Typography>
                <Box
                  backgroundColor="#23252a"
                  p={2}
                  sx={{
                    display: "flex",
                    flexDirection: { lg: "row", xs: "column" },
                  }}
                >
                  <Stats>
                    <Typography fontSize="18px" fontWeight="bold">
                      Attack
                    </Typography>
                    <Typography>{weapon.attack}</Typography>
                    <Typography mt={2} fontSize="18px" fontWeight="bold">
                      Sub Stat
                    </Typography>
                    <Typography>
                      {weapon.subStat}: {weapon.subValue}
                    </Typography>
                    <Typography mt={2} fontSize="18px" fontWeight="bold">
                      Ascension Materials
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                      {weapon.materials?.map((mat) => (
                        <Material>
                          <Box
                            component="img"
                            src={mat.image}
                            alt="material"
                            sx={{ width: "100%" }}
                          />
                        </Material>
                      ))}
                    </Box>
                  </Stats>
                  <Box sx={{ flex: 3, marginTop: { lg: 0, xs: "16px" } }}>
                    <Typography fontSize="18px" fontWeight="bold">
                      {weapon.passive?.name}
                    </Typography>
                    <Typography>{weapon.passive?.value}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box mt={3}>
              <Typography variant="h5" mb={1}>
                Story
              </Typography>
              <Box p={2} backgroundColor="#23252a">
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {weapon.story}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Weapon;
