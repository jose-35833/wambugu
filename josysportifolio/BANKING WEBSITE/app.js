// Select Elements
const createAccountBtn = document.getElementById("createAccountBtn");

const formWrapper = document.getElementById("formWrapper");
const closeForm = document.getElementById("closeForm");
const registerForm = document.getElementById("registerForm");

const loginWrapper = document.getElementById("loginWrapper");
const closeLogin = document.getElementById("closeLogin");
const loginForm = document.getElementById("loginForm");

const bankingWrapper = document.getElementById("bankingWrapper");
const userDisplay = document.getElementById("userDisplay");
const balanceDisplay = document.getElementById("balanceDisplay");

const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");
const checkBalanceBtn = document.getElementById("checkBalance");
const logoutBtn = document.getElementById("logoutBtn");

// Show Registration Form
createAccountBtn.addEventListener("click", () => {
    console.log("Create Account button clicked"); // Debugging log

    formWrapper.style.display = "block";
});

// Close Forms
closeForm.addEventListener("click", () => {
    formWrapper.style.display = "none";
});

closeLogin.addEventListener("click", () => {
    loginWrapper.style.display = "none";
});

// Register User
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let initialDeposit = document.getElementById("initialDeposit").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Store user data in Local Storage
    let userData = {
        username: username,
        email: email,
        password: password,
        balance: parseFloat(initialDeposit),
    };

    localStorage.setItem("bankUser", JSON.stringify(userData));

    alert("Account created successfully!");
    formWrapper.style.display = "none";
    bankingWrapper.style.display = "block";
    userDisplay.textContent = username;
    balanceDisplay.textContent = userData.balance;

    // Clear form fields
    registerForm.reset();
});

// Show Login Form
document.getElementById("showLoginForm").addEventListener("click", () => {
    formWrapper.style.display = "none";
    loginWrapper.style.display = "block";
});

// Show Register Form from Login Page
document.getElementById("showRegisterForm").addEventListener("click", () => {
    loginWrapper.style.display = "none";
    formWrapper.style.display = "block";
});

// Login User
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let loginUsername = document.getElementById("loginUsername").value;
    let loginPassword = document.getElementById("loginPassword").value;

    let storedUser = JSON.parse(localStorage.getItem("bankUser"));

    if (!storedUser) {
        alert("No account found! Please register.");
        return;
    }

    if (loginUsername === storedUser.username && loginPassword === storedUser.password) {
        alert("Login successful!");
        loginWrapper.style.display = "none";
        bankingWrapper.style.display = "block";
        userDisplay.textContent = storedUser.username;
        balanceDisplay.textContent = storedUser.balance;

        // Clear login form fields
        loginForm.reset();
    } else {
        alert("Invalid username or password!");
    }
});

// Deposit Money
depositBtn.addEventListener("click", () => {
    let amount = parseFloat(document.getElementById("amount").value);
    let storedUser = JSON.parse(localStorage.getItem("bankUser"));

    if (amount > 0) {
        storedUser.balance += amount;
        localStorage.setItem("bankUser", JSON.stringify(storedUser));
        balanceDisplay.textContent = storedUser.balance;
        alert("Deposit successful!");
    } else {
        alert("Enter a valid amount!");
    }
});

// Withdraw Money
withdrawBtn.addEventListener("click", () => {
    let amount = parseFloat(document.getElementById("amount").value);
    let storedUser = JSON.parse(localStorage.getItem("bankUser"));

    if (amount > 0 && storedUser.balance >= amount) {
        storedUser.balance -= amount;
        localStorage.setItem("bankUser", JSON.stringify(storedUser));
        balanceDisplay.textContent = storedUser.balance;
        alert("Withdrawal successful!");
    } else {
        alert("Insufficient balance or invalid amount!");
    }
});

// Check Balance
checkBalanceBtn.addEventListener("click", () => {
    let storedUser = JSON.parse(localStorage.getItem("bankUser"));
    alert("Your balance is: KES " + storedUser.balance);
});

// Logout User
logoutBtn.addEventListener("click", () => {
    alert("You have logged out.");
    bankingWrapper.style.display = "none";
    // Clear form fields when logged out
    registerForm.reset();
    loginForm.reset();
});

// Auto-login if User Exists
window.onload = function () {
    let storedUser = JSON.parse(localStorage.getItem("bankUser"));
    if (storedUser) {
        bankingWrapper.style.display = "block";
        userDisplay.textContent = storedUser.username;
        balanceDisplay.textContent = storedUser.balance;
    }
};


        