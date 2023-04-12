console.log("log this");

const levees = document.getElementById("levees");
const randomizer = document.getElementById("randomizer");

randomizer.addEventListener("click", function () {
  levees.volume = Math.random();
  console.log(levees.volume);
});
