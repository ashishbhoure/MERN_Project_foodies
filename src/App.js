import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";

// import "../node_modules/bootstrap/dist/css/ bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import SignUp from "./screens/SignUp";
import { CartProvider } from "./components/ContextReduser";
import MyOrder from "./screens/MyOrder";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/myOrder" element={<MyOrder />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
