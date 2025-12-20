function toggleMenu(){
  const menu=document.getElementById("menu");
  menu.style.display=menu.style.display==="flex"?"none":"flex";
}

function shareReferral(){
  const code=document.getElementById("referralCode").innerText;
  navigator.clipboard.writeText(code);
  alert("Referral code copied!");
}

/* DATA */
const data={
  exam:{
    ssc:[
      {name:"SSC Math",author:"A. Das",price:299,img:"images/book1.jpg"},
      {name:"SSC English",author:"B. Roy",price:249,img:"images/book2.jpg"}
    ]
  },
  school:{
    class10:[
      {name:"Class 10 Science",author:"NCERT",price:199,img:"images/book3.jpg"}
    ]
  }
};

function loadSubcategory(){
  const cat=category.value;
  subcategory.innerHTML="<option value=''>Select Subcategory</option>";

  if(cat==="exam") subcategory.innerHTML+=`<option value="ssc">SSC</option>`;
  if(cat==="school") subcategory.innerHTML+=`<option value="class10">Class 10</option>`;
}

function loadBooks(){
  const cat=category.value;
  const sub=subcategory.value;
  const list=document.getElementById("bookList");
  list.innerHTML="";

  data[cat][sub].forEach(book=>{
    list.innerHTML+=`
      <div class="product-card">
        <img src="${book.img}">
        <h4>${book.name}</h4>
        <p>${book.author}</p>
        <p class="price">₹${book.price}</p>
        <div class="card-btns">
          <button class="buy" onclick="openBuyModal('${book.name}')">Buy Now</button>
          <button class="demo">PDF Demo</button>
        </div>
      </div>
    `;
  });
}

function searchBook(){
  const val=bookSearch.value.toLowerCase();
  document.querySelectorAll(".product-card").forEach(card=>{
    card.style.display=card.innerText.toLowerCase().includes(val)?"block":"none";
  });
}

function openBuyModal(book){
  selectedBook.innerText=book;
  buyModal.style.display="block";
}
function closeBuyModal(){buyModal.style.display="none"}

function toggleAddress(){
  const type=document.querySelector("input[name='buyType']:checked").value;
  addressForm.style.display=type==="hardcopy"?"block":"none";
}

function proceedPayment(){
  alert("Order placed for "+selectedBook.innerText);
  closeBuyModal();
}
