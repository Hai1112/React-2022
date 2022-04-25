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

const Image = styled(Box)(({ theme }) => ({
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  top: 0,
  zIndex: -1,
}));

const Description = styled(Typography)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: "16px",
  right: "16px",
}));

const CharacterPreview = ({ char, show }) => {
  return (
    <PreviewWrapper display={show === char.name ? "block" : "none"}>
      <Image component="img" src={char.image.wish} alt={char.name} />
      <Typography variant="h5" mb={2}>
        {char.name}
      </Typography>
      <Description mb={2} fontStyle="italic">
        {char.description}
      </Description>
    </PreviewWrapper>
  );
};

export default CharacterPreview;
