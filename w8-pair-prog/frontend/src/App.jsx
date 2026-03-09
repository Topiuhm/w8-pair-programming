import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/HomePage";
import AddPropertyPage from "./pages/AddPropertyPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import PropertyPage from "./pages/PropertyPage";
import EditPropertyPage from "./pages/EditPropertyPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-property" element={<AddPropertyPage />} />
            <Route path="/property/:id" element={<PropertyPage/>} />
            <Route path="/edit/:id" element={<EditPropertyPage/>} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
