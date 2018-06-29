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

import CopyIcon from "@material-ui/icons/ContentCopy";

import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SnippetActions from "./SnippetActions.js";
const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  }
});
class Snippet extends Component {
  state = {
    anchorEl: null
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { classes } = this.props;
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
        <SnippetActions
          key={this.props.key}
          category={this.props.category}
          snippet={this.props.snippet}
        />
      </Card>
    );
  }
}
Snippet.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Snippet);
