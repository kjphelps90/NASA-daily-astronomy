const APIKey = "B55ZQWUIfhkzWvNarvOrlfh8ivj5W4hV3zZB7I47";

function init() {
  var CURRENTDAY = moment().format("YYYY-MM-DD");
  var searchButtonClicked = 0; //This is going to be used for getting the new date when the search button is clicked.
  var nearEarthObjectsCall =
    "https://api.nasa.gov/neo/rest/v1/feed?api_key=" +
    APIKey +
    "&start_date=" +
    CURRENTDAY +
    "&end_date=" +
    CURRENTDAY;
  console.log(nearEarthObjectsCall);
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
  pictureDate.textContent = "Date of Picture: " + data.date;

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

function searchImageByRange() {
  var fromDateEl = document.getElementById("from-date").value;
  var toDateEl = document.getElementById("to-date").value;
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
