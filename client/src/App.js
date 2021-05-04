import './App.css';
import Homepage from './components/Homepage/Homepage';
import Apppage from './components/Apppage/Apppage'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Header, Input, Icon, Image, Menu, Segment, Sidebar, Button } from 'semantic-ui-react'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Homepage}/>
        <Route path="/newlink" component={Apppage}/>
      </Router>
      
    </div>
  );
}

export default App;
