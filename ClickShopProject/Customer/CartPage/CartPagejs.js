function addNewAddress() {
    var dropdown = document.getElementById("dropdown-menu");

    var newAddressInput = document.getElementById("newAddress");
    var newAddress = newAddressInput.value;

    var option = document.createElement("option");
    option.value = newAddress.toLowerCase().replace(/\s/g, "");
    option.text = newAddress;

    dropdown.add(option);

    newAddressInput.value = "";
}

// backend

let tBody = document.querySelector("#carttable tbody");

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
                <input id="qty${product}" type="text" value="${
            productsInCart["products"][product].qty
        }" min="1"/>
                <button id="P${product}" class="plus">+</button>
            </div>
        </td>
        <td id="subtotal${product}">$${
            productsInCart["products"][product].price *
            productsInCart["products"][product].qty
        }</td>
        <td id="delete${product}"><span class="deletebtn" ><i class='bx bx-x'></i></i></a></span></td>
    </tr>
        `;

        let productSlot = document.querySelector(`#Product${product}`);
        let minus = document.querySelector(`#M${product}`);
        let plus = document.querySelector(`#P${product}`);
        let qty = document.querySelector(`#qty${product}`);
        let subtotal = document.querySelector(`#subtotal${product}`);
        let deleteBtn = document.querySelector(`#delete${product}`);

        minus.addEventListener("click", () => {
            qty.value--;
            subtotal.innerHTML =
                `$` + productsInCart["products"][product].price * qty.value;
        });
        plus.addEventListener("click", () => {
            qty.value++;
            subtotal.innerHTML =
                `$` + productsInCart["products"][product].price * qty.value;
            updateCartQty(productsInCart["products"][product].id, qty.value);
        });
        deleteBtn.addEventListener("click", () => {
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
});
