import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Slide from "../components/Slide";

const Home = () => {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#222222" }}>
      <Navbar />
      <Slide />
    </Box>
  );
};

export default Home;
