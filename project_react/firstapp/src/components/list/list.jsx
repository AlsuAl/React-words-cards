import React, { useState } from "react";
import "./list.scss";
import data from "../data.js";

function List(props) {
  const { word, transcription, translation } = props;
  const [editedData, setEditedData] = useState(data);
  const [editingIndex, setEditingIndex] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = [...editedData];
    updatedData[index][name] = value;
    setEditedData(updatedData);
  };

  const saveChanges = (index) => {
    const editedWord = editedData[index].word.trim();
    const editedTranscription = editedData[index].transcription.trim();
    const editedTranslation = editedData[index].translation.trim();

    if (!editedWord || !editedTranscription || !editedTranslation) {
      console.log("Error: Fields cannot be empty");
      return;
    }

    console.log("Saved changes:", editedData[index]);

    setEditingIndex(null);
    setOriginalData(null);
  };

  const enterEditMode = (index) => {
    setOriginalData({ ...editedData[index] });
    setEditingIndex(index);
  };

  const cancelEdit = (index) => {
    const updatedData = [...editedData];
    updatedData[index] = { ...originalData };
    setEditedData(updatedData);
    setEditingIndex(null);
    setOriginalData(null);
  };

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
        {editedData.map((card, index) => (
          <tr key={card.id}>
            <td>
              {editingIndex === index ? (
                <input
                  type="text"
                  name="word"
                  value={card.word}
                  onChange={(e) => handleInputChange(e, index)}
                  className={!card.word.trim() ? "error" : ""}
                />
              ) : (
                card.word
              )}
            </td>
            <td>
              {editingIndex === index ? (
                <input
                  type="text"
                  name="transcription"
                  value={card.transcription}
                  onChange={(e) => handleInputChange(e, index)}
                  className={!card.transcription.trim() ? "error" : ""}
                />
              ) : (
                card.transcription
              )}
            </td>
            <td>
              {editingIndex === index ? (
                <input
                  type="text"
                  name="translation"
                  value={card.translation}
                  onChange={(e) => handleInputChange(e, index)}
                  className={!card.translation.trim() ? "error" : ""}
                />
              ) : (
                card.translation
              )}
            </td>
            <td className="list-buttons">
              {editingIndex === index ? (
                <>
                  <button
                    className="save btn"
                    onClick={() => saveChanges(index)}
                    disabled={
                      !card.word.trim() ||
                      !card.transcription.trim() ||
                      !card.translation.trim()
                    }
                  >
                    Save
                  </button>
                  <button
                    className="cancel btn"
                    onClick={() => cancelEdit(index)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="edit btn"
                  onClick={() => enterEditMode(index)}
                >
                  Edit
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default List;
