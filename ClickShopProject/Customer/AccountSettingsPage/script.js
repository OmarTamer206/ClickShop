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

// backend

document.addEventListener("DOMContentLoaded", async () => {
    let authState = await checkAuth();
    let userType = await getUserType();
    if (authState["state"]) {
        if (userType["type"] == "admin") {
            window.location.href = "../../Admin/adminHome/adminhome.html";
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

    let editAddress = document.querySelector("#editAddress");
    let editCity = document.querySelector("#editCity");
    let editStreet = document.querySelector("#editStreet");
    let editBuilding = document.querySelector("#editBuilding");
    let editFloor = document.querySelector("#editFloor");
    let editApartment = document.querySelector("#editApartment");
    let editBtn = document.querySelector("#edit");
    let removeBtn = document.querySelector("#remove");
    let editBForm = document.querySelector("#editB");

    let addresses = await getAddresses();

    for (const address in addresses["address"]) {
        editAddress.innerHTML += `
        <option value=${address}>${addresses["address"][address].city} ,${addresses["address"][address].street}  </option>
        `;
    }

    editBForm.addEventListener("submit", (event) => {
        event.preventDefault();
    });

    editAddress.addEventListener("change", () => {
        let addressId = editAddress.value;

        editCity.value = addresses["address"][addressId].city;
        editStreet.value = addresses["address"][addressId].street;
        editBuilding.value = addresses["address"][addressId].building;
        editFloor.value = addresses["address"][addressId].floor;
        editApartment.value = addresses["address"][addressId].apartment;
        editBtn.disabled = false;
        removeBtn.disabled = false;
    });

    editBtn.addEventListener("click", async () => {
        await updateAddress(
            editAddress.value,
            editCity.value,
            editStreet.value,
            editBuilding.value,
            editFloor.value,
            editApartment.value
        );

        window.location.href = "../../index.html";
    });

    removeBtn.addEventListener("click", async () => {
        await removeAddress(editAddress.value);
        window.location.href = "../../index.html";
    });

    async function getAddresses() {
        const data = {
            functionName: "getAddresses",
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
            return response.json();
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    async function updateAddress(id, city, street, building, floor, apartment) {
        const data = {
            id: id,
            city: city,
            street: street,
            building: building,
            floor: floor,
            apartment: apartment,
            functionName: "updateAddress",
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

    async function removeAddress(id) {
        const data = {
            id: id,

            functionName: "removeAddress",
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
