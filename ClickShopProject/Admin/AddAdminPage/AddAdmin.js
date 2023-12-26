document.addEventListener("DOMContentLoaded", async () => {
    let authState = await checkAuth();
    let userType = await getUserType();

    if (authState["state"]) {
        if (userType["type"] == "customer") {
            window.location.href = "../../index.html";
        } else if (userType["type"] == "seller") {
            window.location.href = "../../Seller/SellerPage/sellerhome.html";
        }
    } else {
        window.location.href = "../../LoginPage.html";
    }
    async function checkAuth() {
        const data = {
            functionName: "checkAuth",
        };

        console.log(data);

        try {
            console.log(JSON.stringify(data));

            let response = await fetch("../../PHP/AccountManagement.php", {
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

            let response = await fetch("../../PHP/AccountManagement.php", {
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

let addAdminForm = document.querySelector("#addAdminForm");
let aName = document.querySelector("#name");
let aPhone = document.querySelector("#num");
let aGender = document.querySelector("#gender");
let email = document.querySelector("#email");
let pass = document.querySelector("#pass");
let emailExistCheck = document.querySelector("#errorEmailExist");
let passCheck = document.querySelector("#errorPass");
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

addAdminForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (emailExistCheck.innerHTML === "" && passCheck.innerHTML === "") {
        signUpUser();
        window.location.href = "../adminHome/adminhome.html";
    }
});

async function signUpUser() {
    const data = {
        userName: aName.value,
        userPhone: aPhone.value,
        userGender: aGender.value,
        userEmail: email.value,
        userPass: pass.value,
        functionName: "addAdmin",
    };

    console.log(data);

    try {
        console.log(JSON.stringify(data));

        const response = await fetch("../../PHP/AccountManagement.php", {
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

        const response = await fetch("../../PHP/AccountManagement.php", {
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
