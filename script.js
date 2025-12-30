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
      { 
        name: "SSC Maths", 
        author: "Rakesh Yadav", 
        price: 299, 
        img: "images/book1.jpg",
        description: "Complete guide for SSC Maths covering all topics...",
        demoContent: "Demo excerpt for SSC Maths."
      },
      { 
        name: "SSC English", 
        author: "Pawan Kumar", 
        price: 199, 
        img: "images/book2.jpg",
        description: "Includes grammar, vocabulary, and comprehension practice.",
        demoContent: "Demo content for SSC English."
      }
    ],
    // Other categories...
  },
  // Other main categories...
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
        <img src="${book.img}" alt="${book.name}">
        <h4>${book.name}</h4>
        <p><em>${book.author}</em></p>
        <p class="price">MRP: ₹${book.price}</p>
        <p class="description" id="desc-${book.name.replace(/\s+/g,'')}">${truncateDescription(book.description || "No description available.", 4)}</p>
        <button onclick="toggleDescription('${book.name.replace(/\s+/g,'')}')">See More</button>
        <div class="card-btns">
          <button class="demo" onclick="showDemoContent('${book.name}')">Demo Content</button>
          <button class="demo" onclick="downloadDemoPDF('${book.name}')">Demo PDF</button>
        </div>
        <div class="card-btns">
          <button class="buy" onclick="openBuyModal('${book.name}')">Buy Now</button>
          <button class="add-cart" onclick="addToCart('${book.name}')">Add to Cart</button>
        </div>
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
function openBuyModal(book) {
  if (!book) {
    alert("Book data missing");
    return;
  }

  document.getElementById("selectedBook").innerHTML =
    `<strong>${book.name}</strong><br>
     <em>${book.author}</em><br>
     Price: ₹${book.price}`;

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
  const buyType = document.querySelector('input[name="buyType"]:checked').value;

  if (buyType === 'hardcopy') {
    const form = document.getElementById('addressForm');
    const inputs = form.querySelectorAll('input');
    let valid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        valid = false;
        input.style.border = "1px solid red";  // highlight empty fields if empty
      } else {
        input.style.border = "";
      }
    });

    if (!valid) {
      alert("Please fill all address fields for hard copy delivery.");
      return;  // stop if not valid
    }
  }

  // If validation passes or PDF chosen, proceed:
  alert(`Payment Process Initiated for ${buyType === 'pdf' ? 'PDF Reading' : 'Hard Copy Delivery'}!`);
  closeBuyModal();
}



// ================= HELPER FUNCTIONS =================

// Truncate long description
function truncateDescription(text, maxLines) {
  if (text.length > 200) return text.slice(0, 200) + "...";
  return text;
}

// Toggle full description on "See More" click
function toggleDescription(bookId) {
  const descEl = document.getElementById(`desc-${bookId}`);
  if (descEl.dataset.full === "true") {
    descEl.innerText = truncateDescription(descEl.dataset.fullText, 4);
    descEl.dataset.full = "false";
  } else {
    if (!descEl.dataset.fullText) {
      descEl.dataset.fullText = descEl.innerText;
    }
    descEl.innerText = descEl.dataset.fullText;
    descEl.dataset.full = "true";
  }
}

// Show demo content alert
function showDemoContent(bookName) {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const sub = params.get("sub");
  
  const book = store[category][sub].find(b => b.name === bookName);
  if (book && book.demoContent) {
    alert(`Demo Content for ${bookName}:\n\n${book.demoContent}`);
  } else {
    alert("Demo content not available.");
  }
}

// Demo PDF (currently placeholder)
function downloadDemoPDF(bookName) {
  alert(`Download Demo PDF for ${bookName} (add your PDF link here)`);
}

// Add to cart functionality
function addToCart(bookName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(bookName);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${bookName} added to cart!`);
}


function shareReferral() {
  const code = document.getElementById("referralCode").innerText;
  const text = `Use my referral code: ${code}`;

  if (navigator.share) {
    navigator.share({
      title: "Referral Code",
      text: text
    });
  } else {
    navigator.clipboard.writeText(text);
    alert("Referral code copied!");
  }
}

function showMyOrders() {
  document.getElementById("myOrdersPage").style.display = "block";
}
function showMyOrders() {
    // Show the My Orders section
    document.getElementById("myOrdersPage").style.display = "block";
    // Hide other sections
    document.getElementById("heroSlider").style.display = "none";
    document.querySelector(".products").style.display = "none";
}


// ================= CART LOGIC =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Open Cart Page
function openCart() {
  document.getElementById("cartPage").style.display = "block";
  document.getElementById("heroSlider").style.display = "none";
  document.querySelector(".products").style.display = "none";
  document.getElementById("myOrdersPage").style.display = "none";

  renderCart();
}

// Add item to cart
function addToCart(bookName, price) {
  if (!bookName || !price) {
    alert("Invalid product data");
    return;
  }

  price = Number(price);

  let item = cart.find(i => i.bookName === bookName);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ bookName, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Book added to cart");
}

function showPaymentHistory() {
    // Show Payment History
    document.getElementById("paymentPage").style.display = "block";

    // Hide other sections
    document.getElementById("heroSlider").style.display = "none";
    document.querySelector(".products").style.display = "none";
    document.getElementById("myOrdersPage").style.display = "none";
    document.getElementById("cartPage").style.display = "none";
}



// Load categories on page load