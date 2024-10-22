// import { useState } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import Home from "./pages/main/pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import Contact from "./pages/main/pages/contact/Contact";
import Services from "./pages/main/pages/services/Services";
import Faqs from "./pages/main/pages/faqs/Faqs";
import About from "./pages/main/pages/about/About";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/main/pages/login/Login";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<Navigate to="/home" replace />}></Route>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/services" element={<Services />} /> */}
          </Route>
          <Route path="/dashboard" element={<Dashboard />}>
            {/* <Route path="/service"></Route> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
