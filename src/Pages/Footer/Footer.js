import React, { useState } from "react";
import { Link } from "react-router-dom";
require("./Footer.css");

const linkStyle = {
  listStyle: "none",
  textDecoration: "none",
  color: "white",
};
const Footer = (props) => {
  const [browserSize, setbrowserSize] = useState(window.innerWidth);
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <footer>
        <div className="subscribe">
          <h5>Subscribe to our newsletter</h5>
          <center>
            <input type="email" name="email" id="" placeholder="Enter E-mail" />
          </center>
        </div>

        <div className="links_1">
          <Link to={"/"} style={linkStyle}>
            <p>HOME</p>
          </Link>
          <Link to="/topics/news" style={linkStyle}>
            <p>NEWS</p>
          </Link>
          <Link to="/topics/entertainment" style={linkStyle}>
            <p>ENTERTAINMENT</p>
          </Link>
          <Link to="/topics/sports" style={linkStyle}>
            <p>SPORTS</p>
          </Link>
          <Link to="/topics/metro-plus" style={linkStyle}>
            <p>METRO PLUS</p>
          </Link>
          <Link to="/topics/politics" style={linkStyle}>
            <p>POLITICS</p>
          </Link>
          <Link to="/topics/business" style={linkStyle}>
            <p>BUSINESS</p>
          </Link>
        </div>
        <div className="copyright">
          <h2>
            Copyrights <strong>Naija Daily</strong> 2020
          </h2>
          <br />
          <div className="img">
            <img
              width={"100%"}
              height={"100%"}
              src={require("../../assets/logo-white-bold.png")}
              alt=""
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
