import { Box, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const PreviewWrapper = styled(Box)(({ theme }) => ({
  padding: "16px",
  backgroundColor: "#23252a",
  textAlign: "center",
  color: "white",
  height: "calc(100vh - 128px)",
  overflowY: "auto",
  position: "sticky",
  top: "80px",
}));

const ArtifactPreview = ({ item, show }) => {
  return (
    <PreviewWrapper display={show === item.set ? "block" : "none"}>
      <Box component="img" src={item.pieces[0].image} alt={item.set} />
      <Typography variant="h5" mb={2}>
        {item.set}
      </Typography>
      <Box>
        <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
          2 Piece Bonus:
        </Typography>
        <Typography mb={2}>{item.set2}</Typography>
        <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
          4 Piece Bonus:
        </Typography>
        <Typography>{item.set4}</Typography>
      </Box>
    </PreviewWrapper>
  );
};

export default ArtifactPreview;
