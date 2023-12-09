let EditP_li = document.querySelector("#EditP_li");
let AddB_li = document.querySelector("#AddB_li");
let EditB_li = document.querySelector("#EditB_li");
let changeT_li = document.querySelector("#changeT_li");

let EditP_div = document.querySelector(".editProfile");
let AddB_div = document.querySelector(".addBilling");
let EditB_div = document.querySelector(".editBilling");
let changeT_div = document.querySelector(".changeTheme");

EditP_li.addEventListener("click", () => {
    EditP_div.style.display = "flex";
    AddB_div.style.display = "none";
    EditB_div.style.display = "none";
    changeT_div.style.display = "none";
});

AddB_li.addEventListener("click", () => {
    EditP_div.style.display = "none";
    AddB_div.style.display = "flex";
    EditB_div.style.display = "none";
    changeT_div.style.display = "none";
});

EditB_li.addEventListener("click", () => {
    EditP_div.style.display = "none";
    AddB_div.style.display = "none";
    EditB_div.style.display = "flex";
    changeT_div.style.display = "none";
});

changeT_li.addEventListener("click", () => {
    EditP_div.style.display = "none";
    AddB_div.style.display = "none";
    EditB_div.style.display = "none";
    changeT_div.style.display = "flex";
});
