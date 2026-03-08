const username = document.getElementById("username-input");
const password = document.getElementById("password-input");

document.getElementById("login-btn").addEventListener("click", () => {
    if(username.value === "admin" && password.value === "admin123") {
        window.location.assign("main.html")
    }
    else{
        alert("Unable to sign in. Please try again.")
    }
});
