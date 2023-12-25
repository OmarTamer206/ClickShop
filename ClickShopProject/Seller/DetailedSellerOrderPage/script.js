const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id"); // Get the value of the "id" parameter

let detailOrder = document.querySelector("#detailedReport");
let orderId = document.querySelector(".OID");
let orderDate = document.querySelector(".ODate");
let orderTotal = document.querySelector(".OTotal");
document.addEventListener("DOMContentLoaded", async () => {
    let sellerReport = await getOrderDetailsSeller();

    for (const product in sellerReport["sellerOrders"][id]) {
        let sumPrice = 0;
        for (const product in sellerReport["sellerOrders"][id]) {
            sumPrice +=
                sellerReport["sellerOrders"][id][product].price *
                sellerReport["sellerOrders"][id][product].qty;
        }

        detailOrder.innerHTML += `
        <div class="order">
            <img
                class="imgCard"
                src="../../Media/ProductImages/${sellerReport["sellerOrders"][id][product].image}"
                alt="Product Image"
            />
            <span class="info"
                >Name: <span class="OName">${sellerReport["sellerOrders"][id][product].name}</span></span
            >
            <span class="info"
                >Quantity:
                <span class="OQuantity">${sellerReport["sellerOrders"][id][product].qty}</span></span
            >
            <span class="info"
                >Price: <span class="OPrice">${sellerReport["sellerOrders"][id][product].price}</span></span
            >
        </div>
                    `;
    }

    let sumPrice = 0;
    for (const product in sellerReport["sellerOrders"][id]) {
        sumPrice +=
            sellerReport["sellerOrders"][id][product].price *
            sellerReport["sellerOrders"][id][product].qty;
    }
    orderTotal.innerHTML = sumPrice;
    orderDate.innerHTML = sellerReport["sellerOrders"][id][0].date;
    orderId.innerHTML = id;

    async function getOrderDetailsSeller() {
        const data = {
            functionName: "getOrderDetailsSeller",
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
