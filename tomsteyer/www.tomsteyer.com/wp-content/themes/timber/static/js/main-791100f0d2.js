// Small global functions can go here.
// Custom scripts can go in their own file.
// Globally used scripts are loaded via layout.twig
// Page specific scripts are loaded via {% block footer_scripts %}

var fitVidInit = function(){
    $('.container').fitVids();
};

var smoothScrollInit = function(){
    $('a:not(.no-smooth-scroll)').smoothScroll();
};

var matchHeightInit = function(){
    $('.js-match-height').matchHeight();
};

var headerNav = function(){
    // better dropdown hover intent ( inspired by https://stackoverflow.com/a/42183824/462002 )
    $('.component-main-header').on('mouseenter mouseleave','.dropdown',function(e){
      var $dropdown =$( e.target ).closest('.dropdown');
      $dropdown.addClass('show');
      setTimeout(function(){
        $dropdown[ $dropdown.is(':hover') ? 'addClass' : 'removeClass' ]('show');
      } , 300);
    });

    // prevent autocomplete hovers from closing the dropdown (uses small css .keep-open class)
    $('.dropdown.header-signup-dropdown').on('mouseenter', function () {
      $('.dropdown.header-signup-dropdown').toggleClass('keep-open');
    });
    $('.dropdown.header-signup-dropdown').on('hide.bs.dropdown,click', function(e){
        $('.dropdown.header-signup-dropdown').removeClass('keep-open');
    });

    $('.btn-cta').on('click', function() {
        $('.btn-cta').toggleClass('is-active');
        $('.join-cta').toggleClass('is-active');
    });
};

//popout videos
// patterns: prevent related videos. inspired from https://stackoverflow.com/a/44046831/462002
// String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
// String that splits URL in a two parts, second part should be the id placeholder ( see src)
// URL that will be set as a source for iframe.
var videoLightbox = function() {
    $('.video-lightbox-link, .video-lightbox-link-inline').magnificPopup({
        type: 'iframe',
        'iframe' : {
            patterns: {
              youtube: {
                index: 'youtube.com/',
                id: 'v=',
                src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0'
              }
            }
        }
    });
};

// youtube api v3 inline video player
var inlineVideoPlayer = function(){
    if ( $('.inline-video-player').length > 0) {

        // Load the IFrame Player API code asynchronously.
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/player_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubePlayerAPIReady = function() {
            // Replace the 'ytplayer' element with an <iframe> and
            // YouTube player after the API code downloads.
            $('.inline-video-player').each(function() {
                var video = jQuery(this).data('video');
                var $parent = jQuery(this).parents('.inline-video-media-container');
                var imgHeight, imgWidth, videoHeight;

                $( ".js-video-toggle" ).hover(function() {
                    $parent.addClass('hovered');
                }, function() {
                    $parent.removeClass( "hover" );
                });

                var player = new YT.Player(jQuery(this).attr('id'), {
                    width: '100%',
                    height: '100%',
                    videoId: video,
                    playerVars: {
                        fs: 0,
                        rel: 0,
                        controls: 0,
                        showinfo: 0,
                        color: '#1d2a5b',
                        modestbranding: 1,
                        iv_load_policy: 3
                    },
                    events: {
                        onStateChange: function( status ) {
                            if ( status.data === YT.PlayerState.ENDED ) {
                                $parent.removeClass('playing');
                            }
                        }
                    }
                });

                function getWidths() {
                    imgHeight = $parent.find('.image img').height();
                    imgWidth = $parent.find('.image img').width();
                    videoHeight = imgWidth / (16/9);
                    console.log('imgHeight', imgHeight);
                };

                var resizeTimer;
                $(window).resize(function() {
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(getWidths, 100);
                });

                $parent.find('.js-video-toggle').click(function() {
                    $parent.addClass('playing');
                    getWidths();
                    $parent.height(videoHeight + 'px');
                    player.playVideo();
                    console.log('clicked toggle');
                });

                $parent.find('.js-video-close').click(function() {
                    $parent.removeClass('playing');
                    $parent.height('auto');
                    player.pauseVideo();
                });
            })
        };
    }


}; // inlineVideoPlayer

// video player inside a modal that pops out and plays. uses already available bootstrap 4 modal
var videoModalPlay = function(){

  if ( $('.js-video-modal').length > 0 ){
    // trigger video playing
    var $videoSrc;
    $('.js-video-modal').on('click', function(){
      console.log($(this)[0]);
        $videoSrc = $(this).data( "src" );
    });

    // Bootstrap modal video player events
    // when the modal is opened autoplay it
    $('.component-modal-video-player').on('shown.bs.modal', function (e){
        var $modal = $(this);

        $("#video-modal-video").attr('src',$videoSrc + "?autoplay=1&amp;rel=0&amp;modestbranding=1&amp;showinfo=0&amp;fs=1");
        if ($modal.hasClass('video-board-modal')){
          $('.modal-backdrop.video-board').removeClass('d-none');
        }
    });

    // stop playing the youtube video when I close the modal
    $('.component-modal-video-player').on('hide.bs.modal', function (e){
          var $modal = $(this);

          $("#video-modal-video").attr('src',$videoSrc);

          if ($modal.hasClass('video-board-modal')){
            $('.modal-backdrop.video-board').addClass('d-none');
          }
    });

    $('.modal-backdrop.video-board').on('click', function(e){
      e.preventDefault();
      $('#video-board-modal').modal('hide');
    });

  }

};

