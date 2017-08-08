function wordCount( val ){
    let wom = val.match(/\S+/g);
    return {
      characters: val.length,
    };
}
let textarea = document.getElementById("text")
let result = document.getElementById("count")
$( document ).ready(function() {
	
	let textarea = document.getElementById("text")
  let result = document.getElementById("count")
  
  textarea.addEventListener('input', function(){
  	console.log('input')
    let count = wordCount(this.value);
    let tracker = (result.innerHTML = (140 - count.characters));
    if (tracker > 0){
      result.style.color = 'black';
    } else {
      result.style.color = 'red';
    };
  });
});
