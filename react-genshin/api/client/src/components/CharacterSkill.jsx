import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const TalentImage = styled("img")(({ theme }) => ({
  width: "90px",
  objectFit: "contain",
  position: "absolute",
  top: "-30px",
  left: "20px",
  [theme.breakpoints.down("sm")]: {
    left: "50%",
    transform: "translateX(-50%)",
  },
}));

const SkillHeader = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(15),
  [theme.breakpoints.down("sm")]: {
    margin: "60px 0 0 0",
    textAlign: "center",
  },
}));

const PanelWrapper = styled(Box)(({ theme }) => ({
  color: "white",
  backgroundColor: "rgba(0,0,0,0.4)",
  padding: theme.spacing(2),
  margin: "0 16px 16px 0",
  borderRadius: "8px",
  [theme.breakpoints.down("lg")]: {
    margin: "32px 16px 16px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
}));

const SkillWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(2),
  margin: "0 8px",
  borderRadius: "8px",
}));

const ConstellationWrapper = styled(Box)(({ theme }) => ({
  width: "70%",
  margin: "20px 60px",
  position: "relative",
  minHeight: "100px",
  padding: "8px",
  borderRadius: "8px",
  [theme.breakpoints.down("lg")]: {
    width: "90%",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "60px 8px",
  },
}));

const ConstellationImage = styled(Box)(({ theme }) => ({
  width: "80px",
  position: "absolute",
  left: "-30px",
  [theme.breakpoints.down("sm")]: {
    width: "100px",
    top: "-40px",
    left: "0",
    right: "0",
    margin: "0 auto",
  },
}));

const ConstellationHeader = styled(Box)(({ theme }) => ({
  margin: "0 0 4px 60px",
  [theme.breakpoints.down("sm")]: {
    margin: "60px 0 8px 0",
    textAlign: "center",
  },
}));

const ConstellationEffect = styled(Typography)(({ theme }) => ({
  marginLeft: "60px",
  whiteSpace: "pre-line",
  [theme.breakpoints.down("sm")]: {
    margin: "8px",
  },
}));

const CharacterSkill = ({
  character,
  show,
  showPanel,
  setBackgroundColor,
  setColor,
}) => {
  const SkillName = styled(Typography)(({ theme }) => ({
    color: setColor,
    textTransform: "uppercase",
  }));
  return (
    <Grid item lg={10} xs={12} display={showPanel ? "" : "none"}>
      <PanelWrapper display={show === "talents" ? "" : "none"}>
        <Typography variant="h4" py={2} fontWeight="bold">
          COMBAT TALENTS
        </Typography>
        <Grid container my={4}>
          {character.combatTalents?.map((skill) => (
            <Grid item md={4} xs={12} mb={6} key={skill.name}>
              <SkillWrapper backgroundColor={setBackgroundColor}>
                <TalentImage src={skill.icon} />
                <SkillHeader>
                  <Typography fontWeight="bold">{skill.type}</Typography>
                  <SkillName variant="h6">{skill.name}</SkillName>
                </SkillHeader>
                <Box>
                  <Typography mt={3}>{skill.detail}</Typography>
                  {skill.effects?.map((effect) => (
                    <Box my={3} key={effect.desc}>
                      <Typography
                        sx={{
                          color: setColor,
                          fontWeight: "bold",
                          textAlign: "justify",
                        }}
                      >
                        {effect.effect}
                      </Typography>
                      <Typography sx={{ whiteSpace: "pre-line" }}>
                        {effect.desc}
                      </Typography>
                    </Box>
                  ))}
                  <Typography mt={1} sx={{ fontStyle: "italic" }}>
                    {skill.description}
                  </Typography>
                </Box>
              </SkillWrapper>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h4" py={2}>
          PASSIVE TALENTS
        </Typography>
        <Grid container my={4}>
          {character.passiveTalents?.map((skill) => (
            <Grid item md={4} xs={12} mb={6} key={skill.name}>
              <SkillWrapper backgroundColor={setBackgroundColor}>
                <TalentImage src={skill.icon} />
                <SkillHeader>
                  <Typography fontWeight="bold">{skill.type}</Typography>
                  <SkillName variant="h6">{skill.name}</SkillName>
                </SkillHeader>
                <Typography mt={3} sx={{ whiteSpace: "pre-line" }}>
                  {skill.effect}
                </Typography>
              </SkillWrapper>
            </Grid>
          ))}
        </Grid>
      </PanelWrapper>

      <PanelWrapper display={show === "constellations" ? "" : "none"}>
        <Typography variant="h4" pt={1}>
          CONSTELLATIONS
        </Typography>
        <Box>
          {character.constellations?.map((constellation) => (
            <ConstellationWrapper
              backgroundColor={setBackgroundColor}
              key={constellation.name}
            >
              <ConstellationImage component="img" src={constellation.icon} />
              <ConstellationHeader>
                <Typography sx={{ fontWeight: "bold" }}>
                  Constellation {constellation.id}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: setColor,
                  }}
                >
                  {constellation.name}
                </Typography>
              </ConstellationHeader>
              <ConstellationEffect>{constellation.effect}</ConstellationEffect>
            </ConstellationWrapper>
          ))}
        </Box>
      </PanelWrapper>
    </Grid>
  );
};

export default CharacterSkill;
