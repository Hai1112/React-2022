import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const ProfileWrapper = styled(Grid)(({ theme }) => ({
  padding: "0 16px",
  [theme.breakpoints.up("lg")]: {
    overflowY: "auto",
    height: "calc(100vh - 64px)",
    position: "fixed",
    right: 0,
  },
  [theme.breakpoints.down("lg")]: {
    marginTop: "70vh",
  },
}));

const BlockHeader = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: "600",
}));

const BlockContent = styled(Box)(({ theme }) => ({
  marginTop: "8px",
  display: "flex",
  justifyContent: "space-between",
}));

const Description = styled(Typography)(({ theme }) => ({
  color: "white",
  fontStyle: "italic",
  marginTop: "16px",
}));

const CharacterProfile = ({ character, setColor, setBackgroundColor }) => {
  const Block = styled(Box)(({ theme }) => ({
    padding: "16px",
    margin: "16px 0",
    color: `${setColor}`,
    backgroundColor: `${setBackgroundColor}`,
    borderRadius: "8px",
  }));

  const ImageWrapper = styled(Box)(({ theme }) => ({
    margin: "8px 4px",
    backgroundColor: `${setImageBackgroundColor()}`,
    borderRadius: "4px",
  }));

  const setImageBackgroundColor = () => {
    switch (character.vision) {
      case "Pyro":
        return "#E25A1E40";
      case "Hydro":
        return "#2892EC40";
      case "Electro":
        return "#A355D640";
      case "Dendro":
        return null;
      case "Anemo":
        return "#3DADAD40";
      case "Cryo":
        return "#96B3DF40";
      case "Geo":
        return "#F6B33F40";
      default:
    }
  };

  return (
    <ProfileWrapper item lg={4} xs={12}>
      <Block>
        <BlockHeader variant="h5">BASE STATS</BlockHeader>
        {character.stats?.map((stat) => (
          <BlockContent key={stat.stat}>
            <Typography>{stat.stat}</Typography>
            <Typography>{stat.value}</Typography>
          </BlockContent>
        ))}
      </Block>
      <Block>
        <BlockHeader variant="h5">ASCENSION MATERIALS</BlockHeader>
        <Grid container>
          {character.ascensionMaterials?.map((mat) => (
            <Grid item xs={2.4} key={mat.type}>
              <ImageWrapper>
                <Box
                  component="img"
                  src={mat.image}
                  sx={{ width: "100%", objectFit: "contain" }}
                />
              </ImageWrapper>
            </Grid>
          ))}
        </Grid>
      </Block>
      <Block>
        <BlockHeader variant="h5">TALENT MATERIALS</BlockHeader>
        <Grid container>
          {character.talentMaterials?.map((mat) => (
            <Grid item xs={2.4} key={mat.image}>
              <ImageWrapper>
                <Box
                  component="img"
                  src={mat.image}
                  sx={{ width: "100%", objectFit: "contain" }}
                />
              </ImageWrapper>
            </Grid>
          ))}
        </Grid>
      </Block>
      <Block>
        <BlockHeader variant="h5">CHARACTER PROFILE</BlockHeader>
        {character.profile?.map((stat) => (
          <BlockContent key={stat.label}>
            <Typography>{stat.label}</Typography>
            <Typography color="white">{stat.desc}</Typography>
          </BlockContent>
        ))}
        <BlockContent>
          <Typography>Vision</Typography>
          <Typography color="white">{character.vision}</Typography>
        </BlockContent>
        <BlockContent>
          <Typography>Weapon</Typography>
          <Typography color="white">{character.weapon}</Typography>
        </BlockContent>
        <Description textAlign="center">{character.description}</Description>
      </Block>
    </ProfileWrapper>
  );
};

export default CharacterProfile;
