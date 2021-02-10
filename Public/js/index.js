// jshint esversion:9

// Index page menu
const menuBTN = document.querySelector("#menu-button");
const menuElements = document.querySelectorAll(".menu-element");
const menu = document.querySelector(".menu");
const switchBTN = document.querySelector(".switch-container");

menuBTN.addEventListener("click", function() {
  menuElements.forEach(function(menuEl) {
    menuEl.classList.toggle("menu-element-alt");
  });
  menu.classList.toggle("menu-alt");
  menuBTN.classList.toggle("menu-btn-alt");

  switchBTN.classList.remove("show-switch");
  switchBTN.classList.remove("transition-switch");
  fonts.classList.remove("show-fonts");
  fonts.classList.remove("transition-fonts");
  social.classList.remove("show-social");
  social.classList.remove("transition-social");
});

// Scrollbar
const scroll = document.querySelector(".scroll");
const items = document.querySelectorAll(".item");

if(items.length <= 10) {
  scroll.style.overflowY = "hidden";
}


// Show switch button
const firstMenu = document.querySelector(".menu-element-1");

firstMenu.addEventListener("click", function() {
  switchBTN.classList.toggle("show-switch");
  setTimeout(function() {
    switchBTN.classList.toggle("transition-switch");
  },50);
});


// Show font sizes
const fontMenu = document.querySelector(".font-sizes-father");
const fonts = document.querySelector(".font-sizes");

fontMenu.addEventListener("click", function() {
  fonts.classList.toggle("show-fonts");
  setTimeout(function() {
    fonts.classList.toggle("transition-fonts");
  },50);
});


// Change font sizes
const smallFont = document.querySelector(".small-font");
const normalFont = document.querySelector(".normal-font");
const largeFont = document.querySelector(".large-font");
const html = document.querySelector("body");
const itemsP = document.querySelectorAll(".item p");
const itemInput = document.querySelector(".item input");
const title = document.querySelector("h1");
const menuParagraph = document.querySelectorAll(".menu-paragraph");

let fontSize = localStorage.getItem("fontSize");

function smallFontSize() {
  menuParagraph.forEach(function(element) {
    element.classList.remove("large-transform");
    element.style.paddingLeft = "0";
    element.classList.add("small-transform");
  });
  itemsP.forEach(function(item) {
    item.classList.remove("large-transform");
    item.classList.add("small-transform");
  });
  itemInput.classList.remove("large-transform");
  itemInput.classList.add("small-transform");
  title.classList.remove("large-transform");
  title.classList.add("small-transform");
}

function largeFontSize() {
  menuParagraph.forEach(function(element) {
    element.classList.remove("small-transform");
    element.style.paddingLeft = "15px";
    element.classList.add("large-transform");
  });
  itemsP.forEach(function(item) {
    item.classList.remove("small-transform");
    item.classList.add("large-transform");
  });
  itemInput.classList.remove("small-transform");
  itemInput.classList.add("large-transform");
  title.classList.remove("small-transform");
  title.classList.add("large-transform");
}

function normalFontSize() {
  menuParagraph.forEach(function(element) {
    element.classList.remove("large-transform", "small-transform");
    element.style.paddingLeft = "0";
  });
  itemsP.forEach(function(item) {
    item.classList.remove("large-transform", "small-transform");
  });
  itemInput.classList.remove("large-transform", "small-transform");
  title.classList.remove("large-transform", "small-transform");
}

if(fontSize === "small") {
  smallFontSize();
}
else if(fontSize === "large") {
  largeFontSize();
}

smallFont.addEventListener("click", function() {
  smallFontSize();

  localStorage.setItem("fontSize", "small");
});

largeFont.addEventListener("click", function() {
  largeFontSize();

  localStorage.setItem("fontSize", "large");
});

normalFont.addEventListener("click", function() {
  normalFontSize();

  localStorage.setItem("fontSize", "normal");
});


// Contact and social
const social = document.querySelector(".social");
const socialElements = document.querySelectorAll(".social-element");
const socialMenu = document.querySelector(".menu-social");

socialMenu.addEventListener("click", function() {
  social.classList.toggle("show-social");
  setTimeout(function() {
    social.classList.toggle("transition-social");
  });
});