// make default gravity forms a bit more bootstrap friendly
var gravityHelper = function(){
    if ( $('.gform_wrapper').length > 0 ){

        $('.gform_wrapper').each(function(){
            var $form = $(this), $submit;

            $form.find('input[type!="radio"][type!="checkbox"], textarea, select').addClass('form-control');
            $form.find('input[type=submit], input[type=button]').addClass('btn text-center');
            $form.find('.gfield').addClass('form-group');

            // form specific
            if ($form.parent().hasClass('main-signup') ){
                $form.find('input[type=submit], input[type=button]').addClass('btn-bw text-uppercase');
            }

            if ($form.parent().hasClass('main-header-signup') ){
                $form.find('input[type=submit], input[type=button]').addClass('btn-blue-w text-uppercase');
            }

            // if ( $form.parent().hasClass('feedback-signup') ){
            //     console.log('feedback-signup start ');
            //     // top two fields are on the same row
            //     $form.find('.gfield:first-child').next(".gfield").addBack().wrapAll("<ul class='gfield-pair' />");
            //     $form.find('input[type=submit], input[type=button]').addClass('btn-blue-w text-uppercase');
            //     //
            //     $('.feedback-signup').on('show.bs.collapse', function() {
            //         $('section.expanded-form').addClass('active');
            //     });
            //     console.log('feedback-signup end ');
            // }

            if ($form.parent().hasClass('submit-small') ){
                $submit = $form.find('.btn');
            }
        });

        // inline submit
        $(document).on('gform_confirmation_loaded', function (event, form_id) {

            // console.log('submit success', event , form_id );
            // var $form = $('#gform_' + form_id);
            var $formSuccessHolder =
            $('.form-success-holder[data-form-id=' + form_id + ']');

            $formSuccessHolder.addClass('has-form-success');

        });
    }
};

// Called from HTML near form embeds
window.handleFormSubmission = function( formSelector, redirectURL ) {
    jQuery( formSelector ).on('firedup-forms-submitted', function( event ) {
        var formID = jQuery(this).data('form-id');

        dataLayer.push({
            event: 'FormSignup'
        });

        ga('send', 'event', 'Forms', formID);

        if ( redirectURL ) {
            let finalRedirectURL;

            // Process pipe characters in redirect as select random URL
            if ( redirectURL.indexOf('|') !== -1 ) {
                var urls = redirectURL.split('|');
                var random = urls[ Math.floor( Math.random() * urls.length ) ];
                finalRedirectURL = random;
            } else {
                finalRedirectURL = redirectURL;
            }

            // Add refcode2 to actblue URLs containing concatinated UTM params
            if ( finalRedirectURL.indexOf('actblue.com') !== -1 && localStorage.getItem('utm') ) {
                let utmString = '';
                let redirect = redirectURL;
                let parsedUTMs = JSON.parse( localStorage.getItem('utm') );

                if ( typeof parsedUTMs === 'object' ) {
                    utmString += 'campaign__' + (parsedUTMs.name || ''); // We're using @segment/utm-params so campaign = name
                    utmString += '|source__' + (parsedUTMs.source || '');
                    utmString += '|medium__' + (parsedUTMs.medium || '');
                    utmString += '|term__' + (parsedUTMs.term || '');
                    utmString += '|content__' + (parsedUTMs.content || '');
                }

                if (utmString) {
                    redirect += ( redirect.indexOf('?') !== -1 ? '&' : '?' ) + 'refcode2=' + utmString;
                }

                window.location.href = redirect;
            } else {
                window.location.href = finalRedirectURL;
            }
        } else {
            // Show share module
            var $parent = jQuery(this).parents('.form-wrapper');
            $parent.find('.form-content').addClass('d-none');
            $parent.find('.form-share').removeClass('d-none');
        }
    });
}

var accessibilitySkip = function(){
    jQuery("#skip-link").click(function(){
        jQuery("#skip-to-content").focus();
    });
}

// init within document.ready
jQuery(function() {
    headerNav();
    fitVidInit();
    gravityHelper();
    inlineVideoPlayer();
    matchHeightInit();
    smoothScrollInit();
    accessibilitySkip();
    analyticsSourcing();
    // videoLightbox();
    videoModalPlay();
});
