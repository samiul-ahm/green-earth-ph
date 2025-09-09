const allCategories = "https://openapi.programming-hero.com/api/categories";

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

const loadCard = (id) => {
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

        // Open modal when clicking the card title
        card.querySelector(".card-title").addEventListener("click", () => openPlantModal(plant));

        container.append(card);
      });
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
          <div onclick="loadCard(${category.id})"
               class="rounded-sm px-2.5 py-2 bg-[#F0FDF4] text-lg font-medium text-left hover:bg-[#15803D] hover:text-white text-[20px]">
            ${category.category_name}
          </div>
        `;
        container.append(categoryBtn);
      });
    });
};

const allTree = () => {
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

        // Open modal on title click
        card.querySelector(".card-title").addEventListener("click", () => openPlantModal(plant));

        container.append(card);
      });
    });
};

// Initial load
allCategory();
allTree();
