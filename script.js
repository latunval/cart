let cart = [];
let cartArray = [];

const img = document.getElementById("row1");
async function carts() {
  try {
    const data = await fetch("data.json");
    const cartArray = await data.json();
    // console.log(cartArray));

    for (let picture = 0; picture < cartArray.length; picture++) {
      const element = cartArray[picture];
      const images = document.createElement("div");
      // const btn =document.createElement('button');
      images.classList.add("add");
      images.innerHTML = `<img src="${
        element.image.desktop
      }" class="pic" alt=""> <button class="addbtn"><img src="/assets/images/icon-add-to-cart.svg" alt="add to carts"> Add to Cart</button>
         <button class="adding block"><img class="minus" src="/assets/images/icon-decrement-quantity.svg" alt="icon-decrement-quantity"> <span class="number">1</span><img class="plus" src="/assets/images/icon-increment-quantity.svg" alt=""></button>
        <p class="category" >${element.category}</p>
        <p class="name" >${element.name}</p>
        <p class="price" >$${element.price.toFixed(2)}</p>
        `;
      img.appendChild(images);
      // img.appendChild(btn)
      // img.innerHTML = element
      const minusBtn = images.querySelector(".minus");
      const imgs = images.querySelector(".pic");
      const addCartBtn = images.querySelector(".adding");
      const addBtn = images.querySelector(".addbtn");
      const plusBtn = images.querySelector(".plus");
      const numCart = images.querySelector(".number");
      const view = document.querySelector(".list");


      minusBtn.addEventListener("click", function () {
        const check = cart.find((item) => item.name === element.name);
        if (check) {
          check.quantity--; // Decrease the quantity in the cart array
          numCart.innerHTML = check.quantity; // Update the displayed quantity
      
          if (check.quantity === 0) {
            // Remove the item from the cart array
            cart = cart.filter((item) => item.name !== element.name);
            console.log(cart);
      
            // Display the "Add to Cart" button and remove the border
            addCartBtn.classList.add("block");
            imgs.classList.remove("border");
      
            // Remove the item from the cart view
            const cartLists = document.querySelectorAll(".cart_list");
            cartLists.forEach((cartItem) => {
              const items = cartItem.querySelector(".name");
              if (items && items.textContent === check.name) {
                cartItem.remove();
              }
            });
      
            // Update the cart count
            const cartAdd = document.getElementById("count");
            cartAdd.innerHTML = cart.length;
            const cartAdds = document.getElementById(".counts");
            cartAdds.innerHTML = cart.length;
      
            // If the cart is empty, display the empty cart message
            if (cart.length === 0) {
              const view = document.querySelector(".list");
              view.innerHTML = `
                <img src="/assets/images/illustration-empty-cart.svg" alt="illustration-empty-cart">
                <p class="empty">Your added items will appear here</p>
              `;
            }
          } else {
            // Update the quantity and price in the cart view
            const cartLists = document.querySelectorAll(".cart_list");
            cartLists.forEach((cartItem) => {
              const items = cartItem.querySelector(".name");
              if (items && items.textContent === check.name) {
                const quantityEl = cartItem.querySelector(".quantity");
                const priceEl = cartItem.querySelector(".price");
      
                if (quantityEl && priceEl) {
                  quantityEl.textContent = `${check.quantity}X`;
                  priceEl.innerHTML = `<span class="quantity">${
                    check.quantity
                  }X</span> $${check.price.toFixed(2)}<span>$${(
                    check.quantity * check.price
                  ).toFixed(2)}</span>`;
                }
              }
            });
          }
      
          // Update total order price
          const carbon = document.querySelector(".carbon_total");
          if (carbon) {
            const total = cart.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );
            carbon.innerHTML = `
              <div class="total"><p>Order Total</p><h4>$${total.toFixed(2)}</h4></div>
              <div class='join'>
              <section class="carbon"><img src="/assets/images/icon-carbon-neutral.svg" alt=""> <span>This is a <b>carbon-neutral</b> delivery</span></section>
              <button class="orderBtn">Confirm Order</button></div>
            `;
          }
        }else {
          location.reload()
        }
      });

      plusBtn.addEventListener("click", function () {
        const check = cart.find((item) => item.name === element.name);
        if (check) {
          check.quantity++;
          numCart.innerHTML = check.quantity;

          // Update the quantity and price in the cart view
          const cartLists = document.querySelectorAll(".cart_list");
          cartLists.forEach((cartItem) => {
            const items = cartItem.querySelector(".name");
            if (items && items.textContent === check.name) {
              const quantityEl = cartItem.querySelector(".quantity");
              const priceEl = cartItem.querySelector(".price");

              if (quantityEl && priceEl) {
                quantityEl.textContent = `${check.quantity}X`;
                priceEl.innerHTML = `<span class="quantity">${
                  check.quantity
                }X</span> $${check.price.toFixed(2)} <span>=$${(
                  check.quantity * check.price
                ).toFixed(2)}</span>`;
              }
            }
          });

          // Update total order price
          const carbon = document.querySelector(".carbon_total");
          if (carbon) {
            const total = cart.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );
            carbon.innerHTML = `
                <div class="total"><p>Order Total</p><h4>$${total.toFixed(
                  2
                )}</h4></div>
                <div class='join'>
                <section class="carbon"><img src="/assets/images/icon-carbon-neutral.svg" alt=""> <span>This is a <b>carbon-neutral</b> delivery</span></section>
                <button class="orderBtn">Confirm Order</button></div>
                `;
          }
        }
      });

      addBtn.addEventListener("click", function () {
        // alert('hello')
        view.classList.add("block");
        addCartBtn.classList.remove("block");
        imgs.classList.add("border");
        // console.log(cartAdd);

        const allInCart = cart.find((item) => item.name === element.name);
        if (!allInCart) {
          const cartItems = {
            name: element.name,
            category: element.category,
            price: element.price,
            quantity: 1,
            image : element.image
          };
          cart.push(cartItems);
          // console.log(cart);
          let cartAdd = document.getElementById("count");
          cartAdd.innerHTML = cart.length;
          let cartAdds = document.getElementById("counts");
          cartAdds.innerHTML = cart.length;
          const calculateQuantity = cartItems.quantity * cartItems.quantity;
          const cartView = document.querySelector(".cart");
          const cartList = document.createElement("div");
          cartList.classList.add("cart_list");
          cartList.innerHTML = `
 <p class="name" >${element.name}</p>
        <p class="price" ><span class="quantity">${calculateQuantity}X</span> $${cartItems.price.toFixed(
            2
          )}</p>
        `;

          cartView.appendChild(cartList);
          const carbon = document.querySelector(".carbon_total");
          carbon.classList.add("carbon_total");
          carbon.innerHTML = `<div class="total"><p>Order Total</p><h4> </h4></div>
        <div class='join'>
        <section class="carbon"><img src="/assets/images/icon-carbon-neutral.svg" alt=""> <span>This is a <b>carbon-neutral</b> delivery</span></section>
        <button class="orderBtn">Confirm Order</button></div>`;
          cartView.appendChild(carbon);
        };

        const orderBtn = document.querySelector(".orderBtn");
        orderBtn.addEventListener("click", function () {
          showModal();
        });
      });
    }
    console.log(cartArray);
  } catch (error) {
    console.error(`error message is that`, error);
  }
}

