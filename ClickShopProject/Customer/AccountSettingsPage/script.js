let EditP_li = document.querySelector("#EditP_li");
let AddB_li = document.querySelector("#AddB_li");
let EditB_li = document.querySelector("#EditB_li");
let changeT_li = document.querySelector("#changeT_li");

let EditP_div = document.querySelector(".editProfile");
let AddB_div = document.querySelector(".addBilling");
let EditB_div = document.querySelector(".editBilling");
let changeT_div = document.querySelector(".changeTheme");

EditP_li.addEventListener("click", () => {
    EditP_div.style.display = "flex";
    AddB_div.style.display = "none";
    EditB_div.style.display = "none";
    changeT_div.style.display = "none";
});

AddB_li.addEventListener("click", () => {
    EditP_div.style.display = "none";
    AddB_div.style.display = "flex";
    EditB_div.style.display = "none";
    changeT_div.style.display = "none";
});

EditB_li.addEventListener("click", () => {
    EditP_div.style.display = "none";
    AddB_div.style.display = "none";
    EditB_div.style.display = "flex";
    changeT_div.style.display = "none";
});

changeT_li.addEventListener("click", () => {
    EditP_div.style.display = "none";
    AddB_div.style.display = "none";
    EditB_div.style.display = "none";
    changeT_div.style.display = "flex";
});

// backend

document.addEventListener("DOMContentLoaded", async () => {
    let editName = document.querySelector("#name");
    let editEmail = document.querySelector("#email");
    let editNumber = document.querySelector("#phone");
    let editGender = document.querySelector("#gender");

    let data = await getProfileData();

    editName.value = data["name"];
    editEmail.value = data["email"];
    editNumber.value = data["phone"];
    editGender.value = data["gender"];

    async function getProfileData() {
        const data = {
            functionName: "getProfileData",
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

    let addCity = document.querySelector("#city");
    let addStreet = document.querySelector("#street");
    let addBuilding = document.querySelector("#building");
    let addFloor = document.querySelector("#floor");
    let addApartment = document.querySelector("#apartment");
    let addB_form = document.querySelector("#addB");

    addB_form.addEventListener("submit", async (event) => {
        event.preventDefault();
        await addAddress(
            addCity.value,
            addStreet.value,
            addBuilding.value,
            addFloor.value,
            addApartment.value
        );
        window.location.href = "../../index.html";
    });

    async function addAddress(city, street, building, floor, apartment) {
        const data = {
            city: city,
            street: street,
            building: building,
            floor: floor,
            apartment: apartment,
            functionName: "addAddress",
        };

        console.log(data);

        try {
            console.log(JSON.stringify(data));

            let response = await fetch("../../PHP/ProductsManagement.php", {
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
            // return response.json();
        } catch (error) {
            console.error("Error:", error.message);
        }
    }
});
