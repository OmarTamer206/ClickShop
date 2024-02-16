let login = document.getElementById("login");
let signup = document.getElementById("signup");
let shade = document.getElementById("switch");

login.addEventListener("click", function () {
    shade.classList.remove("toRight");
    shade.classList.add("toLeft");
    document.title = "Log In Page";
});

signup.addEventListener("click", function () {
    shade.classList.remove("toLeft");
    shade.classList.add("toRight");
    document.title = "Sign Up Page";
});
