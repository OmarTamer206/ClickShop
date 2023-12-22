let pBrand = document.querySelector("#brand");
let pCategories = document.querySelector("#cat");
let addProductForm = document.querySelector("#AddProduct");
let bError = document.querySelector("#brandError");
let cError = document.querySelector("#catError");

document.addEventListener("DOMContentLoaded", async () => {
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
});
