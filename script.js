const propertyCards = [...document.querySelectorAll(".property-card")];

const searchForm = document.getElementById("searchForm");
const noResults = document.getElementById("noResults");

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const location = document.getElementById("location")
        .value.trim().toLowerCase();

    const type = document.getElementById("type").value;
    const budget = document.getElementById("budget").value;

    let visibleCount = 0;

    propertyCards.forEach(function (card) {
        const cardLocation = card.dataset.location;
        const cardType = card.dataset.type;
        const cardPrice = Number(card.dataset.price);

        const matchesLocation =
            !location  cardLocation.includes(location);

        const matchesType =
            type === "all"  cardType === type;

        const matchesBudget =
            budget === "all"  cardPrice <= Number(budget);

        const show =
            matchesLocation && matchesType && matchesBudget;

        card.hidden = !show;

        if (show) visibleCount++;
    });

    noResults.hidden = visibleCount !== 0;

    document.getElementById("properties")
        .scrollIntoView({ behavior: "smooth" });
});

// Sevimli uylar
document.querySelectorAll(".favorite").forEach(function (button) {
    button.addEventListener("click", function () {
        button.classList.toggle("active");

        const isFavorite = button.classList.contains("active");

        button.textContent = isFavorite ? "♥️" : "♡";
        button.setAttribute(
            "aria-pressed",
            String(isFavorite)
        );
    });
});

// Uy haqida batafsil ma'lumot
document.querySelectorAll(".details-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        const houseName = button.dataset.house;

        document.getElementById("message").value =
            "Men ushbu uy haqida ma'lumot olmoqchiman: " + houseName;

        document.getElementById("contact").scrollIntoView({
            behavior: "smooth"
        });

        document.getElementById("name").focus({
            preventScroll: true
        });
    });
});

// Aloqa formasi
document.getElementById("contactForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        const formMessage = document.getElementById("formMessage");

        if (!name  !phone) {
            formMessage.textContent =
                "Iltimos, ismingiz va telefon raqamingizni kiriting.";
            return;
        }

        formMessage.textContent =
            "Rahmat, " + name +
            "! Forma tekshiruvdan o'tdi. Haqiqiy yuborish uchun server ulash kerak.";

        console.log("Demo so'rov:", {
            name: name,
            phone: phone,
            message: message
        });
    });