window.onload = () => {
    
}

const head = ["#", "Check", "Name", "Cost"];
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

const data = [
    ["Dildos", "300$"],
    ["Umbrella handle", "150$"],
    ["Stiff cocks", "200$"]
]

const createInvestorTable = () => {
    var table = document.createElement('table');
    document.getElementById('tables').appendChild(table);
    table.className = "table";
    
    createThead(table);
    
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    for(var i = 0; i < data.length; i++) {
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        var number = document.createElement('th');
        number.innerHTML = i+1;
        number.scope = 'row';
        tr.appendChild(number);

        var check = document.createElement('td');
        var checkbox = document.createElement('input');
        checkbox.className = "form-check-input mt-0";
        checkbox.type = "checkbox";
        checkbox.value = "";
        checkbox.ariaLabel = "Checkbox for following text input";
        check.appendChild(checkbox);
        tr.appendChild(check);
        
        var name = document.createElement('td');
        name.innerHTML = data[i][0];
        tr.appendChild(name);

        var cost = document.createElement('td');
        cost.innerHTML = data[i][1];
        tr.appendChild(cost);
    }
}

const results = [];

const createInvestorMessage = () => {
    results.push({name: 'Investor', content: document.getElementById('investor-message').value});
    for(var i = 0; i < results.length; i++){
        if(results[i]['content'] !== ''){
            var chatMessage = document.createElement("p");
            chatMessage.style.fontSize = '20px';  
            chatMessage.innerText = results[i]['name'] + ': ' +results[i]['content'];
            document.getElementById('chatid').appendChild(chatMessage);
            document.getElementById('investor-message').value = '';
        }
    }
    results.shift();
}