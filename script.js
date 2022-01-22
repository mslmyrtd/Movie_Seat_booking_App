const notOccupiedSeats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const film = document.getElementById("film");
const total = document.getElementById("total");
const movieSelectBox = document.querySelector("#movie");
const container = document.querySelector(".container");
let filmPrice;
window.addEventListener("load", () => {
  displayUI();
  let price = movieSelectBox.options[movieSelectBox.selectedIndex].value;
  updateMovieInfo(price);
});
const displayUI = () => {
  const selectedSeatsFromStorage = JSON.parse(
    localStorage.getItem("selectedSeats")
  );
  if (
    selectedSeatsFromStorage !== null &&
    selectedSeatsFromStorage.length > 0
  ) {
    notOccupiedSeats.forEach((seat, index) => {
      if (selectedSeatsFromStorage.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
};

movieSelectBox.addEventListener("change", (e) => {
  // event in maruz kaldığı hedefteki elementin valuesi
  let price = e.target.value;
  updateMovieInfo(price);
});

const updateMovieInfo = (filmPrice) => {
  let selectedSeats = document.querySelectorAll(".row .selected");
  const seatsIndexArray = [...selectedSeats].map((seat) =>
    [...notOccupiedSeats].indexOf(seat)
  ); //seeçmiş olduğum seatler boşler içindeyse onların indexini al diyoruz
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndexArray));
  const selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  film.innerText =
    movieSelectBox.options[movieSelectBox.selectedIndex].innerText.split(
      "("
    )[0];
  total.innerText = selectedSeatCount * parseFloat(filmPrice);
};

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }
  let price = movieSelectBox.options[movieSelectBox.selectedIndex].value;
  updateMovieInfo(price);
});

//selcetedprice ve selected indexi local storage at kaldığımız yerdeki filmle beraber
