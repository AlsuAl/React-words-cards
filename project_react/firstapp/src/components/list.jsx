import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react";
import { MobXProviderContext } from "mobx-react";
import { WordsStore } from "./stores/WordsStore";
import "./list.scss";
import AddWord from "./Addword";

const List = observer(() => {
  const { wordsStore } = useContext(MobXProviderContext);
  const { words } = wordsStore;

  const [editedData, setEditedData] = useState([]);

  useEffect(() => {
    wordsStore.fetchWords();
  }, [wordsStore]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = [...editedData];
    updatedData[index][name] = value;
    setEditedData(updatedData);
  };

  const saveChanges = async (index) => {
    const editedWord = editedData[index].english.trim();
    const editedTranscription = editedData[index].transcription.trim();
    const editedTranslation = editedData[index].russian.trim();

    if (!editedWord || !editedTranscription || !editedTranslation) {
      console.log("Error: Fields cannot be empty");
      return;
    }

    const updatedWord = {
      id: editedData[index].id,
      english: editedWord,
      transcription: editedTranscription,
      russian: editedTranslation,
    };

    try {
      await wordsStore.updateWord(index, updatedWord);
      setEditedData([]);
    } catch (error) {
      console.log("Error updating word:", error);
    }
  };

  const enterEditMode = (index) => {
    const dataCopy = [...words];
    setEditedData(dataCopy);
  };

  const cancelEdit = () => {
    setEditedData([]);
  };

  const deleteWord = async (id) => {
    try {
      await wordsStore.deleteWord(id);
    } catch (error) {
      console.log("Error deleting word:", error);
    }
  };

  return (
    <div>
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
          {wordsStore.words.map((word, index) => (
            <tr key={word.id}>
              <td>
                {editedData.length > 0 && editedData[index] ? (
                  <input
                    type="text"
                    name="word"
                    value={editedData[index].english}
                    onChange={(e) => handleInputChange(e, index)}
                    className={!editedData[index].english.trim() ? "error" : ""}
                  />
                ) : (
                  word.english
                )}
              </td>
              <td>
                {editedData.length > 0 && editedData[index] ? (
                  <input
                    type="text"
                    name="transcription"
                    value={editedData[index].transcription}
                    onChange={(e) => handleInputChange(e, index)}
                    className={
                      !editedData[index].transcription.trim() ? "error" : ""
                    }
                  />
                ) : (
                  word.transcription
                )}
              </td>
              <td>
                {editedData.length > 0 && editedData[index] ? (
                  <input
                    type="text"
                    name="translation"
                    value={editedData[index].russian}
                    onChange={(e) => handleInputChange(e, index)}
                    className={!editedData[index].russian.trim() ? "error" : ""}
                  />
                ) : (
                  word.russian
                )}
              </td>
              <td className="list-buttons">
                {editedData.length > 0 && editedData[index] ? (
                  <>
                    <button
                      className="save btn"
                      onClick={() => saveChanges(index)}
                      disabled={
                        !editedData[index].english.trim() ||
                        !editedData[index].transcription.trim() ||
                        !editedData[index].russian.trim()
                      }
                    >
                      Save
                    </button>
                    <button className="cancel btn" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit btn"
                      onClick={() => enterEditMode(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete btn"
                      onClick={() => deleteWord(word.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddWord></AddWord>
    </div>
  );
});

export default List;
