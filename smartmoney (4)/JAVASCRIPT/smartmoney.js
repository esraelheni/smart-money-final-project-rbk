let selected = '';
let saved = 0;

let categories = ["food","transport","taxes","gym","health","assurance","sadaka"];

function addtosaved() {
    document.getElementById('saved').innerHTML = 'Saved : '+saved+' DNT'; 
    for (let i = 0; i < categories.length; i++) {
        cat = categories[i]
        document.getElementById(cat).value = 0;
    }
    document.getElementById('maindiv').innerHTML = '<h1 class="asl">Saved</h1><p class="asl">Amount : '+saved+'</p><br><p class="asl transfer" onclick="transfer()">Transfer to balance?</p></p>'
    document.getElementById('spent').innerHTML = 'Spent : 0 DNT';
    document.getElementById('spent').value = 0;
}

function transfer(){
    document.getElementById('balance').value = parseInt(document.getElementById('balance').value) + parseInt(saved);
    saved = 0;
    document.getElementById('saved').innerHTML = 'Saved : 0 DNT';
    document.getElementById('balance').innerHTML = 'Balance : '+document.getElementById('balance').value+' DNT';
    document.getElementById('maindiv').innerHTML = '<h1 class="asl">Done</h1>'
}

function changebalance(add,bss){
    balance = document.getElementById(bss).value;
    newbalance = parseInt(balance)+parseInt(add);
    if (parseInt(newbalance)<0) {
        alert("Your "+bss+" is 0 DNT");
        document.getElementById(bss).value = '0';
        document.getElementById(bss).innerHTML = bss[0].toUpperCase()+bss.substring(1)+' : 0 DNT'; 
    }
    else {
        document.getElementById(bss).value = newbalance;
        document.getElementById(bss).innerHTML = bss[0].toUpperCase()+bss.substring(1)+' : '+newbalance+' DNT';
    }
}

function addclass(id) {
    cat = document.getElementById(id).classList;
    cat.add('animate');
}

function removeclass(id) {
    cat = document.getElementById(id).classList;
    cat.remove('animate');
}

function add() {
    balance = document.getElementById('balance').value;
    amount = prompt("Amount of money you want to add :");
    catval = document.getElementById(selected).value;
    if (isNaN(amount) || amount=='') {
        alert("Please enter a number");
    }
    else if (amount > balance) {
        alert("The amount you want to add must be lower than : "+balance);
    }
    else {
        changebalance(-amount,"balance");
        document.getElementById(selected).value = parseInt(catval)+parseInt(amount);
        saved = saved + parseInt(document.getElementById(selected).value);
        showcat(selected);
    }
}

function subtract() {
    amount = prompt("Amount of money you want to subtract :");
    catval = document.getElementById(selected).value;
    if (isNaN(amount) || amount=='') {
        alert("Please enter a number");
    }
    else if (amount<0 && Math.abs(amout) > document.getElementById('spent').value) 
    {
        return 0;
    }
    else if (amount > catval) {
        alert("The amount you want to subtract must be lower than : "+catval)
    }
    else {
        changebalance(amount,"spent");
        document.getElementById(selected).value = parseInt(catval)-parseInt(amount);
        saved = saved - parseInt(document.getElementById(selected).value);
        showcat(selected);
    }
}

function showcat(id) {
    val = document.getElementById(id).value;
    maindiv = document.getElementById('maindiv');
    maindiv.innerHTML = '<h1 class="asl">'+id+'</h1><p class="asl">For '+id+' : '+val+' DNT</p><p class="asl pmparent"><span class="pm" onclick="add()">+</span> <span class="pm" onclick="subtract()">-</span></p>'
    selected = id;
}

function addtobalance() {
    amount = prompt("Amount of money you want to add or substact from your balance :");
    if (isNaN(amount) || amount=='') {
        alert("Please enter a number");
    }
    else{
        changebalance(amount,"balance");
    }
}

function addcat() {
    catname = prompt("Name of the category you want to add");
    if (catname.length < 2) {
        alert("Category name must be at least 2 characters long");
    }
    categories_main = document.getElementById("categories_main");
    newcat = document.createElement("li");
    newcat.innerHTML = catname[0].toUpperCase()+catname.substring(1);
    newcat.id = catname;
    newcat.classList.add("categories");
    newcat.onclick = function() {
        showcat(this.id);
    }
    newcat.onmouseover = function() {
        addclass(this.id);
    }
    newcat.onmouseout = function() {
        removeclass(this.id);
    }
    newcat.value = '0';
    categories.push(catname);
    categories_main.appendChild(newcat);
}