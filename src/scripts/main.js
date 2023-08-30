const photos = document.querySelector("main");
let url = "https://api.pexels.com/v1/curated?per_page=30";

async function renderData() {
  const options = {
    method: "GET",
    headers: {
      Authorization: "lbE4hfXHJhHdsCaIw3KtvzCGL0Q6YVIeBppuM2ZvbV2uytTCamfilm1v",
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    let str = "";
    result.photos.forEach((photo) => {
      str += `
      <div class="relative m-4 h-fit rounded-lg shadow-xl">
      <img  
        loading="lazy"
        src="${photo.src.original}"
        srcset="
            ${photo.src.original}?auto=compress&amp;cs=tinysrgb&amp;w=150&amp;lazy=load   150w,
            ${photo.src.original}?auto=compress&amp;cs=tinysrgb&amp;w=300&amp;lazy=load   300w,
            ${photo.src.original}?auto=compress&amp;cs=tinysrgb&amp;w=400&amp;lazy=load   400w,
            ${photo.src.original}?auto=compress&amp;cs=tinysrgb&amp;w=600&amp;lazy=load   600w,
            ${photo.src.xl}?auto=compress&amp;cs=tinysrgb&amp;w=800&amp;lazy=load   800w,
            ${photo.src.original}?auto=compress&amp;cs=tinysrgb&amp;w=1200&amp;lazy=load 1200w,
          "
          sizes="(max-width: 250px) calc((100vw - 30px - 15px) / 2), (max-width: 900px) calc((100vw - 30px - 15px) / 3),calc((1600px - 160px - 60px) / 4)"
        alt="${photo.alt}"
        class="object-cover rounded-lg"
      />
    </div>
      `;
    });
    photos.innerHTML += str;
    console.log(window.scrollY);
    url = result.next_page;
  } catch (error) {
    console.error(error);
  }
}
window.addEventListener("load", () =>{photos.innerHTML=""; renderData()});
window.addEventListener("scroll", () => {
  setTimeout(() => {
    const totalContentHeight = document.body.scrollHeight; // Total height of the content
    const viewportHeight = window.innerHeight; // Height of the viewport
    const scrollPosition = window.scrollY; // Current vertical scroll position
    const distanceFromBottom =
      totalContentHeight - (scrollPosition + viewportHeight);

    if (distanceFromBottom <= 20) {
      renderData();
    }
  }, 3000);
});
