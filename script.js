document.addEventListener("DOMContentLoaded", function() {
  console.log("Debug: DOM fully loaded");
  
  // Get all elements first
  const form = document.getElementById("checkinForm");
  const moodOptions = document.querySelectorAll(".mood-option");
  const successMsg = document.getElementById("successMsg");
  
  // Debug element existence
  console.log("Debug: Form element:", form);
  console.log("Debug: Mood options:", moodOptions.length);
  console.log("Debug: Success message:", successMsg);
  
  let selectedMood = "";
  
  // Mood selection
  moodOptions.forEach(option => {
    option.addEventListener("click", function() {
      console.log("Debug: Mood clicked:", this.dataset.mood);
      moodOptions.forEach(o => o.style.borderColor = "transparent");
      this.style.borderColor = "#0085d1";
      selectedMood = this.dataset.mood;
    });
  });

  // Form submission
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    console.log("Debug: Form submit triggered");
    
    // Get all values
    const stressLevel = document.getElementById("stressLevel").value;
    const tags = document.getElementById("tags").value.trim();
    const journal = document.getElementById("journal").value.trim();
    const date = new Date().toISOString().split('T')[0];
    
    console.log("Debug: Form values:", {
      mood: selectedMood,
      stress: stressLevel,
      tags: tags,
      journal: journal
    });

    if (!selectedMood) {
      alert("Please select your mood first!");
      return;
    }

    // Create entry object
    const entry = {
      date: date,
      mood: selectedMood,
      stress: stressLevel,
      tags: tags,
      journal: journal
    };

    // Save to localStorage
    let allEntries = JSON.parse(localStorage.getItem("checkIns")) || [];
    allEntries.push(entry);
    localStorage.setItem("checkIns", JSON.stringify(allEntries));
    
    console.log("Debug: Saved to localStorage:", entry);
    
    // Show success message
    successMsg.style.display = "block";
    setTimeout(() => {
      successMsg.style.display = "none";
    }, 2000);
    
    // Optional: Clear only mood selection
    moodOptions.forEach(o => o.style.borderColor = "transparent");
    selectedMood = "";
  });
});