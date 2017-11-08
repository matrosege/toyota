$(document).ready(function () {
  
  /* Table Button */
  
  $('.bstd-table .btn').on('click', function() {
        $('.bstd-table tr.same').toggleClass('is-open');
        var sameRows = $('.bstd-table tr.is-open');
        $(this).text(sameRows.is(':visible') ? 'Показать только отличия' : 'Показать все');
    });
  
  /* Table Accordeon */
  
  $('input[data-toggle="toggle"]').change(function(){
        $(this).parents().next('.thide').toggle();
        $(this).siblings('.icon').toggleClass('icon-chevron-up');
    });
  
  /* Owl Carousel */
  
  $('.owl-carousel').owlCarousel({
    //loop:true,
    rewind: true,
    margin:-40,
    nav:true,
    //navText: ["<span class='icon icon-angle-left'></span>","<span class='icon icon-angle-right'></span>"],
    navText: [""],
    autoWidth:false,
    autoplay: true,
    smartSpeed: 500,
    autoplayTimeout: 9000,
    //center: true,
    //startPosition: 1,
    slideBy: 'page',

    responsive:{
        0:{
            items:1
        },
        768:{
            items:2
        },
        1200:{
            items:3
        }
    }
  })
  
  /* Owl Carousel fix for non-disabled nav */
  /* https://github.com/OwlCarousel2/OwlCarousel2/issues/132 */
  
  $(".owl-carousel").on('initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel', function (event) {
    if (!event.namespace) return;
    var carousel = event.relatedTarget,
        element = event.target,
        current = carousel.current();
    $('.owl-next', element).toggleClass('disabled', current === carousel.maximum());
    $('.owl-prev', element).toggleClass('disabled', current === carousel.minimum());
  })
  
  $(document).ready(function(){
    $(".owl-prev").addClass("disabled");
  });
  
  
  /* FAQ Accordeon */
  
  $('.accordion').accordion({
    collapsible: true,
    autoHeight: false,
    heightStyle: "content",
    icons: {
        header: "",
        headerSelected: ""
    }
  });


});