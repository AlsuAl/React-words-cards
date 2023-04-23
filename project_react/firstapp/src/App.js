import "./App.css";
import "./components/cards.scss";
import "./components/header.scss";
import "./components/list.scss";
import Search from "./components/header.jsx";
import Card from "./components/cards.jsx";
import List from "./components/list.jsx";

function App() {
  return (
    <div className="App">
      <div className="Application">
        <div className="header">
          <Search></Search>
        </div>
        <div className="cards">
          <Card></Card>
        </div>
        <div className="wordslist">
          <List></List>
        </div>
      </div>
    </div>
  );
}

export default App;
