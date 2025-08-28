import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<div>About</div>} />
      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  );
}

export default App;
