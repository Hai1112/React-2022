import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";

import React from "react";

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

const RarityFilter = ({ list, data, setFilter }) => {
  const handleRarityFilter = (rarity) => {
    const updatedData = data.filter((item) => item.rarity === rarity);
    setFilter(updatedData);
  };
  return (
    <>
      <Typography variant="h6" color="white" mt={2}>
        RARITY
      </Typography>
      <Box sx={{ flex: 1, display: "flex", flexWrap: "wrap" }}>
        <StyledButton onClick={() => setFilter(data)}>All</StyledButton>
        {list.map((rare) => (
          <StyledButton key={rare} onClick={() => handleRarityFilter(rare)}>
            {rare} <StarIcon sx={{ color: "#f9a825", width: "20px" }} />
          </StyledButton>
        ))}
      </Box>
    </>
  );
};

export default RarityFilter;
