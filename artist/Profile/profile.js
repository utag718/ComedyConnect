document.getElementById('upload-pic').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-pic').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function saveProfile() {
    const name = document.getElementById("profile-name").value;
    const email = document.getElementById("profile-email").value;
    const bio = document.getElementById("profile-bio").value;
    const links = document.getElementById("profile-links").value;

    // Save to localStorage (Temporary - You can connect it to a database)
    localStorage.setItem("profileName", name);
    localStorage.setItem("profileEmail", email);
    localStorage.setItem("profileBio", bio);
    localStorage.setItem("profileLinks", links);

    alert("Profile Updated Successfully!");
}

// Load saved data
window.onload = function() {
    document.getElementById("profile-name").value = localStorage.getItem("profileName") || "John Doe";
    document.getElementById("profile-email").value = localStorage.getItem("profileEmail") || "johndoe@example.com";
    document.getElementById("profile-bio").value = localStorage.getItem("profileBio") || "Passionate stand-up comedian performing in major clubs.";
    document.getElementById("profile-links").value = localStorage.getItem("profileLinks") || "https://instagram.com/johndoe";
};
