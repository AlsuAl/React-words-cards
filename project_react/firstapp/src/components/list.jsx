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
        {/* исправленный map */}
        {data.map((card) => (
          <tr key={card.id}>
            <td>{card.word}</td>
            <td>{card.transcription}</td>
            <td>{card.translation}</td>
            <td className="list-buttons">
              <img
                src={
                  require("./images/edit-pencil-line-01-svgrepo-com.svg")
                    .default
                }
                alt="edit"
                className="edit"
              />
              <img
                src={require("./images/trash-1-svgrepo-com.svg").default}
                alt="delete"
                className="delete"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default List;
