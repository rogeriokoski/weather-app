/* 
I added this comment to see if it goes automatically to gitHub
*/
const weatherForm = document.querySelector("form");
const searchField = document.querySelector("input");
const displayArea = document.getElementById("test1");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`http://localhost:3000/weather?address=${searchField.value}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        displayArea.innerHTML = `<p>Error: ${data.error}</p><p>  </p>`;
      } else {
        displayArea.innerHTML = `<p>Forecast for: ${data.location}</p><p>${data.forecast}</p>`;
      }
    });
});
