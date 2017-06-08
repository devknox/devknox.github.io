var isPaid=false

$(document).ready(function() {
    dropdownControl();
    autoFillRegisterForm();


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
      var formData = $(form).serializeArray();
      formData.push({name: "isPaid", value: isPaid});
      $.ajax({
        url: "https://hawkins.appknox.com/api/devknox_register/",
        type: 'POST',
        dataType: 'json',
        data: $.param(formData)
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
        url: "https://hawkins.appknox.com/api/send/getintouchdevknox/1029041/tn7rs9",
        type: 'POST',
        dataType: 'json',
        data: $(form).serialize()
        }).done(function (msg) {
          $('.footer-heading').hide();
          $('#getin_touch').hide();
          $('.thanks-message').show();
        }).fail(function() {
          toastr.error("Something went wrong");
        });
     return false;
      }
    });

  $('#talk_to_us').validate({
    submitHandler: function (form) {
      $.ajax({
        url: "https://hawkins.appknox.com/api/send/talktousdevknox/1029041/tnjyfm",
        type: 'POST',
        dataType: 'json',
        data: $(form).serialize()
        }).done(function (msg) {
          $('.ttu-content').hide();
          $('.ttu-thanks-message').show();
        }).fail(function() {
          toastr.error("Something went wrong");
        });
     return false;
      }
    });
  });

autoFillRegisterForm = function(){
  var companyEncoded = window.location.search.substring(1).split("&")[0];
  var domainEncoded = window.location.search.substring(1).split("&")[1];
  var companyDecoded = atob(companyEncoded).split("=")[1];
  var domainDecoded = atob(domainEncoded).split("=")[1];
  var company = document.getElementById('auto_company').value = companyDecoded;
  var domain = document.getElementById('auto_domain').value = domainDecoded;
  $('#register-form').validate({
    submitHandler: function (form) {
      data = {
        "username" : document.getElementById('username').value,
        "company" : company,
        "email" : document.getElementById('email_initial').value + "@" + domain,
        "password": document.getElementById('password').value
      }
      $.ajax({
        url: "https://hawkins.appknox.com/api/devknox_register/",
        type: 'POST',
        dataType: 'json',
        data: data
        }).done(function (msg) {
          $('.register-form').hide();
          $('.thanks-section').show();
          $("#register-form")[0].reset();
        }).fail(function() {
          toastr.error("Something went wrong");
        });
     return false;
      }
    });
}

dropdownControl = function(){
  $('.dropdown-quest-area').on('click', function(ev) {
    var dropdownEle = $(ev.currentTarget).parent();
    var icon = $(ev.currentTarget).parent().find("i");
    var displayCurEle = dropdownEle.css("display");
    $(".dropdown-answer").each(function(){
      if($(this).parent()[0] !== dropdownEle[0]){
        $(this).stop().slideUp(400);
        if($(this).parent().find("i").hasClass("fa-caret-down")){
          $(this).parent().find("i").toggleClass("fa-caret-right fa-caret-down");
        }
      }
    });
    dropdownEle.find(".dropdown-answer").slideToggle(400);
    var isClosed = icon.hasClass("fa-caret-right");
    icon.toggleClass("fa-caret-right fa-caret-down");
  });
}
