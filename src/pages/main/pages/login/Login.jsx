import { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import useApiRequest from "../../../../hooks/useApiRequest";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { post } = useApiRequest();

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

    post("/users/login", {
      username,
      email,
      password,
    })
      .then((response) => {
        window.location.href = "/dashboard";
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const logout = async () => {
    post("/users/logout")
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
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
      <Link to="/dashboard">
        <button>dashboard</button>
      </Link>
      <button onClick={logout}>Cerrar sesion</button>
    </>
  );
}
