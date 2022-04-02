

var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var queryString = document.location.search;

var getRepoName = function () {
    var repoName = queryString.split("=")[1];
    getRepoIssues(repoName);
    console.log(repoName);
}

var getRepoIssues = function (repo) {
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayIssues(data);
        if (response.headers.get(displayWarning(repo))) {
            console.log("repo has more than 30 issues");
        }
      });
    } else {
      alert("There was a problem with your request");
    }
  });
  console.log(repo);
};


var displayIssues = function (issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues";
        return;
    }
    for (var i = 0; i < issues.length; i++) {
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute = ("href", issues[i].html_url);
        issueEl.setAttribute = ("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type of element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        // append to container
        issueEl.appendChild(typeEl);

        // appending to element in html that'll hold everything
        issueContainerEl.appendChild(issueEl);
    }
};

var displayWarning = function (repo) {
    limitWarningEl.innerHTML = `<span id="moreRepoInfo"> To see more than 30 issues, visit the </span> <a href="https://github.com/${repo}/issues" target="_blank" id="moreRepoInfoLink">GitHub Repo</a>`
    
    // lines below did the same thing as the two lines above...

    // add text to warning container
    // limitWarningEl.textContent = "To see more than 30 issues, visit the " ;
    // limitWarningEl.id = ("moreRepoInfo");
    //  document.createElement("a");
    // linkEl.id = ("moreRepoInfoLink");
    // linkEl.setAttribute = ("target", "_blank");
    // linkEl.textContent = "GitHub repo"
    // linkEl.href = " https://github.com/" + repo + "/issues";

    // I don't know why we have to put this
    // linkEl.setAttribute = ("href", "https://github.com/" + repo + "/issues");

    // append to warning container
    // limitWarningEl.appendChild(linkEl);
};

getRepoName();