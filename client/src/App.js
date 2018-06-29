import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import CategoriesList from "./Components/CategoriesList";
import Snippet from "./Components/Snippet.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "GettingStarted",
      Data: []
    };
  }

  componentWillMount() {
    fetch("/readmeFirst")
      .then(response => response.json())
      .then(myJson => {
        this.setState({
          Data: [myJson.data]
        });
      });
  }

  fetchSnippets(name) {
    this.setState({
      category: name
    });
    fetch("/api/" + name + "/all")
      .then(response => response.json())
      .then(myJson => {
        this.setState(
          {
            Data: myJson.data
          },
          () => {}
        );
      });
  }

  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Unity Snippets</h1>
        </header>
        <div>
          <Grid container spacing={32}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <CategoriesList fetchSnippets={this.fetchSnippets.bind(this)} />
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={8}>
              {this.state.Data.map((snippet, key) => (
                <Snippet
                  key={key}
                  snippet={snippet}
                  category={this.state.category}
                />
              ))}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
