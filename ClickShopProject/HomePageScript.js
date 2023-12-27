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
});
