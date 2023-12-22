let productsContainer = document.querySelector(".PSPcard-container");
let sortElement = document.querySelector("#sortSelect");
let sortDirection = document.querySelector("#sortdir");
let productsCount = document.querySelector(".elementsFound");

const urlParams = new URLSearchParams(window.location.search);
const cat = urlParams.get("cat");
const search = urlParams.get("search");

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
    <a href="../ProductPageView/index.html?id=${data["products"][product].id}">
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
        functionName: "GPBC",
    };

    console.log(data);
    console.log(JSON.stringify(data));

    if (cat != null) {
        try {
            let response = await fetch(
                `../../PHP/ProductsManagement.php?fN=GPBC&cat=${cat}&sort=${sort.value}&direction=${direction.value}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
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
    } else if (search != null) {
        try {
            let response = await fetch(
                `../../PHP/ProductsManagement.php?fN=SP&search=${search}&sort=${sort.value}&direction=${direction.value}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
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
}

document.addEventListener("DOMContentLoaded", async () => {
    makeCards(await getProducts(sortElement, sortDirection));
});
