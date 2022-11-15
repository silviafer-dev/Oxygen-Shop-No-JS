// back to top

const toTop = () => {
  document.documentElement.scrollTo({
    behavior: "smooth",
    top: 0,
  });
};

const backToTop = () => setTimeout(toTop, 200);
document
  .querySelector(".btn__scroll_up__icon")
  .addEventListener("click", backToTop);

// scroller percentage
const scrollerPercentDiv = document.querySelector(".percentage-scroller");
let scrollPercent;

document.addEventListener("scroll", () => {
  const pixels = scrollY;
  const docHeight = document.body.offsetHeight;
  const winHeight = innerHeight;
  scrollPercent = (pixels / (docHeight - winHeight)) * 100;
  scrollerPercentDiv.style.width = scrollPercent + "%";
});

//hamburger menu
const hamburgerMenu = document.querySelector("#hamburger").addEventListener("click", () => {
    const navMenu = document.querySelector(".nav__menu");
    navMenu.classList.toggle("nav__menu--visible");
  });

//MODAL
const modal = document.querySelector(".modal");

setTimeout(() => {
  if (localStorage.getItem("modalShown") !== "1") {
    modal.style.display = "block";
    localStorage.setItem("modalShown", "1");
  }
}, 5000);

let modalElement = true;

const showModal = () => {
  modalElement = false;
};

document.addEventListener("evt", showModal);

document.addEventListener("scroll", () => {
  if (localStorage.getItem("modalShown") !== "1" && scrollPercent >= 25) {
    modal.style.display = "block";
    localStorage.setItem("modalShown", "1");
  }
});

// close modal
const closeModal = document.querySelector(".close-modal");
const subscribe = document.querySelector(".subscribe-modal");

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
subscribe.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    modal.style.display = "none";
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === "Escape") {
    modal.style.display = "none";
  }
});

// name length
const validationForm = document.querySelector("#submit-btn");
const validationInput = document.querySelector(".form__input");
const nameLength = () => {
  const nameValue = document.querySelector(".name").value;
  if (nameValue.length >= 1 && nameValue.length <= 100) {
    document
      .querySelector(".name")
      .setAttribute("style", "  border-bottom: 1px solid var(--grey)");
    return true;
  } else {
    document
      .querySelector(".name")
      .setAttribute(
        "style",
        "border:1px solid red ; padding: 7px ; border-radius: 10px"
      );
    console.log("The name must be between 2 and 100 characters");
    return false;
  }
};
validationInput.addEventListener("keypress", nameLength);

// regex validation email
const emailValidate = () => {
  const emailValue = document.querySelector(".email").value;

  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailValue.match(regex)) {
    return true;
  } else {
    document
      .querySelector(".email")
      .setAttribute(
        "style",
        "border:1px solid red ; padding: 7px ; border-radius: 10px"
      );

    return false;
  }
};
validationForm.addEventListener("click", emailValidate);

// check-box;
const checkBox = document.querySelector(".form__checkbox");

//FORM FETCH
const url = "https://jsonplaceholder.typicode.com/posts";
const inputName = document.querySelector(".name");
const inputEmail = document.querySelector(".email");

const postForm = (e) => {
  const dataName = inputName.value;
  const dataEmail = inputEmail.value;
  const errorMessage = document.querySelector(".error-text");
  const errorMessageCheck = document.querySelector(".error-text-check");
  const confirmMessage = document.querySelector(".confirm-text");
  e.preventDefault();
  if (!dataName || !dataEmail) {
    errorMessage.style.display = "block";
    errorMessageCheck.style.display = "none";
    confirmMessage.style.display = "none";

    return false;
  } else if (checkBox.checked == false) {
    errorMessage.style.display = "none";
    confirmMessage.style.display = "none";
    errorMessageCheck.style.display = "block";
    return false;
  } else {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: dataName,
        email: dataEmail,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) =>
      response.json({ message: "Email-address sent successfully" })
    );
    errorMessage.style.display = "none";
    errorMessageCheck.style.display = "none";
    confirmMessage.style.display = "block";

    inputName.value = "";
    inputEmail.value = "";
    checkBox.checked = false;
  }
};

validationForm.addEventListener("click", postForm);

// currency exchange

const apiExchange = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json`;

const getDataExchange = async () => {
  const response = await fetch(apiExchange);
  let data = await response.json();
  return data;
};

const select = document.querySelector(".pricing__currency__select ");
const professional = document.querySelector(".professionalItem");
const premium = document.querySelector(".premiumItem");
const basic = document.querySelector(".basicItem");

getDataExchange().then((data) => {
  select.addEventListener("change", (e) => {
    switch (e.target.value) {
      case "usd":
        basic.textContent = "$0";
        professional.textContent = "$25";
        premium.textContent = "$60";
        break;
      case "eur":
        basic.textContent = "€0";
        professional.textContent =
          "€" + parseFloat(25 * data.usd.eur).toFixed(2);
        premium.textContent = "€" + parseFloat(60 * data.usd.eur).toFixed(2);
        break;
      case "gbp":
        basic.textContent = "£0";
        professional.textContent =
          "£" + parseFloat(25 * data.usd.gbp).toFixed(2);
        premium.textContent = "£" + parseFloat(60 * data.usd.gbp).toFixed(2);
        break;
    }
  });
});

//SLIDER

class SuperSlider {
  constructor(id) {
    this.container = document.getElementById(id);
    this.images = this.container.getElementsByClassName("slide__img");
    this.activeImg = this.images[0];
    this.activeIndex = 0;
    this.arrow = document.createElement("button");
    this.arrowRight = document.createElement("button");
    this.arrow.classList.add("slide__btn");
    this.arrowRight.classList.add("slide__btn--right", "slide__btn");
    this.arrow.textContent = "❮";
    this.arrowRight.textContent = "❯";
    this.dotsContainer = document.createElement("div");
    this.dotsContainer.classList.add("dotsContainer");

    this.container.appendChild(this.arrow);
    this.container.appendChild(this.arrowRight);
    this.container.appendChild(this.dotsContainer);
    this.dots();
    this.dots[0].classList.add("dot--active");
    this.activeDot = this.dots[0];

    setInterval(() => {
      this.nextImg();
    }, 2000);
    this.arrow.addEventListener("click", () => {
      this.prevImg();
    });
    this.arrowRight.addEventListener("click", () => {
      this.nextImg();
    });
  }

  dots() {
    this.dots = [];
    for (let i = 0; i < this.images.length; i++) {
      const dot = document.createElement("button");
      dot.classList.add("dot");
      this.dotsContainer.appendChild(dot);
      this.dots.push(dot);
    }
  }
  nextImg() {
    if (this.activeIndex >= this.images.length - 1) {
      this.showImg(0);
    } else {
      this.showImg(this.activeIndex + 1);
    }
  }

  prevImg() {
    if (this.activeIndex === 0) {
      this.showImg(this.images.length - 1);
    } else {
      this.showImg(this.activeIndex - 1);
    }
  }
  showImg(index) {
    this.activeImg.classList.remove("slide__img--active");
    this.images[index].classList.add("slide__img--active");
    this.activeDot.classList.remove("dot--active");
    this.dots[index].classList.add("dot--active");
    this.activeDot = this.dots[index];
    this.activeImg = this.images[index];
    this.activeIndex = index;
  }
}

const slider = new SuperSlider("slider");
