import { Routes, Route, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import People from "./components/People";
function App() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/" || location.pathname === "/login";
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/people" element={<People />} />
      </Routes>
    </>
  );
}

export default App;
