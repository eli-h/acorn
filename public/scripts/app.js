/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweet) {

	const days = function(ms){
		return Math.floor(ms/1000/60/60/24);
	};
  return `
	<article class="tweet">
	  <header>
	    <img class="profilepic" src=${tweet.user.avatars.small}>
	    <p class="username">${tweet.user.name}</p> 
	    <p class="handle">${tweet.user.handle}</p>
	  </header>
	  <p class="tweet-text">${escape(tweet.content.text)}</p>
	  <footer>
	    <p class="time">${days(Date.now() - tweet.created_at)} days ago</p>
	    <div class="footerpics">
	      <img class="flagpic" src="/images/flag.png">
	      <img class="retweetpic" src="/images/retweet.png">
	      <img class="heartpic" src="/images/heart.png">
	    </div>
	  </footer>
	</article>`
}

const compose = function() {
	$('.compose').on('click', function(){
		$("html, body").animate({ scrollTop: 0 }, "slow");
		$('.new-tweet').slideToggle('slow');
		$('textarea').focus();
	});
}

const renderTweets = (data) => {
	const articles = data.map(createTweetElement)
	const html = articles.reverse().join('')
  $('#tweets-container').html(html)
};

const loadTweets = () => {
	$.get('/tweets', function(data){
		renderTweets(data);
	});
};

const postTweet = function() {$('form').on('submit', function(event){
	event.preventDefault();
	if (($(".counter").text() < 0)||($(".counter").text() == 140)){
    let error = $("<span class='error'>Hey, that's not 1-140 characters!</span>");
    $('input').after(error);
  } else {
    $('span.error').hide();
		$.ajax({
			method: 'POST',
			url: '/tweets',
			data: $(this).serialize(),
			complete: loadTweets()
		});
		$("textarea").val('')
		$(".counter").text(140)
	}
})
};

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(function(){
  postTweet();
  loadTweets();
  compose();
});
  