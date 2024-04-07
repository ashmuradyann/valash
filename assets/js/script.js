const header = document.querySelector("header")
// const links = document.querySelectorAll(".link")
// const launchApplink = document.querySelector(".launch-app-link")
// const navbarLogo = document.querySelector(".navbar-logo")
// const mobileSpans = document.querySelectorAll(".navbar-mobile-span")

var lastScrollTop = 0;
document.addEventListener("scroll", () => {
  header.style.transition = "transform 250ms, padding 250ms"

  var st = window.pageYOffset || document.documentElement.scrollTop;
  if (st === 0) {
    if (document.body.clientWidth < 640) {
      header.style.padding = "16px"
    } else if (document.body.clientWidth >= 640) {
      header.style.padding = "30px 40px"
    }
    header.style.backdropFilter = "none"
  } else if (st > lastScrollTop && st > 200) {
    header.style.transform = "translateY(-100%)"
  } else if (st > lastScrollTop) {
    if (document.body.clientWidth < 640) {
      header.style.padding = "16px"
    } else if (document.body.clientWidth >= 640) {
      header.style.padding = "12px 30px"
    }
    header.style.backdropFilter = "blur(10px)"
  } else {
    header.style.transform = "translateY(0)"
  }
  lastScrollTop = st <= 0 ? 0 : st;
}, false)

const swiper = new Swiper(".swiper", {
  loop: true,
  slidesPerView: 4,
  spaceBetween: 20,
});

const slideSwiper = (side) => {
  if (side === "next") {
    swiper.slideNext();
  } else if (side === "prev") {
    swiper.slidePrev();
  }
}

const inputName = document.querySelector("#inputName")
const inputMail = document.querySelector("#inputMail")
const inputDescription = document.querySelector("#inputDescription")
const privacyCheckbox = document.querySelector("#privacyCheckbox")

const myForm = document.querySelector("#my-form")

const errorMessage = document.querySelector(".error-message")
const successMessage = document.querySelector(".success-message")

const checkInputs = () => {
  if (!inputName.value || !inputMail.value || !inputDescription.value) {
    return {
      status: false,
      message: "Заполните все поля!"
    }
  } else if (!privacyCheckbox.checked) {
    return {
      status: false,
      message: "Подвердите согласия на обработку персональных данных!"
    }
  } else {
    return {
      status: true,
      message: "Успешно отправлено!"
    }
  }
}

const sendMessage = (id, message) => {
  var token = "7100175385:AAGZpzZjMXRvgaa5YL5v9y89UucClW0c3MU";
  var tgMessage = `Имя: ${inputName.value}%0AMail: ${inputMail.value}%0AСообщение: ${inputDescription.value}`;
  
  fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&text=${tgMessage}`)
  .then(response => {
    if (response.ok) {
        errorMessage.style.display = "none"
        successMessage.style.display = "block"
        successMessage.innerHTML = message
      } else {
        successMessage.style.display = "none"
        errorMessage.style.display = "block"
        errorMessage.innerHTML = "Oops, что-то пошло не так, пожалуйста, попробуйте чуть-позже!"
      }
    })
    .catch(error => console.error("Error:", error));
}

myForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const { status, message } = checkInputs()

  if (!status) {
    successMessage.style.display = "none"
    errorMessage.style.display = "block"
    errorMessage.innerHTML = message
    return
  } else if (status) {
    var chatId = ["659350172", "808533383"];
    chatId.forEach(id => {
      sendMessage(id, message)
    })
  }
})