import './App.css';
import Homepage from './components/Homepage/Homepage';
import Apppage from './components/Apppage/Apppage'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


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
