const generateBtn = document.getElementById("generateBtn");

//convert hex to RGB 

function hexToRgb(hex){
    let r = parseInt(hex.slice(1,3),16);
    let g = parseInt(hex.slice(3,5),16);
    let b = parseInt(hex.slice(5,7),16);
    return [r,g,b];
}

//convert RGB to HsL
function rgbToHsl(r,g,b){
    r/=255; g/=255; b/=255;
    let max = Math.max(r,g,b), min = Math.min(r,g,b);
    let h, s, l = (max + min)/2;

    if(max === min){
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d/(2-max-min) : d/(max+min);
        switch(max){
            case r: h = (g-b)/d + (g<b?6:0); break;
            case g: h = (b-r)/d + 2; break;
            case b: h = (r-g)/d + 4; break;
        }
        h *= 60;
    }
    s = s * 100;
    l = l * 100;
    return [Math.round(h), Math.round(s), Math.round(l)];
}

// Generate Random hex color

function generateRandomHex(){
    const letters = '0123456789ABCDEF';
    let color = "#";

    for(let i=0; i<6; i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}

//update a box with a color

function updateBox(boxId, hexId, rgbId, hslId){
    const hex = generateRandomHex();
    const [r,g,b] = hexToRgb(hex);
    const [h,s,l] = rgbToHsl(r,g,b);

    document.getElementById(boxId).style.backgroundColor = hex;
    document.getElementById(hexId).textContent = `${hex}`;
    document.getElementById(rgbId).textContent = `rgb(${r}, ${g}, ${b})`;
    document.getElementById(hslId).textContent = `hsl(${h}, ${s}%, ${l}%)`;
}

// Button event
generateBtn.addEventListener('click', ()=>{
    updateBox('box-1','hex1','rgb1','hsl1');
    updateBox('box-2','hex2','rgb2','hsl2');
    updateBox('box-3','hex3','rgb3','hsl3');
});

// copy the color codes

function copyText(elementId) {
  const text = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(text)
    .then(() => {
      const dialog = document.getElementById("copyDialog");
      dialog.showModal();

      // close automatically after 1 second
      setTimeout(() => {
        dialog.close();
      }, 900);
    })
    .catch(err => console.error("Error:", err));
}