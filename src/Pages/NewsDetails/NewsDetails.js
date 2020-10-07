import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faWhatsapp,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "./NewsDetails.css";
const NewsDetails = (props) => {
  const [news, setnews] = useState({});
  const [allnews1, setallnews1] = useState([]);
  const [allnews2, setallnews2] = useState([]);
  const [genNews, setgenNews] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [newsBody, setnewsBody] = useState("");
  let { slug } = useParams();
  const fetchnews = (slug) => {
    window.scrollTo(0, 0);
    const url = `https://naijadaily.000webhostapp.com/fetch-posts.php?slug=${slug}`;
    setisLoading(true);
    fetch(url, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((res) => {
        setnews(res[0]);
        document.title = res[0].title;
        setnewsBody(
          (res[0].content + "")
            .replace(
              "IMG-002",
              `<img width='100%' src='${res[0].picture_2}' title='${res[0].title}' alt='${res[0].title}'/>`
            )
            .replace(
              "IMG-003",
              `<img width='100%' src='${res[0].picture_3}' title='${res[0].title}' alt='${res[0].title}'/>`
            )
            .replace(
              "IMG-004",
              `<img width='100%' src='${res[0].picture_4}' title='${res[0].title}' alt='${res[0].title}'/>`
            )
        );
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const fetchPosts = () => {
    const url = `https://naijadaily.000webhostapp.com/fetch-posts.php?category=News`;
    setisLoading(true);
    fetch(url, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((res) => {
        setgenNews(res);
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const setView = async () => {
    setisLoading(true);
    const formData = new FormData();
    formData.append("ip", "userIP");
    formData.append(
      "slug",
      (window.location.href + "").replace(
        "https://naija-daily.netlify.app/",
        ""
      )
    );
    const url = "https://naijadaily.000webhostapp.com/views.php";
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setisLoading(false);
        localStorage.removeItem("user--ip");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchnews(slug);
    fetchPosts();
    setView();
    window.scrollTo(0, 0);
  }, []);

  var disqus_config = function () {
    this.page.url = "NAIJA DAILY"; // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = "NAIJA DAILY"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
  };

  (function () {
    // DON'T EDIT BELOW THIS LINE
    var d = document,
      s = d.createElement("script");
    s.src = "https://naija-daily.disqus.com/embed.js";
    s.setAttribute("data-timestamp", +new Date());
    (d.head || d.body).appendChild(s);
  })();

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

  if (news.length < 10) {
    setnews({
      title: "News not found",
    });
  }

  return (
    <div className="news_details_main">
      <div className="left">
        <div className="news_details_top">
          <h2>{news.title}</h2>
          {/* <div dangerouslySetInnerHTML={{ __html: test }} /> */}
          <hr />
          <p className="published-date">
            Published <span>{news.created_at}</span>
          </p>
          <div className="share_news">
            <div className="inner">
              <li>Kindly Share This News</li>
              <div className="share_news_icons">
                <span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?=${window.location.href}`}
                    target="__blank"
                  >
                    <FontAwesomeIcon color="#3b5998 " icon={faFacebook} />
                  </a>
                </span>
                <span>
                  <a
                    href={`https://api.whatsapp.com/send?text=${window.location.href}`}
                    target="__blank"
                  >
                    <FontAwesomeIcon color="#075e54" icon={faWhatsapp} />
                  </a>
                </span>
                <span>
                  <a
                    class="twitter-share-button"
                    href={`https://twitter.com/intent/tweet?text=${window.location.href}`}
                    target="__blank"
                  >
                    <FontAwesomeIcon color="#00acee" icon={faTwitter} />
                  </a>
                </span>
              </div>
            </div>
          </div>

          <div className="thumbnail">
            <img
              width="100%"
              height="100%"
              src={news.picture_1}
              alt={news.title}
            />
          </div>
        </div>

        <div className="news_body">
          <p className="publisher_name">
            {" "}
            Published By: <span>{news.author_name}</span>
          </p>
          <p className="views" style={{ opacity: "0.7" }}>
            <FontAwesomeIcon color="#000" icon={faEye} />{" "}
            {
              (news.views + "")
                .replace(/[^"]+;[^"]+/g, "")
                .replace(/^"*|"*$/g, "")
                .split('""').length
            }
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: newsBody,
            }}
            className="news_body_text"
          />
          <center>
            {" "}
            {news.video === "true" ? (
              <div className="video">
                <br />
                <h5>Watch video below</h5>
                <video controls src={news.video_path}></video>
              </div>
            ) : (
              ""
            )}
          </center>
        </div>
        <div className="share_news">
          <div className="inner">
            <li>Kindly Share This News</li>
            <div className="share_news_icons">
              <span>
                <a
                  target="__blank"
                  href={`https://www.facebook.com/sharer/?u=${window.location.href}`}
                ></a>
                <FontAwesomeIcon color="#3b5998 " icon={faFacebook} />
              </span>
              <span>
                <a
                  href={`https://api.whatsapp.com/send?text=${window.location.href}`}
                  target="__blank"
                >
                  <FontAwesomeIcon color="#075e54" icon={faWhatsapp} />
                </a>
              </span>
              <span>
                <a
                  target="__blank"
                  href={`https://twitter.com/intent/tweet?text=${window.location.href}`}
                >
                  <FontAwesomeIcon color="#00acee" icon={faTwitter} />
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="other_news">
          <div className="other_news_1">
            {genNews.length >= 10 ? (
              genNews.slice(1, 5).map((news) => (
                <Link
                  className="other_news_link"
                  to={"/" + news.slug}
                  slug={news.slug}
                  style={linkStyle}
                >
                  <div
                    onClick={() => fetchnews(news.slug)}
                    className="other_news_cat"
                  >
                    <div className="img">
                      <img
                        width="100%"
                        height="100%"
                        src={news.picture_1}
                        alt={news.title}
                      />
                    </div>
                    <h6>{news.title}</h6>
                  </div>
                </Link>
              ))
            ) : (
              <h1>No News Available</h1>
            )}
          </div>

          <div className="other_news_2">
            {genNews.length >= 8 ? (
              genNews.slice(6, 10).map((news) => (
                // <Link to={"/" + news.slug}>

                <Link
                  className="other_news_link"
                  to={"/" + news.slug}
                  slug={news.slug}
                  style={linkStyle}
                >
                  <div
                    onClick={() => fetchnews(news.slug)}
                    className="other_news_cat"
                  >
                    <div className="img">
                      <img
                        width="100%"
                        height="100%"
                        src={news.picture_1}
                        alt={news.title}
                      />
                    </div>
                    <h6>{news.title}</h6>
                  </div>
                </Link>

                // </Link>
              ))
            ) : (
              <h1>No News Available</h1>
            )}
          </div>
        </div>
        <div className="comments">
          <div id="disqus_thread"></div>
        </div>
      </div>

      <div className="right">
        <div className="news_list">
          <div className="news_list_bar">
            <li>News List</li>
          </div>
          <div className="list">
            {genNews.length > 0 ? (
              genNews.map((news) => {
                return (
                  <Link style={linkStyle} to={"/" + news.slug}>
                    {" "}
                    <p onClick={() => fetchnews(news.slug)}>
                      {news.title}
                    </p>{" "}
                  </Link>
                );
              })
            ) : (
              <h1>No news Available</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
