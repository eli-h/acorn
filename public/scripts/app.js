/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// let $button = $('input');
// $button.on('click', function(){
// 	console.log('button clicked!')
// 	$.ajax({

// 	})
// })

> let tweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
]
db.tweets.insert(tweets);


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
	if ($(".counter").text() < 0){
		alert('too long')
	} else if ($(".counter").text() == 140){
    	alert('cant submit nothing')
  } else {
		$.ajax({
			method: 'POST',
			url: '/tweets',
			data: $(this).serialize(),
			complete: loadTweets()
		})
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
  

