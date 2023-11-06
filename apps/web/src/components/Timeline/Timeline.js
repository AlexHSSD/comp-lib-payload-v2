var timelinesYears = new Swiper(".timelines-years", {
    spaceBetween: 0,
    slidesPerView: 10,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true
});

var timelinesContent = new Swiper(".timelines-content", {
    slidesPerView: 6,
    slidesPerGroup: 1,
    slidesOffsetBefore: 30,
    slidesOffsetAfter: 30,
    centerInsufficientSlides: true,
    loop: false,
    speed: 100,
    centeredSlides: true,
    grabCursor: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    thumbs: {
        swiper: timelinesYears
    }
});