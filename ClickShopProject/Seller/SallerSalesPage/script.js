let allOrders = document.querySelector(".allorders");

document.addEventListener("DOMContentLoaded", async () => {
    let sellerReport = await getOrderDetailsSeller();

    for (const order in sellerReport["sellerOrders"]) {
        let sumPrice = 0;
        for (const product in sellerReport["sellerOrders"][order]) {
            sumPrice +=
                sellerReport["sellerOrders"][order][product].price *
                sellerReport["sellerOrders"][order][product].qty;
        }

        allOrders.innerHTML += `
        <tr>
        <td>
                    <a href="../DetailedSellerOrderPage/index.html?id=${order}">
                    <div class="Order">
                    <span class="info"
                                >Order ID: <span class="Onum">${order}</span></span
                                >
                                
                            <span class="Odate">
                            <span class="info">Date :</span>${sellerReport["sellerOrders"][order][0].date}</span
                            >
                            <span class="info"
                                >Total Price:
                                <span class="Ototal">${sumPrice}</span></span
                                >
                                </div>
                    </a>
                    </td>
                    </tr>
                    `;
    }
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
