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
import { AuthProvider } from "./pages/dashboard/components/AuthContext";
import Faqs from "./pages/main/pages/faqs/Faqs";
import About from "./pages/main/pages/about/About";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/main/pages/login/Login";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Users from "./pages/dashboard/pages/users/Users";
import Service from "./pages/dashboard/pages/services/Service";
import DBFaqs from "./pages/dashboard/pages/faqs/dbFaqs";
import DBCategories from "./pages/dashboard/pages/categories/dbCategories";
import DContact from "./pages/dashboard/pages/contact/DContact";
import DAbout from "./pages/dashboard/pages/about/DAbout";

function App() {
  const [admin, setAdmin] = useState(false);
  //! const [token, setToken] = useState("");
  useEffect(() => {
    const session = Cookies.get("token");
    if (session) {
      //! setToken(session);
      setAdmin(true);
      console.log({ session, admin });
      return;
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Route>
          {admin && (
            <Route
              path="/4a70ee7b6091dd9e951975b25f7f101fd9d3f6a18f7b170ec5da1a2b38ad8b14"
              element={<Dashboard />}
            >
              <Route
                path="/4a70ee7b6091dd9e951975b25f7f101fd9d3f6a18f7b170ec5da1a2b38ad8b14/users"
                element={<Users />}
              ></Route>
              <Route
                path="/4a70ee7b6091dd9e951975b25f7f101fd9d3f6a18f7b170ec5da1a2b38ad8b14/services"
                element={<Service />}
              ></Route>
              <Route
                path="/4a70ee7b6091dd9e951975b25f7f101fd9d3f6a18f7b170ec5da1a2b38ad8b14/faqs"
                element={<DBFaqs />}
              ></Route>
              <Route
                path="/4a70ee7b6091dd9e951975b25f7f101fd9d3f6a18f7b170ec5da1a2b38ad8b14/categories"
                element={<DBCategories />}
              ></Route>
              <Route
                path="/4a70ee7b6091dd9e951975b25f7f101fd9d3f6a18f7b170ec5da1a2b38ad8b14/contact"
                element={<DContact />}
              ></Route>
              <Route
                path="/4a70ee7b6091dd9e951975b25f7f101fd9d3f6a18f7b170ec5da1a2b38ad8b14/about"
                element={<DAbout />}
              ></Route>
            </Route>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
