$( document ).ready(function() {
    faqControl();
    docControl();


  $('.pricing-start-button').click(function(){
    $('.devknox-pricing-lite').hide();
    $('.devknox-pricing').hide();
    $('.submission-form').show();
  });
  $('.close-button').click(function(){
    $('.devknox-pricing-lite').show();
    $('.devknox-pricing').show();
    $('.submission-form').hide();
  });
  $('#login-form-link').click(function(e) {
  $("#login-form").delay(100).fadeIn(100);
  $("#register-form").fadeOut(100);
  $('#register-form-link').removeClass('active');
  $(this).addClass('active');
  e.preventDefault();
});
$('#register-form-link').click(function(e) {
  $("#register-form").delay(100).fadeIn(100);
  $("#login-form").fadeOut(100);
  $('#login-form-link').removeClass('active');
  $(this).addClass('active');
  e.preventDefault();
});

});

faqControl = function(){
  $('.faq-quest-area').on('click touchend', function(ev) {
    var faqEle = $(ev.currentTarget).parent();
    var icon = $(ev.currentTarget).parent().find("i");
    var displayCurEle = faqEle.css("display");
    $(".faq-answer").each(function(){
      if($(this).parent()[0] !== faqEle[0]){
        $(this).stop().slideUp(400);
        if($(this).parent().find("i").hasClass("fa-caret-down")){
          $(this).parent().find("i").toggleClass("fa-caret-right fa-caret-down");
        }
      }
    });

    faqEle.find(".faq-answer").slideToggle(400);

    var isClosed = icon.hasClass("fa-caret-right");
    icon.toggleClass("fa-caret-right fa-caret-down");

  });
  $('.faq-slide-down').click(function(){
      $('.faq-show-document').slideDown();
      $('.faq-slide-down').hide();
      $('.faq-slide-up').show();
    });
  $('.faq-slide-up').click(function(){
    $('.faq-show-document').slideUp();
    $('.faq-slide-up').hide();
    $('.faq-slide-down').show();
  });
}

docControl = function(){
  $('.doc-slide-down').click(function(){
      $('.doc-show-document').slideDown();
      $('.doc-slide-down').hide();
      $('.doc-slide-up').show();
    });
  $('.doc-slide-up').click(function(){
    $('.doc-show-document').slideUp();
    $('.doc-slide-up').hide();
    $('.doc-slide-down').show();
  });
}
