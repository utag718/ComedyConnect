// Update poster text
function updatePoster() {
    document.getElementById("posterTitle").innerText = document.getElementById("eventTitle").value || "Comedy Night";
    document.getElementById("posterDate").innerText = document.getElementById("eventDate").value || "2025-03-15 at 19:00";
    document.getElementById("posterVenue").innerText = document.getElementById("eventVenue").value || "The Laughing Spot";
    document.getElementById("posterPrice").innerText = document.getElementById("eventPrice").value || "$20";
}

// Change background color
function updateBgColor() {
    document.getElementById("poster").style.background = document.getElementById("bgColorPicker").value;
}

// Change text color
function updateTextColor() {
    document.getElementById("poster").style.color = document.getElementById("textColorPicker").value;
}

// Change font
function updateFont() {
    document.getElementById("poster").style.fontFamily = document.getElementById("fontSelector").value;
}

// Add image to poster
function addImage(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function(e) {
        let img = document.getElementById("posterImage");
        img.src = e.target.result;
        img.style.display = "block";
    };
    reader.readAsDataURL(file);
}

// Download poster as image
function downloadPoster() {
    html2canvas(document.getElementById("poster")).then(canvas => {
        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "Event_Poster.png";
        link.click();
    });
}

// Share on Instagram (Dummy Function)
function shareOnInstagram() {
    alert("Instagram API integration needed for direct sharing!");
}
