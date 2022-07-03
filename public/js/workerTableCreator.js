const head = ["#", "Name", "Cost"];
const createThead = (parent) => {
    var thead = document.createElement('thead');
    parent.appendChild(thead);
    var tr = document.createElement('tr');
    thead.appendChild(tr);
    for(var i = 0; i < head.length; i++)
    {
        var th = document.createElement('th');
        th.scope ='col';
        th.innerHTML = head[i];
        tr.appendChild(th);
    }
}

const createRow= (parent) => {
    var tr = document.createElement('tr');
    parent.appendChild(tr);

    var number = document.createElement('th');
    tr.appendChild(number);
    number.innerHTML = parent.childNodes.length;
    number.scope='row';

    var name = document.createElement('td');
    tr.appendChild(name);
    var nameInput = document.createElement('input');
    name.appendChild(nameInput);
    nameInput.type = 'text';
    nameInput.className = "form-control";

    var cost = document.createElement('td');
    tr.appendChild(cost);
    var nameInput = document.createElement('input');
    cost.appendChild(nameInput);
    nameInput.type = 'text';
    nameInput.className = "form-control";
}

var counter = 0;

const createWorkerTable = () => {
    if(counter != 0)
    {
        disablePrev(document.getElementById(counter - 1)); 
    }
    div = document.createElement('div');
    div.id = counter;
    div.style = "margin-bottom: 20px";
    counter += 1;
    document.getElementById("table").appendChild(div);
    var table = document.createElement('table');
    div.appendChild(table);
    table.className = "table";
    createThead(table);
    document.body.firstChild.childNodes;
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    createRow(tbody);

    var button = document.createElement('button');
    div.appendChild(button);
    button.innerHTML = "add row";
    button.onclick = () => {
        createRow(tbody);
    }
    button.className = "btn btn-warning";
}

const disablePrev = (prev) => {
    prev.lastChild.remove();
    var arr = prev.firstChild.lastChild.childNodes;
    console.log(arr);
    for(var i = 0; i < arr.length; i++) {
        arr[i].childNodes[1].firstChild.setAttribute('readonly', 'readonly');
        arr[i].childNodes[2].firstChild.setAttribute('readonly', 'readonly');
    }
}


const results = [];

const createWorkerMassage = () => {
    results.push({name: 'Worker', content: document.getElementById('worker-massage').value});
    for(var i = 0; i < results.length; i++){
        if(results[i]['content'] !== ''){
            var chatMassage = document.createElement("p");
            chatMassage.style.fontSize = '20px';  
            chatMassage.innerText = results[i]['name'] + ': ' +results[i]['content'];
            document.getElementById('chatid').appendChild(chatMassage);
            document.getElementById('worker-massage').value = '';
        }
    }
    results.shift();
}