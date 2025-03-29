var typed = new Typed(".text", {
    strings:["Frontend Developer", "Youtuber", "Web Developer", "Backend Developer"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
});

function toggleDropdown() {
    var dropdownContent = document.querySelector(".dropdown-content");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
}

// send mail

function sendMail(){
    var params = {
        name: document.getElementById("name").value ,
        email: document.getElementById("email").value ,
        message: document.getElementById("message").value ,
    };

const serviceID = "service_t5poprq";
const templateID = "BCD13J2";

emailjs.send(serviceID,templateID,params)
.then(
    res =>{
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("Your message sent successfully!")
    })

.catch((err) => console.log(err));
}

(function () {
    // Prevent copying using keyboard shortcuts
    document.addEventListener("keydown", function (e) {
        if (
            (e.ctrlKey && e.key === "u") || // Allow view-source but make code unreadable
            (e.ctrlKey && e.key === "c") || // Prevent copy
            (e.ctrlKey && e.key === "x") || // Prevent cut
            (e.ctrlKey && e.key === "s") || // Prevent save
            (e.ctrlKey && e.key === "a") // Prevent select all
        ) {
            e.preventDefault();
        }
    });

// Make console unreadable
    setInterval(() => {
        console.clear();
        console.log("%cError: Security Violation", "color: red; font-size: 16px;");
        console.log(
            "%cUnauthorized Access Detected!",
            "color: orange; font-size: 14px;"
        );
    }, 500);

    // Obfuscate part of the JavaScript to make it unreadable
    var _0xabc1 = [
        "\x6C\x6F\x67",
        "\x53\x65\x63\x75\x72\x69\x74\x79\x20\x57\x61\x72\x6E\x69\x6E\x67",
    ];
    console[_0xabc1[0]](_0xabc1[1]);

    // Prevent copy-paste by disabling oncontextmenu
    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    });

    // Show/hide top arrow based on scroll position
    const topArrow = document.querySelector(".top"); // Select the top arrow using class

    window.addEventListener("scroll", function() {
        if (window.scrollY > 0) {
            topArrow.classList.add("visible"); // Show the arrow

        } else {
            topArrow.classList.remove("visible"); // Hide the arrow

        }
    });
})();
