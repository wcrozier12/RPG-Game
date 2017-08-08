$(document).ready(function(){
var characters = [

    obiwan=  {
    "name": "Obi-Wan Kenobi",
    "hp": 120,
    "ap": 8,
    'id': 'obiwan',
},
    luke=  {
    "name": "Luke Skywalker",
    "hp": 100,
    "ap": 5,
    'id':'luke',
},
    vader= {
    "name": "Darth Vader",
    "hp": 150,
    "ap": 20,
    'id': 'vader',
},
    maul=  {
    "name": "Darth Maul",
    'hp': 180,
    'ap': 25,
    'id': 'maul',
}
];

var createChar = function() {
    for (var i = 0; i<characters.length; i++) {
        charButton = $('<button>');
        charButton.addClass('char-button characters ' + characters[i].id);
        charButton.attr('hp', characters[i].hp);
        charButton.attr('ap', characters[i].ap);
        charButton.html(characters[i].name + " " + characters[i].hp);
        $('#character-selection').append(charButton);
}
};

createChar();

// Select Character on-clicks
var charSelected = false;
var defenderSelected = false;
var yourChar = "";
var yourCharAp;
var defender = "";


$('.obiwan').on('click', function () {
    if (!charSelected){
        $('#enemies-available').append($('.char-button'));
        $('#your-character').append($('.obiwan'));
        $('.obiwan').addClass('yourChar');
        yourCharAp = 8;
        yourChar = characters[0];
        charSelected = true;
        $(".obiwan").off('click');
    }
    else if (charSelected && !defenderSelected){
        $('#defender').append($('.obiwan'));
        $('.obiwan').addClass('defender');
        defenderSelected=true;
        defender = characters[0];
    }
});

$('.luke').on('click', function () {
    if(!charSelected){
        $('#enemies-available').append($('.char-button'));
        $('#your-character').append($('.luke'));
        $('.luke').addClass('yourChar');
        yourCharAp = 5;
        charSelected = true;
        yourChar = characters[1];
        $(".luke").off('click');
    }
    else if (charSelected && !defenderSelected) {
        $('#defender').append($('.luke')); 
        $('.luke').addClass('defender');   
        defenderSelected= true;
        defender = characters[1];
    };
});

$('.vader').on('click', function () {
    if(!charSelected){
        $('#enemies-available').append($('.char-button'));
        $('#your-character').append($('.vader'));
        $('.vader').addClass('yourChar');
        yourCharAp = 20;
        charSelected = true;
        yourChar = characters[2];
        $(".vader").off('click');
    }
    else if (charSelected && !defenderSelected) {
        $('#defender').append($('.vader')); 
        $('.vader').addClass('defender');
        defenderSelected = true;    
        defender = characters[2];    
    }
});

$('.maul').on('click', function () {
    if(!charSelected){
    $('#enemies-available').append($('.char-button'));
    $('#your-character').append($('.maul'));
    $('.maul').addClass('yourChar');
    yourCharAp = 25;
    charSelected= true;
    yourChar = characters[3];
    $(".maul").off('click');
    }

    else if (charSelected && !defenderSelected) {
        $('#defender').append($('.maul')); 
        $('.maul').addClass('defender');
        defenderSelected = true; 
        defender = characters[3];        
    }
});

$('#attack').on('click', function (){
    if (charSelected && defenderSelected && yourChar.hp > 0) {
        yourChar.hp =  yourChar.hp - defender.ap;
        defender.hp = defender.hp - yourChar.ap;
        yourChar.ap += yourCharAp;
        $('.yourChar').html(yourChar.name + " " + yourChar.hp);
        $('.defender').html(defender.name + " " + defender.hp);
        $('#attackmessage').html('You attacked ' + defender.name + 'for ' + yourChar.ap + " damage.");
        $('#counterattackmessage').html(defender.name + ' attacked you back for ' + defender.ap + " damage.");
    }
    if (yourChar.hp <= 0){
        $('.messages').html('You have been defeated. Game Over.');
        return;
    }
    if (defender.hp <= 0) {
        $('.messages').html(defender.name + " defeated!");
        defenderSelected = false;
        $('#defender').empty();
        $('#defender').html('Defender: ');
        return;
    }


});

 });
