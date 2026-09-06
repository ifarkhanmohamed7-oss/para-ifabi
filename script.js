const SUPABASE_URL = "https://krtofrjnxqfstmrwymwn.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_7n2MPltuYxtfifSPQ7mxEQ_ZCM11bpe";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
async function testSupabase() {
    const { data, error } = await supabaseClient
        .from("categories")
        .select("*");

    if (error) {
        console.error("Supabase Error:", error);
        return;
    }

    console.log("Supabase connected:", data);
}

testSupabase();
/* =========================
   PARA IFABI — JAVASCRIPT
========================= */

let currentLanguage = localStorage.getItem("paraIfabiLanguage") || "ar";
let cartCount = 0;


/* =========================
   LANGUAGE
========================= */

const languageBtn = document.getElementById("languageBtn");

function changeLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    const elements = document.querySelectorAll("[data-ar][data-fr]");

    elements.forEach(element => {

        element.textContent =
            language === "ar"
                ? element.getAttribute("data-ar")
                : element.getAttribute("data-fr");

    });


    /* Input placeholders */

    const inputs = document.querySelectorAll(
        "[data-placeholder-ar][data-placeholder-fr]"
    );

    inputs.forEach(input => {

        input.placeholder =
            language === "ar"
                ? input.getAttribute("data-placeholder-ar")
                : input.getAttribute("data-placeholder-fr");

    });


    /* Change language button */

    languageBtn.textContent =
        language === "ar" ? "FR" : "AR";


    /* Save language */

    localStorage.setItem(
        "paraIfabiLanguage",
        language
    );
}


languageBtn.addEventListener("click", () => {

    const newLanguage =
        currentLanguage === "ar" ? "fr" : "ar";

    changeLanguage(newLanguage);

});


/* Start with saved language */

changeLanguage(currentLanguage);


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navigation = document.querySelector(".navigation");

menuBtn.addEventListener("click", () => {

    navigation.classList.toggle("active");

});


/* Close menu after clicking a link */

const navLinks =
    document.querySelectorAll(".navigation a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navigation.classList.remove("active");

    });

});


/* =========================
   SHOPPING CART
========================= */

const cartCounter =
    document.querySelector(".cart-count");

const addCartButtons =
    document.querySelectorAll(".add-cart");

addCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        cartCount++;

        cartCounter.textContent = cartCount;

        /* Small animation */

        cartCounter.style.transform = "scale(1.4)";

        setTimeout(() => {

            cartCounter.style.transform = "scale(1)";

        }, 180);


        /* Button feedback */

        const originalText =
            button.textContent;

        button.textContent =
            currentLanguage === "ar"
                ? "✓ تمت الإضافة"
                : "✓ Ajouté";


        setTimeout(() => {

            button.textContent =
                currentLanguage === "ar"
                    ? "أضف للسلة"
                    : "Ajouter";

        }, 1200);

    });

});


/* =========================
   FAVORITES
========================= */

const favoriteButtons =
    document.querySelectorAll(".favorite");

favoriteButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (button.textContent === "♡") {

            button.textContent = "♥";

        } else {

            button.textContent = "♡";

        }

    });

});


/* =========================
   NEWSLETTER
========================= */

const newsletterForm =
    document.querySelector(".newsletter form");

newsletterForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const input =
        newsletterForm.querySelector("input");

    if (!input.value.trim()) {

        input.focus();

        return;

    }

    alert(
        currentLanguage === "ar"
            ? "شكراً لك! تم تسجيل بريدك الإلكتروني."
            : "Merci ! Votre adresse e-mail a été enregistrée."
    );

    input.value = "";

});


/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");

        if (targetId === "#") return;

        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* =========================
   CART BUTTON
========================= */

const cartButton =
    document.querySelector(".cart-btn");

cartButton.addEventListener("click", () => {

    if (cartCount === 0) {

        alert(
            currentLanguage === "ar"
                ? "السلة فارغة حالياً 🛒"
                : "Votre panier est actuellement vide 🛒"
        );

    } else {

        alert(
            currentLanguage === "ar"
                ? `لديك ${cartCount} منتج في السلة 🛒`
                : `Vous avez ${cartCount} produit(s) dans votre panier 🛒`
        );

    }

});