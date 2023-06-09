import "./App.css";
import "./components/cards.scss";
import "./components/header.scss";
import "./components/list.scss";
import Search from "./components/header.jsx";
import Card from "./components/cards.jsx";
import List from "./components/list.jsx";
import NoMatch from "./components/nomatch.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route exact path="/cards" element={<Cards />} />
            <Route exact path="/list" element={<WordList />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function Home() {
  return (
    <div className="Application">
      <div className="header">
        <Search></Search>
      </div>
      <Outlet />
    </div>
  );
}

function Cards() {
  return (
    <div className="cards">
      
        <Card />
      
    </div>
  );
}

function WordList() {
  return (
    <div className="wordslist">
     
        <List />
     
    </div>
  );
}

export default App;
