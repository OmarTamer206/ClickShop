const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id"); // Get the value of the "id" parameter

// console.log(id);
let productId = document.querySelector("#pid");
let productOldImagePath = document.querySelector("#oldImg");
let productImg = document.querySelector(".productImg img");
let productName = document.querySelector("#name");
let newProductImg = document.querySelector("#Product-photo");
let productPrice = document.querySelector("#price");
let productBrand = document.querySelector("#brand");
let productCategory = document.querySelector("#cat");
let productQty = document.querySelector("#qty");
let productDesc = document.querySelector("#desc");
let deleteBtn = document.querySelector("#deleteBtn");

function editForm(data) {
    // console.log(data["products"][4].image);
    // data["products"][0].
    productId.value = id;
    productImg.src = `../../Media/ProductImages/${data["products"][0].image}`;
    productOldImagePath.value = productImg.src;
    productName.value = data["products"][0].name;
    // newProductImg.src = `../../Media/ProductImages/${data["products"][0].image}`;
    productPrice.value = data["products"][0].price;
    productBrand.value = data["products"][0].brand;
    productCategory.value = data["products"][0].category;
    productQty.value = data["products"][0].qty;
    productDesc.value = data["products"][0].desc;
}

async function getProductDetails() {
    const data = {
        productId: id,
        functionName: "getProductDataById",
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

let pBrand = document.querySelector("#brand");
let pCategories = document.querySelector("#cat");

document.addEventListener("DOMContentLoaded", async () => {
    let authState = await checkAuth();
    let userType = await getUserType();
    let editValidation = await checkEditProductValidation();
    if (authState["state"]) {
        if (userType["type"] == "admin") {
            window.location.href = "../../Admin/adminHome/adminhome.html";
        } else if (userType["type"] == "customer") {
            window.location.href = "../../index.html";
        }
    } else {
        window.location.href = "../../LoginPage.html";
    }

    if (!editValidation["state"]) {
        window.location.href = "../ManageProductsSeller/index.html";
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

    async function checkEditProductValidation() {
        const data = {
            id: id,
            functionName: "checkEditProductValidation",
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

    // Get Brands And Categories Starts
    let getBrandsAndCategories = await getDataOfBrandsAndCategories();
    let brands = getBrandsAndCategories.brands;
    let categories = getBrandsAndCategories.categories;
    console.log(getBrandsAndCategories.brands["17"]);

    for (let brandId in brands) {
        let bOption = document.createElement("option");

        bOption.value = brandId;
        bOption.innerHTML = brands[brandId];
        // console.log(bOption);
        pBrand.appendChild(bOption);
    }

    for (let categoryID in categories) {
        // console.log(cOption.outerHTML);
        // console.log(pCategories);
        pCategories.innerHTML += `
        <option value="${categoryID}">${categories[categoryID]}</option>
        `;
    }

    async function getDataOfBrandsAndCategories() {
        const data = {
            functionName: "getBrandsAndCategories",
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

    // Get Brands And Categories End

    editForm(await getProductDetails());
});
