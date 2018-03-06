const doXhr = function(url, method, reqListener, data=null) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onload = reqListener;
  if (method == 'POST') {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }
  xhr.send(data);
}

const showResult = function(){
  let result = this.responseText;
  document.getElementById('result').innerHTML = result;
}

const query = function(){
  let roll = document.getElementById('roll').value;
  doXhr('/fetch','POST',showResult,`roll=${roll}`);
};
