import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class CategoriesList extends React.Component {
  constructor() {
    super()
    this.state = {
      dirs: []
    }
  }
  componentWillMount() {
    fetch("/Directories", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({
          dirs: myJson.dirs
        })
      });
  }

  fetchSnippets(name) {
    fetch("/api/" + name + "/all").then((response) => response.json())
      .then((myJson) => {
        console.log(myJson)
      });
  }
  render() {
    return (
      <div >
        <List>
        {this.state.dirs.map((dir, key) => (
          <ListItem key={key} button>
            <ListItemText  onClick={() => this.fetchSnippets(dir)} inset primary={dir} />
          </ListItem>
           ))}
        </List>
      </div>
    );
  }
}


export default CategoriesList;