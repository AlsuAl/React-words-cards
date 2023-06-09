import { action, makeAutoObservable, observable, runInAction } from "mobx";
class WordsStore {
  @observable words = [];
  @observable error = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action fetchData = () => {
    return fetch("./api/words")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error ...");
        }
      })
      .then((response) => {
        this.words = response;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error;
        this.isLoading = false;
      });
  };

  @action addWord = (value) => {
    this.isLoading = true;

    const newWord = {
      id: value.id,
      english: value.english,
      transcription: value.transcription,
      russian: value.russian,
      tags: value.tags,
    };

    return fetch("./api/words/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json: charset=utf-8",
      },
      body: JSON.stringify(newWord),
    })
      .then(() => {
        this.words.push(newWord);
        this.isLoading = false;
      })
      .catch((error) => console.log(error.message));
  };

  @action updateWord = (value) => {
    this.isLoading = true;

    const newWord = {
      id: value.id,
      english: value.english,
      transcription: value.transcription,
      russian: value.russian,
      tags: value.tags,
    };

    return fetch(`api/words/${value.id}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json: charset=utf-8",
      },
      body: JSON.stringify(newWord),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error ...");
        }
      })
      .then(() => {
        runInAction(() => this.fetchData());
        this.isLoading = false;
      })
      .catch((error) => console.log(error.message));
  };

  @action deleteWord = (id) => {
    this.isLoading = true;

    return fetch(`./api/words/${id}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json: charset=utf-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error ...");
        }
      })
      .then(() => {
        runInAction(() => this.fetchData());
        this.isLoading = false;
      })
      .catch((error) => console.log(error.message));
  };
}

export default WordsStore;
