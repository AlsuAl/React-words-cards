import React, { useState } from "react";
import "./list.scss";
import data from "./data.js";

function List(props) {
  const { word, transcription, translation } = props;
  return (
    <table className="list">
      <caption className="list-header-up">
        <h2>Words List</h2>
      </caption>
      <thead className="list-header-down">
        <tr>
          <th>Words</th>
          <th>Transcription</th>
          <th>Translation</th>
          <th>Edit/Delete</th>
        </tr>
      </thead>
      <tbody className="list-words">
        {data.map((card) => (
          <tr key={card.id}>
            <td>{card.word}</td>
            <td>{card.transcription}</td>
            <td>{card.translation}</td>
            <td className="list-buttons">
              <img
                src={require("././images/sign-in-svgrepo-com.svg").default}
                alt="edit"
                className="edit"
                title="edit"
              />
              <img
                src={require("./images/sign-out-svgrepo-com.svg").default}
                alt="delete"
                className="delete"
                title="delete"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default List;
