///////////
////////////

let settingsManager = {
  // settings box
  initializeSettingsToggle: function () {
    let settingsBox = document.querySelector(".settings-box .toggle-settings");
    settingsBox.addEventListener("click", () => {
      document.querySelector(".settings-box").classList.toggle("open");
      document
        .querySelector(".settings-box .fa-gear")
        .classList.toggle("fa-spin");
    });
  },
  setMainColor: function () {
    let localColor = localStorage.getItem("mainColor");
    if (localColor) {
      document.documentElement.style.setProperty("--main-color", localColor);
      document.querySelectorAll(".colors-list li").forEach((el) => {
        el.classList.remove("active");
      });

      const activeElement = document.querySelector(
        `[data-color="${localColor}"]`
      );
      if (activeElement) {
        activeElement.classList.add("active");
      }
    }
    // switch colors
    let colorsLi = document.querySelector(".colors-list");
    for (let i = 0; i < colorsLi.children.length; i++) {
      const li = colorsLi.children[i];
      li.addEventListener("click", (e) => {
        // remove active from all
        this.handleActiveClass(e);

        document.documentElement.style.setProperty(
          "--main-color",
          `${li.dataset.color}`
        );

        localStorage.setItem("mainColor", li.dataset.color);
      });
    }
    //swtich random background options
    let randomBackEl = document.querySelectorAll(".random-backgrounds span");
    randomBackEl.forEach((span) => {
      span.addEventListener("click", (e) => {
        this.handleActiveClass(e);

        let randomize = e.target.classList.contains("yes");
        changeBackground(randomize);
      });
    });
  },

  // bullets option function
  handleBulletsOption: function () {
    let allBulletSpan = document.querySelectorAll(".bullets-option span");
    let bulletsContainer = document.querySelector(".nav-bullets");
    let bulletsLocalStorage = localStorage.getItem("bulletsOption");
    if (bulletsLocalStorage !== null) {
      allBulletSpan.forEach((span) => {
        span.classList.remove("active");
      });
      if (bulletsLocalStorage === "show") {
        bulletsContainer.style.display = "block";

        document.querySelector(".bullets-option .yes").classList.add("active");
      } else {
        bulletsContainer.style.display = "none";

        document.querySelector(".bullets-option .no").classList.add("active");
      }
    }

    allBulletSpan.forEach((span) => {
      span.addEventListener("click", (e) => {
        this.handleActiveClass(e);
        if (e.target.dataset.display === "show") {
          bulletsContainer.style.display = "block";
        } else bulletsContainer.style.display = "none";

        localStorage.setItem("bulletsOption", e.target.dataset.display);
      });
    });
  },
  // handle reset options button
  resetOptions: function () {
    let resetButton = document.querySelector(".reset-options");

    resetButton.addEventListener("click", (e) => {
      // reset color
      localStorage.removeItem("mainColor");
      // reset background option
      localStorage.removeItem("randomizeBack");
      // reset bullets option
      localStorage.removeItem("bulletsOption");
      window.location.reload();
    });
  },
  // remove active classe function
  handleActiveClass: function (e) {
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");
  },
};

//change background
let BackgroundInterval = 0;

function changeBackground(randomize) {
  if (randomize) {
    if (BackgroundInterval) return; // Prevent multiple intervals
    BackgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * 5) + 1;
      document.querySelector(
        ".landing-page"
      ).style.cssText = `background-image:url(imgs/0${randomNumber}.jpg)`;
    }, 10000);
    localStorage.setItem("randomizeBack", true);
  } else {
    clearInterval(BackgroundInterval);
    BackgroundInterval = 0;
    // localStorage.removeItem("randomizeBack");
    localStorage.setItem("randomizeBack", false);
  }
}

if (localStorage.getItem("randomizeBack") === "true") {
  changeBackground(true);
  document.querySelectorAll(".random-backgrounds span").forEach((el) => {
    el.classList.remove("active");
  });
  document.querySelector(`[data-background=yes`).classList.add("active");
} else {
  changeBackground(false);
  document.querySelectorAll(".random-backgrounds span").forEach((el) => {
    el.classList.remove("active");
  });
  document.querySelector(`[data-background=no`).classList.add("active");
}

function elementsOnScroll() {
  // select skills selector

  let ourSkills = document.querySelector(".skills");

  window.onscroll = function () {
    //skill offset top
    let skillsOffsetTop = ourSkills.offsetTop;
    //skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;
    // window height
    let windowHeight = this.innerHeight;
    //window ScrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
      let allSkills = document.querySelectorAll(
        ".skill-box .skill-progress span"
      );
      allSkills.forEach((skill) => {
        skill.style.width = skill.dataset.progress;
      });
    }
  };
}

function popUpOnImages() {
  // create popup with the image
  let ourGallery = document.querySelectorAll(".gallery img");

  ourGallery.forEach((img) => {
    img.addEventListener("click", (e) => {
      //create overlay element
      let overlay = document.createElement("div");
      overlay.className = "popup-overlay";
      overlay.addEventListener("click", (e) => {
        document.querySelector(".popup-box").remove();
        e.target.remove();
      });
      document.body.appendChild(overlay);

      // create popup box
      let popupBox = document.createElement("div");
      popupBox.className = "popup-box";
      //heading
      if (img.alt !== "") {
        let imgHeading = document.createElement("h3");
        let text = document.createTextNode(img.alt);
        imgHeading.appendChild(text);

        popupBox.appendChild(imgHeading);
      }
      // create image
      let popupImg = document.createElement("img");
      popupImg.src = img.src;
      // popupImg.style.maxWidth = "100%";
      popupBox.appendChild(popupImg);
      document.body.appendChild(popupBox);
      // create close button
      let closeButton = document.createElement("span");
      closeButton.innerHTML = "X";
      closeButton.className = "close-button";
      closeButton.addEventListener("click", (e) => {
        popupBox.remove();
        overlay.remove();
      });

      popupBox.appendChild(closeButton);
    });
  });
}

// assign scroll to links and bullets
function scrollOnClick(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      let temp = document.querySelector(`${e.target.dataset.section}`);
      if (temp)
        temp.scrollIntoView({
          behavior: "smooth",
        });
    });
  });
}

// manage showing and hiding links container
function toggleLinks() {
  let toggleBtn = document.querySelector(".header-area .toggle-menu");
  let tLinks = document.querySelector(".header-area .links");

  toggleBtn.addEventListener("click", (e) => {
    tLinks.classList.toggle("open");
    e.stopPropagation(); // Prevent document click when toggle is clicked
  });

  document.addEventListener("click", (e) => {
    // stop the event if the clicked element is the buttong or links or li
    if (
      e.target !== toggleBtn &&
      e.target !== tLinks &&
      e.target.parentElement !== tLinks
    ) {
      tLinks.classList.remove("open");
    }
  });
}
settingsManager.initializeSettingsToggle();
settingsManager.setMainColor();
settingsManager.handleBulletsOption();
settingsManager.resetOptions();
elementsOnScroll();
popUpOnImages();
scrollOnClick(document.querySelectorAll(".links li"));
scrollOnClick(document.querySelectorAll(".nav-bullets .bullet"));
toggleLinks();
