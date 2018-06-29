import React, { Component } from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Code";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Report from "@material-ui/icons/ReportProblem";
import PropTypes from "prop-types";

class Snippet extends Component {
  state = {
    value: 0,
    favs: 0,
    favored: false,
    heartColor: "grey",
    heartWidth: 168,
    backgroundColor: "transparent"
  };

  componentWillMount() {
    fetch(`/favs/${this.props.snippet.filename}/get`)
      .then(response => response.json())
      .then(myJson => {
        this.setState({
          favs: myJson.favs,
          heartWidth: 168 + myJson.favs * 4,
          backgroundColor:
            myJson.favs > 5 ? "rgb(237, 100, 100)" : "transparent",
          heartColor: myJson.favs > 5 ? "white" : "grey"
        });
      });
  }
  incrementFavs = () => {
    fetch(`/favs/${this.props.snippet.filename}/increment`)
      .then(response => response.json())
      .then(myJson => {
        console.log("done");
        this.setState({
          favored: true,
          favs: this.state.favs + 1,
          heartColor: "white",
          backgroundColor: "rgb(237, 100, 100)",
          heartWidth: 168 + this.state.favs * 4
        });
      });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <Card className="Snippet">
        <CardContent>
          <ReactMarkdown
            className="markdown-body"
            source={this.props.snippet.contents}
          />
        </CardContent>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          style={{ backgroundColor: "rgb(246, 246, 246)" }}
        >
          <BottomNavigationAction
            onClick={() =>
              window.open(
                `https://github.com/AmirBraham/unity-snippets/blob/master/snippets/${
                  this.props.category
                }/${this.props.snippet.filename}`,
                "_blank"
              )
            }
            label="Edit"
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            label={this.state.favs}
            onClick={this.incrementFavs}
            style={{
              backgroundColor: this.state.backgroundColor,
              color: this.state.heartColor,
              maxWidth: this.state.heartWidth + "px"
            }}
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction label="Report Bug" icon={<Report />} />
        </BottomNavigation>
      </Card>
    );
  }
}
Snippet.propTypes = {
  classes: PropTypes.object.isRequired
};
export default Snippet;
