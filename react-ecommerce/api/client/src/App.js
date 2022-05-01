import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Success from "./pages/Success";
import ScrollToTop from "./ScrollToTop";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route
          path="/login"
          exact
          element={user ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route
          path="/register"
          exact
          element={user ? <Navigate to="/" /> : <Register />}
        ></Route>
        <Route path="/products" exact element={<ProductList />}></Route>
        <Route
          path="/products/:category"
          exact
          element={<ProductList />}
        ></Route>
        <Route path="/product/:id" exact element={<Product />}></Route>
        <Route path="/cart" exact element={<Cart />}></Route>
        <Route path="/success" exact element={<Success />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
