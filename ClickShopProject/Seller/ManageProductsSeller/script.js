let productsContainer = document.querySelector(".PSPcard-container");
let sortElement = document.querySelector("#sortSelect");
let sortDirection = document.querySelector("#sortdir");
let productsCount = document.querySelector(".elementsFound");

sortElement.addEventListener("change", async () => {
    makeCards(await getProducts(sortElement, sortDirection));
});

sortDirection.addEventListener("change", async () => {
    makeCards(await getProducts(sortElement, sortDirection));
});

function makeCards(data) {
    // console.log(data["products"][4].image);
    productsContainer.innerHTML = "";
    let pCount = 0;

    for (const product in data["products"]) {
        let stars = "";
        pCount++;
        for (let i = 0; i < data["products"][product].rate; i++) {
            stars += `<img
            src="../../Media/Stars/filledStar.png"
            alt=""
            />
            `;
        }
        for (let i = data["products"][product].rate; i < 5; i++) {
            stars += `
                <img
                    src="../../Media/Stars/emptyStar.png"
                    alt=""
                />
                `;
        }

        productsContainer.innerHTML += `
    <a href="../EditProductPage/EditProductPage.html?id=${data["products"][product].id}">
    <div class="PSPcard">
        <div class="PSPimgCard">
            <img
                src="../../Media/ProductImages/${data["products"][product].image}"
                alt="Product Image"
            />
        </div>
        <h3>${data["products"][product].name}</h3>
    
        <p>$${data["products"][product].price}</p>
    
        <div class="PSPrating">
            <span class="PSPratesStars">
                ${stars}
            </span>
            <p class="PSPreviewsCount"></p>
        </div>
    </div>
    </a>
    `;
    }

    productsCount.innerHTML = pCount;
}

async function getProducts(sort, direction) {
    const data = {
        sort: sort.value,
        direction: direction.value,
        functionName: "getProductsOfSeller",
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

document.addEventListener("DOMContentLoaded", async () => {
    let authState = await checkAuth();
    let userType = await getUserType();
    if (authState["state"]) {
        if (userType["type"] == "admin") {
            window.location.href = "../../Admin/adminHome/adminhome.html";
        } else if (userType["type"] == "customer") {
            window.location.href = "../../index.html";
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

    makeCards(await getProducts(sortElement, sortDirection));
});
