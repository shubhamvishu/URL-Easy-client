import './css/App.css';
import 'semantic-ui-css/semantic.min.css';
import Homepage from './components/Homepage/Homepage';
import Apppage from './components/Apppage/Apppage';
import Redirectpage from './components/Redirectpage'
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
          <Route path="/" exact component={Homepage}/>
          <Route path="/v1/app" exact component={Apppage}/>
          <Route path="/v1/*" exact component={Apppage}/>
          <Route path="/:url" exact component={Redirectpage}/>   
      </div>
    </Router>
  );
}

export default App;
