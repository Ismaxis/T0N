const head = ["#", "Check", "Name", "Cost"];
const createThead = (parent) => {
    var thead = document.createElement('thead');
    parent.appendChild(thead);
    var tr = document.createElement('tr');
    thead.appendChild(tr);
    for(var i = 0; i < 4; i++)
    {
        var th = document.createElement('th');
        th.scope ='col';
        th.innerHTML = head[i];
        tr.appendChild(th);
    }
}