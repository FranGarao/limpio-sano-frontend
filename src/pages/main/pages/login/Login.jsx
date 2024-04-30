import { useState } from "react";
import "./Login.scss";
import useApiRequest from "../../../../hooks/useApiRequest";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [faVerify, setFaVerify] = useState(false);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const { post } = useApiRequest();

  const redirect = (path) => {
    navigate(path);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const [faCode, setFaCode] = useState("");
  const submitFA = async () => {
    await post(`/users/verify`, { faCode, userId })
      .then((res) => {
        console.log(new Date());
        if (res?.verified) {
          login();
        }
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

  const login = async () => {
    redirect('/dashboard/users');
  };

  const handleFaCode = (e) => {
    setFaCode(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
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
        if (response?.user?.error) {
          setError(response?.user?.error);
          setFaVerify(false);
        } else {
          setUserId(response?.user?.id);
          setError(null);
          setFaVerify(true);
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-form-title">LOGIN</h2>

        <div className="form-containers">
          <label className="username-label" htmlFor="username">
            Username
          </label>
          <input
            placeholder="Ingresa tu nombre de usuario aqui."
            className="username-input"
            name="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <br />
        <div className="form-containers">
          <label className="email-label" htmlFor="email">
            Email
          </label>
          <input
            placeholder="Ingresa tu dirección de correo aqui."
            className="email-input"
            name="username"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <br />
        <div className="form-containers">
          <label className="password-label" htmlFor="password">
            Password
          </label>
          <input
            placeholder="Ingresa tu contraseña aqui."
            className="password-input"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {error && <p>{error}</p>}

        <br />
        <button className="login-btn" type="submit">
          SIGN IN
        </button>
      </form>
      {faVerify && (
        <div className="verify-container">
          <label className="verify-label" htmlFor="faCode">
            Codigo de verificacion
          </label>
          <input
            className="verify-input"
            type="text"
            onChange={handleFaCode}
            value={faCode}
            name="faCode"
            id="faCode"
          />
          <button className="verify-btn" onClick={submitFA}>
            Confirmar
          </button>
        </div>
      )}
    </>
  );
}
