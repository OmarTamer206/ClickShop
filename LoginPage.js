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

// Back Logic
// Sign up start
let signUpForm = document.querySelector(".login-form");
let uname = document.querySelector("#name");
let phoneNumber = document.querySelector("#phone");
let gender = document.querySelector("#gender");
let email = document.querySelector("#email");
let pass = document.querySelector("#pass");
let passr = document.querySelector("#passr");
let passRepeat = document.querySelector("#passr");
let emailExistCheck = document.querySelector("#errorEmailExist");
let passCheck = document.querySelector("#errorPass");
let passrCheck = document.querySelector("#errorNotSamePass");

email.addEventListener("focusout", async () => {
    let exist = await checkEmail();
    // console.log(exist.exist);
    if (exist.exist) {
        emailExistCheck.innerHTML = "Email Already Exist";
    } else {
        emailExistCheck.innerHTML = "";
    }
});

pass.addEventListener("focusout", () => {
    let password = pass.value;

    if (password.length < 8) {
        passCheck.innerHTML = "Password is too short";
    } else if (!password.match("^[a-zA-Z0-9]{8,}$")) {
        passCheck.innerHTML =
            "Password Should Contain at least 8 characters <br> and no special characters";
    } else {
        passCheck.innerHTML = "";
    }
});

passr.addEventListener("focusout", () => {
    if (pass.value !== passr.value) {
        passrCheck.innerHTML = "Passwords Are Not Identical";
    } else {
        passrCheck.innerHTML = "";
    }
});

signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (
        emailExistCheck.innerHTML === "" &&
        passCheck.innerHTML === "" &&
        passrCheck.innerHTML === ""
    ) {
        signUpUser();
        window.location.href = "index.html";
    }
});

async function signUpUser() {
    const data = {
        userName: uname.value,
        userPhone: phoneNumber.value,
        userGender: gender.value,
        userEmail: email.value,
        userPass: pass.value,
        functionName: "signupUser",
    };

    console.log(data);

    try {
        console.log(JSON.stringify(data));

        const response = await fetch("PHP/AccountManagement.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

async function checkEmail() {
    const data = {
        userEmail: email.value,
        functionName: "checkEmail",
    };

    console.log(data);

    try {
        console.log(JSON.stringify(data));

        const response = await fetch("PHP/AccountManagement.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log("hi");
        // console.log(response.json());
        console.log("hi");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Sign up End

// Login Start

let loginForm = document.querySelector(".signup-form");
let lEmail = document.querySelector("#emaillogIn");
let lPass = document.querySelector("#passlogIn");
let errorCheck = document.querySelector("#error");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let state = await logInUser();
    // console.log(state.state);
    if (state.state === "user") {
        window.location.href = "index.html";
    } else if (state.state === "admin") {
        window.location.href = "Admin/adminHome/adminhome.html";
    } else if (state.state === "seller") {
        window.location.href = "Seller/SellerPage/sellerhome.html";
    } else {
        errorCheck.innerHTML = "Please Enter a Valid Account";
    }
});

async function logInUser() {
    const data = {
        userEmail: lEmail.value,
        userPass: lPass.value,
        functionName: "login",
    };

    console.log(data);

    try {
        console.log(JSON.stringify(data));

        let response = await fetch("PHP/AccountManagement.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log("hi");
        // console.log(response.json());
        console.log("hi");
        // console.log(response.json());
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Login End

document.addEventListener("DOMContentLoaded", async () => {
    let authState = await checkAuth();
    let userType = await getUserType();
    if (authState["state"]) {
        if (userType["type"] == "admin") {
            window.location.href = "Admin/adminHome/adminhome.html";
        } else if (userType["type"] == "seller") {
            window.location.href = "Seller/SellerPage/sellerhome.html";
        } else if (userType["type"] == "customer") {
            window.location.href = "index.html";
        }
    }
    async function checkAuth() {
        const data = {
            functionName: "checkAuth",
        };

        console.log(data);

        try {
            console.log(JSON.stringify(data));

            let response = await fetch("PHP/AccountManagement.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            console.log("hi");
            // console.log(response.json());
            console.log("hi");
            // console.log(response.json());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    async function getUserType() {
        const data = {
            functionName: "getUserType",
        };

        console.log(data);

        try {
            console.log(JSON.stringify(data));

            let response = await fetch("PHP/AccountManagement.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            console.log("hi");
            // console.log(response.json());
            console.log("hi");
            // console.log(response.json());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error("Error:", error.message);
        }
    }
});
