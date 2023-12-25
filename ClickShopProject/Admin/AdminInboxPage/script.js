let feedbackTable = document.querySelector(".allFeedbacks");
document.addEventListener("DOMContentLoaded", async () => {
    let feedbacks = await getFeedbacks();
    for (const feedback in feedbacks["feedbacks"]) {
        feedbackTable.innerHTML += `
        <tr>
                <td>
                    <a href="../DetailedInboxPage/index.html?id=${feedback}">
                        <div class="Feedback">
                            <span class="info"
                                >Feedback ID: <span class="Fnum">${feedback}</span></span
                            >

                            <span class="Fdate">
                                <span class="info">Date :</span>${feedbacks["feedbacks"][feedback].date}</span
                            >
                        </div>
                    </a>
                </td>
            </tr>
        `;
    }

    async function getFeedbacks() {
        const data = {
            functionName: "getFeedbacks",
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
