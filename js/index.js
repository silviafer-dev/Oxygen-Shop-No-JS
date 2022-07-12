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
const hamburgerMenu = document
  .querySelector("#hamburger")
  .addEventListener("click", () => {
    const navMenu = document.querySelector(".nav__menu");
    if (navMenu.style.display === "block") {
      navMenu.style.display = "none";
    } else {
      navMenu.style.display = "block";
    }
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
const checked = () => {
  const checkBox = document.querySelector(".form__checkbox").checked === true;
  if (checkBox) {
    console.log("checked");
    return true;
  } else {
    console.log("object");
    return false;
  }
};
validationForm.addEventListener("click", checked);

//FORM FETCH

const url = "https://jsonplaceholder.typicode.com/posts";
const inputName = document.querySelector(".name");
const inputEmail = document.querySelector(".email");

const postForm = () => {
  const dataName = inputName.value;
  const dataEmail = inputEmail.value;

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
