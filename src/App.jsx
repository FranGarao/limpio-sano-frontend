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
<<<<<<< HEAD
=======


>>>>>>> 5ff5752b87bd2c136a2e66d7ced5cbede906a9bf

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
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="/dashboard/users" element={<Users />}></Route>
              <Route path="/dashboard/services" element={<Service />}></Route>
              <Route path="/dashboard/faqs" element={<DBFaqs />}></Route>
              <Route
                path="/dashboard/categories"
                element={<DBCategories />}
              ></Route>
              <Route path="/dashboard/services" element={<Service />}></Route>
              <Route path="/dashboard/services" element={<Service />}></Route>
            </Route>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
