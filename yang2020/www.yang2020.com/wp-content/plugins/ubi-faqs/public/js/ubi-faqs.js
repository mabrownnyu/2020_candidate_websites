//
// JS for ubi-faqs plugin -
// Based on styling from this example:
// https://codepen.io/SebaGarciaM/pen/waRYrv?q=faq+accordion&limit=all&type=type-pens
//

jQuery( document ).ready( function( $ ) {
  $('.faq-content').hide();
  $('#close-all').hide();

  $('.ubi-faqs').on('click', 'h3', function () {
    var $this = $(this);
    var $nextElement = $this.next();
    var isContent = $nextElement.is('.faq-content');
    var isOpen = $nextElement.is(':visible');

    $('.ubi-faqs h3').removeClass('active');
    $this.closest('h3').addClass('active');

    if (isContent && isOpen) {
      $this.closest('h3').removeClass('active');
      $nextElement.slideUp('normal');
    }

    if (isContent && ! isOpen) {
      $('.ubi-faqs h3 + .faq-content').slideUp('normal');
      $nextElement.slideDown('normal');
    }

    return true;
  });
});
