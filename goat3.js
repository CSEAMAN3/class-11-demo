"use strict";

let goatContainer = document.querySelector("section");
let resultButton = document.querySelector("section + div");
let image1 = document.querySelector("section img:first-child");
let image2 = document.querySelector("section img:nth-child(2)");

let clicks = 0;
let maxClicksAllowed = 9;

function Goat(name, src, views = 0, clicks = 0) {
  this.name = name;
  this.src = src;
  this.views = views;
  this.clicks = clicks;
  console.log(this);
  Goat.allGoatsArray.push(this);
}

Goat.allGoatsArray = [];

function getRandomNumber() {
  return Math.floor(Math.random() * Goat.allGoatsArray.length);
}

let usedGoats = [];

function renderGoats() {
  let goat1 = getRandomNumber();
  let goat2 = getRandomNumber();

  while (goat1 === goat2 || usedGoats.includes(goat1) || usedGoats.includes(goat2)) {
    goat1 = getRandomNumber();
    goat2 = getRandomNumber();
  }

  image1.src = Goat.allGoatsArray[goat1].src;
  image2.src = Goat.allGoatsArray[goat2].src;
  image1.alt = Goat.allGoatsArray[goat1].name;
  image2.alt = Goat.allGoatsArray[goat2].name;
  Goat.allGoatsArray[goat1].views++;
  Goat.allGoatsArray[goat2].views++;

  usedGoats = [];
  console.log(usedGoats);
  usedGoats.push(goat1, goat2);
}

function handleGoatClick(event) {
  if (event.target === goatContainer) {
    alert("Please click on an image");
  }
  clicks++;
  let clickGoat = event.target.alt;
  for (let i = 0; i < Goat.allGoatsArray.length; i++) {
    if (clickGoat === Goat.allGoatsArray[i].name) {
      Goat.allGoatsArray[i].clicks++;
      break;
    }
  }
  if (clicks === maxClicksAllowed) {
    goatContainer.removeEventListener("click", handleGoatClick);
    resultButton.addEventListener("click", renderChart);
    // resultButton.className = "clicks-allowed";
    goatContainer.className = "no-voting";
  } else {
    renderGoats();
  }
}

// function renderResults() {
//   let ul = document.querySelector("ul");
//   for (let i = 0; i < state.allGoatsArray.length; i++) {
//     let li = document.createElement("li");
//     li.textContent = `${state.allGoatsArray[i].name} had ${state.allGoatsArray[i].views} views and was clicked ${state.allGoatsArray[i].clicks} times.`;
//     ul.appendChild(li);
//   }
// }

function renderChart() {
  const labelArray = [];
  const clicksArray = [];
  const viewsArray = [];

  for (let i = 0; i < Goat.allGoatsArray.length; i++) {
    let thisGoat = Goat.allGoatsArray[i];
    labelArray.push(thisGoat.name);
    clicksArray.push(thisGoat.clicks);
    viewsArray.push(thisGoat.views);
  }

  const data = {
    labels: labelArray,
    datasets: [
      {
        label: "Views",
        data: viewsArray,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 2,
      },
      {
        label: "Clicks",
        data: clicksArray,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    responsive: true,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      // indexAxis: "y",
    },
  };
  const canvasChart = document.getElementById("myChart");
  new Chart(canvasChart, config);
  localStorage.setItem("goatData", JSON.stringify(Goat.allGoatsArray));
}

function checkLocalStorage() {
  //check if local story is truthy
  const localData = JSON.parse(localStorage.getItem("goatData"));
  console.log(localData);
  if (localData) {
    for (let i = 0; i < localData.length; i++) {
      let name = localData[i].name;
      let src = localData[i].src;
      let views = localData[i].views;
      let clicks = localData[i].clicks;
      new Goat(name, src, views, clicks);
    }
  } else {
    new Goat("Cruising Goat", "./images/cruisin-goat.jpg");
    new Goat("Float Your Goat", "./images/float-your-goat.jpg");
    new Goat("Goat Out of Hand", "./images/goat-out-of-hand.jpg");
    new Goat("Kissing Goat", "./images/kissing-goat.jpg");
    new Goat("Sassy Goat", "./images/sassy-goat.jpg");
    new Goat("smiling Goat", "./images/smiling-goat.jpg");
    new Goat("sweater Goat", "./images/sweater-goat.jpg");
  }
}

// state.allGoatsArray.push(cruising, float, hand, kissing, sassy, smiling, sweater);
checkLocalStorage();
renderGoats();

goatContainer.addEventListener("click", handleGoatClick);
// localStorage.clear();
