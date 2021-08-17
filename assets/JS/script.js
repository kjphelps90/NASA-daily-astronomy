const APIKey = "B55ZQWUIfhkzWvNarvOrlfh8ivj5W4hV3zZB7I47";

function init() {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${APIKey}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayPicture(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function displayPicture(data) {
  let podElm = document.getElementById("pod-img");
  podElm.setAttribute("src", data.url);

  let mediaContent = document.querySelector(".media-content .title");
  mediaContent.textContent = data.title;

  let pictureDate = document.querySelector(".date-taken");
  pictureDate.textContent = data.date;

  let podContent = document.querySelector(".content");
  podContent.textContent = data.explanation;
}

function searchImagebyDate() {
  let searchByDateEl = document.getElementById("date");
  let searchDate = searchByDateEl.value;

  const url = `https://api.nasa.gov/planetary/apod?api_key=${APIKey}&date=${searchDate}`;
  console.log(url);

  fetch(url)
    .then((response) => {
      console.log(url);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayPicture(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

window.addEventListener("DOMContentLoaded", (event) => {
  var searchImageBtn = document.getElementById("search-image");
  searchImageBtn.addEventListener("click", searchImagebyDate);

  init();
});
