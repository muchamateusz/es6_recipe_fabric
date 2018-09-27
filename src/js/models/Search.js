import axios from "axios";

export default class Search {

    constructor(query) {
        this.query = query;
    }

    async getResult() {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const key = "d599b7fb090ea1af653e5b45c2441452";
        try {
            const result = await axios(
                `${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`
            );
            this.recipes_list = result.data.recipes;
        } catch (error) {
            alert(error);
        }
    }
}