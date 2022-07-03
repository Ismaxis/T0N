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
    button.style = "margin-top: 1px; margin-left:auto;";

    var summary = document.createElement('input');
    form.appendChild(summary);
    summary.type = 'text';
    summary.setAttribute('readonly', 'readonly');
    summary.value = '0';
    summary.style = "margin-left:20px; margin-right: 5px; width:38;";
    summary.className = "border rounded summary-bord";
    summary.id = 'sum';
    summary.name = 'amount';
}

const countSum = () => {
    var table = document.getElementsByClassName('table-u');
    table = table.item(table.length - 1).childNodes[3];
    var sum = 0;
    
    for(var i = 1; i < table.childNodes.length; i=i+2)
    {   
        var tr = table.childNodes[i];
        if(tr.childNodes[3].childNodes[1].checked)
        {   
            sum += Number(tr.childNodes[7].innerHTML)
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