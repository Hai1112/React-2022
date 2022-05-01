import { Box, Grid, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Artifact from "../components/Artifact";
import ArtifactPreview from "../components/ArtifactPreview";
import { useState, useEffect } from "react";
import Search from "../components/Search";
import RarityFilter from "../components/RarityFilter";
import axios from "axios";

const Artifacts = () => {
  const [show, setShow] = useState();
  const rarity = [1, 2, 3, 4, 5];
  const [artifacts, setArtifacts] = useState([]);
  const [filter, setFilter] = useState(artifacts);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const getArtifacts = async () => {
      try {
        const res = await axios.get(
          "https://gidatabase.herokuapp.com/api/artifacts"
        );
        setArtifacts([...res.data].sort((a, b) => b.rarity - a.rarity));
      } catch (err) {
        console.error(err);
      }
    };
    getArtifacts();
  }, []);

  useEffect(() => {
    const searchArtifact = () => {
      let searchResult = artifacts;
      if (searchInput) {
        searchResult = artifacts.filter(
          (art) =>
            art.set.toLowerCase().search(searchInput.toLowerCase().trim()) !==
            -1
        );
      }
      setFilter(searchResult);
    };
    searchArtifact();
  }, [artifacts, searchInput]);

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
              ARTIFACTS
            </Typography>
            <Search
              value={searchInput}
              changeInput={(e) => setSearchInput(e.target.value)}
            />
            <RarityFilter
              list={rarity}
              data={artifacts}
              setFilter={setFilter}
            />
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
            {filter.map((artifact) => (
              <Artifact
                key={artifact.set}
                item={artifact}
                rarity={artifact.rarity}
                setShow={setShow}
              />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={3} p={2} sx={{ display: { lg: "block", xs: "none" } }}>
          {filter.map((artifact) => (
            <ArtifactPreview key={artifact.set} item={artifact} show={show} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Artifacts;
