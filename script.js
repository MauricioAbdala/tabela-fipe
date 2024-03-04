const tabHead = `<tr><th>Marca</th><th>Modelo</th>
<th>Ano</th><th>Preço</th></tr><tr> `;

function createRow(obj) {
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');

    td1.innerText = obj.marca;
    td2.innerText = obj.modelo;
    td3.innerText = obj.ano;
    td4.innerText = `R$${obj.preco},00`;

    let tr = document.createElement('tr');
    tr.append(td1, td2, td3, td4);

    return tr;
}

function renderRows(list) {
    let table = document.querySelector('.table');
    table.innerHTML = "";
    table.insertAdjacentHTML("beforeend", tabHead);

    for (let i = 0; i < list.length; i++) {
        let obj = list[i];
        let element = createRow(obj);

        table.appendChild(element);
    }

}
renderRows(tabela);

document.querySelector('#btn-search').
    addEventListener('click', function (e) {
        e.preventDefault();

        let searchInput = document.querySelector
            ('#input-search');
        let searchText = searchInput.value;

        let filteredList = filterList(tabela, searchText);

        renderRows(filteredList);
    })
// {
//     marca: 'Fiat',
//     modelo: 'Palio ELX 1.0 Fire',
//     ano: 2010,
//     preco: 26429
// },

function filterList(list, text) {
    let localList = [];

    text = text.toLowerCase();

    if (text.includes('marca:')) {
        text = text.substring(6);
        for (let i = 0; i < list.length; i++) {
            let obj = list[i];
            if (obj.marca.toLowerCase().includes(text)) {
                localList.push(obj);
            }
        }

    } else if (text.includes('modelo:')) {
        text = text.substring(7);
        for (let i = 0; i < list.length; i++) {
            let obj = list[i];
            if (obj.modelo.toLowerCase().includes(text)) {
                localList.push(obj);
            }
        }

    } else {



        for (let i = 0; i < list.length; i++) {
            let obj = list[i];
            if (obj.marca.toLowerCase().includes(text) ||
                obj.modelo.toLowerCase().includes(text) ||
                obj.ano.toString().includes(text) ||
                obj.preco.toString().includes(text)
            ) {
                localList.push(obj);
            }
        }
    }

    return localList;
}

let lastSort = '';
function sortData(e, type) {
    e.preventDefault();

    let newList = [...tabela];

    if (lastSort == type) {
        newList.sort(function (a, b) {
            if (a[type] < b[type]) {
                return 1;
            } else if (a[type] > b[type]) {
                return -1;
            } else {
                return 0;
            }
        })
        lastSort = '';
    } else {
        newList.sort(function (a, b) {
            if (a[type] < b[type]) {
                return -1;
            } else if (a[type] > b[type]) {
                return 1;
            } else {
                return 0;
            }
        })
        lastSort = type;   
    }

    renderRows(newList);
}    