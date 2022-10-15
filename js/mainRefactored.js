//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/

document.querySelector("button").addEventListener("click", getFetch);

//  Loading animation

const loaderContainer = document.querySelector(".loader-container");

function toggleLoading() {
  if (loaderContainer.classList.contains("not-visible")) {
    loaderContainer.classList.remove("not-visible");
  } else {
    loaderContainer.classList.add("not-visible");
  }
}

function getFetch() {
  const choice = document.querySelector("input").value;
  const url = `https://api.nasa.gov/planetary/apod?api_key=6FybSjezy3avzCXzfmcP4bRMjTlsFbEWoSFAb2ly&date=${choice}`;

  toggleLoading();

  let img = document.querySelector("img");
  let iframe = document.querySelector("iframe");

  //  if img or iframe source exists then clear previous data
  if (img.src.length > 0 || iframe.length > 0) {
    img.classList.add("not-visible");
    iframe.classList.add("not-visible");
    document.querySelector("h4").innerText = "";
    document.querySelector(".explain").innerText = "";
  }

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);

      if (data.code === 400) {
        document.getElementById("error").classList.remove("not-visible");
        document.getElementById("error").innerText = data.msg;
        toggleLoading();
      } else {
        let img = document.querySelector("img");
        let iframe = document.querySelector("iframe");
        if (data.media_type === "image") {
          img.src = data.hdurl;

          img.classList.remove("not-visible"); // removes display:none to show img
          iframe.classList.add("not-visible"); // hide iframe if its visible
        } else if (data.media_type === "video") {
          iframe.src = data.url;

          iframe.classList.remove("not-visible"); // shows iframe
          img.classList.add("not-visible"); // hides img
        }

        document.getElementById('text').innerText = data.explanation;
        document.querySelector(".explain").innerText = data.title;

        //hide loading
        toggleLoading();
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
