/* JS for About Andrew plugin */


jQuery( document ).ready( function( $ ) {

  // add 'active' class to the first items of the timeline and content areas
  $('#about-andrew-nav li:first').addClass('active');
  $('#about-andrew-content article:first').addClass('active');

  // when clicking on list item
  $('li.section').on('click',function(){

    // store this data-id value
    var timelineItem = $(this).attr('data-id');
    //console.log(timelineItem);

    // add 'active' class to this clicked, remove the 'active' class from other list items
    $(this).addClass('active').siblings().removeClass('active');

    var articleID = $('#about-andrew-content article').attr('id')
    //console.log(articleID);

    // remove current 'active' class on content articles
    $('#about-andrew-content article').siblings().removeClass('active');

    // add class of 'active' to the content with the correct content
    $('#' + timelineItem).addClass('active');

  });

});
