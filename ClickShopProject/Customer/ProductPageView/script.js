const allStar1 = document.querySelectorAll(".Rating1 .star");

allStar1.forEach((item, idx) => {
    item.addEventListener("click", function () {
        allStar1.forEach((i) => {
            i.classList.replace("bxs-star", "bx-star");
        });
        for (let i = 0; i < allStar1.length; i++) {
            if (i <= idx) {
                allStar1[i].classList.replace("bx-star", "bxs-star");
            }
        }
    });
});

const allStar2 = document.querySelectorAll(".Rating2 .star");

allStar2.forEach((item, idx) => {
    item.addEventListener("click", function () {
        allStar2.forEach((i) => {
            i.classList.replace("bxs-star", "bx-star");
        });
        for (let i = 0; i < allStar2.length; i++) {
            if (i <= idx) {
                allStar2[i].classList.replace("bx-star", "bxs-star");
            }
        }
    });
});

const allStar3 = document.querySelectorAll(".Rating3 .star");

allStar3.forEach((item, idx) => {
    item.addEventListener("click", function () {
        allStar3.forEach((i) => {
            i.classList.replace("bxs-star", "bx-star");
        });
        for (let i = 0; i < allStar3.length; i++) {
            if (i <= idx) {
                allStar3[i].classList.replace("bx-star", "bxs-star");
            }
        }
    });
});

// Backend

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    let productImage = document.querySelector(".uppersection img");
    let productName = document.querySelector(".middle h2");
    let productPrice = document.querySelector("#price");
    let productStarsContainer = document.querySelector(".ratesStars");
    let productQty = document.querySelector("#qty");
    let productDetails = document.querySelector(".ProductDetails p");
    let productReviews = document.querySelector(".CommentAndRating");

    let productData = await getProductDetails();

    productImage.src = `../../Media/ProductImages/${productData["products"][0].image}`;
    productName.innerHTML = productData["products"][0].name;
    productPrice.innerHTML = "$" + productData["products"][0].price;
    productQty.max = productData["products"][0].qty;
    productDetails.innerHTML = productData["products"][0].desc;

    for (let i = 0; i < productData["products"][0].rate; i++) {
        productStarsContainer.innerHTML += `<img src="../../Media/Stars/filledStar.png" alt="" />`;
    }
    for (let i = productData["products"][0].rate; i < 5; i++) {
        productStarsContainer.innerHTML += `<img src="../../Media/Stars/emptyStar.png" alt="" />`;
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
});
