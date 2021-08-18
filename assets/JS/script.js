const APIKey = "B55ZQWUIfhkzWvNarvOrlfh8ivj5W4hV3zZB7I47";

var searchButtonClicked = 0; //This is going to be used for getting the new date when the search button is clicked.
var CURRENTDAY = moment().format("YYYY-MM-DD");
var nearEarthObjectsCall =
  "https://api.nasa.gov/neo/rest/v1/feed?api_key=" +
  APIKey +
  "&start_date=" +
  CURRENTDAY +
  "&end_date=" +
  CURRENTDAY;
console.log(nearEarthObjectsCall);

// variables for Vid/Img Library API
var nivlSearchTerm = "";
var nivlUrl = 'https://images-api.nasa.gov/search?q=' + nivlSearchTerm + "&media_type=image&page=1&year_start=2018&year_end=2021";
console.log(nivlUrl);
var searchLibraryForm = document.getElementById("vid-img-form");

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


//Display NASA image of the day
function displayPicture(data) {
  let podElm = document.getElementById("pod-img");
  podElm.setAttribute("src", data.url);

  let imgLink = document.getElementById("img-link");
  imgLink.setAttribute("href", data.url);

  let mediaContent = document.querySelector(".media-content .title");
  mediaContent.textContent = data.title;

  let pictureDate = document.querySelector(".date-taken");
  pictureDate.textContent =
    "Date of Picture: " + moment(data.date).format("MM/DD/YYYY");

  let podContent = document.querySelector(".content");
  podContent.textContent = data.explanation;
}

//Search image for a specific date
function searchImagebyDate(searchDate) {
  let searchByDateEl = document.getElementById("date");
  let dateParam =
    typeof searchDate === "string" ? searchDate : searchByDateEl.value;
  let searchResult = document.getElementById("searchResult");
  if (!searchByDateEl.value) {
    searchResult.innerHTML = "<h2>Please select a specific date!</h2>";
  } else {
    searchResult.innerHTML = "";
    const url = `https://api.nasa.gov/planetary/apod?api_key=${APIKey}&date=${dateParam}`;
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
}

//Display image data from Range
function displayPictureItem(dateFromRow) {
  let dateParam = dateFromRow;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${APIKey}&date=${dateParam}`;
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

//Function to search NASA images from a Range of images
function searchImageByRange() {
  let fromDateEl = document.getElementById("from-date").value;
  let toDateEl = document.getElementById("to-date").value;
  let searchResult = document.getElementById("searchResult");

  if (!fromDateEl || !toDateEl) {
    searchResult.innerHTML = "<h2>Please select a date!</h2>";
  } else {
    searchResult.innerHTML = "";

    const url = `https://api.nasa.gov/planetary/apod?api_key=${APIKey}&start_date=${fromDateEl}&end_date=${toDateEl}`;
    console.log(url);

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        let searchData = data.map((d) => {
          let elm = `<img src="${d.url}" class="image" alt="${
            d.title
          }">${moment(d.date).format("MMM Do, YYYY")} <strong>${
            d.title
          }</strong>`;
          let card = `<div class="result-item" onclick="displayPictureItem('${d.date}')">${elm}</div>`;
          return card;
        });

        searchResult.innerHTML = searchData.join("");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// ----------------------------------------------------------------------------------------------------------------------------------------------

function createTable(nearEarthData, queryDate) {
  var date = queryDate.trim();
  var earthObjectsArray = nearEarthData.near_earth_objects[date];
  console.log(date);
  console.log(earthObjectsArray);
  var objectTable = document.getElementById("object-table");

  for (let i = 0; i < earthObjectsArray.length; i++) {
    // grabbing data from the output.
    var objectName = earthObjectsArray[i].name;
    console.log(objectName);
    var objectSize =
      Math.round(
        earthObjectsArray[i].estimated_diameter.meters.estimated_diameter_max
      ) + " m";
    console.log(objectSize);
    var objectVelocity =
      Math.round(
        earthObjectsArray[i].close_approach_data[0].relative_velocity
          .kilometers_per_hour
      ) + " km/h";
    console.log(objectVelocity);
    var objectMissDistance =
      Math.round(
        earthObjectsArray[i].close_approach_data[0].miss_distance.kilometers
      ) + " km";
    console.log(objectMissDistance);
    var objectMagnitude = earthObjectsArray[i].absolute_magnitude_h + " H";
    console.log(objectMagnitude);
    var objectLink = earthObjectsArray[i].nasa_jpl_url;
    console.log(objectLink);
    // creating table data items

    // creating table rows and table data. I'm thinking that it would be best to have the table tag and header in the actual HTML.
    var createRow = document.createElement("tr");

    var tableDataDate = document.createElement("td");
    tableDataDate.textContent = date;
    console.log(tableDataDate);
    var tableDataName = document.createElement("td");
    tableDataName.textContent = objectName;
    var tableDataSize = document.createElement("td");
    tableDataSize.textContent = objectSize;
    var tableDataVelocity = document.createElement("td");
    tableDataVelocity.textContent = objectVelocity;
    var tableDataMissDistance = document.createElement("td");
    tableDataMissDistance.textContent = objectMissDistance;
    var tableDataMagnitude = document.createElement("td");
    tableDataMagnitude.textContent = objectMagnitude;

    objectTable.appendChild(createRow);

    var selectRow = document.getElementById("object-table").lastChild;

    selectRow.appendChild(tableDataDate);
    selectRow.appendChild(tableDataName);
    selectRow.appendChild(tableDataSize);
    selectRow.appendChild(tableDataVelocity);
    selectRow.appendChild(tableDataMissDistance);
    selectRow.appendChild(tableDataMagnitude);
  }
}

// creating function which creates the initial table to be loaded.
function callNearEarthApi(nearEarthObjectsCall) {
  if (searchButtonClicked === 0) {
    date = CURRENTDAY;
  }
  console.log(date);
  // else {
  // }
  // going to have to create an IF statement for the date variable. If we're on the initial load then the date will be the current date. If the search button has clicked then the date will be whatever date that brings through. It will have to be in the format YYYY-MM-DD.

  fetch(nearEarthObjectsCall)
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      createTable(data, date);
    })
    .catch(function (error) {
      console.log(error);
    });
}
// initial call of the function to create the table. This can be at the bottom of the JQuery code.
callNearEarthApi(nearEarthObjectsCall);

