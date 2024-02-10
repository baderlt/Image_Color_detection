const canvas = document.getElementById("myCanvas");
var dropContainer = document.getElementById("dropContainer");
dropContainer.ondragover = dropContainer.ondragenter = function (evt) {
  dropContainer.classList.add("droping");
  evt.preventDefault();
};
dropContainer.ondrop = function (evt) {
  var fileInput = document.getElementById("imageInput");
  dropContainer.classList.remove("droping");
  console.log(evt);
  fileInput.files = evt.dataTransfer.files;
  console.log(fileInput);
  preview_image(evt);
  evt.preventDefault();
};
function preview_image(event) {
  var reader = new FileReader();
  reader.onload = function () {
    var img = document.createElement("img");
    img.src = reader.result;
    img.width = "300";
    img.height = "400";
    // document.body.appendChild(img);;

    const ctx = canvas.getContext("2d");
    console.log(img);
    ctx.drawImage(img, 10, 10);
    detectColors(ctx);
  };
  reader.readAsDataURL(event.target.files[0]);
}

async function detectColors(ctx) {
  const canvas = document.getElementById("myCanvas");
  let pixels = ctx.getImageData(1, 1, canvas.width, canvas.height);
  let imageData = pixels.data;
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
}