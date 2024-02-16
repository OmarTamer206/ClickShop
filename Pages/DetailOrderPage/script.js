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
