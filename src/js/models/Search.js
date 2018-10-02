import axios from "axios";
import { key, proxy } from "../config";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResult() {
    try {
      const result = await axios(
        `${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`
      );
      if (result.data.error) {
        alert(
          result.data.error === "limit"
            ? "You have reached limit of your daily requests"
            : result.data.error
        );
      } else {
        this.recipes_list = result.data.recipes;
      }
    } catch (error) {
      alert(error);
    }
  }
}
