function init() {
  // Get references to the elements
  const voiceSelect = document.getElementById("voice-select");
  const textArea = document.getElementById("text-to-speak");
  const talkButton = document.querySelector("button");
  const smilingFace = document.querySelector("img");
  let voices = [];

  // Function to load available voices into the dropdown
  function loadVoices() {
    voices = speechSynthesis.getVoices();

    // Log the voices array for debugging
    console.log("Available voices:", voices);

    // Reset the dropdown
    voiceSelect.innerHTML =
      '<option value="select" disabled>Select Voice:</option>';

    // Populate the dropdown with available voices
    voices.forEach((voice, index) => {
      const option = document.createElement("option");
      option.textContent = `${voice.name} (${voice.lang})`;
      option.value = index;
      voiceSelect.appendChild(option);
    });
  }

  // Attempt to load voices immediately
  loadVoices();

  // Also use the `onvoiceschanged` event to reload voices if necessary
  speechSynthesis.onvoiceschanged = loadVoices;

  // Event listener to handle the speech synthesis
  talkButton.addEventListener("click", function () {
    const utterance = new SpeechSynthesisUtterance(textArea.value);
    const selectedVoiceIndex = voiceSelect.value;

    // Assign the selected voice if available
    if (selectedVoiceIndex !== "select" && voices[selectedVoiceIndex]) {
      utterance.voice = voices[selectedVoiceIndex];
    }

    // Swap to the open-mouth face while speaking
    utterance.addEventListener("start", () => {
      smilingFace.src = "assets/images/smiling-open.png";
    });

    // Revert to the closed-mouth face after speaking ends
    utterance.addEventListener("end", () => {
      smilingFace.src = "assets/images/smiling.png";
    });

    // Speak the utterance
    speechSynthesis.speak(utterance);
  });
}

// Run the init function after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", init);
