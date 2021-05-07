import './App.css';
import Homepage from './components/Homepage/Homepage';
import Apppage from './components/Apppage/Apppage';
import Redirectpage from './components/Redirectpage'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Homepage}/>
        <Route path="/v1/newlink" exact component={Apppage}/>
        <Route path="/:url" exact component={Redirectpage}/>
      </Router>
      
    </div>
  );
}

export default App;
