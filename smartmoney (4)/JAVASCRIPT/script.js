function signup() {
    email = document.getElementById('email').value;
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    confirm = document.getElementById('confirm').value;
    telephone = document.getElementById('telephone').value;
    male = document.getElementById('Male').checked;
    female = document.getElementById('Female').checked;

    if (password!= confirm) {
        alert("Passwords do not match");
        return false;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters long");
        return false;
    }

    if (username.length < 3) {
        alert("Username must be at least 3 characters long");
        return false;
    }

    if (male == false && female == false) {
        alert("Please select gender");
        return false;
    }

    let user = {
        username: username,
        password: password
    }

    if (localStorage.getItem(username) != null) {
        alert("Username already exists");
        return false;
    }

    let user_serialized = JSON.stringify(user);
    
    localStorage.setItem(username,user_serialized);

    return true;
}

$(document).ready(function() {
    $('#signin').click(function(e) {
        e.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();

        var user = {
            username: username,
            password: password
        };

        var user_serialized = JSON.stringify(user);

        var user_exists = localStorage.getItem(username) == user_serialized;

        if (!user_exists) {
            alert("Username or password incorrect");
        }
        else {
            window.location.href = "signedin.html";
        }
    });
});

function changestate(id)  {
    p1 = document.getElementById('1').classList;
    p2 = document.getElementById('2').classList;
    p3 = document.getElementById('3').classList;
    current = document.getElementById(id).classList;
    current.add('chosen');
    if (p1==current){
        p2.remove('chosen');
        p3.remove('chosen');
    }
    else if (p2==current){
        p1.remove('chosen');
        p3.remove('chosen');
    }
    else if (p3==current){
        p2.remove('chosen');
        p1.remove('chosen');
    }
}

function checkplan() {
    p1 = document.getElementById('1').classList;
    p2 = document.getElementById('2').classList;
    p3 = document.getElementById('3').classList;
    if (!p1.contains('chosen') && !p2.contains('chosen') && !p3.contains('chosen')) {
        alert('Please choose your payment plan')
        return false;
    }
    return true;
}

function checkformat(date){
    if (date.length!= 5) {
        return false;
    }
    if (date[2]!='/'){
        return false;
    }

    if (isNaN(date[0]) || isNaN(date[1]) || isNaN(date[3]) || isNaN(date[4])){
        return false;
    }

    return true;
}

function checkvalidcard(){
    cardnumber = document.getElementById('cardnumber').value;
    cardname = document.getElementById('cardname').value;
    expiration = document.getElementById('expiration').value;
    cvv = document.getElementById('cvv').value;
    if (cardnumber.length != 16) {
        alert("Card number must be 16 characters long");
        return false;
    }
    if (cardname.length < 2) {
        alert("Card name must be at least 2 characters long");
        return false;
    }
    if (!checkformat(expiration)) {
        alert("Expiration date must be in the right format MM/YY");
        return false;
    }
    if (cvv.length != 3) {
        alert("CVV must be 3 characters long");
        return false;
    }
    return true;
}

function visualize(){
    if (checkvalidcard()){
        cardnumber = document.getElementById('cardnumber').value;
        num1 = cardnumber[0]+cardnumber[1]+cardnumber[2]+cardnumber[3];
        num2 = cardnumber[4]+cardnumber[5]+cardnumber[6]+cardnumber[7];
        num3 = cardnumber[8]+cardnumber[9]+cardnumber[10]+cardnumber[11];
        num4 = cardnumber[12]+cardnumber[13]+cardnumber[14]+cardnumber[15];
        cardname = document.getElementById('cardname').value;
        expiration = document.getElementById('expiration').value;
        visualizer = document.getElementById('visualizer');
        visualizer.innerHTML = '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title><link rel="stylesheet" href="../CSS/cardstyle.css" /></head><body><center><div class="card"><div class="card_item"><div class="card_num"><h1 class="card_num-item">'+num1+'</h1><h1 class="card_num-item">'+num2+'</h1><h1 class="card_num-item">'+num3+'</h1><h1 class="card_num-item">'+num4+'</h1></div></div><div class="card_item"><div class="card_valid"><div class="card_valid-title"><div class="card_valid-title-item"> GOOD</div><div class="card_valid-title-item">THRU</div></div><div class="card_valid-num">'+expiration+'</div></div></div><div class="card_item"><p class="card_holder" style="text-align:left;">'+cardname+'</p></div><div class="card_item"><h2 class="card_network">VISA</h2></div></div></center></body>';
    }
}