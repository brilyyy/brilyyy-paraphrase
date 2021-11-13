import axios from "axios";

const rapidApiUrl =
  "https://rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com/rewrite";
const rewrite = (text: String, apikey: String) => {
  const data = {
    language: "id",
    strength: 3,
    text: text,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(rapidApiUrl, data, {
        headers: {
          "content-type": "application/json",
          "x-rapidapi-key": apikey,
          "x-rapidapi-host":
            "rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com",
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err.response));
  });
};

export { rewrite };

