function prepareDoc() {
  document.addEventListener('click', getClick);
}

function validityCheck() {
  var sender = event.target;
  var max = sender.getAttribute('max');
  var min = sender.getAttribute('min');
  var val = sender.value;
  var popup = document.getElementById('errorMessage');
  var inputCoords = sender.getBoundingClientRect();
  var summInput = document.getElementById('summDigit');
  var firstVal = +(document.getElementById('firstDigit').value);

  if (val < min || val > max) {
    popup.style.top = inputCoords.top + inputCoords.height +'px';
    popup.style.left = inputCoords.left + inputCoords.width +'px';
    popup.className = 'shown-popup';
    popup.classList.add('bad-popup');
    popup.innerText = 'Вы можете ввести числа только от ' + min + ' до ' + max;
    sender.value = '';
    sender.classList.add('error');
    summInput.value = '';
    summInput.classList.add('hidden');
  }
  else {
    sender.classList.remove('error');
    popup.className = 'hidden-popup';
    setSampleDigits(val, sender.id);
    if (sender.id == 'firstDigit') {
      setBbounds(val);
      drawCurve(0,val, 1);
    }
    else {
      countAndDisplaySumm();
      drawCurve(firstVal, firstVal+ +val, 2);
    }
  }
}

function setBbounds(firstDigit) {
  var secondInput = document.getElementById('secondDigit');
  var min = 11 - firstDigit;
  var max = 14 - firstDigit;
  secondInput.value = '';
  secondInput.setAttribute('max', max);
  secondInput.setAttribute('min', min);
}

function setSampleDigits(digit, digitId) {
  document.getElementById('js-'+digitId).innerText = digit || '';
}

function checkSumm() {
  var sender = document.getElementById('summDigit');
  var firstVal = +(document.getElementById('firstDigit').value);
  var secondVal = +(document.getElementById('secondDigit').value);
  var enteredSumm = +sender.value;
  var popup = document.getElementById('errorMessage');
  var inputCoords = sender.getBoundingClientRect();
  popup.style.top = inputCoords.top + inputCoords.height +'px';
  popup.style.left = inputCoords.left + inputCoords.width +'px';
  if (firstVal + secondVal !== enteredSumm) {
    popup.innerText = 'Ответ неверный';
    sender.value = '';
    sender.className = 'inputs error';
    popup.classList.add('bad-popup');
  }
  else {
    popup.innerText = 'Ответ правильный, можно открывать шампанское!';
    sender.className = 'inputs success';
    popup.classList.add('good-popup');
  }
  popup.className = 'shown-popup';
}

function countAndDisplaySumm() {
  var summInput = document.getElementById('summDigit');
  summInput.classList.remove('hidden');
  document.getElementById('checkBtn').classList.toggle('hidden');
}

function getClick() {
  var elem = document.elementFromPoint(event.clientX, event.clientY);
  var popup = document.getElementById('errorMessage');
  if (elem.id != 'errorMessage' && elem.id != 'checkBtn' && popup.classList.contains('shown-popup')) {
    popup.className = 'hidden-popup';
  }
}

// рисуем кривые
function drawCurve(xBegin, xEnd, number) {
  var coordBegin = xBegin*39;
  var coordEnd = xEnd*39;
  var cvs = document.querySelector("#arrow"+ number);
  var cx = document.querySelector("#arrow"+number).getContext("2d");

// на случай, если значение менялось в инпуте - стираем предыдущую кривую
  cx.clearRect(0, 0, cvs.width, cvs.height);
  cx.beginPath();
  cx.moveTo(coordBegin, 90);
  cx.bezierCurveTo(coordBegin+10, 30, coordEnd-10, 30, coordEnd, 90); 

  cx.moveTo(coordEnd,90);
  cx.lineTo(coordEnd+5,80);
  cx.moveTo(coordEnd,90);
  cx.lineTo(coordEnd-10,80);
  cx.stroke();
}