import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Pages/Header/Header";
import Footer from "./Pages/Footer/Footer";
import HomePage from "./Pages/Home/Home";
import NewsPage from "./Pages/News/News";
import NewsDetails from "./Pages/NewsDetails/NewsDetails";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import AdminHome from "./Pages/AdminHome/AdminHome";
function App(props) {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route
            path="/topics/news"
            exact
            component={() => <NewsPage category="News" />}
          />

          <Route
            path="/topics/entertainment"
            exact
            component={() => <NewsPage category="Entertainment" />}
          />

          <Route
            path="/topics/sports"
            exact
            component={() => <NewsPage category="Sports" />}
          />

          <Route
            path="/topics/politics"
            exact
            component={() => <NewsPage category="Politics" />}
          />

          <Route
            path="/topics/business"
            exact
            component={() => <NewsPage category="Business" />}
          />

          <Route
            path="/topics/health"
            exact
            component={() => <NewsPage category="Health" />}
          />

          <Route
            path="/topics/metro-plus"
            exact
            component={() => <NewsPage category="Metro Plus" />}
          />

          <Route
            path="/topics/video"
            exact
            component={() => <NewsPage category="Video" />}
          />

          <Route
            path="/topics/foreign"
            exact
            component={() => <NewsPage category="Foreign" />}
          />

          <Route path="/:slug" exact component={NewsDetails} />
          <Route path="/admin/login" exact component={AdminLogin} />
          <Route path="/admin/home" exact component={AdminHome} />
        </Switch>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
