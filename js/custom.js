$(document).ready(function () {
  //Prevent Page Reload on all # links
  $("body").on("click", "a[href='#']", function (e) {
    e.preventDefault();
  });

  //placeholder
  $("[placeholder]").each(function () {
    $(this).attr("data-placeholder", this.placeholder);
    $(this).bind("focus", function () {
      this.placeholder = "";
    });
    $(this).bind("blur", function () {
      this.placeholder = $(this).attr("data-placeholder");
    });
  });

  // On scroll Add Class
  $(window).scroll(function (e) {
    pageScrolled();
  });

  pageScrolled();
  function pageScrolled() {
    if ($(window).scrollTop() > 40) {
      $(".wrapper").addClass("page-scrolled");
    } else {
      $(".wrapper").removeClass("page-scrolled");
    }
  }

  // Footer margin set for stick to bottom
  function footerAdj() {
    var headerH = $(".header").innerHeight();
    var footerH = $(".footer").innerHeight();
    $(".footer").css({ "margin-top": -footerH });
    $(".wrapper").css({ "padding-bottom": footerH });
    $(".main-content").css({
      "min-height": "calc(100vh - " + (footerH + headerH) + "px)",
    });
  }
  footerAdj();
  $(window).resize(function () {
    footerAdj();
  });

  // Add remove class when window resize finished
  var $resizeTimer;
  $(window).on("resize", function (e) {
    if (!$("body").hasClass("window-resizing")) {
      $("body").addClass("window-resizing");
    }
    clearTimeout($resizeTimer);
    $resizeTimer = setTimeout(function () {
      $("body").removeClass("window-resizing");
    }, 250);
  });

  // Add new js functions here -----------------------------------------------------------------

  $(".hero-banner-slider > .slick-slider").slick({
    nextArrow: $(".hero-slider-action .slick-next"),
    prevArrow: $(".hero-slider-action .slick-prev"),
  });

  $(".testimonial-section .slick-slider").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: $(".testimonial-section .slick-next"),
    prevArrow: $(".testimonial-section .slick-prev"),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".latest-work-section .slick-slider").slick({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: $(".latest-work-section .slick-next"),
    prevArrow: $(".latest-work-section .slick-prev"),
    responsive: [
      {
        breakpoint: 1560,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 475,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  // first attempt

  // function animateText(elem) {
  //   x = -50;
  //   y = 50;
  //   gsap.fromTo(
  //     elem,
  //     1.5,
  //     { y: y, skewX: x, opacity: 0, autoAlpha: 0 },
  //     {
  //       y: 0,
  //       skewX: 0,
  //       opacity: 1,
  //       autoAlpha: 1,
  //       ease: "easeOut",
  //     }
  //   );
  // }

  // gsap.registerPlugin(ScrollTrigger);

  // gsap.utils.toArray(".reveal-text").forEach(function (elem) {
  //   ScrollTrigger.create({
  //     trigger: $(".text-animation"),
  //     onEnter: function () {
  //       animateText(elem);
  //     },
  //   });
  // });

  // Second Attempt
  let splitWords = function (selector) {
    var elements = document.querySelectorAll(selector);

    elements.forEach(function (el) {
      el.dataset.splitText = el.textContent;
      el.innerHTML = el.textContent
        .split(/\s/)
        .map(function (word) {
          return word
            .split("-")
            .map(function (word) {
              return '<span class="word">' + word + "</span>";
            })
            .join('<span class="hyphen">-</span>');
        })
        .join('<span class="whitespace"> </span>');
    });
  };

  let splitLines = function (selector) {
    var elements = document.querySelectorAll(selector);

    splitWords(selector);

    elements.forEach(function (el) {
      var lines = getLines(el);

      var wrappedLines = "";
      lines.forEach(function (wordsArr) {
        wrappedLines += '<span class="line"><span class="words">';
        wordsArr.forEach(function (word) {
          wrappedLines += word.outerHTML;
        });
        wrappedLines += "</span></span>";
      });
      el.innerHTML = wrappedLines;
    });
  };

  let getLines = function (el) {
    var lines = [];
    var line;
    var words = el.querySelectorAll("span");
    var lastTop;
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      if (word.offsetTop != lastTop) {
        // Don't start with whitespace
        if (!word.classList.contains("whitespace")) {
          lastTop = word.offsetTop;
          line = [];
          lines.push(line);
        }
      }
      line.push(word);
    }
    return lines;
  };

  splitLines(".reveal-text");
  let revealText = document.querySelectorAll(".reveal-text");

  gsap.registerPlugin(ScrollTrigger);
  revealLines = revealText.forEach((element) => {
    const lines = element.querySelectorAll(".words");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        toggleActions: "restart none none reset"
      }
    });
    tl.set(element, { autoAlpha: 1, perspective: 400 });
    tl.from(lines, 0.6, {
      yPercent: 101,
      rotationX: -180,
      ease: Power4.out,
      stagger: 0.1,
      delay: 0.05
    });
  });


  // third attempt
  // gsap.registerPlugin(SplitText);
  // var RevealText = document.querySelector(".reveal-text");
  // gsap.set(RevealText, { autoAlpha: 1 });

  // splitHide = new SplitText(RevealText, { type: "words", wordsClass: "hide" });
  // var split = new SplitText(RevealText, {
  //   type: "words,lines",
  //   wordsClass: "words",
  //   linesClass: "lines",
  // });

  // gsap.from(split.words, {
  //   opacity: 0,
  //   duration: 0.5,
  //   yPercent: 101,
  //   stagger: 0.1,
  //   rotationX: -180,
  //   ease: Power4.out,
  //   delay: 0.05,
  // });

  // Don't add anything below this --------------------------------------------------------------
  // Add Class on Window Load
  $("body").addClass("page-loaded");
});
