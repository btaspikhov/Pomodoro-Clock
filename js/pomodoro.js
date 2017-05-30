'use strict';

var timer = document.querySelector('#timer'),
    startButton = document.querySelector('.button.start'),
    container = document.querySelector('.container'),
    inputSessionLength = document.querySelector('#sessionLength'),
    inputBrakeLength = document.querySelector('#brakeLength'),
    label = document.querySelector('#label'),
    hasStarted = false,
    on = false,
    time, 
    startTime,
    sessionLength,
    brakeLength,
    timerId,
    lastValue = {
                 sessionLength: '',
                 brakeLength: ''
                },
    sessionMode = true;

container.addEventListener('input', function(e) {
  var target = e.target;
  if (!/^\d*$/.test(target.value)) {
    if (target.id == 'sessionLength') {
      target.value = lastValue.sessionLength;
      return;
    } else if (target.id == 'brakeLength') {
      target.value = lastValue.brakeLength;
      return;
    }
  }
  if (target.id == 'sessionLength') lastValue.sessionLength = target.value;
  else lastValue.brakeLength = target.value;
});

container.addEventListener('click', function(e) {
  var target = e.target;
  if (!target.classList.contains('button')) return;
  if (target.classList.contains('stop')) {
    clearDisplay();
    return;
  } 
  if (on && sessionMode) {
    displayTimer(sessionLength);
    clearInterval(timerId);
    target.innerHTML = 'continue';
    on = false;
  } else if (!on && !hasStarted && sessionMode) {
    sessionLength = document.querySelector('#sessionLength').value;
    brakeLength = document.querySelector('#brakeLength').value;
    hasStarted = true;
    on = true;
    label.innerHTML = 'Session';
    target.innerHTML = 'pause';
    startTime = Date.now();
    timerId = setInterval(displayTimer, 100, sessionLength);
    displayTimer(sessionLength);
  } else {
    on = true;
    target.innerHTML = 'pause';
    startTime = Date.now()-time;
    timerId = setInterval(displayTimer, 100, sessionLength);
    displayTimer(sessionLength);
  }
});

function displayTimer(length) {
  time = Date.now() - startTime;
  var minutes = Math.floor(length - time/1000/60);
  var seconds = Math.ceil((length*60 - time/1000)%60);
  
  if (seconds == 60) {
    minutes +=1;
    seconds = 0;
  }
  if (minutes <= 0 && seconds == 0) {
    timer.innerHTML = "0:00" ;
    sessionMode = !sessionMode;
    clearInterval(timerId);
    return;
  }


  timer.innerHTML = minutes + ":" + seconds;
  var regExp = /^(\d+):(\d)$/;
  timer.innerHTML = timer.innerHTML.replace(regExp, '$1:0$2');
}

function clearDisplay() {
  timer.innerHTML = '';
  clearInterval(timerId);
  on = hasStarted = false;
  startButton.innerHTML = 'start';
  sessionMode = true;
}
