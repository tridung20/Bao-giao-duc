// ----------------------------------
// INFO : Unchangeable
// ----------------------------------

// INFOR : for header
var stickyOffset = $('.sticky').offset().top;
$(window).scroll(function () {
    var sticky = $('.sticky'),
        scroll = $(window).scrollTop();
    if (scroll >= stickyOffset) sticky.addClass('fixed');
    else sticky.removeClass('fixed');
});

// INFO : for check gif img
var img = $(".story .story__thumb img");
$.each(img, function () {
    var dataSrc = this.dataset.src;
    if (dataSrc) {
        if (dataSrc.slice(-4) === ".gif") {
            $(this).closest("figure").css(
                "background", "#eee"
            )
        }
    }
});

// INFO : for audio
$(".audio .right .select-voice").click(function (e) {
    e.preventDefault();
    $(".audio .right .voice-board").toggle();
});

$(".audio .play-button").click(function (e) {
    e.preventDefault();
    $(".audio .ic-audio-pause").toggleClass("ic-audio-play");
});

$(".audio .mute-button").click(function (e) {
    e.preventDefault();
    $(".audio .ic-audio-volume").toggleClass("ic-audio-volume-slash");
});

$(".modal-body .ic-eye").click(function (e) {
    e.preventDefault();
    $(this).toggleClass("slash");
});

// INFO : for modal
$("body").append("<div class='modal-backdrop'></div>");
$('.btn-modal').on('click', function () {
    $("body").addClass("modal-open");
    $('.modal-backdrop').fadeIn();
    var id = $(this).data('target');
    $('.modal[data-target="' + id + '"]').fadeIn();
    $(".navigation.sticky.fixed").addClass("show-modal");
});

$('.btn-close').on('click', function () {
    setTimeout(() => {
        $("body").removeClass("modal-open");
        $(".navigation.sticky.fixed").removeClass("show-modal");
    }, 400);
    $('.modal-backdrop').fadeOut();
    $('.modal').fadeOut();
});

$('.modal-backdrop').on('click', function () {
    setTimeout(() => {
        $("body").removeClass("modal-open");
        $(".navigation.sticky.fixed").removeClass("show-modal");
    }, 400);
    $('.modal-backdrop').fadeOut();
    $('.modal').fadeOut();
});

// back to top
var btn = $('.back-to-top');
$(window).scroll(function () {
    if ($(window).scrollTop() > 800) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
});


// ----------------------------------
// INFO : Js for project, be changed
// ----------------------------------
// style header
$("body").append("<div class='backdrop'></div>");
$(".extend .ic-menu").click(function (e) {
    e.preventDefault();
    $(".big-menu").fadeToggle("show");
    $("body").toggleClass("modal-open");
    $('.backdrop').fadeToggle();
    $(".navigation.sticky.fixed").toggleClass("w");
});

$(".backdrop").on('click', function () {
    setTimeout(() => {
        $(".big-menu").fadeToggle("show");
        $("body").toggleClass("modal-open");
        $('.backdrop').fadeToggle();
        $(".navigation.sticky.fixed").toggleClass("w");
    }, 150);
});

// review lao cai
let arr = [];
var img = $(".review .story__thumb img");
$.each(img, function () {
    var dataSrc = this.src;
    arr.push(dataSrc);
});
for (var i = 0; i < arr.length; i++) {
    var img = "<img src=\"" + arr[i] + "\">";
    $('.review-img').append(img);
}

// // box thời tiết header
$(".content-header .weather .ic-down").click(function (e) {
    e.preventDefault();
    $(".content-header .wrapper").slideToggle("slow");
});

// var content = $(".content-header .wrapper >.item:first-child");
// $('.content-header .weather >.item').append($(content)[0].outerHTML);

// $(".content-header .weather >.item .ic-down").click(function (e) {
//     e.preventDefault();
//     $(".content-header .wrapper").slideToggle("show");
// });

// $(".content-header .wrapper .item").click(function (e) {
//     e.preventDefault();
//     $(".content-header .wrapper .item").removeClass('active')
//     $(this).addClass('active')
//     $('.content-header .weather >.item').empty();
//     $('.content-header .weather >.item').html($(this).clone(true, true));
//     $(".content-header .wrapper").fadeToggle("show");
// });


// box thời tiết
var text = $(".box-weather .wrapper >.item:first-child");
$('.box-weather .local >.item span').append(text[0].innerText);

$(".box-weather .local .ic-down").click(function (e) {
    e.preventDefault();
    $(".box-weather .local .wrapper").fadeToggle("show");
});

$(".box-weather .local .wrapper .item").click(function (e) {
    e.preventDefault();
    $(".box-weather .local .wrapper .item").removeClass('active')
    $(e.target).addClass('active')
    $('.box-weather .local >.item span').empty();
    $('.box-weather .local >.item span').append(e.target.innerText);
    $(".box-weather .local .wrapper").fadeToggle("show");
});

// slick slider
$('.multimedia .box-content').slick({
    infinite: true,
    variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    adaptiveHeight: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 10000,
});

$('.slide .box-content').slick({
    infinite: true,
    variableWidth: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    adaptiveHeight: true,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 3000,
});

