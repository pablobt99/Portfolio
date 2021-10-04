
const cardsConstant = document.querySelectorAll('.card');

var a = [];
let cardOne;
let cardTwo;
let lock = false;
let Flipped = false;
let matches = 0;
let localStorageData;
let temporallet;

function getsesionstorage(){
  
  let li = '';
  a=JSON.parse(sessionStorage.getItem("victories"));
  for (let index = 0; index < a.length; index++) {
    const element = a[index];
    console.log(index);
    li += '<li class="lidata">'+element+'</li>';
    console.log(element);  
    console.log(li);  
  }
  document.getElementById("result").innerHTML = li;
  

}






function matchValidation() {
    let isMatch = cardOne.dataset.framework === cardTwo.dataset.framework;
    isMatch ? disable() : undo();
    if(isMatch==true){
      matches = matches+1;
    }else{
      console.log("fail");
    }
    if(matches>=2){
      win();
    }else{
      console.log("not yet");
    }
}
function win(){
  console.log(matches);
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' You won at '+time;
  console.log(dateTime);
  
  if (sessionStorage.getItem("victories") === null) {
    a.push(dateTime);
    sessionStorage.setItem('victories', JSON.stringify(a));

  }else{
    let temporallet = JSON.parse(sessionStorage.getItem("victories"));
    a = [...temporallet];
    console.log(a);
    a.push(dateTime);
    console.log(a);
    sessionStorage.setItem('victories', JSON.stringify(a));

  }
  alert("You won, check the victory page!!")
}
  

function disable() {
    cardOne.removeEventListener('click', flip);
    cardTwo.removeEventListener('click', flip);
      reset();
}
  function undo() {
    lock = true;
    setTimeout(() => {
      cardOne.classList.remove('flip');
      cardTwo.classList.remove('flip');
      reset();
    }, 1500);
}
function flip() {
  if (lock) return;
  if (this === cardOne) return;
  this.classList.add('flip');
  if (!Flipped) {
    Flipped = true;
    cardOne = this;
    return;
  }
  cardTwo = this;
  matchValidation();
}
function reset() {
  [Flipped, lock] = [false, false];
  [cardOne, cardTwo] = [null, null];
}
(function shuffle() {
  cardsConstant.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
cardsConstant.forEach(card => card.addEventListener('click', flip));
