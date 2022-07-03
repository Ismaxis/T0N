

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
messages = []
const createInvestorMessage = async () => {
    messages.push({name: 'Investor', content: document.getElementById('investor-message').value});
    for(var i = 0; i < messages.length; i++){
        if(messages[i]['content'] !== ''){
            var chatMessage = document.createElement("p");
            chatMessage.className = messages[i]['name']
            chatMessage.style.fontSize = '16px';  
            chatMessage.innerText = messages[i]['name'] + ': ' +messages[i]['content'];
            document.getElementById('chatid').appendChild(chatMessage);
            setTimeout(()=>{document.getElementById('investor-message').value = ''}, 100);
        }
    }
    messages.shift();
}