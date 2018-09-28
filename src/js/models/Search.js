import axios from "axios";
import { key, proxy } from '../config';

export default class Search {

    constructor(query) {
        this.query = query;
    }

    async getResult() {
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