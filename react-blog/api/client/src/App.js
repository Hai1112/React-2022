import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Setting from "./pages/Setting";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Write from "./pages/Write";
import { useSelector } from "react-redux";
import About from "./pages/About";
import ScrollToTop from "./ScrollToTop";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/about" exact element={<About />}></Route>
        <Route path="/:category" exact element={<Home />}></Route>
        <Route path="/posts" exact element={<Home />}></Route>
        <Route path="/post/:id" exact element={<Single />}></Route>
        <Route path="/write" exact element={<Write />}></Route>
        <Route
          path="/login"
          exact
          element={user ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route path="/settings" exact element={<Setting />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
