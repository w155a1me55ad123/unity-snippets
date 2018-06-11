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
    console.log("Loading Content")
    this.state = {
      loaded: false,
      Data: []
    }
  }

  componentWillMount() {
    fetch("/readmeFirst").then((response) => response.json())
      .then((myJson) => {
        console.log(myJson.data)

        this.setState({
          Data: [myJson.data]
        })
      });
  }


  fetchSnippets(name) {
    fetch("/api/" + name + "/all").then((response) => response.json())
      .then((myJson) => {
        this.setState({
          Data: myJson.data
        }, () => {})
      });
  }

  componentDidMount() {
    this.setState({
      loaded: true
    })
    console.log("Loaded")
  }

  render() {
    let main;
    if (!this.state.loaded) {
      main = <div className="loader"></div>
    } else {
      main = (<div className="App">
    <header className="App-header">
      <h1 className="App-title">Welcome to Unity Snippets</h1>
    </header>
    <div>
      <Grid container spacing={32}>
              <Grid item xs={12} sm={12} md={3}  lg={3}>
                <CategoriesList fetchSnippets={this.fetchSnippets.bind(this)}/>
              </Grid>
              <Grid item xs={12} sm={12} md={9} lg={8} >
                {this.state.Data.map((snippet, key) => (
                    <Card className="Snippet" key={key}>
                      <CardContent>
                        <ReactMarkdown className="markdown-body" source={snippet.contents} />
                      </CardContent>
                    </Card>
                   ))}
              </Grid>
      </Grid>
    </div>
  </div>)
    }

    return (
      <div>
{main}
      </div>


    );
  }

}


export default App;