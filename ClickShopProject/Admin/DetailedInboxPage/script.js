const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

let replyForm = document.querySelector("#replyForm");
let feedbackId = document.querySelector(".OID");
let feedbackDate = document.querySelector(".ODate");
let feedbackMessage = document.querySelector("#fMessage");
let feedbackReply = document.querySelector("#exampleFormControlTextarea1");
let dismissBtn = document.querySelector("#dismiss");
let sendBtn = document.querySelector("#send");
document.addEventListener("DOMContentLoaded", async () => {
    let feedbacks = await getFeedbacks();

    feedbackId.innerHTML = id;
    feedbackDate.innerHTML = feedbacks["feedbacks"][id].date;
    feedbackMessage.innerHTML = feedbacks["feedbacks"][id].message;

    replyForm.addEventListener("submit", (event) => {
        event.preventDefault();
    });

    sendBtn.addEventListener("click", () => {
        sendFeedbackReply(id, feedbackReply.value);
        window.location.href = "../AdminInboxPage/index.html";
    });

    dismissBtn.addEventListener("click", () => {
        dismissFeedback(id);
        window.location.href = "../AdminInboxPage/index.html";
    });

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

    async function sendFeedbackReply(id, reply) {
        const data = {
            id: id,
            reply: reply,
            functionName: "sendFeedbackReply",
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
            // return response.json();
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    async function dismissFeedback(id) {
        const data = {
            id: id,
            functionName: "dismissFeedback",
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
            // return response.json();
        } catch (error) {
            console.error("Error:", error.message);
        }
    }
});
