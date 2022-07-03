window.onload = () => {
    createInvestorTable();
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
[   ["Pens", "0.18"],
    ["Coins", "0.5"]
],
[   
    ["Pebbles", "5"]
],
[   
    ["Dildos", "0.2"],
    ["Umbrella hande", "0.5"],
    ["Stiff cocks", "0.3"]
]
]

const createInvestorTable = () => {
    for(var j = 0; j < data.length; j++) {
        var data2 = data[j];
        var table = document.createElement('table');
        document.getElementById('tables').appendChild(table);
        table.className = "table";
        
        createThead(table);
        
        var tbody = document.createElement('tbody');
        table.appendChild(tbody);
        for(var i = 0; i < data2.length; i++) {
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
            checkbox.checked = false;
            checkbox.ariaLabel = "Checkbox for following text input";
            checkbox.onchange = () => {countSum()};
            check.appendChild(checkbox);
            tr.appendChild(check);
            
            var name = document.createElement('td');
            name.innerHTML = data2[i][0];
            tr.appendChild(name);
            
            var cost = document.createElement('td');
            cost.innerHTML = data2[i][1];
            tr.appendChild(cost);
            
        }
    }
    
    createPayZone();
}

const createPayZone = () => {
    var payDiv = document.createElement('div');
    document.getElementById('tables').appendChild(payDiv);
    payDiv.style = "width: 100%; display: flex; justify-content: space-between;";

    var form =  document.createElement('form');
    payDiv.appendChild(form);
    form.action='/addstate';
    form.method="POST";
    form.style =  "width: 100%; display: flex; justify-content: space-between;";
    
    
    var button = document.createElement('input');
    form.appendChild(button);
    button.type="submit";
    button.value='Pay';
    button.innerHTML = 'pay';
    button.className = "btn btn-warning";
    button.style = "margin-top: 8px; margin-left:auto;";

    var summary = document.createElement('input');
    form.appendChild(summary);
    summary.type = 'text';
    summary.setAttribute('readonly', 'readonly');
    summary.value = '0';
    summary.style = "margin-top: 0px; margin-left:15%; margin-right: 0%; width:18%";
    summary.id = 'sum';
    summary.name = 'amount';
}

const countSum = () => {
    var table = document.getElementsByClassName('table');
    table = table.item(table.length - 1).childNodes[1];
    var sum = 0;
    for(var i = 0; i < table.childNodes.length; i++)
    {   
        var tr = table.childNodes[i];
        if(tr.childNodes[1].childNodes[0].checked)
        {   
            sum += Number(tr.childNodes[3].innerHTML)
        }
    }
    document.getElementById('sum').value = sum;
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