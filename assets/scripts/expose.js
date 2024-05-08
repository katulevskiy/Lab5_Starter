// expose.js

window.addEventListener("DOMContentLoaded", init);

function init() {
  // Select necessary elements from the DOM
  const hornSelect = document.getElementById("horn-select");
  const hornImage = document.querySelector("img");
  const audioElement = document.querySelector("audio");
  const volumeSlider = document.getElementById("volume");
  const volumeIcon = document.querySelector("#volume-controls img");
  const playButton = document.querySelector("button");
  const jsConfetti = new JSConfetti();

  // Function to handle the horn selection change
  hornSelect.addEventListener("change", function () {
    const selectedHorn = hornSelect.value;
    if (selectedHorn === "air-horn") {
      hornImage.src = "assets/images/air-horn.svg";
      audioElement.src = "assets/audio/air-horn.mp3";
    } else if (selectedHorn === "car-horn") {
      hornImage.src = "assets/images/car-horn.svg";
      audioElement.src = "assets/audio/car-horn.mp3";
    } else if (selectedHorn === "party-horn") {
      hornImage.src = "assets/images/party-horn.svg";
      audioElement.src = "assets/audio/party-horn.mp3";
    }
  });

  // Function to handle the volume slider change
  volumeSlider.addEventListener("input", function () {
    const volumeValue = volumeSlider.value;
    audioElement.volume = volumeValue / 100;

    if (volumeValue == 0) {
      volumeIcon.src = "assets/icons/volume-level-0.svg";
    } else if (volumeValue < 33) {
      volumeIcon.src = "assets/icons/volume-level-1.svg";
    } else if (volumeValue < 67) {
      volumeIcon.src = "assets/icons/volume-level-2.svg";
    } else {
      volumeIcon.src = "assets/icons/volume-level-3.svg";
    }
  });

  // Function to handle playing the selected horn sound
  playButton.addEventListener("click", function () {
    audioElement.play();
    if (hornSelect.value === "party-horn") {
      jsConfetti.addConfetti();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
