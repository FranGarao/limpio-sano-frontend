import { useState } from "react";
import "./Login.scss";
import axios from "axios";
import Cookies from 'js-cookie'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const { post } = useFetch();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const user = { username, email, password };
    // post("/users/login", user)
    //   .then((user) => {
    //     return user;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    try {
      const response = await axios.post(
        "http://localhost:4567/api/users/login",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true, // Esta línea es importante
        }
      );
      const data = response.data;
      const token = Cookies.get('token');
      console.log({ttkkoonne: token});
      console.log({data});
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4567/api/users/logout",
        {},
        {
          withCredentials: true, // Esta línea es importante
        }
      );
      const user = response.data;
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <button onClick={logout}>Cerrar sesion</button>
    </>
  );
}