carts();

const showModal = function () {
  // alert('hello')
  const confirmModal = document.createElement("div");
  confirmModal.classList.add("confirmModal");
  confirmModal.innerHTML = `
      <div class="confirm-order">
          <p class="header">Checkout Your Order</p>
          
          <div class="btns">
              <button class="cancel">Cancel</button>
              <button class="confirm">Confirm Order</button>
          </div>
      </div>
  `;
  document.querySelector("body").appendChild(confirmModal);

  // Add event listeners for buttons
  const cancelBtn = confirmModal.querySelector(".cancel");
  const confirmBtn = confirmModal.querySelector(".confirm");
  cancelBtn.addEventListener("click", () => {
    confirmModal.remove(); // Close the modal
  });

  confirmBtn.addEventListener("click", () => {
    confirmModal.remove(); // Close the confirmation modal
    showOrderConfirmedModal(); // Show the order confirmed modal
  });
};


const showOrderConfirmedModal = function () {
  const orderModal = document.createElement('div');
  orderModal.classList.add('orderConfirmedModal');
  orderModal.innerHTML = `
      <div class="order-confirmed">
          <img src="/assets/images/icon-order-confirmed.svg" alt="Order Confirmed" class="confirm-icon">
          <h2>Order Confirmed</h2>
          <p class="subtitle">We hope you enjoy your food!</p>
          <div class="order-items">
              ${cart.map(item => {
                      const data = cart.find(d => d.name === item.name);
                      console.log(item);
                      
                      return `
                          <div class="order-item">
                              <img src="${data.image.desktop}" alt="${item.name}" class="item-img">
                              <div class="item-details">
                                  <h4>${item.name}</h4>
                                  <p><span class="quantity">${item.quantity}x</span> @ $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}</p>
                              </div>
                          </div>
                      `;
                  })
                  .join('')}
          </div>
          <div class="order-total">
              <p>Order Total</p>
              <h3>$${cart.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)}</h3>
          </div>
          <button class="start-new-order">Start New Order</button>
      </div>
  `;
  document.querySelector('body').appendChild(orderModal);

  // Add event listener for the "Start New Order" button
  const startNewOrderBtn = orderModal.querySelector('.start-new-order');
  startNewOrderBtn.addEventListener('click', () => {
      cart = [];
      // Reset all product cards
      document.querySelectorAll('.card').forEach(card => {
          card.querySelector('.hoverbtn').classList.add('hidden');
          card.querySelector('.addbtn').classList.remove('hidden');
          card.querySelector('.product-img').classList.remove('border');
          card.querySelector('.quantity').textContent = '1';
      });

      
       location.reload()
orderModal.remove();
  });
};

const icon = document.getElementById('icon');
icon.addEventListener('click',function () {
  // alert('hello')
  icon.style.display = 'none'
  document.querySelector('.cart').style.display = 'block'
})
