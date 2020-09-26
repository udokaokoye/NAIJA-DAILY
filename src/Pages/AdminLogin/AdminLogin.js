import React, { useState, useEffect } from "react";
import "./AdminLogin.css";
import { Link, useHistory } from "react-router-dom";
const Admin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [valid, setvalid] = useState(false);
  const [message, setmessage] = useState("");
  const [showMessagebox, setshowMessagebox] = useState(false);
  const history = useHistory();

  const verify = (id, mode) => {
    const url = `http://192.168.43.30/PHP/api/verify.php?mode=${mode}`;
    setisLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          history.push("/admin/home");
        } else {
          history.push("/admin/login");
        }
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      verify(userId, "user");
    } else {
      history.push("/admin/login");
    }
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setisLoading(true);
    fetch("http://192.168.43.30/PHP/api/admin-login.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        setshowMessagebox(true);
        setmessage(res);
        if (res[0] === "Success") {
          setvalid(true);
          setmessage(res);
          localStorage.setItem("user_id", res[1]);
          history.push("/admin/home");
        } else {
          setvalid(false);
        }

        setisLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img
          width="100px"
          src={require("../../assets/Chunk-4s-200px.gif")}
          alt=""
        />
      </div>
    );
  }
  return (
    <div className="AdminLogin_main">
      <h1>ADMIN LOGIN</h1>

      {showMessagebox ? (
        <div
          className="message_box"
          style={{ backgroundColor: valid ? "#45f36d" : "#d82938" }}
        >
          <p>{message}</p>
        </div>
      ) : (
        ""
      )}
      <form method="POST" onSubmit={handleSubmit}>
        <div className="container">
          <label for="email">
            <b>Email</b>
          </label>
          <input
            type="email"
            value={email}
            onChange={(val) => setemail(val.target.value)}
            placeholder="Enter Email"
            name="email"
            required
          />

          <label for="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={password}
            onChange={(val) => setpassword(val.target.value)}
            required
          />

          <button type="submit">Login</button>
        </div>

        <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
          <button type="button" className="cancelbtn">
            Cancel
          </button>
          <span className="psw">
            Forgot <a href="#">password?</a>
          </span>
        </div>
      </form>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Admin;
