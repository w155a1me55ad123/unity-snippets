import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

class CategoriesList extends React.Component {
  constructor() {
    super()
    this.state = {
      dirs: [],
      numberOfSnippets: [],
      open: true,
      loaded: false
    }
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  };
  componentWillMount() {
    this.setState({
      loaded: false
    })

  }
  componentDidMount() {
    this.setState({
      loaded: true
    })
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
          dirs: myJson.dirs,
          numberOfSnippets: myJson.numberOfSnippets
        })
      });
  }
  fetchSnippetsNumber(key) {
    return this.state.numberOfSnippets[key];
  }

  render() {
    console.log(this.state.loaded)
    let main = <div></div>;
    if (!this.state.loaded) {
      main = <div>Loading..</div>;
    } else {
      main =
        (
          <div>
            <ListItem button onClick={this.handleClick}>
               <ListItemText inset primary="Categories" />
               {this.state.open ? <ExpandLess /> : <ExpandMore />}
             </ListItem>
             <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List>
              {this.state.dirs.map((dir, key) => (
                <ListItem onClick={() => this.props.fetchSnippets(dir)} key={key} button>
                  <ListItemText  inset primary={dir}  />
                  <p className="numberOfSnippets">{this.fetchSnippetsNumber(key)}</p>
                </ListItem>
                 ))}
            </List>
             </Collapse>
      </div>
        );


    }
    return (
      <div>
{main}
</div>
    )


  }
}

export default CategoriesList;