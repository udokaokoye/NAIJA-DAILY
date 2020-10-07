import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "./AdminHome.css";
const AdminHome = () => {
  const urlParam = useParams();
  const history = useHistory();
  const [user_id, setuser_id] = useState(null);
  const [user, setuser] = useState({});
  const [modalVisibility, setmodalVisibility] = useState("none");
  const [firstname, setfirstname] = useState("");
  const [middlename, setmiddlename] = useState("");
  const [lastname, setlastname] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [intro, setintro] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [verLoading, setverLoading] = useState(false);
  const [showMessagebox, setshowMessagebox] = useState(false);
  const [message, setmessage] = useState("");
  const [valid, setvalid] = useState(false);

  const [title, settitle] = useState("");
  const [summary, setsummary] = useState("");
  const [body, setbody] = useState("");
  const [category, setcategory] = useState("ENTERTAINMENT");
  const [schedule, setschedule] = useState(false);
  const [video, setvideo] = useState(false);

  const [newsMessagebox, setnewsMessagebox] = useState(false);
  const [newSMessageBoxColor, setnewSMessageBoxColor] = useState("green");
  const [newsmessage, setnewsmessage] = useState("");

  const [editPost, seteditPost] = useState({});

  const [videoPath, setvideoPath] = useState("");
  const [img1, setimg1] = useState("");
  const [img2, setimg2] = useState("");
  const [img3, setimg3] = useState("");
  const [img4, setimg4] = useState("");
  const [postId, setpostId] = useState("");
  const verify = (id, mode) => {
    const url = `https://naijadaily.000webhostapp.com/verify.php?mode=${mode}`;
    // setverLoading(true);
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
        } else {
          history.push("/admin/login");
        }
        // setverLoading(false);
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

    if (urlParam.id) {
      const url = `https://naijadaily.000webhostapp.com/fetch-posts.php?post_id=${urlParam.id}`;
      setisLoading(true);
      fetch(url, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((res) => {
          seteditPost(res[0]);
          settitle(res[0].title);
          setsummary(res[0].summary);
          setbody(res[0].content);
          setvideo(res[0].video);

          if (res[0].video == "true") {
            setvideoPath(res[0].video_path);
          }
          setimg1(res[0].picture_1);
          setimg2(res[0].picture_2);
          setimg3(res[0].picture_3);
          setimg4(res[0].picture_4);
          setpostId(res[0].post_id);
          setisLoading(false);
        });
    }
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setisLoading(true);
    fetch("https://naijadaily.000webhostapp.com/add-publisher.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstname,
        middleName: middlename,
        lastName: lastname,
        mobile: mobile,
        email: email,
        password: password,
        intro: intro,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        setshowMessagebox(true);
        setmessage(res[0]);
        if (res[0] === "Success") {
          setvalid(true);
        } else {
          setvalid(false);
        }

        setisLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const postNews = async (evt) => {
    setisLoading(true);
    evt.preventDefault();
    var image1 = document.getElementById("postImage1").files;
    var image2 = document.getElementById("postImage2").files;
    var image3 = document.getElementById("postImage3").files;
    var image4 = document.getElementById("postImage4").files;

    // var formdataa = new FormData(document.getElementById("newsForm"));
    const formData = new FormData();
    if (image1[0] !== null) {
      formData.append("image1", image1[0]);
    }

    if (image2[0] !== null) {
      formData.append("image2", image2[0]);
    }

    if (image3[0] !== null) {
      formData.append("image3", image3[0]);
    }

    if (image4[0] !== null) {
      formData.append("image4", image4[0]);
    }

    if (video) {
      if (document.getElementById("postVideo").files.length !== 0) {
        var videos = document.getElementById("postVideo").files;
        for (let i = 0; i < videos.length; i++) {
          let vid_up = videos[i];

          formData.append("videos[]", vid_up);
        }
      }
    }
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("body", body);
    formData.append("category", category);
    formData.append("video", video);
    formData.append(
      "author_name",
      user.lastName + " " + user.middleName + " " + user.firstName
    );
    formData.append("author_id", user.user_id);
    formData.append("video_path", videoPath);
    formData.append("old_img1", img1);
    formData.append("old_img2", img2);
    formData.append("old_img3", img3);
    formData.append("old_img4", img4);
    formData.append("id", postId);

    if (editPost.title) {
      const url = "https://naijadaily.000webhostapp.com/update-post.php";
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((res) => {
          setisLoading(false);
          window.scrollTo(0, 0);
          setnewsMessagebox(true);
          setnewsmessage(res);
          setnewSMessageBoxColor("green");
        })
        .catch((err) => console.log(err));
    } else {
      const url = "https://naijadaily.000webhostapp.com/add-post.php";
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((res) => {
          setisLoading(false);
          window.scrollTo(0, 0);
          setnewsMessagebox(true);
          console.log(res);
          setnewsmessage(res[1]);
          if (res[0] !== "Success") {
            setnewSMessageBoxColor("red");
          }
        })
        .catch((err) => console.log(err));
    }
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

  if (verLoading) {
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
    <div>
      <div className="top_buttons">
        <button
          onClick={() => setmodalVisibility("block")}
          style={{ width: "auto" }}
        >
          Register Publisher
        </button>

        <Link to="/admin/allNews">
          <button style={{ width: "auto" }} className="logout">
            View Published News
          </button>
        </Link>

        <button
          style={{ width: "auto" }}
          onClick={() => {
            localStorage.removeItem("user_id");
            history.push("/admin/login");
          }}
          className="logout"
        >
          Logout
        </button>
      </div>

      <div
        id="id01"
        onClick={() => setmodalVisibility("none")}
        className="modal"
        style={{ display: modalVisibility }}
      >
        <form
          className="modal-content animate"
          method="post"
          onSubmit={handleSubmit}
        >
          <h2
            style={{
              paddingTop: "20px",
              paddingLeft: "20px",
              paddingBottom: "20px",
            }}
            className="reg_pub_text"
          >
            Register Publisher
          </h2>

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

          <div className="container">
            <label htmlFor="firstName">
              <b>First Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              value={firstname}
              onChange={(val) => setfirstname(val.target.value)}
              required
              minLength="1"
            />

            <label htmlFor="middleName">
              <b>Middle Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter Middle Name"
              name="middleName"
              value={middlename}
              onChange={(val) => setmiddlename(val.target.value)}
              required
              minLength="1"
            />

            <label htmlFor="lastName">
              <b>Last Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              value={lastname}
              onChange={(val) => setlastname(val.target.value)}
              required
              minLength="1"
            />

            <label htmlFor="mobileNumber">
              <b>Mobile Number</b>
            </label>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              name="mobileNumber"
              value={mobile}
              onChange={(val) => setmobile(val.target.value)}
              required
              minLength="1"
            />

            <label htmlFor="email">
              <b>E-mail</b>
            </label>
            <input
              type="email"
              placeholder="Enter E-mail"
              name="email"
              value={email}
              onChange={(val) => setemail(val.target.value)}
              required
              minLength="1"
            />

            <label htmlFor="displayName">
              <b>Display Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter Display name"
              name="displayName"
              value={intro}
              onChange={(val) => setintro(val.target.value)}
              required
              minLength="1"
            />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              value={password}
              onChange={(val) => setpassword(val.target.value)}
              required
              minLength="6"
            />

            <button type="submit">Register</button>
          </div>

          <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
            <button
              type="button"
              onClick={() => setmodalVisibility("none")}
              className="cancelbtn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div className="add_news">
        <h1>ADD NEWS</h1>
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
        <form
          method="POST"
          onSubmit={postNews}
          id="newsForm"
          encType="multipart/form-data"
          // action="http://192.168.43.30/PHP/api/add-post.php"
        >
          <div className="form-group">
            <label>Title</label>
            <br />

            <textarea
              value={title}
              onChange={(val) => settitle(val.target.value)}
              cols="50"
              rows="6"
              name="title"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Add Image / Thumbnail</label>
            <br />
            {editPost.title ? (
              <div>
                <p>
                  Image 1:{" "}
                  {editPost.picture_1 !== "" ? editPost.picture_1 : "No file"}
                </p>
                <p>
                  Image 2:{" "}
                  {editPost.picture_2 !== "" ? editPost.picture_2 : "No file"}
                </p>
                <p>
                  Image 3:{" "}
                  {editPost.picture_3 !== "" ? editPost.picture_3 : "No file"}
                </p>
                <br />
              </div>
            ) : (
              ""
            )}

            <input
              type="file"
              id="postImage1"
              name="image1"
              accept="Images/*"
              required={editPost.title ? false : true}
            />
          </div>

          <div className="form-group">
            <label>Add Image 2</label>
            <br />
            <input
              type="file"
              id="postImage2"
              name="image2"
              accept="Images/*"
            />
          </div>

          <div className="form-group">
            <label>Add Image 3</label>
            <br />
            <input
              type="file"
              id="postImage3"
              name="image3"
              accept="Images/*"
            />
          </div>

          <div className="form-group">
            <label>Add Image 4</label>
            <br />
            <input
              type="file"
              id="postImage4"
              name="image4"
              accept="Images/*"
            />
          </div>

          <div className="form-group">
            <label>Summary</label>
            <br />
            <textarea
              value={summary}
              onChange={(val) => setsummary(val.target.value)}
              cols="50"
              rows="6"
              name="summary"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Body</label>
            <br />
            <textarea
              value={body}
              onChange={(val) => setbody(val.target.value)}
              cols="50"
              rows="15"
              name="body"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Category</label>
            {editPost.title ? (
              <div>
                <br />
                <p>Selected category: {editPost.category}</p>
              </div>
            ) : (
              ""
            )}
            <br />
            <select
              value={category}
              onChange={(val) => setcategory(val.target.value)}
              name="category"
              required
            >
              <option value="ENTERTAINMENT">Entertainment</option>
              <option value="SPORT">Sport</option>
              <option value="METRO PLUS">Metro Plus</option>
              <option value="POLITICS">Politics</option>
              <option value="BUSINESS">Business</option>
              <option value="HEALTH">Health</option>
              <option value="FOREIGN">Foreign</option>
            </select>
          </div>

          <div className="form-group">
            <label>Do yo want to post now or schedule for later?</label>
            <br />

            <div className="rad">
              <input
                type="checkbox"
                checked={video == true ? true : false}
                onChange={() => (video ? setvideo(false) : setvideo(true))}
              />{" "}
              Video
            </div>

            {video ? (
              <div className="form-group">
                <label>Add Video</label>
                <br />
                <input
                  type="file"
                  id="postVideo"
                  name="videos[]"
                  accept="video/*"
                  required={editPost.title ? false : true}
                  multiple
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <input type="submit" value="Post" name="sub" />
        </form>

        {/* <form
          method="post"
          onSubmit={testhand}
          id="test_form"
          encType="multipart/form-data"
        >
          <input type="file" name="files[]" multiple />
          <input type="text" name="textt" id="" />
          <input type="submit" value="Upload File" name="submit" />
        </form> */}
      </div>
    </div>
  );
};

export default AdminHome;