window.addEventListener("DOMContentLoaded", (event) => {
  var searchImageBtn = document.getElementById("search-image");
  searchImageBtn.addEventListener("click", searchImagebyDate);

  var searchImgByDateBtn = document.getElementById("searchImg-byRange");
  searchImgByDateBtn.addEventListener("click", searchImageByRange);

  init();
});


// VID IMAGE LIBRARY FUNCTIONS ---------------------------------------------------------
function createRandomImg(data) {
  console.log(data);
  var arrayLength = data.collection.items.length;
  console.log(arrayLength)
  var randItem = Math.floor(Math.random() * arrayLength);
  console.log(randItem);
  var selectedImg = data.collection.items[randItem].links[0].href;
  console.log(selectedImg);
  var imgDescription = data.collection.items[randItem].data[0].description;
  console.log(imgDescription);
  var imgAltText = data.collection.items[randItem].data[0].title;
  console.log(imgAltText);
  var libraryImg = document.getElementById("library-image");
  libraryImg.setAttribute("src", selectedImg);
  libraryImg.setAttribute("alt", imgAltText);
  var libraryDescription = document.getElementById("img-description");
  libraryDescription.textContent = imgDescription;
  var dateTimeStamp = data.collection.items[randItem].data[0].date_created
  var imgDateTaken = document.getElementById("img-date");
  imgDateTaken.textContent = "Date of Picture: " + moment(dateTimeStamp).format("MM/DD/YYYY");
  var imgTitle = document.getElementById("img-title");
  imgTitle.textContent = imgAltText;
};

function fetchImage(nivlUrl) {
  //fetched url data
  fetch(nivlUrl)
      .then(function (response) {
          console.log(response);
          if (response.ok) {
              return response.json();
          }
      })
      .then(function (data) {
          console.log(data);
          createRandomImg(data);
      })
}

searchLibraryForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var searchLibInput = document.getElementById("vid-img-search");
  nivlSearchTerm = searchLibInput.value;
  var searchCall = 'https://images-api.nasa.gov/search?q=' + nivlSearchTerm + "&media_type=image&page=1&year_start=2018&year_end=2021";
  fetchImage(searchCall);

})

fetchImage(nivlUrl);

