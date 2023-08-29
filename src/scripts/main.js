const photos = document.querySelector("main");

async function renderData() {
  const url = "https://api.pexels.com/v1/curated?per_page=15";
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
      <div class="relative m-4">
      <img  
        loading="lazy"
        src="${photo.src.original}"
        srcset="
          ${photo.src.small}   150w,
          ${photo.src.tiny}   300w,
          ${photo.src.medium}   400w,
          ${photo.src.landscape}  600w,
          ${photo.src.medium}   800w,
          ${photo.src.medium} 1200w,
          ${photo.src.large} 1600w
        "
        alt="${photo.alt}"
        class="object-cover"
      />
    </div>
      `;
    });
    photos.innerHTML = str;
    // console.log(JSON.stringify(result,null,1));
  } catch (error) {
    console.error(error);
  }
}

renderData();
