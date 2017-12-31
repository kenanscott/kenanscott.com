var form = document.getElementById('newsletter-form');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevents form from being submitted
  document.getElementById('newsletter-form-submit').disabled = true;
  // https://github.com/jonathanong/form-to-object
  var form = document.getElementById('newsletter-form')
  var body = Object.create(null)
  Array.prototype.slice.call(form.querySelectorAll('input:not(:disabled), textarea:not(:disabled), select:not(:disabled)')).forEach(function(el) {
    var key = el.name;
    // if an element has no name, it wouldn't be sent to the server
    if (!key) return
    if (['file', 'reset', 'submit', 'button'].indexOf(el.type) > -1) return
    if (['checkbox', 'radio'].indexOf(el.type) > -1 && !el.checked) return
    if (/\[\]$/.test(key)) {
      key = key.slice(0, -2);
      // if using array notation, go ahead and put the first value into an array.
      if (body[key] === undefined) {
        body[key] = [];
      }
    }
    if (body[key] === undefined) {
      body[key] = el.value;
    } else if (Object.prototype.toString.call(body[key]) === '[object Array]') {
      body[key].push(el.value);
    } else {
      body[key] = [body[key], el.value];
    }
  })
  var xhr = new XMLHttpRequest();
  xhr.open(form.method, form.action, true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.send(JSON.stringify(body));
  xhr.onloadend = function() {
    document.getElementById('feedback').innerText = 'Thank you!';
  };
});
