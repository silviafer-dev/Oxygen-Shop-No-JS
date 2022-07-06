// const scrollIcon = document.querySelector(".btn__scroll_up__icon");
const scrollerPercent = document.querySelector(".percentage-scroller");

window.addEventListener("scroll", () => {
  let pixels = window.scrollY;
  let docHeight = document.body.offsetHeight;
  let winHeight = window.innerHeight;
  let scrollPercent = pixels / (docHeight - winHeight);
  let scrollRounded = Math.round(scrollPercent * 99);
  scrollerPercent.innerHTML = `${scrollRounded}%`;
});

const toTop = () => {
  document.documentElement.scrollTop = 0;
  document.documentElement.style.scrollBehavior = "smooth";
};

const backToTop = () => setTimeout(toTop, 200);
document
  .querySelector(".btn__scroll_up__icon")
  .addEventListener("click", backToTop);
