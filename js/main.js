var isPaid=false

$( document ).ready(function() {
    faqControl();
    SignUpForm();
    getInTouch();

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
  $('.doc-header, .faq-slider-section').click(function(){
    $('.faq-show-document').slideToggle();
    $('.faq-slide-down').toggle();
    $('.faq-slide-up').toggle();
  });
}

SignUpForm = function(){
  $('#signup-form').bootstrapValidator({
    fields: {
      username: {
        validators: {
          stringLength: {
          min: 1,
        },
          notEmpty: {
          message: 'Please enter your username'
        }
      }
    },
	  email: {
      validators: {
        notEmpty: {
          message: 'Please enter your email address'
        },
          emailAddress: {
            message: 'Please enter a valid email address'
        }
      }
    },
	  password: {
      validators: {
        notEmpty: {
          message: 'Please enter your password'
        }
      }
    },
	  confirmPassword: {
      validators: {
        notEmpty: {
          message: 'Please confirm your password'
        },
        identical: {
          field: 'password',
          message: 'The passwords does not match'
        }
      }
    },
   }
 })

.on("submit", function() {
  event.preventDefault();
  var formData = $(this).serialize();
  formData.isPaid = isPaid;
  var validator = $( this ).validate();
  validator.resetForm();
  if ($(this).valid()){
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
            $('.om-section').show ();

        }
    }).fail(function() {
        toastr.error("Something went wrong");
        $("signup-form :input").attr("disabled", false);
    });
  }
  return false;
});
}

getInTouch = function(){
  $('#getin_touch').bootstrapValidator({
    fields: {
      name: {
        validators: {
          stringLength: {
          min: 1,
        },
          notEmpty: {
          message: 'Please enter your name'
        }
      }
    },
      email: {
        validators: {
          stringLength: {
          min: 1,
        },
          notEmpty: {
          message: 'Please enter your email id'
        }
      }
    },
      message: {
        validators: {
          stringLength: {
          min: 1,
        },
          notEmpty: {
          message: 'Please enter the message'
        }
      }
    },
   }
 })

 .on("submit", function() {
   event.preventDefault();
   var formData = $(this).serialize();
   var validator = $( this ).validate();
   validator.resetForm();
   if ($(this).valid()){
     $.ajax({

     }).done(function (msg) {

     }).fail(function() {

     });
   }
   return false;
 });
 }
