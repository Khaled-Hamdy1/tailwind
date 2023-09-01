const photos = document.querySelector("main");
let home = true;
let Home_URL = "https://api.pexels.com/v1/curated?per_page=30";
let search_URL = "https://api.pexels.com/v1/search";
let isReachedToTheEnd = false;

async function renderData(url) {
  const options = {
    method: "GET",
    headers: {
      Authorization: "lbE4hfXHJhHdsCaIw3KtvzCGL0Q6YVIeBppuM2ZvbV2uytTCamfilm1v",
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    result.photos.forEach((photo) => {
      photos.innerHTML += `
      <div class="relative mb-4 w-full bg-slate-900 rounded-lg shadow-xl">
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
      `;
    });
    if (url === Home_URL) Home_URL = result.next_page;
    else search_URL = result.next_page;
    url = result.next_page;
    console.log(search_URL);
  } catch (error) {
    console.error(error);
  } finally {
    isReachedToTheEnd = false;
  }
}
window.addEventListener("load", () => {
  photos.innerHTML = "";
  renderData(Home_URL);
});
window.addEventListener("scroll", () => {
  if (isReachedToTheEnd) return;
  const totalContentHeight = document.body.scrollHeight; // Total height of the content
  const viewportHeight = window.innerHeight; // Height of the viewport
  const scrollPosition = window.scrollY; // Current vertical scroll position
  const distanceFromBottom =
    totalContentHeight - (scrollPosition + viewportHeight);

  if (distanceFromBottom <= 20) {
    renderData(home ? Home_URL : search_URL);
    isReachedToTheEnd = true;
  }
});
//////////////////Search//////////////////////
const searchInput = document.querySelector("input");
const searchBtn = document.querySelector("#form-submit");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  home = false;
  if (search_URL === "https://api.pexels.com/v1/search") {
    photos.innerHTML = "";
    renderData(`${search_URL}?query=${searchInput.value}&per_page=2`);
  } else renderData(search_URL);
  console.log(searchInput.value);
});
