import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const SlideShow = styled(Box)(({ theme }) => ({
  margin: "0 auto",
  overflow: "hidden",
  maxWidth: "100vw",
}));

const SlideShowSlider = styled(Box)(({ theme }) => ({
  whiteSpace: "nowrap",
  transition: "ease 1500ms",
}));

const Slider = styled(Box)(({ theme }) => ({
  display: "inline-block",
  height: "100vh",
  width: "100vw",
  position: "relative",
  overflow: "hidden",
}));

const Name = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "100px",
  width: "400px",
  transform: "translateY(-50%)",
  textTransform: "uppercase",
  fontFamily: "Bebas Neue",
  letterSpacing: "8px",
  padding: "5px",
  zIndex: "2",
  whiteSpace: "normal",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
    fontSize: "42px",
    top: "10vh",
    left: "0",
  },
}));

const Background = styled(Box)(({ theme }) => ({
  position: "fixed",
  height: "135vh",
  objectFit: "cover",
  paddingRight: "100vw",
  top: "-10vh",
  overflow: "hidden",
  backgroundColor: "#222222",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}));

const Slide = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const [characters, setCharacters] = useState([]);
  const delay = 2500;

  useEffect(() => {
    const getCharacters = async () => {
      const res = await axios.get(
        "https://gidatabase.herokuapp.com/api/characters"
      );
      setCharacters(res.data);
    };
    getCharacters();
  }, []);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === characters.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index, characters.length]);

  const setColor = (char) => {
    switch (char.vision) {
      case "Pyro":
        return "#E25A1E";
      case "Hydro":
        return "#2892EC";
      case "Electro":
        return "#A355D6";
      case "Dendro":
        return null;
      case "Anemo":
        return "#3DADAD";
      case "Cryo":
        return "#96B3DF";
      case "Geo":
        return "#F6B33F";
      default:
        return "#333";
    }
  };

  return (
    <SlideShow>
      <SlideShowSlider
        sx={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {characters.map((char) => (
          <Slider key={char._id}>
            <Name variant="h1" sx={{ color: `${setColor(char)}` }}>
              {char.name}
            </Name>
            <Background sx={{ backgroundImage: `url(${char.image?.wish})` }} />
          </Slider>
        ))}
      </SlideShowSlider>
    </SlideShow>
  );
};

export default Slide;
