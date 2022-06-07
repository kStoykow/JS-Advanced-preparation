function loadRepos() {
	const usernameElem = document.getElementById('username');
	const ulElem = document.getElementById('repos');

	fetch(`https://api.github.com/users/${usernameElem.value}/repos`)
		.then(e => e.json())
		.then(res => {
			ulElem.innerHTML = '';
			for (const e of res) {

				let li = document.createElement('li');
				let a = document.createElement('a');
				a.href = `${e.html_url}`;
				a.textContent = `${e.full_name}`;
				li.appendChild(a);
				ulElem.appendChild(li);
			}
		})
		.catch(err => {
			console.log(err);
			let li = document.createElement('li');
			li.textContent = err;
			ulElem.appendChild(li);
		})
}