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
    init(obj);
  })
  .catch((err) => console.error(err));

function init(obj) {
  for (let i = 0; i < 20; i++) {
    // //이미지 불러오기
    // img_url[i] = "https://image.tmdb.org/t/p/original/" + obj[i].poster_path;
    // document.getElementsByClassName("main_img")[i].src = img_url[i];

    // //제목 삽입
    // titles[i] = obj[i].title;
    // let init_title = document.createElement("h3");
    // init_title.innerText = titles[i];
    // document.getElementsByClassName("text_area")[i].appendChild(init_title);

    // //설명 삽입
    // overviews[i] = obj[i].overview;
    // let init_overview = document.createElement("p");
    // init_overview.innerText = overviews[i];
    // document.getElementsByClassName("text_area")[i].appendChild(init_overview);

    // //평점 삽입
    // averages[i] = "Rate: " + obj[i].vote_average;
    // let init_averages = document.createElement("p");
    // init_averages.innerText = averages[i];
    // document.getElementsByClassName("text_area")[i].appendChild(init_averages);

    // //영화 id
    // movie_ids[i] = obj[i].id;

    //이미지 불러오기

    img_url[i] = "https://image.tmdb.org/t/p/original/" + obj[i].poster_path;
    titles[i] = obj[i].title;
    overviews[i] = obj[i].overview;
    averages[i] = "Rate: " + obj[i].vote_average;
    movie_ids[i] = obj[i].id;

    add_card(i);
  }
}

//콜백함수 활용
const isAllFalse = (value) => value === false;

const search_input = document.querySelector("#search_box input");
const search_btn = document.querySelector("#search_box button");

function btn_click() {
  // console.dir(search_input.value);
  console.log("click!");

  //영화 카드 전체 삭제
  console.log("clear");
  const parent = document.getElementById("grid");
  while (parent.firstChild) {
    parent.firstChild.remove();
  }

  let check = titles.map(function (title) {
    let tmp = title.toUpperCase();
    return tmp.includes(search_input.value.toUpperCase());
  });

  // for (let i = 0; i < 20; i++) {
  //   if (find_title(i)) {
  //     check[i] = true;
  //   } else {
  //     check[i] = false;
  //   }
  // }

  if (check.every(isAllFalse)) {
    alert("검색 실패");
    location.reload();
    return;
  }

  // for (let i = 0; i < 20; i++) {
  //   console.log(check[i]);
  //   if (check[i]) {
  //     add_card(i);
  //   } else {
  //     continue;
  //   }
  // }

  check.forEach(function (TorF, index) {
    if (TorF) {
      add_card(index);
    }
  });
}

search_btn.addEventListener("click", btn_click);
function enterKey() {
  if (window.event.keyCode == 13) {
    btn_click();
  }
}

// function find_title(i) {
//   let tmp = titles[i].toUpperCase();
//   return tmp.includes(search_input.value.toUpperCase());
// }

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

  const grid = document.getElementById("grid");
  grid.insertAdjacentHTML("beforeend", new_card);
}

const card_class = document.getElementById("grid");
card_class.addEventListener("click", (target) => {
  let click_element = target.target;
  let target_card = click_element.closest(".movie_card");
  alert("영화 id: " + target_card.id);
});
