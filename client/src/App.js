import React, {
  Component
} from 'react';
import './App.css';
const ReactMarkdown = require('react-markdown')

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
          <button onClick={this.fetchMarkdown.bind(this)} > Click me</button>
        </header>
        <ReactMarkdown className="markdown-body" source={this.state.dummyData} />
      </div>
    );
  }
}

export default App;