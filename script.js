
var dropContainer = document.getElementById("dropContainer");
dropContainer.ondragover = dropContainer.ondragenter = function (evt) {
  dropContainer.classList.add("droping");
  evt.preventDefault();
};
dropContainer.ondrop = function (evt) {
  var fileInput = document.getElementById("imageInput");
  dropContainer.classList.remove("droping");
  fileInput.files = evt.dataTransfer.files;
  preview_image(evt);
  evt.preventDefault();
};
function preview_image(event) {
  var reader = new FileReader();
  reader.onload = function () {
    var img = document.createElement("img");
    img.src = reader.result;   
    
    setTimeout(()=>{

      detectColors(img);
    },500)
 
  };
  reader.readAsDataURL(event.target.files[0]);
}

async function detectColors(img) {
  var canvas =document.createElement('canvas');
  canvas.id='myCanvas';
  console.log(img);
  console.log(img.Height);
  canvas.width=img.width || '500';
  canvas.height=img.height ||'500' ;
  const ctx = canvas.getContext("2d");
  console.log(canvas);
  ctx.drawImage(img, 0, 0);
  let pixels = ctx.getImageData(0, 0, img.width || 500, img.height || 500);
  let imageData = pixels.data;
  img.remove();
  // return;
  let colorCounts = {};

  // add for loop to loop all pixels
  for (let i = 0; i < imageData.length; i += 4) {
    let r = imageData[i];
    let g = imageData[i + 1];
    let b = imageData[i + 2];
    let rgbColor = `rgb(${r},${g},${b})`;
    // check if matches increment
    // otherwise add 1
    if (colorCounts[rgbColor]) {
      colorCounts[rgbColor]++;

    } else {
      colorCounts[rgbColor] = 1;
      // console.log(colorCounts);
    }
  }
  
  // console.log(colorCounts);
  let colors = Object.entries(colorCounts)
    .sort(([, a], [, b]) => a - b)
    .reverse();
  const colorPalette = document.getElementById("colorPalette");
  colorPalette.innerHTML="";
  let the5th_rgb=colors.slice(0,5);


  for( let i of the5th_rgb){  
  console.log(i)
  let color=document.createElement('span');
  color.classList.add('colors');
  color.style.backgroundColor=i[0];
  let text=document.createTextNode(i[0]);
  let br=document.createElement('br');
  let text2=document.createTextNode('Pixels :'+i[1]);
  color.appendChild(text);
  color.appendChild(br);
  color.appendChild(text2);
  colorPalette.appendChild(color);

}
let canvas_body =document.body.querySelectorAll('canvas');
if(canvas_body.length > 0){
  canvas_body[0].remove();
}
document.body.appendChild(canvas);
}
