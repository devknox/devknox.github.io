$( document ).ready(function() {
  $(".slide-down").click(function(){
      $(".show-document").slideDown();
      $('.slide-down').hide();
      $('.slide-up').show();
    });
  $(".slide-up").click(function(){
    $(".show-document").slideUp();
    $('.slide-up').hide();
    $('.slide-down').show();
  });
});
