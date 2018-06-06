//imports do react
import React, {Component} from 'react';

//Router
import {Route} from 'react-router-dom';
import {urls} from "../../utils/urlUtils";

//Firebase
import FirebaseService from '../../services/FirebaseService'

//Components
import { DataTable } from '../DataTable/DataTable';
import { TopBar } from '../TopBar/topBar';
import { Welcome } from '../Welcome/welcome';
import Add from '../Add/Add';

//Estilos e peças
import './App.css';
import {MuiThemeProvider} from "material-ui/styles/index";
import { Card, CardContent} from "material-ui";
import {createMuiTheme} from 'material-ui/styles';
import deepPurple from 'material-ui/colors/deepPurple';

//Define a cor do tema;
const theme = createMuiTheme({
    palette: {
        primary: deepPurple,
    },
});

class App extends Component {

  render() {
        return (
            <MuiThemeProvider theme={theme}>
                <React.Fragment>
                    <TopBar />
                    <div className="container">
                      <Card>
                        <CardContent>
                          <Route exact
                                  path={urls.home.path}
                                  render={(props) => <Welcome {...props}/>}
                          />
                          <Route exact
                                  path={urls.data.path}
                                  render={(props) => <DataTable {...props} data={this.state.data}/>}
                          />
                          <Route exact
                                  path={urls.add.path}
                                  render={(props) => <Add {...props}/>}
                          />        
                        </CardContent>
                      </Card>
                    </div>
                </React.Fragment>
            </MuiThemeProvider>
        );
    }

    state = {
      data: []
  };
  
  componentDidMount() {
      FirebaseService.getDataList('startups', (dataReceived) =>    this.setState({data: dataReceived}))
  }

  
}

export default App;