const allStar = document.querySelector(".Rating1");
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

// Backend

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

let productImage = document.querySelector(".uppersection img");
let productName = document.querySelector(".middle h2");
let productPrice = document.querySelector("#price");
let productStarsContainer = document.querySelector(".ratesStars");
let productQty = document.querySelector("#qty");
let productDetails = document.querySelector(".ProductDetails p");
let productReviews = document.querySelector(".CommentAndRating");
let productSwipers = document.querySelector(".swiper-wrapper");
let rateDiv = document.querySelector(".rateDiv");
let addToCartBtn = document.querySelector("#addCart");

document.addEventListener("DOMContentLoaded", async () => {
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

    getReviews();

    async function getReviews() {
        let Reviews = await getProductReviews();
        productReviews.innerHTML = `
                    <span class="Header">
                        <h4>Reviews</h4>
                    </span>
        `;
        for (const comment in Reviews["products"]) {
            let stars = "";

            for (let i = 0; i < Reviews["products"][comment].rate; i++) {
                stars += `<img
            src="../../Media/Stars/filledStar.png"
            alt=""
            />
            `;
            }
            for (let i = Reviews["products"][comment].rate; i < 5; i++) {
                stars += `
                <img
                    src="../../Media/Stars/emptyStar.png"
                    alt=""
                />
                `;
            }
            productReviews.innerHTML += `
        <div class="Comment">
                        <span class="User">${Reviews["products"][comment].name}</span>
                        
                        <div class="rating">
                            <span class="ratesStars">
                                ${stars}
                            </span>
                            
                        </div>
                          <p class="Text">${Reviews["products"][comment].comment}</p>
                          <hr>
                       </div>
        `;
        }
    }

    let similars = await getProductSimilars();

    for (const product in similars["products"]) {
        let stars = "";

        for (let i = 0; i < similars["products"][product].rate; i++) {
            stars += `<img
            src="../../Media/Stars/filledStar.png"
            alt=""
            />
            `;
        }
        for (let i = similars["products"][product].rate; i < 5; i++) {
            stars += `
                <img
                    src="../../Media/Stars/emptyStar.png"
                    alt=""
                />
                `;
        }
        productSwipers.innerHTML += `
        <div class="swiper-slide">
                    <a href="../ProductPageView/index.html?id=${similars["products"][product].id}">
                    <div class="card">
                        <div class="imgCard">
                            <img src="../../Media/ProductImages/${similars["products"][product].image}" alt="Product Image" />
                        </div>
                        <h3>${similars["products"][product].name}</h3>
    
                        <p>${similars["products"][product].price}</p>
    
                        <div class="ratingP">
                            <span class="ratesStars">
                               ${stars}
                            </span>
                            
                        </div>
                    </div>
                </a>
                </div>
        `;
    }
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

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
    async function getProductSimilars() {
        const data = {
            productId: id,
            functionName: "getProductSimilarsById",
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
    async function getProductReviews() {
        const data = {
            productId: id,
            functionName: "getProductReviewsById",
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

    let reviewedBefore = await checkReview(id);
    console.log(reviewedBefore);
    let rateDiv = document.querySelector(".rateDiv");
    if (reviewedBefore["state"] === false) {
        rateDiv.style.display = "none";
    }

    async function checkReview(id) {
        const data = {
            id: id,
            functionName: "checkReview",
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

    let ratingForm = document.querySelector("#ratingForm");
    // let ratingStars = document.querySelector(".Rating1");
    let ratingComment = document.querySelector("#tArea");

    ratingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let stars = 0;
        for (const star of allStar.children) {
            if (star.classList.contains("bxs-star")) {
                stars++;
            }
        }

        sendReview(stars, ratingComment.value);
        rateDiv.style.display = "none";
        getReviews();

        // console.log(stars);
    });

    async function sendReview(rate, comment) {
        const data = {
            id: id,
            rate: rate,
            comment: comment,
            functionName: "sendReview",
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

    let authState = await checkAuth();

    if (!authState["state"]) {
        addToCartBtn.disabled = "true";
        addToCartBtn.style;
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
});

addToCartBtn.addEventListener("click", async () => {
    const data = {
        productId: id,
        qty: productQty.value,
        functionName: "addToCart",
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
});
