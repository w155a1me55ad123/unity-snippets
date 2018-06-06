import React, {
  Component
} from 'react';
import './App.css';
import ReactMarkdown from 'react-markdown';
import {
  Button,
  Card,
  CardContent,
  Grid
} from '@material-ui/core';
import CategoriesList from "./Components/CategoriesList"
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dummyData: ""
    }
  }
  fetchMarkdown() {
    fetch("/api/hello").then((response) => response.json())
      .then((myJson) => {
        this.setState({
          dummyData: myJson.data
        })
      });
  }

  render() {
    return (

      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Unity Snippets</h1>
        </header>
        <div>
          <Grid container spacing={36}>
                  <Grid item xs={3}>
                    <Button variant="contained" color="primary" onClick={this.fetchMarkdown.bind(this)} >Click me</Button>
                    <CategoriesList/>
                </Grid>
                  <Grid item xs={8}>
                    <Card>
                      <CardContent>
                        <ReactMarkdown className="markdown-body" source={this.state.dummyData} />
                      </CardContent>
                    </Card>
                  </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}


export default App;