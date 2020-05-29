const Theme = document.querySelector(".fas");
const Button = document.querySelector(".fas");
Theme.addEventListener("click", mode);
Button.addEventListener("click", change);


function mode() {
    var body = document.body;
    body.classList.toggle("light-mode"); 
}

function change(){
    if(this.classList.contains("fa-sun")){
        this.classList.replace("fa-sun","fa-moon");
        this.classList.add("black");
        this.classList.replace("white","black");
    }
    else{
        this.classList.replace("fa-moon","fa-sun");
        this.classList.add("white");
        this.classList.replace("black","white");
    }
}