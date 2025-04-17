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
                  }X</span> $${check.price.toFixed(2)} <span>$${(
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
                }X</span> $${check.price.toFixed(2)} <span>$${(
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
          };
          cart.push(cartItems);
          // console.log(cart);
          let cartAdd = document.getElementById("count");
          cartAdd.innerHTML = cart.length;
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
        }
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


function showOrderConfirmedModal() {
  
  for (let i = 0; 1 < dataArray.length; i++) {
    const element = dataArray[i];
    let name = element.name;
    let price = element.price;
  }

}

