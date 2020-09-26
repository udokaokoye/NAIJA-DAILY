import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
require("./News.css");
const News = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [allNews, setallNews] = useState([]);
  const fetchPosts = () => {
    const url = `http://192.168.43.30/PHP/api/fetch-posts.php?category=${props.category}`;
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
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPosts();
  }, []);

  const linkStyle = {
    listStyle: "none",
    textDecoration: "none",
    color: "black",
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
    <div className="news_main">
      <h1 className="page_title">{props.category}</h1>
      <div className="news_top">
        <div className="headline">
          {allNews.length > 0 ? (
            allNews.slice(0, 1).map((news) => {
              return (
                <Link to={"/" + news.slug} style={linkStyle}>
                  <div className="main_headline">
                    <div className="img">
                      <img
                        width="100%"
                        height="100%"
                        src={news.picture_1}
                        alt={news.title}
                      />
                    </div>
                    <h5>{news.title}</h5>
                  </div>
                </Link>
              );
            })
          ) : (
            <h1>No News Available</h1>
          )}

          <div className="sub_headline">
            {allNews.length >= 4 ? (
              allNews.slice(1, 4).map((news) => {
                return (
                  <div className="sub_headline_cat">
                    <Link to={"/" + news.slug} style={linkStyle}>
                      <div className="img">
                        <img
                          width="100%"
                          height="100%"
                          src={news.picture_1}
                          alt={news.title}
                        />
                      </div>
                      <h6>{news.title}</h6>
                    </Link>
                  </div>
                );
              })
            ) : (
              <h1>No News Available</h1>
            )}
          </div>
        </div>

        <div className="news_list">
          <div className="news_list_bar">
            <li>News List</li>
          </div>
          <div className="list">
            {allNews.length > 0 ? (
              allNews.map((news) => {
                return (
                  <Link to={"/" + news.slug} style={linkStyle}>
                    <p>{news.title}</p>
                  </Link>
                );
              })
            ) : (
              <h1>No News Available</h1>
            )}
          </div>
        </div>
      </div>

      <div className="news_section2">
        {allNews.length > 0 ? (
          allNews.map((news) => {
            return (
              <Link to={"/" + news.slug} style={linkStyle}>
                <div className="news_section2_cat">
                  <div className="img">
                    <img
                      width="100%"
                      height="100%"
                      src={news.picture_1}
                      alt={news.title}
                    />
                  </div>
                  <div className="information">
                    <h4>{news.title}</h4>
                    <p>{news.summary}</p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <h1>No News Available</h1>
        )}
      </div>
    </div>
  );
};

export default News;
