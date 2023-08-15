let urlWord = 'https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase';
let urlCheck = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];
export const checkWord = async (str) => {
  let exist = false;
  let url = urlCheck + str;
    await fetch(url)
    .then((response) => response.json())
    .then((result) => {
      if(result[0]) exist = true;
    });
    return exist;
};
export const generateWord = async () => {
  let todaysWord;
  await fetch(urlWord)
    .then((response) => response.json())
    .then((result) => {
      todaysWord =result;
    });
  return todaysWord;
};
