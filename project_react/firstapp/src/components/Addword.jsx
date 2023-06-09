import React, { useState, useContext } from "react";
import { observer } from "mobx-react";
import { MobXProviderContext } from "mobx-react";

const AddWord = observer(() => {
  const { wordsStore } = useContext(MobXProviderContext);
  const [english, setEnglish] = useState("");
  const [transcription, setTranscription] = useState("");
  const [russian, setRussian] = useState("");

  const handleEnglishChange = (e) => {
    setEnglish(e.target.value);
  };

  const handleTranscriptionChange = (e) => {
    setTranscription(e.target.value);
  };

  const handleRussianChange = (e) => {
    setRussian(e.target.value);
  };

  const handleAddWord = () => {
    if (!english.trim() || !transcription.trim() || !russian.trim()) {
      console.log("Error: Fields cannot be empty");
      return;
    }

    const newWord = {
      english: english.trim(),
      transcription: transcription.trim(),
      russian: russian.trim(),
    };

    wordsStore.addWord(newWord);

    setEnglish("");
    setTranscription("");
    setRussian("");
  };

  return (
    <div className="add-word">
      <h2>Add New Word</h2>
      <div>
        <label htmlFor="englishInput">English:</label>
        <input
          type="text"
          id="englishInput"
          value={english}
          onChange={handleEnglishChange}
        />
      </div>
      <div>
        <label htmlFor="transcriptionInput">Transcription:</label>
        <input
          type="text"
          id="transcriptionInput"
          value={transcription}
          onChange={handleTranscriptionChange}
        />
      </div>
      <div>
        <label htmlFor="russianInput">Russian:</label>
        <input
          type="text"
          id="russianInput"
          value={russian}
          onChange={handleRussianChange}
        />
      </div>
      <button onClick={handleAddWord}>Add Word</button>
    </div>
  );
});

export default AddWord;
