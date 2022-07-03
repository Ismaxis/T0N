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
    var nameInput = document.createElement('input'); //name
    name.appendChild(nameInput);
    nameInput.name = `name${counter}`;
    nameInput.type = 'text';
    nameInput.className = "form-control";

    var cost = document.createElement('td');
    tr.appendChild(cost);
    var nameInput = document.createElement('input'); //cost
    cost.appendChild(nameInput);
    nameInput.name = 'cost'+counter
    nameInput.type = 'text';
    nameInput.className = "form-control";
    counter += 1;
}

var counter = 0;

const createWorkerTable = () => {
    var form = document.createElement('form');
    form.action = '/confirm_creating_table'
    form.method = 'post'
    form.id = 'form_table'
    document.getElementById("table").appendChild(form);
    div = document.createElement('div');
    div.id = counter;
    div.style = "margin-bottom: 20px";
    
    form.appendChild(div);
    var table = document.createElement('table');
    div.appendChild(table);
    table.className = "table";
    createThead(table);
    document.body.firstChild.childNodes;
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    createRow(tbody);

    var button_confirm = document.createElement('input');
    div.appendChild(button_confirm)
    button_confirm.type = 'submit';
    button_confirm.className = "btn btn-warning";
    button_confirm.value = "confirm";

    var button_add_row = document.createElement('button');
    document.getElementById("table").appendChild(button_add_row);
    button_add_row.innerHTML = "add row";
    button_add_row.id = 'button_add_row'
    button_add_row.onclick = () => {
        createRow(tbody);
    }
    button_add_row.className = "btn btn-warning";
}


const results = [];

const createWorkerMessage = () => {
    messages.push({name: 'Worker', content: document.getElementById('worker-message').value});
    for(var i = 0; i < messages.length; i++){
        if(messages[i]['content'] !== ''){
            var chatMessage = document.createElement("p");
            chatMessage.className = messages[i]['name']
            chatMessage.style.fontSize = '16px';  
            chatMessage.innerText = results[i]['name'] + ': ' +results[i]['content'];
            document.getElementById('chatid').appendChild(chatMessage);
            setTimeout(()=>{document.getElementById('worker-massage').value = ''},100)
        }
    }
    messages.shift();
}