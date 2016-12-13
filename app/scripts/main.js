var gebi = function(id) { 
  return document.getElementById(id);
};

var consoleButton = gebi('consoleButton');
var consoleInput = gebi('consoleInput');
var consoleContent = gebi('consoleContent');

var print1 = gebi('print-1').childNodes[0].textContent;
var print2 = gebi('print-2').childNodes[0].textContent;
var print3 = gebi('print-3').childNodes[0].textContent;
var print4 = gebi('print-4').childNodes[0].textContent;

var cOptions = {
  element: gebi('console-printer'),
  content: null,
  index: 0,
  delay: 60,
};

var lOptions = {
  element: gebi('progressBar'),
  content: '---------------------',
  percent: 0,
  index: 0,
  hash: -1,
  len: null,
}

var loaderOptions = {
  pos: ['\\', '|', '/', '-'],
  index: 0,
}

consoleContent.onclick = function() {
  consoleInput.focus();
}

consoleButton.onclick = function(e) {
  e.preventDefault();
  var consoleValue = consoleInput.value;
  switch(consoleValue) {
    case 'cls':
      cOptions.element.innerHTML = '';
      consoleInput.value = '';
      extraText.innerHTML = '';
      return;
    case 'info':
      cOptions.element.innerHTML += '> ' + consoleValue + '<br>';
      cOptions.element.innerHTML += '> (tree) Christmas tree <br>';
      cOptions.element.innerHTML += '> (gift) Christmas gift <br>';
      cOptions.element.innerHTML += '> (snow) snowman <br>';
      consoleInput.value = '';
      return;
    case 'gift':
      cOptions.content = '> ' + consoleValue + print1;
      break;
    case 'tree':
      cOptions.content = '> ' + consoleValue + print2;
      break;
    case 'snow':
      cOptions.content = '> ' + consoleValue + print3;
      break;
    case 'pasja':
      cOptions.content = '> ' + consoleValue + print4;
      break;
    default:
      cOptions.element.innerHTML += '> ' + consoleValue + '<br>';
      cOptions.element.innerHTML += '> ' + consoleValue + ': command not found <br>';
      scrollBottom();
      consoleInput.value = '';
      return;
  }

  consoleInput.value = '';
  gebi('loadingBar').className = '';
  extraText.innerHTML = '';
  cOptions.index = 0;
  loaderOptions.index = 0;
  lOptions.content = '---------------------';
  lOptions.index = 0;
  lOptions.len = 21;
  lOptions.hash = -1;
  consoleInput.setAttribute('disabled', 'true');
  print();
};

function scrollBottom() {
  consoleContent.scrollTop = consoleContent.scrollHeight;
}

function print() {
  loading(cOptions.index, cOptions.content.length);

  scrollBottom();

  if (cOptions.index < cOptions.content.length) {
    cOptions.index++;
    var currentElement = cOptions.content.substring(cOptions.index - 1, cOptions.index);
    cOptions.element.innerHTML += currentElement;
    if (typeof cOptions.content[cOptions.index + 1] !== 'undefined' 
      && cOptions.content[cOptions.index + 1].trim() === '') {
      print();
    }
    else {
      setTimeout(print, cOptions.delay);
    }
  }
}

function loading(value, total) {
  var percent = Math.floor(value / total * 100);

  if (percent % 5 === 0 && lOptions.hash < percent) {
    lOptions.hash = percent;
    lOptions.content = lOptions.content.substring(0, lOptions.index) + '#' + 
                       lOptions.content.substring(lOptions.index, lOptions.len - 1);
    lOptions.element.innerHTML = lOptions.content;
    lOptions.index++;
  }

  var progressBarPercent = gebi('progressBarPercent');
  progressBarPercent.innerHTML = percent;

  if (percent % 2 === 0) {
    var loader = gebi('loader');
    loader.innerHTML = loaderOptions.pos[loaderOptions.index];
    loaderOptions.index++;
    if (loaderOptions.index === 4) {
      loaderOptions.index = 0;
    }
  }

  if (percent === 100) {
    gebi('loadingBar').className = 'progres-bar-off';
    cOptions.element.innerHTML += '> <br>';
    cOptions.element.innerHTML += '> (tree) Christmas tree <br>';
    cOptions.element.innerHTML += '> (gift) Christmas gift <br>';
    cOptions.element.innerHTML += '> (snow) snowman <br>';
    consoleInput.removeAttribute('disabled');
    consoleInput.focus();
  }
}
