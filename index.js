// Clone menu for mobile version
function CopyMenu () {
    const dpCategory = document.querySelector(".departments__menu");
    mobCategory = document.querySelector(".canvas__departments");
    mobCategory.innerHTML = dpCategory.innerHTML;

    // Copy nav to nav
    const deskNav = document.querySelector(".destop-nav");
    mobNav = document.querySelector(".mobile-nav");
    mobNav.innerHTML = deskNav.innerHTML;

    // Copy header wrapper to canvas nav
    const canvasNav = document.querySelector(".top-nav");
    headWrapper = document.querySelector(".header__wrapper");
    canvasNav.innerHTML = headWrapper.innerHTML;
}

CopyMenu();