import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Link,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
require("./Header.css");
const Header = () => {
  const [activeLink, setactiveLink] = useState("Home");
  const [sideBar, setsideBar] = useState(false);
  const [browserSize, setbrowserSize] = useState(window.innerWidth);
  // const active = localStorage.getItem("active");

  const brs = () => {
    if (browserSize > 768) {
      return <div></div>;
    } else {
      return (
        <div>
          <br />
          <br />
          <br />
        </div>
      );
    }
  };

  function disableScrolling() {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () {
      window.scrollTo(x, y);
    };
  }

  function enableScrolling() {
    window.onscroll = function () {};
  }
  if (sideBar === false) {
    enableScrolling();
  }

  // useEffect(() => {
  //   brs();
  // }, [browserSize]);

  const activeStyle = { color: "#CF2D2D" };
  const open = {
    transition: "all 0.5s ease-in-out",
    height: "100%",
    width: "80%",
    backgroundColor: "white",
    transform: "translateX(0px)",
  };

  const close = {
    transition: "all 0.5s ease-in-out",
    height: "100%",
    width: "0%",
    backgroundColor: "white",
    transform: "translateX(-1000px)",
  };
  return (
    <React.Fragment>
      <center>
        <div className="cov">
          <nav id="nav-1" className="nav">
            <div className="logo">
              <Link
                to="/"
                style={{
                  color: "black",
                  textDecoration: "none",
                  listStyle: "none",
                }}
              >
                {/* <h1>NAIJA DAILY</h1> */}
                <img
                  width={browserSize > 768 ? "70%" : "100%"}
                  height={browserSize > 768 ? "70%" : "100%"}
                  src={require("../../assets/logo-black-bold.png")}
                  alt=""
                />
              </Link>
            </div>
            <div className="links">
              <ul>
                <NavLink
                  to="/"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    listStyle: "none",
                  }}
                  activeStyle={activeStyle}
                  className="link"
                  exact
                >
                  HOME
                </NavLink>
                <NavLink
                  to="/topics/news"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    listStyle: "none",
                  }}
                  className="link"
                >
                  NEWS
                </NavLink>

                <NavLink
                  to="/topics/entertainment"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    listStyle: "none",
                  }}
                  activeStyle={activeStyle}
                  className="link"
                  exact
                >
                  ENTERTAINMENT
                </NavLink>

                <NavLink
                  to="/topics/sports"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    listStyle: "none",
                  }}
                  className="link"
                >
                  SPORTS
                </NavLink>

                <NavLink
                  to="/topics/metro-plus"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    listStyle: "none",
                  }}
                  className="link"
                >
                  METRO PLUS
                </NavLink>
                <NavLink
                  to="/topics/politics"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    listStyle: "none",
                  }}
                  className="link"
                >
                  POLITICS
                </NavLink>
                <NavLink
                  to="/topics/business"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    listStyle: "none",
                  }}
                  className="link"
                >
                  BUSINESS
                </NavLink>
                <NavLink
                  to="/topics/health"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    listStyle: "none",
                  }}
                  className="link"
                >
                  HEALTH
                </NavLink>
                <NavLink
                  to="/topics/foreign"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    listStyle: "none",
                  }}
                  className="link last-link"
                >
                  FOREIGN
                </NavLink>
              </ul>
            </div>
            <div
              className="menu"
              onClick={() => {
                setsideBar(true);
                window.scrollTo(0, 0);
                disableScrolling();
              }}
            >
              <FontAwesomeIcon color="black" icon={faBars} />
            </div>
          </nav>
        </div>
      </center>
      <div
        onClick={() => {
          setsideBar(false);
          enableScrolling();
        }}
        style={{ display: sideBar ? "block" : "none" }}
        className="overlay-side"
      ></div>
      <div className="sidebar" style={sideBar ? open : close}>
        <div className="sidebar-bar">
          <div className="inner">
            <div className="img">
              <img
                width={"100%"}
                height={"100%"}
                src={require("../../assets/logo-white-bold.png")}
                alt=""
              />
            </div>{" "}
            <span
              onClick={() => {
                setsideBar(false);
                enableScrolling();
              }}
            >
              <FontAwesomeIcon color="white" icon={faTimes} />
            </span>
          </div>
        </div>
        <div className="side-links">
          <ul>
            <NavLink
              to="/"
              style={{
                color: "black",
                textDecoration: "none",
                listStyle: "none",
              }}
              activeStyle={activeStyle}
              className="link"
              exact
              onClick={() => {
                setsideBar(false);
              }}
            >
              HOME
            </NavLink>
            <NavLink
              to="/topics/news"
              style={{
                color: "black",
                textDecoration: "none",
                listStyle: "none",
              }}
              className="link"
              activeStyle={activeStyle}
              onClick={() => {
                setsideBar(false);
              }}
            >
              NEWS
            </NavLink>

            <NavLink
              to="/topics/entertainment"
              style={{
                color: "black",
                textDecoration: "none",
                listStyle: "none",
              }}
              activeStyle={activeStyle}
              className="link"
              exact
              onClick={() => {
                setsideBar(false);
              }}
            >
              ENTERTAINMENT
            </NavLink>

            <NavLink
              to="/topics/sports"
              style={{
                color: "black",
                textDecoration: "none",
                listStyle: "none",
              }}
              className="link"
              activeStyle={activeStyle}
              onClick={() => {
                setsideBar(false);
              }}
            >
              SPORTS
            </NavLink>

            <NavLink
              to="/topics/metro-plus"
              style={{
                color: "black",
                textDecoration: "none",
                listStyle: "none",
              }}
              className="link"
              activeStyle={activeStyle}
              onClick={() => {
                setsideBar(false);
              }}
            >
              METRO PLUS
            </NavLink>
            <NavLink
              to="/topics/politics"
              style={{
                color: "black",
                textDecoration: "none",
                listStyle: "none",
              }}
              className="link"
              activeStyle={activeStyle}
              onClick={() => {
                setsideBar(false);
              }}
            >
              POLITICS
            </NavLink>
            <NavLink
              to="/topics/business"
              style={{
                color: "black",
                textDecoration: "none",
                listStyle: "none",
              }}
              className="link"
              activeStyle={activeStyle}
              onClick={() => {
                setsideBar(false);
              }}
            >
              BUSINESS
            </NavLink>
            <NavLink
              to="/topics/health"
              style={{
                color: "black",
                textDecoration: "none",
                listStyle: "none",
              }}
              className="link"
              activeStyle={activeStyle}
              onClick={() => {
                setsideBar(false);
              }}
            >
              HEALTH
            </NavLink>
            <NavLink
              to="/topics/foreign"
              style={{
                color: "black",
                textDecoration: "none",
                listStyle: "none",
              }}
              className="link last-link"
              activeStyle={activeStyle}
              onClick={() => {
                setsideBar(false);
              }}
            >
              FOREIGN
            </NavLink>
          </ul>
        </div>
      </div>
      {brs()}
    </React.Fragment>
  );
};

export default Header;
