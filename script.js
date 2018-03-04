var btn1 = document.querySelector("#btn1");
var btn2 = document.querySelector("#btn2");
var btn4 = document.querySelector("#btn4");
var image1 = document.querySelector("#avatar1");
var image2 = document.querySelector("#avatar2");
var image4 = document.querySelector("#avatar4");
var fullname1 = document.querySelector("#fullname1");
var fullname2 = document.querySelector("#fullname2");
var username4 = document.querySelector("#username4");
var email1 = document.querySelector("#email1");
var email2 = document.querySelector("#email2");
var email4 = document.querySelector("#email4");
var city1 = document.querySelector("#city1");
var city2 = document.querySelector("#city2");
var city4 = document.querySelector("#city4");
var url = 'https://randomuser.me/api/';
// fetch (1)
btn1.addEventListener("click", function(){
  fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(updateProfile)
    .catch(printError)
});

function handleErrors(res){
  if(!res.ok) {
    throw Error(res.status);
    alert("An error occurred");
  }
  return res;
}

function parseJSON(res){
  return res.json()
  .then(function(parsedRes){
    return parsedRes.results[0];
  });
}

function updateProfile(data){
  image1.src = data.picture.large;
  fullname1.innerText = data.name.first + " " + data.name.last;
  username1.innerText = data.login.username;
  email1.innerText = data.email;
  city1.innerText = data.location.city;
}

function printError(error){
  console.log(error);
  alert("An error occurred");
}
// HMLHTTP (2)
btn2.addEventListener('click', function(){
  var XHR = new XMLHttpRequest;
  XHR.onreadystatechange = function(){
    if(XHR.readyState == 4 && XHR.status == 200){
      var data = JSON.parse(XHR.responseText).results[0];
      image2.src = data.picture.large;
      fullname2.innerText = data.name.first + " " + data.name.last;
      username2.innerText = data.login.username;
      email2.innerText = data.email;
      city2.innerText = data.location.city;
    }
  }
  XHR.open('GET', url);
  XHR.onerror = function (){
  alert("An error occurred");
};
  XHR.send();
});
// JQuery (3)
$('#btn3').click(function(){
  $.getJSON(url)
  .done(function(preData){
    var data = preData.results[0];
    $('#avatar3').attr('src', data.picture.large);
    $('#fullname3').text(data.name.first + " " + data.name.last);
    $('#username3').text(data.login.username);
    $('#email3').text(data.email);
    $('#city3').text(data.location.city);
  })
  .fail(function(){alert("An error occurred")});
});
// Axios
btn4.addEventListener('click', function(){
  axios.get(url)
  .then(function(preData){
    var data = preData.data.results[0];
    image4.src = data.picture.large;
    fullname4.innerText = data.name.first + " " + data.name.last;
    username4.innerText = data.login.username;
    email4.innerText = data.email;
    city4.innerText = data.location.city;
  })
  .catch(function(){alert("An error occurred")})
});
