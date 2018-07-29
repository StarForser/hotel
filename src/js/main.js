"use strict";


(function () {

  document.addEventListener("DOMContentLoaded", initWork);

  function initWork () {

  }
  function menuMobileSnow () {
      let btn = document.querySelector(".hamburger");
      let menu = document.querySelector(".jsMobileMenu");
      menu.addEventListener("animationend", throttle(open,100))
      btn.addEventListener("click", throttle(clickBtn,100))
      function open (e) {
        if (e.animationName == "hideMobileMenu") {
            menu.classList.remove(menu.classList[0]+"--mobile");
            menu.classList.remove(menu.classList[0]+"--hide");
        }
      }

      function clickBtn (e) {
        e.preventDefault();
        btn.classList.toggle("is-active");
        if (menu.classList.contains(menu.classList[0]+"--mobile")) {
            menu.classList.add(menu.classList[0]+"--hide");
        }
        else {
            menu.classList.toggle(menu.classList[0]+"--mobile");
        }
      }
  }
  function throttle(func, ms) {

      let isThrottled = false,
          savedArgs,
          savedThis;

      function wrapper() {

          if (isThrottled) {
              savedArgs = arguments;
              savedThis = this;
              return;
          }

          func.apply(this, arguments);

          isThrottled = true;

          setTimeout(function () {
              isThrottled = false;
              if (savedArgs) {
                  wrapper.apply(savedThis, savedArgs);
                  savedArgs = savedThis = null;
              }
          }, ms);
      }

      return wrapper;
  }

})()