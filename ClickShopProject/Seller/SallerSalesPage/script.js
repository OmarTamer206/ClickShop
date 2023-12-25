let allOrders = document.querySelector(".allorders");

document.addEventListener("DOMContentLoaded", async () => {
    await getOrderDetailsSeller();

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
