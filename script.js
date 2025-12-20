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