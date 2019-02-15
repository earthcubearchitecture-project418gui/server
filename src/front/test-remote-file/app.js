
document.addEventListener('DOMContentLoaded', function() {
  const input = document.querySelector('#url');
  const output = document.querySelector('#filedata');
  const status = document.querySelector('#status');
  const btn = document.querySelector('#go-fetch').addEventListener('click', function (e) {
    console.log('click');
    fetch(input.value)
      .then(res => res.text())
      .then(html => {
        output.value = html;
      })

  });
});

function retrieve(url) {
  // fetch('https://earthcube.isti.com/test_file.html')
  // fetch('https://earthcube.isti.com/test_file_json.html')
  fetch(url)
    .then(res => res.text())
    .then(html => {
      console.log(html);
      const json = findScriptJSONLD(html);
      console.log(json);
      console.log(JSON.parse(json));
    })
    .catch(err => console.error(err));
}

function fetchCross(url, options) {
  return fetch('https://crossorigin.me/' + url, {
    mode: "cors",
    headers: {
      Origin: 'https://earthcube.isti.com'
    }
  });
}

function findScriptJSONLD(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  console.log(doc.body);

  const script_ld_json = doc.querySelector(`script[type="application/ld+json"]`);

  console.log(script_ld_json);
  console.log(script_ld_json.innerHTML);

  return script_ld_json.innerHTML;
}