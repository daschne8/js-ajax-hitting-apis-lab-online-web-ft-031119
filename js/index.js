const rootURL = 'https://api.github.com';

function getRepositories() {
  const name = document.getElementById('username').value;
  const uri = rootURL + '/users/' + name + '/repos';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayRepositories);
  xhr.open('GET', uri);
  xhr.send();
  return false;
}
function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList =
    '<ul>' +
    repos
      .map(repo => {
        const dataUsername = 'data-username="' + repo.owner.login + '"';
        const dataRepoName = 'data-repository="' + repo.name + '"';
        return `
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`;
      })
      .join('') +
    '</ul>';
  document.getElementById('repositories').innerHTML = repoList;
}
function getCommits(el){
  const name = el.dataset.repo;
  myPry(name)
  const url = rootURL + '/repos/' + el.dataset.username + '/'+ name + '/commits'
  // myPry(url)
  const req = new XMLHttpRequest();
  req.addEventListener('load', showCommits);
  req.open('GET', url);
  req.send();
}
function displayCommits(){
  const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits
      .map(
        commit =>
        '<li><h3>' +
        commit.commit.author.name +
        ' (' +
        commit.author.login +
        ')</h3>' +
        commit.commit.message +
        '</li>'
        )
      .join('')}</ul>`;
    document.getElementById('commits').innerHTML = commitsList;
  }
  function myPry(message){
    const pryDiv = document.querySelector('.my-pry')
    pryDiv.innerHTML = `<p>${message}</p>`
  }
