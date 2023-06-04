import { action, makeAutoObservable } from "mobx";

export class WordsStore {
  words = [];
  state = "pending";

  constructor() {
    makeAutoObservable(this);
    this.fetchWords();
  }

  fetchWords() {
    this.state = "pending";
    fetch("http://itgirlschool.justmakeit.ru/api/words")
      .then((response) => response.json())
      .then(
        action("fetchSuccess", (words) => {
          this.words = words;
          this.state = "done";
        })
      )
      .catch(
        action("fetchError", (error) => {
          console.error("Error fetching words:", error);
          this.state = "error";
        })
      );
  }

  addWord(word) {
    fetch("http://itgirlschool.justmakeit.ru/api/words/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(word),
    })
      .then(() => {
        this.fetchWords();
      })
      .catch((error) => {
        console.error("Error adding word:", error);
      });
  }

  updateWord(id, updatedWord) {
    fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWord),
    })
      .then(() => {
        this.fetchWords();
      })
      .catch((error) => {
        console.error("Error updating word:", error);
      });
  }

  deleteWord(id) {
    fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/delete`, {
      method: "POST",
    })
      .then(() => {
        this.fetchWords();
      })
      .catch((error) => {
        console.error("Error deleting word:", error);
      });
  }
}
