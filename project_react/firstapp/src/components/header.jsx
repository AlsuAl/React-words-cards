import React, { useState } from "react";
import "./header.scss";
import { keyapi } from "./key";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
} from "react-router-dom";
function Search(props) {
  const [inputValue, setInputValue] = useState("");
  const [apiResult, setApiResult] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", "en");
    encodedParams.append("target_language", "es");
    encodedParams.append("text", inputValue);

    const options = {
      async: true,
      crossDomain: true,
      url: "https://text-translator2.p.rapidapi.com/translate",
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": keyapi,
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      body: encodedParams,
    };

    fetch("https://text-translator2.p.rapidapi.com/translate", options)
      .then((response) => response.json())
      .then((response) => setApiResult(response.data.translatedText))
      .catch((err) => console.error(err));
  };
  return (
    <div className="search">
      <div className="">
        <nav className="menu">
          <ul className="navigation">
            <li>
              <Link to="/">
                <img
                  src={require("./images/book-svgrepo-com.svg").default}
                  alt="logo"
                  title="home"
                />
              </Link>
            </li>
            <li>
              <Link to="/cards">
                <img
                  src={require("./images/slider-svgrepo-com.svg").default}
                  alt="cards"
                  title="cards"
                />
              </Link>
            </li>
            <li>
              <Link to="/list">
                <img
                  src={require("./images/drawer-svgrepo-com.svg").default}
                  alt="list"
                  title="list"
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <form onSubmit={handleSubmit} className="searchbody">
        <input
          className="search-input"
          type="text"
          placeholder="Enter text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button type="submit" className="button searchbutton">
          <img
            src={
              require("./images/arrow-right-rounded-svgrepo-com.svg").default
            }
            alt="btn"
            title="translate"
          />
        </button>
        <div className="result">
          <p>{apiResult}</p>
        </div>
      </form>
    </div>
  );
}

export default Search;
