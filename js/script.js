const allCategories = "https://openapi.programming-hero.com/api/categories";

let cart = [];
let total = 0;

// ==================== CART FUNCTIONS ====================
const updateCartUI = () => {
  const cartContainer = document.querySelector(".cart-items");
  const totalElement = document.getElementById("cart-total");

  cartContainer.innerHTML = "";

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className =
      "bg-[#F0FDF4] flex items-center justify-between p-3 rounded-lg";
    div.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p>৳<span>${item.price}</span></p>
      </div>
      <i class="fa-solid fa-xmark cursor-pointer text-red-500"></i>
    `;

    // remove from cart on click x
    div.querySelector("i").addEventListener("click", () => {
      total -= item.price;
      cart.splice(index, 1);
      updateCartUI();
    });

    cartContainer.append(div);
  });

  totalElement.innerText = total;
};

const addToCart = (plant) => {
  cart.push(plant);
  total += plant.price;
  updateCartUI();
};

// ==================== MODAL ====================
const openPlantModal = (plant) => {
  const modalBox = document.getElementById("modal-container");
  modalBox.innerHTML = `
    <div class="card bg-base-100 shadow-sm h-[100%]">
      <figure class="px-4 py-4 bg-white rounded-lg">
        <img src="${plant.image}" alt="${plant.name}" class="rounded-xl w-full h-[186px]" />
      </figure>
      <div class="card-body text-left">
        <h2 class="card-title">${plant.name}</h2>
        <p class="mb-3">${plant.description}</p>
        <div class="flex justify-between mb-3">
          <span class="rounded-[999px] py-3 px-4 text-[#15803D] text-lg bg-[#DCFCE7]">
            ${plant.category}
          </span>
          <span class="rounded-[999px] p-2 text-lg font-semibold">৳${plant.price}</span>
        </div>
      </div>
    </div>
  `;
  document.getElementById("my_modal_5").showModal();
};

// ==================== SPINNER ====================
const showSpinner = () => {
  document.getElementById("spinner").classList.remove("hidden");
};
const hideSpinner = () => {
  document.getElementById("spinner").classList.add("hidden");
};

// ==================== LOAD CARDS ====================
const loadCard = (id, btn) => {
  showSpinner();
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("card-container");
      container.innerHTML = "";

      data.plants.forEach((plant) => {
        const card = document.createElement("div");
        card.innerHTML = `
          <div class="card bg-base-100 shadow-sm h-[100%]">
            <figure class="px-4 py-4 bg-white rounded-lg">
              <img src="${plant.image}" alt="${plant.name}" class="rounded-xl w-full h-[186px]" />
            </figure>
            <div class="card-body text-left">
              <h2 class="card-title cursor-pointer">${plant.name}</h2>
              <p class="mb-3">${plant.description}</p>
              <div class="flex justify-between mb-3">
                <span class="rounded-[999px] py-3 px-4 text-[#15803D] text-lg bg-[#DCFCE7]">
                  ${plant.category}
                </span>
                <span class="rounded-[999px] p-2 text-lg font-semibold">৳${plant.price}</span>
              </div>
              <div class="card-actions">
                <button class="rounded-[999px] w-full text-center px-2.5 py-2 text-lg font-medium text-white bg-[#15803D] hover:bg-gray-600">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        `;

        // modal on title click
        card
          .querySelector(".card-title")
          .addEventListener("click", () => openPlantModal(plant));
        // add to cart
        card
          .querySelector("button")
          .addEventListener("click", () => addToCart(plant));

        container.append(card);
      });

      hideSpinner();
      setActiveButton(btn);
    });
};

const allCategory = () => {
  fetch(allCategories)
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("all-categories");
      data.categories.forEach((category) => {
        const categoryBtn = document.createElement("div");
        categoryBtn.innerHTML = `
          <div class="category-btn rounded-sm px-2.5 py-2 bg-[#F0FDF4] text-lg font-medium text-left hover:bg-[#15803D] hover:text-white text-[20px] cursor-pointer">
            ${category.category_name}
          </div>
        `;
        const btnEl = categoryBtn.querySelector("div");
        btnEl.addEventListener("click", () => loadCard(category.id, btnEl));
        container.append(categoryBtn);
      });
    });
};

const allTree = () => {
  showSpinner();
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("card-container");
      container.innerHTML = "";
      data.plants.forEach((plant) => {
        const card = document.createElement("div");
        card.innerHTML = `
          <div class="card bg-base-100 shadow-sm h-[100%]">
            <figure class="px-4 py-4 bg-white rounded-lg">
              <img src="${plant.image}" alt="${plant.name}" class="rounded-xl w-full h-[186px]" />
            </figure>
            <div class="card-body text-left">
              <h2 class="card-title cursor-pointer">${plant.name}</h2>
              <p class="mb-3">${plant.description}</p>
              <div class="flex justify-between mb-3">
                <span class="rounded-[999px] py-3 px-4 text-[#15803D] text-lg bg-[#DCFCE7]">
                  ${plant.category}
                </span>
                <span class="rounded-[999px] p-2 text-lg font-semibold">৳${plant.price}</span>
              </div>
              <div class="card-actions">
                <button class="rounded-[999px] w-full text-center px-2.5 py-2 text-lg font-medium text-white bg-[#15803D] hover:bg-gray-600">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        `;

        card
          .querySelector(".card-title")
          .addEventListener("click", () => openPlantModal(plant));
        card
          .querySelector("button")
          .addEventListener("click", () => addToCart(plant));

        container.append(card);
      });
      hideSpinner();
    });
};

// ==================== ACTIVE BUTTON ====================
const setActiveButton = (btn) => {
  document
    .querySelectorAll(".category-btn")
    .forEach((b) => b.classList.remove("active"));
  btn?.classList.add("active");
};

// ==================== INITIAL LOAD ====================
allCategory();
allTree();
