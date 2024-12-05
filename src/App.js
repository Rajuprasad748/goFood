import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import ContextReducer from './components/ContextReducer'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Signup from "./screens/Signup";
import MyOrder from "./screens/MyOrder";

function App() {
  return (
    <ContextReducer>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/creatuser" element={<Signup />} />
        <Route exact path="/myOrder" element={<MyOrder />} />
      </Routes>
    </Router>
    </ContextReducer>
      );
}

export default App;
