function solve() {
  let inputElem = document.querySelector('#exercise>textarea');
  let generateBtn = document.querySelector('#exercise>button');
  let tbodyElem = document.querySelector('.table>tbody');
  let resultElem = document.querySelector('#exercise>textarea:nth-of-type(2)');
  let buyBtn = document.querySelector('#exercise>button:nth-of-type(2)');

  if (inputElem == null || generateBtn == null || tbodyElem == null || resultElem == null || buyBtn == null) {
    throw new Error('Missing DOM element!');
  }

  function outputParse(arr, price, avg) {
    return `Bought furniture: ${arr.join(', ')}\nTotal price: ${price.toFixed(2)}\nAverage decoration factor: ${avg / arr.length}`;
  }

  function buyClickHandler() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');

    if (checkboxes == null) {
      throw new Error('Missing checkboxes!');
    }
    let purchases = [];
    let price = 0;
    let avgDecFactor = 0;

    console.log(
      Array.from(checkboxes).filter(e => e.checked).map(e => {
        let [_, nameElem, priceElem, decFactorElem] = e.parentElement.children;
        purchases.push(nameElem.textContent);
        price += Number(priceElem.textContent);
        avgDecFactor += Number(decFactorElem.textContent);
      })
    )
    resultElem.textContent = outputParse(purchases, price, avgDecFactor);
  }

  function generateClickHandler() {
    function createContent(arr) {
      let img;
      let name;
      let price;
      let decor;
      let checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');

      for (const [tag, content] of arr) {
        if (tag == 'img') {
          img = document.createElement('img');
          img.src = content;
          img.alt = 'img';
        } else if (tag == 'name') {
          name = document.createElement('p');
          name.textContent = content;
        } else if (tag == 'price') {
          price = document.createElement('p');
          price.textContent = content;
        } else if (tag == 'decFactor') {
          decor = document.createElement('p');
          decor.textContent = content;
        }
      }
      return [img, name, price, decor, checkbox];
    }

    let data = JSON.parse(inputElem.value).map(x => {
      let tr = document.createElement('tr');

      createContent(Object.entries(x)).forEach(e => {
        let td = document.createElement('td');
        td.appendChild(e);
        tr.appendChild(td);
      });

      return tr;
    });

    data.forEach(x => tbodyElem.appendChild(x));
  }

  generateBtn.addEventListener('click', generateClickHandler);
  buyBtn.addEventListener('click', buyClickHandler);
}