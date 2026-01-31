const API_KEY = "pub_ed7c7f02e34c443091ad96b9f85f7e12";
const BREAKING_URL =
  `https://newsdata.io/api/1/news?country=in&language=en&category=top&apikey=${API_KEY}`;

let currentSpeech = null;


// LOAD ON START
window.onload = () => {
  loadBreakingNews();
};


// FETCH NEWS
async function loadBreakingNews() {
  try {
    const res = await fetch(BREAKING_URL);
    const data = await res.json();
    const breaking = data.results.slice(0, 10); //  at least 10 slides
    renderBreakingCarousel(breaking);
  } catch (err) {
    console.error("Breaking news error", err);
  }
}

// RENDER CAROUSEL

function renderBreakingCarousel(newsList) {
  const container = document.getElementById("breakingNews");
  container.innerHTML = "";

  newsList.forEach((news, index) => {
    const textToRead = news.title + ". " + (news.description || "");

    const slide = document.createElement("div");
    slide.className = `carousel-item ${index === 0 ? "active" : ""}`;

    slide.innerHTML = `
      <div class="text-center">
        <img src="${news.image_url || 'https://via.placeholder.com/900x350'}"
             class="img-fluid mb-2"
             style="max-height:300px;object-fit:cover;">

        <h6 class="px-3">${news.title}</h6>

        <div class="d-flex justify-content-center gap-2 mt-2">
          <button class="btn btn-sm btn-outline-success"
            onclick="startReadAloud('${safe(textToRead)}')">
            ▶
          </button>

          <button class="btn btn-sm btn-outline-danger"
            onclick="stopReadAloud()">
            ⏹
          </button>

          <a href="${news.link}" target="_blank"
             class="btn btn-sm btn-outline-dark">
            Read more
          </a>
        </div>
      </div>
    `;

    container.appendChild(slide);
  });

  // stop voice when slide changes
  document
    .getElementById("breakingCarousel")
    .addEventListener("slide.bs.carousel", stopReadAloud);
}

// READ ALOUD
function startReadAloud(text) {
  stopReadAloud();
  currentSpeech = new SpeechSynthesisUtterance(text);
  currentSpeech.lang = "en-US";
  currentSpeech.rate = 1;
  speechSynthesis.speak(currentSpeech);
}

function stopReadAloud() {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
  currentSpeech = null;
}

// SAFE STRING
function safe(text) {
  return text.replace(/['"]/g, "");
}
