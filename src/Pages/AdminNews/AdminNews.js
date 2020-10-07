import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./AdminNews.css";
const AdminNews = () => {
  const history = useHistory();
  const [user_id, setuser_id] = useState(null);
  const [user, setuser] = useState({});
  const [genNews, setgenNews] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [newsMessagebox, setnewsMessagebox] = useState(false);
  const [newSMessageBoxColor, setnewSMessageBoxColor] = useState("green");
  const [newsmessage, setnewsmessage] = useState("");
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
  const verify = (id, mode) => {
    const url = `https://naijadaily.000webhostapp.com/verify.php?mode=${mode}`;
    setisLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res[0]) {
          setuser_id(id);
          setuser(res[1]);
          fetchPosts();
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

  const delPost = (id) => {
    setisLoading(true);
    const url = `https://naijadaily.000webhostapp.com/delete-post.php?id=${id}`;
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        setisLoading(false);
        window.scrollTo(0, 0);
        setnewsMessagebox(true);
        setnewsmessage(res);
        setnewSMessageBoxColor("green");
        fetchPosts();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="admin-news">
        <div className="allnews-admin">
          <h1 style={{ textAlign: "center" }}>All News</h1>
          {newsMessagebox ? (
            <div
              className="messageDiv"
              style={{ backgroundColor: newSMessageBoxColor }}
            >
              <p>{newsmessage}</p>
            </div>
          ) : (
            ""
          )}
          {genNews.length > 0 ? (
            genNews.map((news) => {
              return (
                <div key={news.id} className="allnews-admin-cat">
                  <h1>{news.title}</h1>
                  <p className="views" style={{ opacity: "0.7" }}>
                    <FontAwesomeIcon color="#000" icon={faEye} />{" "}
                    {
                      (news.views + "")
                        .replace(/[^"]+;[^"]+/g, "")
                        .replace(/^"*|"*$/g, "")
                        .split('""').length
                    }
                  </p>
                  <div className="action-buttons">
                    <Link
                      className="btn-edt"
                      to={"/admin/edit/" + news.post_id}
                    >
                      <button>Edit</button>
                    </Link>
                    <button
                      onClick={() => delPost(news.post_id)}
                      className="btn-del"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No news</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNews;
