$(function() {
	$('#text').on('input', function(){

  let charCount = $(this).siblings('span');

  let currentCount = this.value.length;
  
  charCount.text(140 - currentCount);

  if (currentCount > 140){
    charCount.addClass('overflow');

  } else {
    charCount.removeClass('overflow')

    };
  });
});
