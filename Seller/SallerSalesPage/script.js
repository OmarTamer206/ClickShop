let allOrders = document.querySelector(".allorders");

document.addEventListener("DOMContentLoaded", async () => {
    let authState = await checkAuth();
    let userType = await getUserType();
    if (authState["state"]) {
        if (userType["type"] == "admin") {
            window.location.href = "../../Admin/adminHome/adminhome.html";
        } else if (userType["type"] == "customer") {
            window.location.href = "../../index.html";
        }
    } else {
        window.location.href = "../../LoginPage.html";
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

    async function getUserType() {
        const data = {
            functionName: "getUserType",
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
                                <span class="Ototal">${sumPrice} L.E</span></span
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
