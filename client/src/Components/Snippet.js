import React, { Component } from "react";
import {
  Card,
  CardContent,
  Grid,
  Button,
  Popover,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import ReactMarkdown from "react-markdown";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Code";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ReportIcon from "@material-ui/icons/ReportProblem";
import CopyIcon from "@material-ui/icons/ContentCopy";

import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  }
});
class Snippet extends Component {
  state = {
    value: 0,
    favs: 0,
    favored: false,
    heartColor: "grey",
    heartWidth: 168,
    backgroundColor: "transparent",
    anchorEl: null
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
  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    console.log();
    return (
      <Card className="Snippet">
        <CardContent>
          <CopyToClipboard
            style={{
              float: "right"
            }}
            text={this.props.snippet.contents.substring(
              this.props.snippet.contents.lastIndexOf("```c#") + 5,
              this.props.snippet.contents.lastIndexOf("```")
            )}
            onCopy={null}
          >
            <div>
              <CopyIcon
                onClick={event => {
                  this.setState({
                    anchorEl: event.currentTarget
                  });
                }}
              />
              <Popover
                open={Boolean(this.state.anchorEl)}
                onClose={() => this.setState({ anchorEl: false })}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
              >
                <Typography
                  className={classes.typography}
                  style={{
                    fontSize: "20px"
                  }}
                >
                  Copied!
                </Typography>
              </Popover>
            </div>
          </CopyToClipboard>

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
      </Card>
    );
  }
}
Snippet.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Snippet);