// Dark-Light mode
const currentTheme = localStorage.getItem('theme');
const switchButton = document.querySelector("#switch-shadow");
const firstMenuP = document.querySelector(".menu-element-1 p");

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === "dark") {
        switchButton.checked = true;
        switchBTN.style.backgroundColor = "#494949";
        switchBTN.style.borderColor = "#719EDA";
        fonts.style.backgroundColor = "#494949";
        fonts.style.borderColor = "#719EDA";
        fonts.style.color = "white";
        social.style.backgroundColor = "#494949";
        social.style.borderColor = "#719EDA";
        socialElements.forEach(function(socialElement) {
          socialElement.style.color = "white";
        });
        firstMenuP.innerText = "Modo diurno";
    }
}

function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', "dark");
      localStorage.setItem('theme', "dark");
      switchBTN.style.backgroundColor = "#494949";
      switchBTN.style.borderColor = "#719EDA";
      fonts.style.backgroundColor = "#494949";
      fonts.style.borderColor = "#719EDA";
      fonts.style.color = "white";
      social.style.backgroundColor = "#494949";
      social.style.borderColor = "#719EDA";
      socialElements.forEach(function(socialElement) {
        socialElement.style.color = "white";
      });
      firstMenuP.innerText = "Modo diurno";
    }
    else {document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      switchBTN.style.backgroundColor = "white";
      switchBTN.style.borderColor = "#1854A4";
      fonts.style.backgroundColor = "white";
      fonts.style.borderColor = "#1854A4";
      fonts.style.color = "#494949";
      social.style.backgroundColor = "white";
      social.style.borderColor = "#1854A4";
      socialElements.forEach(function(socialElement) {
        socialElement.style.color = "#494949";
      });
      firstMenuP.innerText = "Modo nocturno";
    }
}

switchButton.addEventListener('change', switchTheme, false);


// Delete confirmation
const deleteList = document.querySelectorAll(".delete-list");
const deleteForm = document.querySelectorAll(".delete-form");
const yes = document.querySelector("#yes");
const no = document.querySelector("#no");
const confirmation = document.querySelector(".delete-confirmation");
const backgroundColor = document.querySelector(".background-confirmation");

let idValue;
let submitForm = true;

deleteList.forEach(function(button) {
  button.addEventListener("click", function(e) {
    if(submitForm) {
      e.preventDefault();
      idValue = button.value;
      confirmation.style.display = "block";
      backgroundColor.style.display = "block";
    }
  });
});

yes.addEventListener("click", function() {
  confirmation.style.display = "none";
  backgroundColor.style.display = "none";
  submitForm = false;
  deleteForm.forEach(function(form) {
    if(form.childNodes[4].value === idValue) {
      form.childNodes[4].click();
    }
  });
});

no.addEventListener("click", function() {
  confirmation.style.display = "none";
  backgroundColor.style.display = "none";
});


// Featured icon
const starIcon = document.querySelectorAll(".fa-star");
const featuredAdd = document.querySelector(".featured-add");
const featuredRemove = document.querySelector(".featured-remove");
const featuredValue = document.querySelectorAll(".featured-value");

starIcon.forEach(function(star) {
  star.addEventListener("click", function() {
    star.classList.toggle("star-active");
    if(star.classList.contains("star-active")) {
      featuredRemove.classList.remove("show-featured-remove");
      featuredAdd.classList.add("show-featured-add");
      setTimeout(function() {
        featuredAdd.classList.remove("show-featured-add");
      }, 3000);
    } else {
      featuredRemove.classList.remove("show-featured-add");
      featuredRemove.classList.add("show-featured-remove");
      setTimeout(function() {
        featuredRemove.classList.remove("show-featured-remove");
      }, 3000);
    }

    star.parentElement.childNodes[4].click();
  });

  if(star.parentElement.childNodes[6].value === "true") {
    star.classList.add("star-active");
  }
});

// Featured menu Click
const featured = document.querySelector("#featured");
const featuredChild = document.querySelector("#featured a");

featured.addEventListener("click", function() {
  featuredChild.click();
});


// Item Click
items.forEach(function(item) {
  item.addEventListener("click", function(e) {
    if(e.target === item.childNodes[1].childNodes[2]) {
      item.childNodes[1].childNodes[1].click();
    }
  });
});
