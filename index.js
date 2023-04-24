// Clone menu for mobile version
function CopyMenu () {
    const dpCategory = document.querySelector(".departments");
    mobCategory = document.querySelector(".canvas__departments");
    mobCategory.innerHTML = dpCategory.innerHTML;

    // Copy nav to nav
    const deskNav = document.querySelector(".header__nav .destop-nav");
    mobNav = document.querySelector(".canvas .mobile-nav");
    mobNav.innerHTML = deskNav.innerHTML;

    // Copy header wrapper to canvas nav
    const canvasNav = document.querySelector(".top-nav");
    headWrapper = document.querySelector(".header__wrapper");
    canvasNav.innerHTML = headWrapper.innerHTML;
}

CopyMenu();

// menu buttons
const mobileBtn = document.querySelector(".trigger"),
    closeBtn = document.querySelector(".t-close"),
    addClass = document.querySelector(".site");

mobileBtn.addEventListener("click", function () {
    addClass.classList.add("showmenu")
})
closeBtn.addEventListener("click", function () {
    addClass.classList.remove("showmenu")
})

// Mobile submenu
const subMenu = document.querySelectorAll(".canvas__departments .departments__links");
subMenu.forEach((menu) => menu.addEventListener("click", toggle));

function toggle() {
    subMenu.forEach((element) => element != this ? element.nextElementSibling.classList.remove("initial") : null);
     this.nextElementSibling.classList.toggle("initial");
}

const dropDownMenu = document.querySelectorAll(".childbearing__item");
dropDownMenu.forEach((menu) => menu.addEventListener("click", dropMenu));

function dropMenu() {
    dropDownMenu.forEach((element) => element != this ? element.nextElementSibling.classList.remove("initial") : null);
    this.nextElementSibling.classList.toggle("initial");
    
}

//Slider from framework
const swiper = new Swiper('.swiper', {
  loop: true,
  
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

//Widget mobile

const widgetBtn = document.querySelectorAll(".widgets__btn");
widgetBtn.forEach((btn) => btn.addEventListener("click", showList));

function showList() {
    this.nextElementSibling.classList.toggle("show");
    widgetBtn.forEach((btn) => btn != this ? btn.nextElementSibling.classList.remove("show") : null);
    
}