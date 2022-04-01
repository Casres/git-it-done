

var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
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
// Activating this event with an event listener
// getUserNameBtn.addEventListener("click", formSubmitHandler);
userFormEl.addEventListener("submit", formSubmitHandler);

var getUserRepos = function (user) {
  // format the GitHub API URL
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fetch(apiUrl).then(function (response) {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data, user);
      });
    } else {
      alert("GitHub User Not Found");
    }
  }).catch(function(error) {
      alert("Unable to connect to GitHub");
  });
};

getUserRepos();

var displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  } else {
    console.log(repos);
    console.log(searchTerm);
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // the list item style/container
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
    
        // where the user name/repo name goes
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
    
        // append to container
        repoEl.appendChild(titleEl);
    
        // append container to the DOM
        repoContainerEl.appendChild(repoEl);
    
        // ------------------------------------- //
    
        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
    
        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
          statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" +
            repos[i].open_issues_count +
            " issue(s)";
        } else {
          statusEl.innerHTML =
            "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
    
        // appending to container
        repoEl.appendChild(statusEl);
    }
  }
};
