import { Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";

const CardWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  paddingBottom: "140%",
  backgroundColor: "#ccc",
  position: "relative",
}));

const Name = styled(Link)(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: "#333",
  textDecoration: "none",
  fontWeight: "bold",
}));

const Artifact = ({ item, rarity, setShow }) => {
  const setBackground = () => {
    switch (rarity) {
      case 5:
        return "url(https://lh3.googleusercontent.com/2gJAhSBTtBLMSuPfYMRg-UuqTPQoHubPkePv0Bxh7R7kyk4GfJM-_gFRwT0kXZFZEDwJNcAr72jKB-MdkAaCoaW3hn4BhhpMFFI-EKHtTHfyirIN7B2KPy5dwkDh1ho0WVnsjZMCWg)";
      case 4:
        return "url(https://lh3.googleusercontent.com/WhJ5k-G68iTrQuOG8Q9h8pK-r_JuftdugjcertbFJGSF5aAUAsjrqZVNDDz-1ECJctRB-8TUAWkca9AuTlkkZRW2xmAYs2R4uCTcITFpVQ0cH5ycZf9T3LXd1QwTdR82LBgx4yToKg)";
      case 3:
        return "url(https://lh3.googleusercontent.com/aPXa0a1Gn1XDYHLzawHAZJbDqMSSfQxE7yOsUWF5Y6fxFakI5Wkl_oYHmzwcVXoi-jb2W3G0ALuH0fOlgUufjtPXfF2GWSunVe3POiwvLpJ_P1vw8ykLoFH-OOg_kTA3Q-_cXb1wqg)";
      case 2:
        return "url(https://lh3.googleusercontent.com/Od6XVVfv-h4X2UXSA0AX8pwoYD8Nd6Aonj2qmY56mVhbkjUq3b7P6Kv-z3XO0QLLy2Lt79yMbX1PQshK6yjhYxt8i5jPVfEsGMSn2Vj0tOCPVvDaHReOp1CUmPhYBjU4U9_iJ8XIvA)";
      case 1:
        return "url(https://lh3.googleusercontent.com/mvFf73lLOZDOIarZtf1Dk8qBuVmniobXuaYaMw-05gsfBsIIIE9hOWQu0AEDT7O8bkXLcWewfFzMOypJWPsEPkejllHa5rPKiJM6oMaOoG4p8LJH3cGM173iG3ie6OapTwCa0KJRmg)";
      default:
        return null;
    }
  };
  return (
    <Grid item md={2.4} sm={3} xs={6} p={1}>
      <CardWrapper
        sx={{ borderRadius: "4px", overflow: "hidden" }}
        onMouseOver={() => setShow(item.name)}
      >
        <Box
          position="absolute"
          top="0"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            component="img"
            src={item.icon[1].image}
            alt={item.name}
            sx={{
              width: "100%",
              backgroundImage: setBackground(),
              backgroundSize: "contain",
              borderBottomRightRadius: "20px",
            }}
          />
          <Name to={`/weapons/${item._id}`}>{item.name}</Name>
        </Box>
      </CardWrapper>
    </Grid>
  );
};

export default Artifact;
