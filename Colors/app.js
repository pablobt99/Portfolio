//Global selections
const colorDivs = document.querySelectorAll('.color');
const generateBtn = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type = "range"]');
const currentHexes = document.querySelectorAll('.color h2');
let initialColors;//este le usamos para registral el color inicial


//event listeners
sliders.forEach(slider =>{
 slider.addEventListener('input',hslControls);
});
colorDivs.forEach((slider,index)=>{
    slider.addEventListener('change',()=>{
        updateTextUI(index);
    });
});
//Functions

//color genratoe
function generateHex() {
    const hexColor = chroma.random();
    return hexColor;
  }
  
//lo de arrib es sin libreria con libraria es lo sigueinte

function randomColors(){
    initialColors = [];
    colorDivs.forEach((div,index)=>{
       
        const randomColor = generateHex();
        initialColors.push(hexText.innerText);
        const hexText = div.children[0];

        //añade color al background
        div.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;
        //check luminance
        checkTextContrast(randomColor,hexText);
        //inicializar colores en sliders
        const color = chroma(randomColor);
        const sliders = div.querySelectorAll('.sliders input');
        const hue = sliders[0];
        const brightness = sliders[1];
        const saturation = sliders[2];
        
        colorizeSliders(color,hue,brightness,saturation);
    });
    //reset inputs
    function resetInputs(){
        constsliders = document.querySelectorAll('.sliders input');
        sliders.forEach(slider => {
            if(slider.name === 'hue'){
                const hueColor = initialColors[slider.getAttribute('data-hue')];
                const hueValue = chroma(hueColor).hsl()[0];
                sliider.value = Math.floor(hueValue);
            }
            if(slider.name === 'brightness'){
                const brightColor = initialColors[slider.getAttribute('data-bright')];
                const brightValue = chroma(brightColor).hsl()[2];
                sliider.value = Math.floor(brightValue * 100)/100;
            }
            if(slider.name === 'saturation'){
                const satColor = initialColors[slider.getAttribute('data-sat')];
                const satValue = chroma(satColor).hsl()[2];
                sliider.value = Math.floor(satValue * 100)/100;
            }
        })
    }
}
function checkTextContrast(color,text){
    const luminance = chroma(color).luminance(); //esto te da el dato de como de brillante es es de la libreria
    if(luminance > 0.5){
        text.style.color = "black";
    }else{
        text.style.color = "white";
    }
}
function colorizeSliders(color,hue,brightness,saturation){
    //scale saturation
    const noSat = color.set('hsl.s',0);
    const fullSat = color.set('hsl.s',1);
    const scaleSat = chroma.scale([noSat,color,fullSat]);
    //scale Brightness
    const midBright = color.set('hsl.l',0.5);
    const scaleBright = chroma.scale(["black", midBright, "white"]);
    //input Update Colors
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(1)})`;//recorro codo el rango de de saturacion
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleBright(0)},${scaleBright(0.5 )} ,${scaleBright(1)})`;
    hue.style.backgroundImage = `linear-gradient(to right, rgb(204,75,75),rgb(204,204,75),rgb(74,204,75),rgb(75,204,204),rgb(75,75,204),rgb(204,75,204),rgb(204,75,75))`;
}
function hslControls(e){
    const index = e.target.getAttribute('data-bright') || e.target.getAttribute('data-sat') || e.target.getAttribute('data-hue');
    console.log(index);
    
    let sliders = e.target.parentElement.querySelectorAll('input[type="range"]');
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];
    const bgColor = initialColors[index]; //con esto extremos el hex
    //coloriza inputs/sliders
    colorizaSliders(color,hue,brightness,saturation);

    let color = chroma(bgColor)
    .set('hsl.s', saturation.value)
    .set('hsl.l',brightness.value)
    .set('hsl.h',hue.value);

    colorDivs[index].style.backgroundColor = color; 
}
function updateTextUI(index){
    const activeDiv = colorDivs[index];
    const color = chroma(activeDiv.style.backgroundColor);
    const textHex = activeDiv.querySelector('h2');
    const icons = activeDiv.querySelectorAll('.controls button');
    textHex.innerText = color.hex();

    //check contrast
    checkTextContrast(color,textHex);
    for (icon of icons){
        checkTextContrast(color,icon);
    } 
}

randomColors();