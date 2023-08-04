"use strict";
function dragNdrop(event) {
  var fileName = URL.createObjectURL(event.target.files[0]);
  var preview = document.getElementById("preview");
  var previewImg = document.createElement("img");
  previewImg.setAttribute("src", fileName);
  previewImg.setAttribute("class", 'preview');
  preview.innerHTML = "";
  preview.appendChild(previewImg);
}
function drag() {
  document.getElementById('uploadFile').parentNode.className = 'py-10 border border-dashed rounded-lg draging dragBox border-gray-900/25';
}
function drop() {
  document.getElementById('uploadFile').parentNode.className = 'py-10 border border-dashed rounded-lg dragBox border-gray-900/25';
}