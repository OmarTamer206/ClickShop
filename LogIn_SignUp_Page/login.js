
    document.addEventListener("DOMContentLoaded", function () {
        
        const signUpForm = document.querySelector(".login-form");
        const loginForm = document.querySelector(".signup-form");
        
        signUpForm.addEventListener("input", validateSignUpForm);
        loginForm.addEventListener("input", validateLoginForm);
        function validateSignUpForm() {
            const name = document.getElementById("name").value;
            const phone = document.getElementById("phone").value;
            const gender = document.getElementById("gender").value;
            const email = document.getElementById("email").value;
            const pass = document.getElementById("pass").value;
            const passr = document.getElementById("passr").value;

            if (name.trim() === "") {
                
                console.log("Name is required!");
            }
        }
        function validateLoginForm() {
            const emaillogIn = document.getElementById("emaillogIn").value;
            const passlogIn = document.getElementById("passlogIn").value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            var error = document.getElementById("error")
            if (!emailRegex.test(emaillogIn)) 
            {
                // Changing content and color of content
            error.textContent = "Please enter a valid email"
            error.style.color = "red"
            } else {
            error.textContent = ""
            }
        }
    });

