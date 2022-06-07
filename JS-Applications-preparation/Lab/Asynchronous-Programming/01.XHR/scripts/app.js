function loadRepos() {
   let url = 'https://api.github.com/users/testnakov/repos';
   let xml = new XMLHttpRequest();
   let res = document.getElementById('res');
   xml.onreadystatechange = () => {
      if (xml.readyState === 4) {
         res.textContent = xml.responseText;
      }
   };

   xml.open("GET", url);
   xml.send();
}