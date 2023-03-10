const fs = require("fs");
const axios = require("axios");
let data = "S.No,name,github URl,repo count, star count, fork count\n ";
const UserDataArray = [
  {
    name: "Arun S",
    gitName: "arun-me",
  },
];

const GetUserData = UserDataArray.map(async (user, index) => {
  let repoCount = 0;
  let startCount = 0;
  let forkCount = 0;
  await axios
    .get(`https://api.github.com/users/${user?.gitName}/repos?per_page=1000`)
    .then((response) => {
      response?.data?.length &&
        response?.data?.map((repo) => {
          startCount += repo.stargazers_count;
          repo?.fork ? forkCount++ : repoCount++;
        });
    })
    .catch((err) => console.log(err));
  data += `${index + 1},${user?.name},https://github.com/${
    user?.gitName
  },${repoCount},${startCount},${forkCount}\n `;
});

const getStars = async () => {
  Promise.all(GetUserData).then(() => {
    fs.writeFile("gitHubData.csv", data, "utf-8", (err) => {
      if (err) console.log(err);
      else console.log("Data saved");
    });
  });
};
getStars();
