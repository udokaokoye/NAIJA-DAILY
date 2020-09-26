import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
require("./Home.css");
const Home = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [justin, setjustin] = useState([]);
  const [allNews, setallNews] = useState([]);
  const [headline, setheadline] = useState({});
  const [videos, setvideos] = useState([]);
  const [sports, setsports] = useState([]);
  const fetchPosts = () => {
    const url = `http://192.168.43.30/PHP/api/fetch-posts.php?category=all`;
    setisLoading(true);
    fetch(url, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((res) => {
        setallNews(res);
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const fetchVideos = () => {
    const url = `http://192.168.43.30/PHP/api/fetch-posts.php?category=videos`;
    setisLoading(true);
    fetch(url, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((res) => {
        setvideos(res);
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const fetchSports = () => {
    const url = `http://192.168.43.30/PHP/api/fetch-posts.php?category=sports`;
    setisLoading(true);
    fetch(url, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((res) => {
        setsports(res);
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPosts();
    fetchVideos();
    fetchSports();
  }, []);

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

  const linkStyle = {
    listStyle: "none",
    textDecoration: "none",
    color: "black",
  };
  return (
    <React.Fragment>
      <div className="home_main">
        <div className="top">
          <div className="featured">
            <div className="featured_bar">
              <li>FEATURED</li>
            </div>
            {allNews.length > 0 ? (
              allNews.slice(0, 1).map((news) => {
                return (
                  <Link style={linkStyle} to={"/" + news.slug}>
                    <div className="featured_main">
                      <div className="img">
                        <img src={news.picture_1} alt="Headline Image" />
                      </div>
                      <span>{news.title}</span>
                    </div>
                  </Link>
                );
              })
            ) : (
              <h1>No Headline Available</h1>
            )}

            <div className="featured_sub">
              {allNews.length >= 4 ? (
                allNews.slice(1, 4).map((news) => {
                  return (
                    <div className="featured_sub_cat">
                      <Link to={news.slug} style={linkStyle}>
                        <div className="content">
                          <img src={news.picture_1} alt="sub-category" />
                          <h3>{news.title}</h3>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <h1>No Sub Category Available</h1>
              )}
            </div>
          </div>
          <div className="justIn">
            <div className="justIn_bar">
              <li>JUST IN</li>
            </div>
            <div className="justIn_news">
              {allNews.length > 10 ? (
                allNews.slice(0, 10).map((news) => {
                  return (
                    <Link style={linkStyle} to={"/" + news.slug}>
                      <div className="justIn_news_cat">
                        <h5>{news.title}</h5>
                        <p>11:45 am</p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <h1>No News Available</h1>
              )}
            </div>
          </div>
        </div>
        <div className="news_categories">
          <div className="videos">
            <div className="videos_bar">
              <li>VIDEOS</li>
              <Link
                to="/topics/video"
                style={{ color: "red", textDecoration: "none" }}
              >
                <p>READ MORE</p>
              </Link>
            </div>
            <div className="content">
              {videos.length >= 3 ? (
                videos.slice(0, 3).map((video) => {
                  return (
                    <div className="vid_cat">
                      <Link to={video.slug} style={linkStyle}>
                        <div className="img">
                          <img src={video.picture_1} alt="vid-category" />
                        </div>
                        <h3>{video.title}</h3>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <h1>No News Avalable</h1>
              )}
            </div>
          </div>

          <div className="sports">
            <div className="sports_bar">
              <li>SPORTS</li>
              <Link
                to="/topics/sports"
                style={{ color: "red", textDecoration: "none" }}
              >
                <p>READ MORE</p>
              </Link>
            </div>
            <div className="content">
              {sports.length >= 3 ? (
                sports.slice(0, 3).map((sport) => {
                  return (
                    <div className="sport_cat">
                      <Link to={sport.slug} style={linkStyle}>
                        <div className="img">
                          <img src={sport.picture_1} alt="vid-category" />
                        </div>
                        <h3>{sport.title}</h3>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <h1>No news available</h1>
              )}
            </div>
          </div>
        </div>

        <div className="news_categories">
          <div className="videos">
            <div className="videos_bar">
              <li>METRO PLUS</li>
              <Link
                to="/topics/video"
                style={{ color: "red", textDecoration: "none" }}
              >
                <p>READ MORE</p>
              </Link>
            </div>
            <div className="content">
              {videos.length >= 3 ? (
                videos.slice(0, 3).map((video) => {
                  return (
                    <div className="vid_cat">
                      <Link to={video.slug} style={linkStyle}>
                        <div className="img">
                          <img src={video.picture_1} alt="vid-category" />
                        </div>
                        <h3>{video.title}</h3>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <h1>No News Avalable</h1>
              )}
            </div>
          </div>

          <div className="sports">
            <div className="sports_bar">
              <li>ENTERTAINMENT</li>
              <Link
                to="/topics/sports"
                style={{ color: "red", textDecoration: "none" }}
              >
                <p>READ MORE</p>
              </Link>
            </div>
            <div className="content">
              {sports.length >= 3 ? (
                sports.slice(0, 3).map((sport) => {
                  return (
                    <div className="sport_cat">
                      <Link to={sport.slug} style={linkStyle}>
                        <div className="img">
                          <img src={sport.picture_1} alt="vid-category" />
                        </div>
                        <h3>{sport.title}</h3>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <h1>No news available</h1>
              )}
            </div>
          </div>
        </div>

        <div className="news_categories">
          <div className="videos">
            <div className="videos_bar">
              <li>POLITICS</li>
              <Link
                to="/topics/video"
                style={{ color: "red", textDecoration: "none" }}
              >
                <p>READ MORE</p>
              </Link>
            </div>
            <div className="content">
              {videos.length >= 3 ? (
                videos.slice(0, 3).map((video) => {
                  return (
                    <div className="vid_cat">
                      <Link to={video.slug} style={linkStyle}>
                        <div className="img">
                          <img src={video.picture_1} alt="vid-category" />
                        </div>
                        <h3>{video.title}</h3>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <h1>No News Avalable</h1>
              )}
            </div>
          </div>

          <div className="sports">
            <div className="sports_bar">
              <li>BUSINESSS</li>
              <Link
                to="/topics/sports"
                style={{ color: "red", textDecoration: "none" }}
              >
                <p>READ MORE</p>
              </Link>
            </div>
            <div className="content">
              {sports.length >= 3 ? (
                sports.slice(0, 3).map((sport) => {
                  return (
                    <div className="sport_cat">
                      <Link to={sport.slug} style={linkStyle}>
                        <div className="img">
                          <img src={sport.picture_1} alt="vid-category" />
                        </div>
                        <h3>{sport.title}</h3>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <h1>No news available</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
