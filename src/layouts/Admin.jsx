import React, { Component } from "react";
import { Route, Switch} from "react-router-dom";
import NotificationSystem from "react-notification-system";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import StatsCard from "components/StatsCard/StatsCard";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";
import { style } from "variables/Variables.jsx";
import routes from "routes.js";
import image from "assets/img/sidebar-3.jpg";

import {Row, Col, Grid, Table,FormGroup,ControlLabel, FormControl } from "react-bootstrap";
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      image: image,
      color: "twitterdark",
      hasImage: false,
      fixedClasses: "dropdown show-dropdown"
    };

    this.onSubmit = this.onSubmit.bind(this);
  }
  handleNotificationClick = position => {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Twitter lite</b> - MUM Compro 2019
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      console.log(prop.layout + " : " + prop.path + " : " + key);
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
      } 
      // else if(prop.layout === "/login"){
      //   return this.props.history.push("/");
      //   // <Redirect to="/login" />
      //   // return <Route
      //   // path="/"
      //   // key={key}
      //   // <Route exact path="/" render={props => <SignInForm {...props} />} />
      // // />;
      // // return <Redirect to="/login" />
      // }
      else return <Route
      path="/login"
      key={key}
      />
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    _notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
          every web developer.
        </div>
      ),
      level: level,
      position: "tr",
      autoDismiss: 15
    });
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.history.push("/admin/userlist#"+this.search.value);
  }

  render() {
    return (
      <div className="wrapper">
        <Row>
                <Col md={3}>
                <NotificationSystem ref="notificationSystem" style={style} />
        <Sidebar {...this.props} routes={routes} image={this.state.image}
        color={this.state.color}
        hasImage={this.state.hasImage}/>
                </Col>
                <Col md={10}>
                <div id="main-panel" className="main-panel" ref="mainPanel">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
          {/* <Footer /> */}
          <FixedPlugin
            handleImageClick={this.handleImageClick}
            handleColorClick={this.handleColorClick}
            handleHasImage={this.handleHasImage}
            bgColor={this.state["color"]}
            bgImage={this.state["image"]}
            mini={this.state["mini"]}
            handleFixedClick={this.handleFixedClick}
            fixedClasses={this.state.fixedClasses}
          />
        </div>
                </Col>
                <Col md={2}>
                  <br/>
                  <Grid fluid>
                    <Card content={
                      <form onSubmit={this.onSubmit}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Search</ControlLabel>
                            <FormControl
                              name= "search"
                              inputRef={(ref) => {this.search = ref}}
                              bsClass="form-control"
                              placeholder="Search user"
                              // defaultValue = "data"
                            />
                          </FormGroup>
                          <Button bsStyle="info" pullRight fill type="submit">Search</Button>
                        <div className="clearfix" />
                      </form>
                    }/>
                  </Grid>
                </Col>
              </Row>
      </div>
    );
  }
}

export default Admin;
