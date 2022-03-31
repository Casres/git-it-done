

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var getUserNameBtn = document.querySelector("#get-user-btn");

var formSubmitHandler = function (event) {
    event.preventDefault();
    
    // gets the value from the users input
    var username = nameInputEl.value.trim();

    if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
    } else {
    alert("Please enter a GitHub username");
    }
};

// getUserNameBtn.addEventListener("click", formSubmitHandler);
userFormEl.addEventListener("submit", formSubmitHandler);
 
var getUserRepos = function (user) {
  // format the GitHub API URL
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};

getUserRepos();
