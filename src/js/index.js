import axios from "axios";

// http://food2fork.com/api/search
// d599b7fb090ea1af653e5b45c2441452

async function getResult(query) {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const key = "d599b7fb090ea1af653e5b45c2441452";
  try {
    const result = await axios(
      `${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`
    );
    console.log("result :", result);
  } catch (error) {
    alert(error);
  }
}
getResult();
