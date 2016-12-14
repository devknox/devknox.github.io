var isPaid=false

$(document).ready(function() {
    faqControl();


  $('.pricing-free-button').click(function(){
    isPaid = false
    $('.devknox-pricing-lite').hide();
    $('.devknox-pricing').hide();
    $('.submission-form').show();
    $('.pricing-type-lite').show();
    $('.pricing-type-devknox').hide();
  });

  $('.pricing-paid-button').click(function(){
    isPaid = true
    $('.devknox-pricing-lite').hide();
    $('.devknox-pricing').hide();
    $('.submission-form').show();
    $('.pricing-type-devknox').show();
    $('.pricing-type-lite').hide();

  });

  $('.close-button').click(function(){
    $('.devknox-pricing-lite').show();
    $('.devknox-pricing').show();
    $('.submission-form').hide();
    $('.om-section').hide();
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

  $('#signup-form').validate({
    submitHandler: function (form) {
      var formData = $(form).serialize();
      formData.isPaid = isPaid;
      $.ajax({
        url: "https://hawkins.appknox.com/api/devknox_register/",
        type: 'POST',
        dataType: 'json',
        data: formData
        }).done(function (msg) {
            if(msg.status === "error") {
                $("#signup-form :input").attr("disabled", false);
                toastr.error(msg.message);
                if(msg.message.startsWith("Password")) {
                    validator.showErrors({
                        "password": msg.message,
                        "confirmPassword": msg.message
                    });
                }
                if(msg.message.startsWith("Username")) {
                    validator.showErrors({"username": msg.message});
                }
            } else {
                $(this).trigger("reset");
                $('.submission-form').hide();
                $('.om-section').show();
            }
        }).fail(function() {
            toastr.error("Something went wrong");
            $("signup-form :input").attr("disabled", false);
        });
     return false;
    }
  });

  $('#getin_touch').validate({
    submitHandler: function (form) {
      $.ajax({
        url: "",
        type: 'POST',
        dataType: 'json',
        data: $(form).serialize()
        }).done(function (msg) {
          $('.footer-heading').hide();
          $('#getin_touch').hide();
          $('.thanks-message').show();
        }).fail(function() {

        });
     return false;
      }
    });
  });

  $('#talk_to_us').validate({
    submitHandler: function (form) {
      $.ajax({
        url: "",
        type: 'POST',
        dataType: 'json',
        data: $(form).serialize()
        }).done(function (msg) {
          $('.footer-heading').hide();
          $('#getin_touch').hide();
          $('.thanks-message').show();
        }).fail(function() {

        });
     return false;
      }
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
}
