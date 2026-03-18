const form = document.getElementById("registrationForm");


const nameFields = ["firstName", "middleName", "lastName"];
nameFields.forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener("input", function() {
        let start = this.selectionStart; 
        
        let transformed = this.value
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        if (this.value !== transformed) {
            this.value = transformed;
            this.setSelectionRange(start, start); 
        }
    });
});


const password = document.getElementById("password");
const strengthDiv = document.createElement("div");
strengthDiv.style.marginTop = "5px";
strengthDiv.innerHTML = `
    <div style="height: 5px; width: 100%; background: #eee; border-radius: 3px; overflow: hidden;">
        <div id="strengthBar" style="height: 100%; width: 0%; transition: 0.3s;"></div>
    </div>
    <small id="strengthText" style="font-weight: bold; font-size: 11px;"></small>
`;
password.parentNode.insertBefore(strengthDiv, password.nextSibling);

password.addEventListener("input", function() {
    const val = this.value;
    let score = 0;
    if (val.length >= score++);
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[@$!%*?&]/.test(val)) score++;

    const bar = document.getElementById("strengthBar");
    const text = document.getElementById("strengthText");
    const colors = ["#ff4d4d", "#ffa500", "#2ecc71", "#27ae60"];
    const labels = ["Weak", "Fair", "Good", "Strong"];

    if (val === "") {
        bar.style.width = "0%";
        text.textContent = "";
    } else {
        bar.style.width = (score / 4 * 100) + "%";
        bar.style.backgroundColor = colors[score - 1] || colors[0];
        text.textContent = labels[score - 1] || labels[0];
        text.style.color = colors[score - 1] || colors[0];
    }
});


form.addEventListener("submit", function(e) {
    e.preventDefault();
    let isValid = true;

    const firstName = document.getElementById("firstName");
    const middleName = document.getElementById("middleName");
    const lastName = document.getElementById("lastName");
    const course = document.getElementById("course");
    const gender = document.getElementsByName("gender");
    const terms = document.getElementById("terms");

    // Regex 
    const nameRegex = /^[A-Za-z\s]+$/; 
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    // Clear errors
    document.querySelectorAll(".error").forEach(e => e.textContent = "");

    // Validations
    if (!nameRegex.test(firstName.value)) {
        showError(firstName, "Only letters allowed");
        isValid = false;
    }
    if (middleName.value && !nameRegex.test(middleName.value)) {
        showError(middleName, "Only letters allowed");
        isValid = false;
    }
    if (!nameRegex.test(lastName.value)) {
        showError(lastName, "Only letters allowed");
        isValid = false;
    }
    if (course.value === "") {
        showError(course, "Please select a course");
        isValid = false;
    }
    if (!passwordRegex.test(password.value)) {
        showError(password, "Min 8 chars, 1 uppercase, 1 number, 1 special char");
        isValid = false;
    }

    let genderSelected = false;
    gender.forEach(g => { if (g.checked) genderSelected = true; });
    if (!genderSelected) {
        showError(gender[0], "Select gender");
        isValid = false;
    }

    if (!terms.checked) {
        showError(terms, "You must accept terms");
        isValid = false;
    }

    if (isValid) {
        alert("Registration Successful!");
        form.reset();
        document.getElementById("strengthBar").style.width = "0%";
        document.getElementById("strengthText").textContent = "";
    }
});

function showError(input, message) {
    const formGroup = input.closest(".form-group");
    formGroup.querySelector(".error").textContent = message;
}