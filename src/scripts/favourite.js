const photos = document.querySelector("main");

async function fetchMultipleData() {
  try {
    const favList = JSON.parse(localStorage.getItem("favList")) || [];
    const options = {
      method: "GET",
      headers: {
        Authorization: "lbE4hfXHJhHdsCaIw3KtvzCGL0Q6YVIeBppuM2ZvbV2uytTCamfilm1v",
      },
    };

    const results = await Promise.all(
      favList.map((id) => fetch(`https://api.pexels.com/v1/photos/${id}`,options).then((response) => response.json()))
    );
    let str =""
    results.forEach((photo) => {
      str += `
      <div class="relative mb-4 w-fit rounded-lg shadow-xl item">
        <div
          class="flex gap-2 absolute flex-row-reverse right-2 top-2 image-buttons"
        >
          <button
          onclick = removeFav(${photo.id})
            class="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-lg like-btn"
          >
            <i class="fa-solid fa-heart text-red-700"></i>
          </button>
        </div>
        <div>
          <img  
          loading="lazy"
          src="${photo.src.original}"
          srcset="
              ${photo.src.original}?auto=compress&amp;cs=tinysrgb&amp;w=150&amp;lazy=load   150w,
              ${photo.src.original}?auto=compress&amp;cs=tinysrgb&amp;w=300&amp;lazy=load   300w,
              ${photo.src.original}?auto=compress&amp;cs=tinysrgb&amp;w=400&amp;lazy=load   400w,
              ${photo.src.original}?auto=compress&amp;cs=tinysrgb&amp;w=600&amp;lazy=load   600w,
              ${photo.src.original}?auto=compress&amp;cs=tinysrgb&amp;w=800&amp;lazy=load   800w,
              ${photo.src.original}?auto=compress&amp;cs=tinysrgb&amp;w=1200&amp;lazy=load 1200w,
            "
          alt="${photo.alt}"
          class="object-cover rounded-lg"
          />
        </div>
        <div>
          <h1
            class="absolute left-1 bottom-2 capitalize text-white font-semibold text-sm image-buttons"
          >
            ${photo.photographer}
          </h1>
        </div>
      </div>
      `;
    });
    photos.innerHTML += str;
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
};

window.addEventListener("load", () => {
  photos.innerHTML = "";
  fetchMultipleData();
});

function removeFav(id) {
  const favList = JSON.parse(localStorage.getItem("favList")) || [];
  const favListFiltered = favList.filter((favId) => favId !== id);
  localStorage.setItem("favList", JSON.stringify(favListFiltered));
  photos.innerHTML = "";
  fetchMultipleData();
}