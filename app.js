const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTM1ZTk2ZGQzNTBiYWRhZTQ5ZDVjNTU0M2QyZjI2YSIsInN1YiI6IjY1MzBhMWIwNTFhNjRlMDBhYmEwMGU3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FRFQf3AHUFL0D0CZ7g8GOQP-J-y3b4_G84drHnBjtIE",
  },
};

let img_url = [20];
let titles = [20];
let overviews = [20];
let averages = [20];
let movie_ids = [20];

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    const obj = response.results;
    //초기화면 영화 카드 구성
    init(obj);
  })
  .catch((err) => console.error(err));

const grid = document.getElementById("grid");
const search_input = document.querySelector("#search_box input");
const search_btn = document.querySelector("#search_box button");
const top_btn = document.getElementById("top_btn");

const isAllFalse = (value) => value === false;

//initialize
function init(obj) {
  for (let i = 0; i < 20; i++) {
    img_url[i] = "https://image.tmdb.org/t/p/original/" + obj[i].poster_path;
    titles[i] = obj[i].title;
    overviews[i] = obj[i].overview;
    averages[i] = "Rate: " + obj[i].vote_average;
    movie_ids[i] = obj[i].id;

    add_card(i);
  }
}

//영화카드 생성&추가
function add_card(i) {
  const new_card = `
  <li class="movie_card" id="${movie_ids[i]}">
    <img class="main_img" src= ${img_url[i]} alt="movie-poster" />
    <div class="text_area">
      <h3>${titles[i]}</h3>
      <p>${overviews[i]}</p>
      <p>${averages[i]}</p>
    </div>
  </li>`;

  grid.insertAdjacentHTML("beforeend", new_card);
}

//검색 버튼 이벤트 핸둘러
function btn_click() {
  //영화 카드 전체 삭제
  while (grid.firstChild) {
    grid.firstChild.remove();
  }

  //입력 값 영화 제목 포함 여부 확인
  let check = titles.map(function (title) {
    let tmp = title.toUpperCase();
    return tmp.includes(search_input.value.toUpperCase());
  });

  //일치하는 결과 없을 경우
  if (check.every(isAllFalse)) {
    alert("검색 실패");
    location.reload();
    return;
  }

  //일치하는 결과 화면에 출력
  check.forEach(function (TorF, index) {
    if (TorF) {
      add_card(index);
    }
  });
}

//input 요소에서 enter 누르면 검색 버튼 클릭한 것처럼
function enterKey() {
  if (window.event.keyCode == 13) {
    btn_click();
  }
}

//검색 버튼 이벤트 리스너
search_btn.addEventListener("click", btn_click);

//영화 카드 클릭 시 해당 영화 id alert
grid.addEventListener("click", (target) => {
  let click_element = target.target;
  let target_card = click_element.closest(".movie_card");
  alert("영화 id: " + target_card.id);
});

//상단 이동 버튼
top_btn.addEventListener("click", () => {
  let body = document.getElementsByTagName("body")[0];
  //창의 스크롤을 본문 최상단으로 부드럽게 이동시킵니다.
  window.scroll({
    behavior: "smooth",
    top: body.offsetTop,
  });
});
