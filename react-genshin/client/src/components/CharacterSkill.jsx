import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const TalentImage = styled("img")(({ theme }) => ({
  width: "90px",
  objectFit: "contain",
  position: "absolute",
  top: "-30px",
  left: "20px",
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
            <Grid item md={4} xs={12} mb={6}>
              <SkillWrapper backgroundColor={setBackgroundColor}>
                <TalentImage src={skill.icon} />
                <Box ml={15}>
                  <Typography fontWeight="bold">{skill.type}</Typography>
                  <SkillName variant="h6">{skill.name}</SkillName>
                </Box>
                <Box>
                  <Typography mt={3}>{skill.detail}</Typography>
                  {skill.effects?.map((effect) => (
                    <Box my={3}>
                      <Typography sx={{ color: setColor, fontWeight: "bold" }}>
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
            <Grid item md={4} xs={12} mb={6}>
              <SkillWrapper backgroundColor={setBackgroundColor}>
                <TalentImage src={skill.icon} />
                <Box ml={15}>
                  <Typography fontWeight="bold">{skill.type}</Typography>
                  <SkillName variant="h6">{skill.name}</SkillName>
                </Box>
                <Typography mt={3} sx={{ whiteSpace: "pre-line" }}>
                  {skill.effect}
                </Typography>
              </SkillWrapper>
            </Grid>
          ))}
        </Grid>
      </PanelWrapper>

      <PanelWrapper display={show === "constellations" ? "" : "none"}>
        <Typography variant="h4">CONSTELLATIONS</Typography>
        <Box>
          {character.constellations?.map((constellation) => (
            <ConstellationWrapper backgroundColor={setBackgroundColor}>
              <Box
                component="img"
                src={constellation.icon}
                sx={{ width: "80px", position: "absolute", left: "-30px" }}
              />
              <Box ml={10} mb={1}>
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
              </Box>
              <Typography ml={10} sx={{ whiteSpace: "pre-line" }}>
                {constellation.effect}
              </Typography>
            </ConstellationWrapper>
          ))}
        </Box>
      </PanelWrapper>
    </Grid>
  );
};

export default CharacterSkill;
