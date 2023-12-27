// Category List Start

document.addEventListener("DOMContentLoaded", function () {
    var menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener("mouseover", function () {
            // Hide all submenus
            // menuItems.forEach(function (item) {
            // item.classList.remove("active");
            //     var submenu = item.querySelector(".submenu");
            //     if (submenu) {
            //         submenu.style.display = "none";
            //     }
            // });

            // Show the submenu of the hovered item
            // menuItem.classList.add("active");
            var submenu = menuItem.querySelector(".submenu");
            if (submenu) {
                submenu.style.display = "flex";
            }
        });

        menuItem.addEventListener("mouseout", function () {
            // Hide the submenu when mouse leaves the menu item
            // menuItem.classList.remove("active");
            var submenu = menuItem.querySelector(".submenu");
            if (submenu) {
                submenu.style.display = "none";
            }
        });
    });
});

// Category List End

document.addEventListener("DOMContentLoaded", async () => {
    let authState = await checkAuth();
    let userType = await getUserType();
    if (authState["state"]) {
        if (userType["type"] == "admin") {
            window.location.href = "Admin/adminHome/adminhome.html";
        } else if (userType["type"] == "seller") {
            window.location.href = "Seller/SellerPage/sellerhome.html";
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

    let productSwipers = document.querySelector(".swiper-wrapper");
    let bestProducts = await getBestProducts();

    for (const product in bestProducts["products"]) {
        let stars = "";

        for (let i = 0; i < bestProducts["products"][product].rate; i++) {
            stars += `<img
            src="Media/Stars/filledStar.png"
            alt=""
            />
            `;
        }
        for (let i = bestProducts["products"][product].rate; i < 5; i++) {
            stars += `
                <img
                    src="Media/Stars/emptyStar.png"
                    alt=""
                />
                `;
        }
        productSwipers.innerHTML += `
        <div class="swiper-slide">
                    <a href="Customer/ProductPageView/index.html?id=${bestProducts["products"][product].id}">
                    <div class="card">
                        <div class="imgCard">
                            <img src="Media/ProductImages/${bestProducts["products"][product].image}" alt="Product Image" />
                        </div>
                        <h3>${bestProducts["products"][product].name}</h3>
    
                        <p>${bestProducts["products"][product].price}</p>
    
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
        slidesPerView: 5,
        spaceBetween: 0,
        slidesPerGroup: 1,
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

    async function getBestProducts() {
        const data = {
            functionName: "getBestProducts",
        };

        console.log(data);

        try {
            console.log(JSON.stringify(data));

            let response = await fetch("PHP/ProductsManagement.php", {
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
