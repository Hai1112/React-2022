import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StarIcon from "@mui/icons-material/Star";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Artifact = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [artifact, setArtifact] = useState({});
  const [show, setShow] = useState(1);

  useEffect(() => {
    const getArtifact = async () => {
      try {
        const res = await axios.get(
          `https://gidatabase.herokuapp.com/api/artifacts/find/` + id
        );
        setArtifact(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getArtifact();
  }, [id]);

  const Rarity = () => {
    let rarity = [];
    for (let i = 0; i < artifact.rarity; i += 1) {
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
              {artifact.set}
            </Typography>
            <Rarity />
            <List sx={{ display: "flex", justifyContent: "center" }}>
              {artifact.pieces?.map((piece) => (
                <ListItem
                  key={piece.piece}
                  sx={{ width: "60px", mx: "12px", p: 0 }}
                  onClick={() => setShow(piece.id)}
                >
                  <Box
                    component="img"
                    src={piece.image}
                    alt={piece.name}
                    sx={{
                      width: "100%",
                      opacity: `${show === piece.id ? "1" : "0.5"}`,
                    }}
                  />
                </ListItem>
              ))}
            </List>
            {artifact.pieces?.map((piece) => (
              <>
                <Box
                  key={piece.image}
                  component="img"
                  src={piece.image}
                  alt={piece.name}
                  sx={{ width: "256px", margin: "16px auto" }}
                  display={show === piece.id ? "block" : "none"}
                />
                <Typography
                  key={piece.name}
                  variant="h5"
                  color="white"
                  sx={{
                    mb: 2,
                    textAlign: "center",
                    display: `${show === piece.id ? "block" : "none"}`,
                  }}
                >
                  {piece.name}
                </Typography>
                <Typography
                  key={piece.lore}
                  color="white"
                  fontStyle="italic"
                  sx={{
                    textAlign: "center",
                    display: `${show === piece.id ? "block" : "none"}`,
                  }}
                >
                  {piece.lore}
                </Typography>
              </>
            ))}
          </Box>
        </Grid>
        <Grid item md={7} xs={12} p={2}>
          <Box p={2} color="white">
            <Box>
              <Typography variant="h5" mb={1}>
                Description
              </Typography>
              <Box p={2} backgroundColor="#23252a" mb={3}>
                <Typography>{artifact.description}</Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="h5" mb={1}>
                Set Bonus
              </Typography>
              <Box p={2} backgroundColor="#23252a" mb={3}>
                <Typography fontSize="18px" fontWeight="bold">
                  2 Piece Bonus
                </Typography>
                <Typography>{artifact.set2}</Typography>
                <Typography mt={2} fontSize="18px" fontWeight="bold">
                  4 Piece Bonus
                </Typography>
                <Typography>{artifact.set4}</Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="h5" mb={1}>
                Story
              </Typography>
              <Box p={2} backgroundColor="#23252a" mb={3}>
                {artifact.pieces?.map((piece) => (
                  <Box
                    key={piece.story}
                    sx={{
                      display: {
                        md: `${show === piece.id ? "block" : "none"}`,
                        xs: "block",
                      },
                      marginBottom: "20px",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: "8px" }}
                    >
                      <Box
                        component="img"
                        src={piece.image}
                        alt={piece.name}
                        sx={{ width: "50px", mr: "8px" }}
                      />
                      <Typography>{piece.name}</Typography>
                    </Box>
                    <Typography>{piece.story}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Artifact;
