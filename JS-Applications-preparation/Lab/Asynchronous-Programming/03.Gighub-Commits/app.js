function loadCommits() {
    const usernameElem = document.getElementById('username');
    const repoElem = document.getElementById('repo');
    const commitsElem = document.getElementById('commits');
    let url = `https://api.github.com/repos/${usernameElem.value}/${repoElem.value}/commits`;

    fetch(url)
        .then(res => {
            if (res.status != 200) {
                throw new Error(`${res.status} (Not Found)`);
            }
            return res.json();
        })
        .then(commits => {
            for (const e of commits) {
                const li = document.createElement('li');
                li.textContent = `${e.commit.author.name}: ${e.commit.message}`;
                commitsElem.appendChild(li);
            }
        })
        .catch(e => {
            const li = document.createElement('li');
            li.textContent = e;
            commitsElem.appendChild(li);
        });
}