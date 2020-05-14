var showText = document.querySelector('.text-show');
// get courses
function getCouses() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200)
    {
      var results = JSON.parse(this.responseText);
      var data = results.data;
      var tbody = document.getElementById('tbody');
      var output = '';
      for (let i = 0; i < 4; i++)
      {
        output += `
          <tr>
            <td>
              ${data[i].id}
            </td>
            <td onclick="getDescriptions(event)">
              ${data[i].name}
            </td>
          </tr>
        `
      }
      tbody.innerHTML = output;
    }
  }
  showText.innerHTML = 'Showing <span class="num1">1</span> to <span span class="num2" > 8</span > of 8 entries';
  xhttp.open('GET', 'http://demo6370041.mockable.io/getcourses', true);
  xhttp.send();
}
getCouses();
var nextBtns = document.querySelectorAll('.next');
nextBtns.forEach(next => {
  next.addEventListener('click', function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200)
      {
        var results = JSON.parse(this.responseText);
        var data = results.data;
        var tbody = document.getElementById('tbody');
        var output = '';
        for (let i = 4; i < 8; i++)
        {
          output += `
          <tr>
            <td>
              ${data[i].id}
            </td>
            <td onclick="getDescriptions(event)">
              ${data[i].name}
            </td>
          </tr>
        `
        }
        tbody.innerHTML = output;
      }
    }
    xhttp.open('GET', 'http://demo6370041.mockable.io/getcourses', true);
    xhttp.send();
    showText.innerHTML = 'Showing <span class="num1">5</span> to <span span class="num2" > 8</span > of 8 entries';
  });

});
var prevBtns = document.querySelectorAll('.previous');
prevBtns.forEach(prev => {
  prev.addEventListener('click', getCouses);
});
// get descriptions

function getDescriptions(e) {
  var row = e.target.parentElement;
  var details = document.getElementById('details');
  var id = String(row.children[0].innerHTML.trim());
  console.log(id)
  var url = `http://demo6370041.mockable.io/course/${id}`;
  console.log(typeof id)
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200)
    {
      var results = JSON.parse(this.responseText);
      var output = '';
      console.log(results);
      details.innerHTML = `
        <p>${ results.description}</p>
        <p>${ results.textbook}</p>
      `
    }
  }
  xhttp.open('GET', url, true);
  xhttp.send();
}
