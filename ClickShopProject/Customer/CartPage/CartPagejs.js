// backend

let tBody = document.querySelector("#carttable tbody");
let final_subtotal = document.querySelector("#subtotal-total");
let addressField = document.querySelector(".addressCart");
let shippingFees = document.querySelector("#shippingFees");
let grand_total = document.querySelector("#final-grand-total");
let lastID;
document.addEventListener("DOMContentLoaded", async () => {
    let productsInCart = await getCart();
    console.log(productsInCart);

    for (const product in productsInCart["products"]) {
        console.log("work");
        tBody.innerHTML += `
        <tr id="Product${product}">
        <td  class="flexitem">
            <div class="thumbnail">
                <a href="#"><img src="../../Media/ProductImages/${
                    productsInCart["products"][product].image
                }" alt="Product2"></a>
            </div>

            <div class="content">
                <strong><a href="#"> ${
                    productsInCart["products"][product].name
                }</a></strong>
                
            </div>
        </td>
        <td>$${productsInCart["products"][product].price}</td>
        <td>
            <div class="quantitycontrol">
                <button id="M${product}" class="minus">-</button>
                <input id="qty${product}" type="number" min="1" value="${
            productsInCart["products"][product].qty
        }" />
                <button id="P${product}" class="plus">+</button>
            </div>
        </td>
        <td class="s-t" >$<span id="subtotal${product}">${
            productsInCart["products"][product].price *
            productsInCart["products"][product].qty
        }</span></td>
        <td id="delete${product}"><span class="deletebtn" ><i class='bx bx-x'></i></i></a></span></td>
    </tr>
        `;

        let productSlot = document.querySelector(`#Product${product}`);
        let minus = document.querySelector(`#M${product}`);
        let plus = document.querySelector(`#P${product}`);
        let qty = document.querySelector(`#qty${product}`);
        let subtotal = document.querySelector(`#subtotal${product}`);
        let deleteBtn = document.querySelector(`#delete${product}`);

        final_subtotal.innerHTML =
            +final_subtotal.innerHTML + +subtotal.innerHTML;

        grand_total.innerHTML =
            +final_subtotal.innerHTML + +shippingFees.innerHTML;

        lastID = product;
        // setEvents(minus, plus, deleteBtn, qty, subtotal, productSlot, product);
    }
    console.log(lastID);

    for (let i = 0; i <= lastID; i++) {
        let productSlot = document.querySelector(`#Product${i}`);
        let minus = document.querySelector(`#M${i}`);
        let plus = document.querySelector(`#P${i}`);
        let qty = document.querySelector(`#qty${i}`);
        let subtotal = document.querySelector(`#subtotal${i}`);
        let deleteBtn = document.querySelector(`#delete${i}`);
        setEvents(minus, plus, deleteBtn, qty, subtotal, productSlot, i);
    }

    function setEvents(
        minus,
        plus,
        deleteBtn,
        qty,
        subtotal,
        productSlot,
        product
    ) {
        minus.addEventListener("click", () => {
            qty.value--;
            subtotal.innerHTML =
                productsInCart["products"][product].price * qty.value;
            updateCartQty(productsInCart["products"][product].id, qty.value);

            final_subtotal.innerHTML =
                +final_subtotal.innerHTML -
                +productsInCart["products"][product].price;

            grand_total.innerHTML =
                +final_subtotal.innerHTML + +shippingFees.innerHTML;
        });
        plus.addEventListener("click", () => {
            console.log(product);
            qty.value++;
            subtotal.innerHTML =
                productsInCart["products"][product].price * qty.value;
            updateCartQty(productsInCart["products"][product].id, qty.value);

            final_subtotal.innerHTML =
                +final_subtotal.innerHTML +
                +productsInCart["products"][product].price;

            grand_total.innerHTML =
                +final_subtotal.innerHTML + +shippingFees.innerHTML;
        });
        deleteBtn.addEventListener("click", () => {
            final_subtotal.innerHTML =
                +final_subtotal.innerHTML -
                productsInCart["products"][product].price * +qty.value;

            grand_total.innerHTML =
                +final_subtotal.innerHTML + +shippingFees.innerHTML;
            deleteFromCart(productsInCart["products"][product].id);
            tBody.removeChild(productSlot);
        });
    }

    async function updateCartQty(id, qty) {
        const data = {
            productId: id,
            qty: qty,
            functionName: "updateCartQty",
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

    async function deleteFromCart(id) {
        const data = {
            productId: id,
            functionName: "deleteFromCart",
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

    async function getCart() {
        const data = {
            functionName: "getCart",
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

    let savedAddresses = document.querySelector("#availableAddresses");
    let addAddressBtn = document.querySelector("#addAddress");
    let selectAddress = document.querySelector("#selectAddress");
    let city = document.querySelector("#chooseCity");
    let street = document.querySelector("#street");
    let building = document.querySelector("#building");
    let floor = document.querySelector("#floor");
    let apartment = document.querySelector("#apartment");

    loadAddress();

    addAddressBtn.addEventListener("click", () => {
        addAddress(
            city.value,
            street.value,
            building.value,
            floor.value,
            apartment.value
        );
        loadAddress();
    });

    async function loadAddress() {
        let addresses = await getAddresses();

        for (const address in addresses["address"]) {
            savedAddresses.innerHTML += `
            <option value = ${address}>City:${addresses["address"][address].city} ,Street: ${addresses["address"][address].street} ,Building: ${addresses["address"][address].building} ,Floor: ${addresses["address"][address].floor} ,Apartment No.${addresses["address"][address].apartment} </option>
    
            `;
        }

        selectAddress.addEventListener("click", () => {
            addressField.innerHTML = `City:${
                addresses["address"][savedAddresses.value].city
            } ,Street: ${
                addresses["address"][savedAddresses.value].street
            } ,Building: ${
                addresses["address"][savedAddresses.value].building
            } ,Floor: ${
                addresses["address"][savedAddresses.value].floor
            } ,Apartment No.${
                addresses["address"][savedAddresses.value].apartment
            }`;

            switch (addresses["address"][savedAddresses.value].city) {
                case "Cairo":
                    shippingFees.innerHTML = 30;
                    break;
                case "Giza":
                    shippingFees.innerHTML = 40;
                    break;
                case "Alex":
                    shippingFees.innerHTML = 50;
                    break;
                case "Mansora":
                    shippingFees.innerHTML = 20;
                    break;
            }

            grand_total.innerHTML =
                +final_subtotal.innerHTML + +shippingFees.innerHTML;
        });
    }

    async function getAddresses() {
        const data = {
            functionName: "getAddresses",
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

    async function addAddress(city, street, building, floor, apartment) {
        const data = {
            city: city,
            street: street,
            building: building,
            floor: floor,
            apartment: apartment,
            functionName: "addAddress",
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
