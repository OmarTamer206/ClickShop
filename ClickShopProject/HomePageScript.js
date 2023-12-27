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
