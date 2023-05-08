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
    targetElement.classList.add("active_btn");
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
            <div class="cart-list__quantity">Quantity: <span>1</span></div>
            <div class="cart-list__price">Price: <span>${cartProductPrice}</span></div>
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

//Cart show price
const buyButtons = document.querySelectorAll(".buy");
buyButtons.forEach((btn) => btn.addEventListener("click", function () {
  // const item = this.closest('.item'),
  // element = item.querySelector('.current'),
  // itemPrice = element.innerHTML.slice(1);
  // const totalSum = document.querySelector(".total-amount span");
  // totalSum.innerHTML += itemPrice;
  let totalPrice = 0;
  const cart = document.querySelector(".cart-list__products").children;
  console.log(cart);
  for (i = 0; i < cart.length; i++){
    let itemPrice = cart[i].children;
    console.log(itemPrice);
  }
  // cart.forEach((element) => function () {
  //   const price = element.find('.price').textContent;
  //   totalPrice += parseFloat(price);
  // })


  // for (let i = 0; i < cart.length; i++) {
  //   totalPrice += cart[i].price;
  // }
}));
