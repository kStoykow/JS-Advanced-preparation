function generateReport() {
    let headersTr = document.querySelector('table>thead>tr:nth-child(1)');
    let headersInputs = Array.from(headersTr.querySelectorAll('input'));
    let dataTr = document.querySelectorAll('tbody tr');

    let checkedFilterElem = headersInputs.filter(e => e.checked);
    let checked = checkedFilterElem.map(e => e.name);
    let firstRow = dataTr[0]
    console.log(headersTr, checkedFilterElem);
    console.log(firstRow);
}