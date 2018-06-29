import React, { Component } from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import CodeIcon from "@material-ui/icons/Code";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ReportIcon from "@material-ui/icons/ReportProblem";
import axios from "axios";

class SnippetActions extends Component {
  state = {
    value: 0,
    favs: 0,
    favored: false,
    heartColor: "grey",
    heartWidth: 168,
    backgroundColor: "transparent"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    return (
      <BottomNavigation
        value={this.state.value}
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
          icon={<CodeIcon />}
        />
        <BottomNavigationAction
          label={this.state.favs}
          onClick={() => null}
          style={{
            backgroundColor: this.state.backgroundColor,
            color: this.state.heartColor,
            maxWidth: this.state.heartWidth + "px"
          }}
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Report Bug"
          onClick={() =>
            window.open(
              "https://github.com/AmirBraham/unity-snippets/issues/new",
              "_blank"
            )
          }
          icon={<ReportIcon />}
        />
      </BottomNavigation>
    );
  }
}

export default SnippetActions;
