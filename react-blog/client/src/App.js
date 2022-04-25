import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Setting from "./pages/Setting";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Write from "./pages/Write";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/posts" exact element={<Home />}></Route>
        <Route path="/post/:id" exact element={<Single />}></Route>
        <Route path="/write" exact element={<Write />}></Route>
        <Route
          path="/login"
          exact
          element={user ? <Home /> : <Login />}
        ></Route>
        <Route path="/register" exact element={<Register />}></Route>
        <Route path="/settings" exact element={<Setting />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
