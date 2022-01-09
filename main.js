let menu = document.querySelector("header .mega-menu");
let but = document.querySelector("header .mainNav li:last-child a");

but.addEventListener("click", () => {
  if (but.classList.contains("clicked")) {
    menu.style.opacity = "0";
    menu.style.top = "calc(100% + 50px)";
    menu.style.zIndex = "-10";
    but.classList.remove("clicked");
    setTimeout(() => {
      menu.style.visibility = "hidden";
    }, 350);
  } else {
    menu.style.visibility = "visible";
    menu.style.opacity = "1";
    menu.style.top = "calc(100% + 1px)";
    menu.style.zIndex = "10";
    but.classList.add("clicked");
  }
});

// Start Image-Slide
let imgs = [
  "imgs/slide1.jpg",
  "imgs/slide2.jpg",
  "imgs/slide3.jpg",
  "imgs/slide4.jpg",
  "imgs/slide5.jpg",
  "imgs/slide6.jpg",
];
let images = document.querySelector(".gallery .image-slide .images");
let btns = document.querySelector(".btns");

for (let i = 0; i < imgs.length; i++) {
  let img = document.createElement("img");
  let btn = document.createElement("div");
  img.src = imgs[i];
  btn.classList.add("btn");
  if (i === 0) {
    btn.classList.add("checked");
  }
  btn.dataset.num = i;
  images.append(img);
  btns.append(btn);
}

let btn = document.querySelectorAll(".btns .btn");
let firstImg = document.querySelector(".image-slide .images img:first-child");

btn.forEach((b) => {
  b.onclick = () => {
    btn.forEach((b) => {
      if (b.classList.contains("checked")) {
        b.classList.remove("checked");
      }
    });
    firstImg.style.marginLeft = `-${b.dataset.num * 100}%`;
    b.classList.add("checked");
  };
});

let add = false;
setInterval(() => {
  for (let i = 0; i < btn.length; i++) {
    if (add === true) {
      for (let d = 0; d < btn.length; d++) {
        btn[d].style.backgroundColor = "transparent";
      }
      btn[i].classList.add("checked");
      firstImg.style.marginLeft = `-${btn[i].dataset.num * 100}%`;
      add = false;
    } else if (btn[i].classList.contains("checked")) {
      btn[i].classList.remove("checked");
      add = true;
      if (btn[i].dataset.num == btn.length - 1) {
        btn[0].classList.add("checked");
        firstImg.style.marginLeft = `-${btn[0].dataset.num * 100}%`;
      }
    }
    for (let d = 0; d < btn.length; d++) {
      btn[d].style.backgroundColor = "transparent";
    }
  }
  console.log("loop");
}, 5000);

// End Image-Slide

// Start Counter

let countDown = new Date("Dec 31, 2022 23:59:59").getTime();

let counter = setInterval(() => {
  // Get Date Now
  let dateNow = new Date().getTime();
  let dateDiff = countDown - dateNow;

  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

  document.querySelector(".days").innerHTML = days < 10 ? `0${days}` : days;
  document.querySelector(".hours").innerHTML = hours < 10 ? `0${hours}` : hours;
  document.querySelector(".minutes").innerHTML =
    minutes < 10 ? `0${minutes}` : minutes;
  document.querySelector(".seconds").innerHTML =
    seconds < 10 ? `0${seconds}` : seconds;

  if (dateDiff === 0) {
    clearInterval(counter);
  }
}, 1000);
// End Counter

// Start Our-Skills
// Start stats
let section = document.querySelector(".our-skills");
let spans = document.querySelectorAll(".our-skills .the-progress span");
let nums = document.querySelectorAll(".stats .num");
let stats = document.querySelector(".stats");
let started = false;

function statsUp(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
  }, 2000 / goal);
  console.log(goal);
}

window.onscroll = function () {
  if (window.scrollY >= stats.offsetTop - 1000) {
    if (!started) {
      nums.forEach((num) => statsUp(num));
    }
    started = true;
  }
  if (window.scrollY >= section.offsetTop - 350) {
    spans.forEach(function (span) {
      span.style.width = span.dataset.width;
    });
  }
};
// End stats
// End Our-Skills

// Start Videos
let video = document.querySelector(".videos .holder .preview video");
let vids = document.querySelector(".videos .holder .preview video source");
let li = document.querySelector(".videos .list");
let links = document.querySelectorAll(".videos .list ul li");
let random = document.querySelector(".fa-random");

links.forEach((link) => {
  link.onclick = function () {
    links.forEach((link) => {
      if (link.classList.contains("clicked")) {
        link.classList.remove("clicked");
      }
    });
    video.src = link.dataset.src;
    video.dataset.num = link.dataset.num;
    link.classList.add("clicked");
  };
  let dura = document.createElement("video");
  let span = link.childNodes[1];
  dura.src = link.dataset.src;
  dura.style.display = "none";
  link.append(dura);
  dura.onloadeddata = () => {
    span.textContent = `${Math.floor(dura.duration / 60)}:${Math.floor(
      dura.duration % 60
    )}`;
  };
});

random.onclick = () => {
  if (random.classList.contains("on")) {
    random.classList.remove("on");
  } else if (!random.classList.contains("on")) {
    random.classList.add("on");
  }
};

let check = true;
video.onended = () => {
  if (video.dataset.num == links.length) {
    video.dataset.num = "0";
    li.scrollTo(0, 0);
  }
  if (random.classList.contains("on")) {
    let rand = Math.floor(Math.random() * links.length);
    video.src = links[rand].dataset.src;
    links.forEach((link) => {
      if (link.classList.contains("clicked")) {
        link.classList.remove("clicked");
      }
    });
    links[rand].classList.add("clicked");
    video.dataset.num = links[rand].dataset.num;
  } else if (!random.classList.contains("on")) {
    video.src = links[Number.parseInt(video.dataset.num)].dataset.src;
    links.forEach((link) => {
      if (link.classList.contains("clicked")) {
        link.classList.remove("clicked");
      }
    });
    links[Number.parseInt(video.dataset.num)].classList.add("clicked");
    video.dataset.num = links[Number.parseInt(video.dataset.num)].dataset.num;
  }
};

// End Videos
