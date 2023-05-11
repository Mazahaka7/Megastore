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

//Language and currency select
const select = document.getElementsByClassName("custom-select");
const l = select.length;
for (let i = 0; i < l; i++) {
  const selElmnt = select[i].getElementsByTagName("select")[0];
  const ll = selElmnt.length;
  const selectBox = document.createElement("DIV");
  selectBox.setAttribute("class", "select-selected");
  selectBox.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  select[i].appendChild(selectBox);
  /* create a new DIV that will contain the options */
  const optionDiv = document.createElement("DIV");
  optionDiv.setAttribute("class", "select-items select-hide");
  for (let j = 1; j < ll; j++) {
    /* For each option in the original select element, create a new DIV */
    const option = document.createElement("DIV");
    option.innerHTML = selElmnt.options[j].innerHTML;
    option.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box, and the selected item: */
        const parentEl = this.parentNode.parentNode.getElementsByTagName("select")[0];
        const pl = parentEl.length;
        const select = this.parentNode.previousSibling;
        for (let i = 0; i < pl; i++) {
          if (parentEl.options[i].innerHTML == this.innerHTML) {
            parentEl.selectedIndex = i;
            select.innerHTML = this.innerHTML;
            const currentOption = this.parentNode.getElementsByClassName("same-as-selected");
            const cl = currentOption.length;
            for (let k = 0; k < cl; k++) {
              currentOption[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        select.click();
    });
    optionDiv.appendChild(option);
  }
  select[i].appendChild(optionDiv);
  selectBox.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document */
  const arrNo = [];
  const selectItems = document.getElementsByClassName("select-items");
  const selectIOutput = document.getElementsByClassName("select-selected");
  const xl = selectItems.length;
  const yl = selectIOutput.length;
  for (let i = 0; i < yl; i++) {
    if (elmnt == selectIOutput[i]) {
      arrNo.push(i)
    } else {
      selectIOutput[i].classList.remove("select-arrow-active");
    }
  }
  for (let i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      selectItems[i].classList.add("select-hide");
    }
  }
}
document.addEventListener("click", closeAllSelect);
// Timer for hot offer block
const duration = 48 * 60 * 60 * 1000;
const startTime = Date.now();
const endTime = startTime + duration;
const timerElement = document.querySelector('.offer__timer');

function updateTimer() {
  //remaining time until the end
  const remainingTime = endTime - Date.now();
  // if the timer has ended, reload the page to start a new timer
  if (remainingTime <= 0) {
    location.reload();
  }
  // calculate the hours, minutes, and seconds remaining
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(remainingTime / (60 * 60 * 1000));
  const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
  const remainingTimeStr = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  timerElement.textContent = `${remainingTimeStr}`;
  // set a timeout to update
  setTimeout(updateTimer, 1000);
}
updateTimer();
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

//Language and currency
const languageItem = document.getElementById('lang'),
  languageList = document.querySelectorAll('.language li'),
  currencyItem = document.getElementById('currency'),
  currencyList = document.querySelectorAll('.currency li');
languageList.forEach((element) => element.addEventListener('click', getValue));
currencyList.forEach((element) => element.addEventListener('click', getValue));

function getValue() {
  // if (!this.classList.contains("current")) {
    if (this.parentElement.classList.contains("currency")) {
      currencyList.forEach((element) => element.classList.remove("current"));
      this.classList.add("current");
      console.log(this);
      currencyItem.innerHTML = this.lastChild.innerHTML;
    } else if (this.parentElement.classList.contains("language")) {
      languageList.forEach((element) => element.classList.remove("current"));
      this.classList.add("current");
      console.log(this);
      languageItem.innerHTML = this.lastChild.innerHTML;
    }
  // } else {
  //   return;
  // }
}

// Window events
window.onload = function () {
  document.addEventListener("click", docActions);
}

function docActions(e) {
  const targetElement = e.target;
  if (targetElement.classList.contains("allproducts__view-all")) {
    getProducts(targetElement);
    e.preventDefault();
  };
  if (targetElement.classList.contains("buy")) {
    const productId = targetElement.closest(".item").dataset.pid;
    addToCart(targetElement, productId);
    e.preventDefault();
  };
  if (targetElement.classList.contains("iscart__icon") || targetElement.closest(".iscart")) {
    if (document.querySelector(".cart-list__products").children.length > 0) {
      document.querySelector(".cart-list__products").classList.add("active");
    }
    e.preventDefault();
  } else if (!targetElement.closest(".iscart") && !targetElement.classList.contains("action-btn")) {
    document.querySelector(".cart-list__products").classList.remove("active");
  };
  if (targetElement.classList.contains("cart-list__delBtn")) {
    targetElement.classList.add("action-btn");
    const productId = targetElement.closest(".cart-list__item").dataset.cartPid;
    const productButton = targetElement;
    updateCart(productButton, productId, false);
    e.preventDefault();
  }
}

async function getProducts(button) {
  if (!button.classList.contains("hold")) {
      button.classList.add("hold");
        const file = "products.json";
        var response = await fetch(file, {
        method: "GET"
      });
    }
    if (response.ok) {
      let result = await response.json();
      console.log(result.sneakers);
      loadProducts(result);
      button.classList.remove("hold");
      button.remove();
    } else {
        alert("Error"); 
    }
}

function loadProducts(data) {
    const productsItem = document.querySelector(".allproducts .products");
  data.products.forEach((item) => {
    const productId = item.id;
    const productUrl = item.url;
    const productImage = item.image;
    const productTitle = item.title;
    const productStyle = item.style;
    const productPrice = item.price;
    const productStock = item.stock;
    const productSold = item.sold;
    const productLikeUrl = item.likeUrl;
    const productShareUrl = item.shareUrl;

    let template = `<article data-pid="${productId}" class="item">
                  <div class="item__media">
                    <div class="thumbnail">
                      <a href="#${productUrl}">
                        <img class="item__img" src="./images/${productImage}" alt="" />
                      </a>
                    </div>
                    <div class="hoverable">
                      <ul>
                          <li class="active">
                            <a class="like" href="#"></a>
                          </li>
                          <li>
                            <a class="share" href="#"></a>
                          </li>
                          <li>
                            <a class="buy" href="#"></a>
                          </li>
                        </ul>
                      </ul>
                    </div>
                  </div>
                  <div class="item__content">
                    <div class="rating">
                      <div class="stars"></div>
                      <span class="mini-text">(2,500) </span>
                    </div>
                    <h3 class="main-links">
                      <a href="#">${productTitle}</a>
                    </h3>
                    <div class="price">
                      <span class="current">$${productPrice}</span>
                    </div>
                    <div class="stock mini-text">
                      <div class="quantity">
                        <!-- Change qty to smth real -->
                        <span
                          >Stock:
                          <span class="quantity-available">${productStock}</span>
                        </span>
                        <span
                          >Sold:
                          <span class="quantity-sold">${productSold}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>`;
    productsItem.insertAdjacentHTML('beforeend', template);
  });
}

function addToCart(productButton, productId) {
  if (!productButton.classList.contains("hold")) {
    productButton.classList.add("hold");
    productButton.classList.add("fly");
  }
  const cart = document.querySelector(".iscart__icon");
  const product = document.querySelector(`[data-pid="${productId}"]`);
  const productImage = product.querySelector(".item__img");

  const productImageClone = productImage.cloneNode(true);

  const productImageCloneWidth = productImage.offsetWidth;
  const productImageCloneHeight = productImage.offsetHeight;
  const productImageCloneTop = productImage.getBoundingClientRect().top;
  const productImageCloneLeft = productImage.getBoundingClientRect().left;

  productImageClone.setAttribute('class', 'flyimage ibg');
  productImageClone.style.cssText = `
  width: ${productImageCloneWidth}px;
  height: ${productImageCloneHeight}px;
  left:${productImageCloneLeft}px;
  top: ${productImageCloneTop}px;
  `;
  document.body.appendChild(productImageClone);

  const cartFlyLeft = cart.getBoundingClientRect().left;
  const cartFlyTop = cart.getBoundingClientRect().top;

  productImageClone.style.cssText =
    `
    left:${cartFlyLeft}px;
    top:${cartFlyTop}px;
    width = 0px;
    height = 0px;
    opacity = 0;
    `;
  
  productImageClone.addEventListener('transitionend', function () {
    if (productButton.classList.contains('fly')) {
      productImageClone.remove();
      updateCart(productButton, productId);
      productButton.classList.remove("fly");
    }
  })
}

function updateCart(productButton, productId, productAdd = true) {
  const cart = document.querySelector(".iscart"),
    cartIcon = cart.querySelector(".fly-item"),
    cartQuantity = cart.querySelector(".item-quantity"),
    cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
    cartList = document.querySelector(".cart-list__products");
  
  if (productAdd) {
    if (cartQuantity) {
      cartQuantity.innerHTML = ++cartQuantity.innerHTML;
    } else {
      cartIcon.insertAdjacentHTML('beforeend', `<span class='item-quantity'>1</span>`);
    }
    if (!cartProduct) {
      const product = document.querySelector(`[data-pid="${productId}"]`);
      const cartProductTitle = product.querySelector('.main-links').innerHTML;
      const cartProductImage = product.querySelector('.item__img').innerHTML;
      const cartProductPrice = product.querySelector(".current").innerHTML;
      const  cartProductContent = `
          <div class="cart-list__image">${cartProductImage}</div>  
          <div class='cart-list__body'>
            <a class='cart-list__title'>${cartProductTitle}</a>
            <div class="cart-list__price">Price: <span>${cartProductPrice}</span></div>
            <div class="cart-list__quantity">Quantity: <span>1</span></div>
            <a class="cart-list__delBtn">Delete</a>
          </div>
        `;
      cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}"  class='cart-list__item'>${cartProductContent}</li>`);
    } else {
      const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
      cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
    }
    productButton.classList.remove('hold')
  } else {
    const cartProductQuantity = productButton.previousElementSibling.lastChild;
    cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
    if (!parseInt(cartProductQuantity.innerHTML)) {
      cartProduct.remove();
    }

    const cartQuantityValue = --cartQuantity.innerHTML;

    if (cartQuantityValue) {
      cartQuantity.innerHTML = cartQuantityValue;
    } else {
      cartQuantity.innerHTML = 0;
      cartList.classList.remove("active");
    }
  }
}

// Cart calc
function cartCalc() {
// Get all elements with the class "cart-list__item" and calculate the total price
let totalPrice = 0;
const items = document.querySelectorAll('.cart-list__item');
for (let i = 0; i < items.length; i++) {
  // Get the price and quantity of the current item
  const price = parseFloat(items[i].getElementsByClassName('cart-list__price')[0].getElementsByTagName('span')[0].innerText);
  const quantity = parseInt(items[i].getElementsByClassName('cart-list__quantity')[0].getElementsByTagName('span')[0].innerText);

  // Calculate the subtotal for the current item and add it to the total price
  const subtotal = price * quantity;
  totalPrice += subtotal;
}
document.querySelector('.cart-total').innerText = totalPrice.toFixed(2);
}
cartCalc()
 