function toggleMenu() {
  const menu = document.getElementById("menu");
  if(menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
}


function openLogin(){
  document.getElementById("loginPopup").style.display = "flex";
  document.getElementById("registerPopup").style.display = "none";
}

function closeLogin(){
  document.getElementById("loginPopup").style.display = "none";
}

function openRegister(){
  closeLogin();
  document.getElementById("registerPopup").style.display = "flex";
}

function closeRegister(){
  document.getElementById("registerPopup").style.display = "none";
}

function login(){
  const u = document.getElementById("loginUser").value;
  const p = document.getElementById("loginPass").value;

  if(u === "admin@gmail.com" && p === "123456"){
    localStorage.setItem("gmLogin","true");
    closeLogin();
    alert("Login Successful");
  }else{
    document.getElementById("loginError").innerText =
      "Wrong User ID or Password";
  }
}

function register(){
  alert("Registration Successful! Please Login.");
  closeRegister();
  openLogin();
}

// ================= STORE DATA =================
const store = {
  "Competitive Exam": {
    "SSC": [
      { name: "SSC Maths", author: "Rakesh Yadav", price: 299, img: "images/book1.jpg" },
      { name: "SSC English", author: "Pawan Kumar", price: 199, img: "images/book2.jpg" }
    ],
    "Banking": [
      { name: "Bank PO Guide", author: "Arihant", price: 349, img: "images/book3.jpg" }
    ]
  },
  "School Level": {
    "Class 10": [
      { name: "Class 10 Science", author: "NCERT", price: 199, img: "images/book4.jpg" }
    ]
  }
};



// ================= CATEGORY FUNCTIONS =================
function loadCategory() {
  const box = document.getElementById("categoryList");
  box.innerHTML = "";
  Object.keys(store).forEach(cat => {
    box.innerHTML += `<div class="list-item" onclick="selectCategory('${cat}')">${cat}</div>`;
  });
}

function selectCategory(cat) {
  window.location.href =
    "subcategory.html?category=" + encodeURIComponent(cat);
}



function searchCategory() {
  const key = document.getElementById("categorySearch").value.toLowerCase();
  const box = document.getElementById("categoryList");
  box.innerHTML = "";
  Object.keys(store).forEach(cat => {
    if(cat.toLowerCase().includes(key)) {
      box.innerHTML += `<div class="list-item" onclick="selectCategory('${cat}')">${cat}</div>`;
    }
  });
}

function toggleCategorySearch() {
  const box = document.getElementById("categorySearchBox");
  box.style.display = (box.style.display==="none") ? "block" : "none";
}

function viewAllCategories() { loadCategory(); }

// ================= SUBCATEGORY FUNCTIONS =================
function selectSubcategory(sub) {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  window.location.href =
    `book.html?category=${encodeURIComponent(category)}&sub=${encodeURIComponent(sub)}`;
}


function searchSubcategory() {
  const key = document
    .getElementById("subcategorySearch")
    .value
    .toLowerCase();

  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  const box = document.getElementById("subcategoryList");
  box.innerHTML = "";

  Object.keys(store[category]).forEach(sub => {
    if (sub.toLowerCase().includes(key)) {
      box.innerHTML += `
        <div class="list-item"
             onclick="selectSubcategory('${sub}')">
          ${sub}
        </div>
      `;
    }
  });
}


function toggleSubcategorySearch() {
  const box = document.getElementById("subcategorySearchBox");
  box.style.display = (box.style.display==="none") ? "block" : "none";
}

function viewAllSubcategories() {
  window.location.reload();
}


// ================= BOOK FUNCTIONS =================
function loadBooks() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const sub = params.get("sub");

  const box = document.getElementById("bookList");
  box.innerHTML = "";

  store[category][sub].forEach(book => {
    box.innerHTML += `
      <div class="product-card">
        <img src="${book.img}">
        <h4>${book.name}</h4>
        <p>${book.author}</p>
        <button onclick="openBuyModal('${book.name}')">Buy</button>
      </div>
    `;
  });
}


function searchBook() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const sub = params.get("sub");

  const key = document.getElementById("bookSearch").value.toLowerCase();
  const books = store[category][sub];

  const box = document.getElementById("bookList");
  box.innerHTML = "";

  books
    .filter(b => b.name.toLowerCase().includes(key))
    .forEach(book => {
      box.innerHTML += `<div>${book.name}</div>`;
    });
}


// ================= BUY MODAL =================
function openBuyModal(bookName) {
  document.getElementById("selectedBook").innerText = bookName;
  document.getElementById("buyModal").style.display = "flex";
  document.getElementById("addressForm").style.display = "none";
  document.querySelector('input[name="buyType"][value="pdf"]').checked = true;
}

function closeBuyModal() { document.getElementById("buyModal").style.display = "none"; }

function toggleAddress() {
  const type = document.querySelector('input[name="buyType"]:checked').value;
  document.getElementById("addressForm").style.display = (type==="hardcopy") ? "block" : "none";
}

function proceedPayment() {
  alert("Payment Process Initiated!");
  closeBuyModal();
}

// Load categories on page load