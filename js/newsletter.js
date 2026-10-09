(function(){
  var form = document.getElementById('mc-embedded-subscribe-form');
  if (!form) return;
  var errorEl = document.getElementById('nl-error');
  var wrap = document.getElementById('nl-form-wrap');

  window.__mcCallback = function(data){
    if (data && data.result === 'success') {
      wrap.innerHTML = '<p style="font-family:\'Fraunces\',serif;font-size:18px;color:var(--ink);">You\'re in! Thank you.</p>';
    } else {
      var msg = (data && data.msg) ? data.msg.replace(/<[^>]+>/g, '') : 'Something went wrong. Please try again.';
      errorEl.textContent = msg;
      errorEl.style.display = 'block';
    }
  };

  form.addEventListener('submit', function(e){
    e.preventDefault();
    errorEl.style.display = 'none';

    var baseAction = form.getAttribute('data-base-action');
    var jsonUrl = baseAction.replace('/post?', '/post-json?') + '&c=__mcCallback';

    var params = ['EMAIL=' + encodeURIComponent(form.EMAIL.value)];
    params.push('FNAME=' + encodeURIComponent(form.FNAME.value));
    params.push('LNAME=' + encodeURIComponent(form.LNAME.value));
    var honeypot = form.querySelector('input[tabindex="-1"]');
    params.push(encodeURIComponent(honeypot.name) + '=' + encodeURIComponent(honeypot.value));

    var script = document.createElement('script');
    script.src = jsonUrl + '&' + params.join('&');
    document.body.appendChild(script);
  });
})();
