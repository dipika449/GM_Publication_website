function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

function shareReferral() {
  const code = document.getElementById("referralCode").innerText;
  navigator.clipboard.writeText(code);
  alert("Referral code copied!");
}

let selectedBook = "";

function openBuyModal(book) {
  selectedBook = book;
  document.getElementById("bookTitle").innerText = book;
  document.getElementById("buyModal").style.display = "block";
}

function closeBuyModal() {
  document.getElementById("buyModal").style.display = "none";
}

document.querySelectorAll("input[name='buyOption']").forEach(radio => {
  radio.addEventListener("change", () => {
    document.getElementById("addressForm").style.display =
      radio.value === "hardcopy" ? "block" : "none";
  });
});

function proceedPayment() {
  alert(selectedBook + " order placed (UI only)");
  closeBuyModal();
}

/* HERO BACKGROUND SLIDER */
const hero = document.getElementById("heroSlider");
const images = ["images/bg.jpg","images/big.jpg"];
let i = 0;

setInterval(() => {
  i = (i + 1) % images.length;
  hero.style.backgroundImage = `url('${images[i]}')`;
}, 3000);
