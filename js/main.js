window.addEventListener('DOMContentLoaded', function () {
  init();
})

function init() {
  headerFn();
  visualFn();
  aboutFn();
  productFn();
  esgFn();
  noticeFn();
  topFn();
  footerFn();
  fadeFn();
}

function headerFn() {
  // 스크롤에 따라 헤더가 보였다가/안보이게
  let lastScroll = window.scrollY || 0;
  const header = document.getElementById('header');

  document.addEventListener('scroll', function () {
    let scrollTop = window.scrollY;

    if (scrollTop > lastScroll) {
      // down
      header.classList.add('down');
    } else {
      //up
      header.classList.remove('down');
    }
    lastScroll = scrollTop;
  })

  // 검색창 열리게
  const searchBtn = document.getElementById('search-btn');
  const searchBox = document.getElementById('search-box');
  const searchClose = searchBox.querySelector('.close');

  searchBtn.addEventListener('click', function () {
    searchBox.style.display = 'block';
  })
  searchClose.addEventListener('click', function () {
    searchBox.style.display = 'none';
  })
}

function visualFn() {
  let visualSwiper = new Swiper(".visual", {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      prevEl: ".visual-button-prev",
      nextEl: ".visual-button-next",
    },
    on: {
      slideChange() {
        // 현재 슬라이드 번호
        let idx = this.realIndex + 1;

        document.querySelector('.visual .pagination .now').innerText = `0${idx}`;

        // 현재 슬라이드 data-bg값
        let activeSlide = this.slides[this.activeIndex];
        let bg = activeSlide.getAttribute('data-bg');

        document.querySelector('.visual').dataset.nowBg = bg;
      },
      autoplayTimeLeft(s, time, progress) {
        // 페이지네이션 바
        let per = (1 - progress) * 100;

        document.querySelector('.visual .pagination .bar .progress').style.width = `${per}%`;
      }
    },
  });

  // 전체 슬라이드 개수
  let length = visualSwiper.slides.length;

  document.querySelector('.visual .pagination .all').innerText = `0${length}`;
}

function aboutFn() {
  // 탭 on
  const txtLi = document.querySelectorAll('.about .txt-list li');
  const imgLi = document.querySelectorAll('.about .img-list li');

  for (let i = 0; i < txtLi.length; i++) {
    txtLi[i].addEventListener('click', function () {
      for (let j = 0; j < txtLi.length; j++) {
        txtLi[j].classList.remove('on');
        imgLi[j].classList.remove('on');
      }

      txtLi[i].classList.add('on');
      imgLi[i].classList.add('on');
    })
  }
}

function productFn() {
  // 배경 색상 변경
  const product = document.getElementById('product');
  const esg = document.getElementById('esg');
  let windowH = window.innerHeight;
  let productTop = product.offsetTop;

  document.addEventListener('scroll', function () {
    let scrollTop = window.scrollY;

    if ((windowH / 2 + scrollTop) >= productTop) { // product 섹션이 반쯤 보이면 작동
      product.classList.add('on');
      esg.classList.add('on');
    } else {
      product.classList.remove('on');
      esg.classList.remove('on');
    }
  })

  // 탭 on
  const tabTit = document.querySelectorAll('.product .tab-title li');
  const tabCon = document.querySelectorAll('.product .tab-con article');

  for (let i = 0; i < tabTit.length; i++) {
    tabTit[i].addEventListener('click', function () {
      for (let j = 0; j < tabTit.length; j++) {
        tabTit[j].classList.remove('on');
        tabCon[j].classList.remove('on');
      }

      tabTit[i].classList.add('on');
      tabCon[i].classList.add('on');
    });
  }

  // 슬라이드
  let productSwiper = new Swiper(".product .tab-con article", {
    slidesPerView: 4,
    spaceBetween: 80,
    navigation: {
      nextEl: ".product-button-next",
      prevEl: ".product-button-prev",
    },
    loop: true,
  });
}

function esgFn() {
  // bg 이미지가 보이고나서 (텍스트, 이미지 박스)가 보이게
  const esgImg = document.getElementById('bg-img');
  let windowH = window.innerHeight;
  let esgTop = document.getElementById('esg').offsetTop;

  document.addEventListener('scroll', function () {
    let scrollTop = window.scrollY;

    if ((windowH / 2 + scrollTop) >= esgTop) { // esg 섹션이 반쯤 보이면 작동
      esgImg.classList.add('on');
    } else {
      esgImg.classList.remove('on');
    }
  })
}

function noticeFn() {
  // modal
  const item = document.querySelectorAll('.notice .youtube .item');
  const modal = document.getElementById('modal');
  const modalClose = modal.querySelector('.close');

  item.forEach(function (i) {
    i.addEventListener('click', function () {
      let yt = this.dataset.yt;

      document.querySelector('body').style.overflow = 'hidden';
      modal.querySelector('iframe').src = `https://www.youtube.com/embed/${yt}`;
      setTimeout(function () {
        modal.classList.add('on');
      }, 300)
    })
  })

  modalClose.addEventListener('click', function () {
    document.querySelector('body').style.overflow = 'auto';
    modal.classList.remove('on');
  })
}

function topFn() {
  const topBtn = document.getElementById('top-btn');

  document.addEventListener('scroll', function () {
    if (window.scrollY >= 100) {
      topBtn.classList.add('on');
    } else {
      topBtn.classList.remove('on');
    }
  })
}

function footerFn() {
  const family = document.getElementById('family');
  const familyBtn = family.querySelector('button');

  familyBtn.addEventListener('click', function () {
    if (family.classList.contains('on')) {
      family.classList.remove('on');
    } else {
      family.classList.add('on');
    }
  })
}

function fadeFn() {
  const fadeItem = document.querySelectorAll('.scroll-fade');
  const windowH = window.innerHeight;

  function checkFade() {
    let nowScroll = window.scrollY;

    fadeItem.forEach(function (item) {
      let itemTop = window.pageYOffset + item.getBoundingClientRect().top; // scroll-fade의 위치값

      if ((windowH * 0.66 + nowScroll) >= itemTop) { // scroll-fade의 위치값이 화면 1/3쯤 보이면 실행
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // 스크롤 이벤트 시 실행
  document.addEventListener('scroll', checkFade);

  // 페이지 로드 시 실행
  checkFade();
}