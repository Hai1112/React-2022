import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Artifacts from "./pages/Artifacts";
import Artifact from "./pages/Artifact";
import Home from "./pages/Home";
import Weapons from "./pages/Weapons";
import Weapon from "./pages/Weapon";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import ScrollToTop from "./ScrollToTop";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/artifacts" exact element={<Artifacts />}></Route>
        <Route path="/artifacts/:id" exact element={<Artifact />}></Route>
        <Route path="/weapons" exact element={<Weapons />}></Route>
        <Route path="/weapons/:id" exact element={<Weapon />}></Route>
        <Route path="/characters" exact element={<Characters />}></Route>
        <Route path="/characters/:id" exact element={<Character />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
