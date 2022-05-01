import Home from "./pages/Home";
import Users from "./pages/Users";
import User from "./pages/User";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NewUser from "./pages/NewUser";
import Products from "./pages/Products";
import Product from "./pages/Product";
import NewProduct from "./pages/NewProduct";
import Login from "./pages/Login";
import { useSelector } from "react-redux";

function App() {
  // const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/users" exact element={<Users />}></Route>
        <Route path="/user/:id" exact element={<User />}></Route>
        <Route path="/newUser" exact element={<NewUser />}></Route>
        <Route path="/products" exact element={<Products />}></Route>
        <Route path="product/:id" exact element={<Product />}></Route>
        <Route path="newProduct" exact element={<NewProduct />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
