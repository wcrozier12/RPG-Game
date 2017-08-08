$(document).ready(function(){
//character objects
var characters = [

    obiwan=  {
    "name": "Obi-Wan Kenobi",
    "hp": 120,
    "ap": 8,
    'id': 'obiwan',
    reset: function () { //resets HP and AP on reset button click
        this.hp = 120;
        this.ap = 8;
    },
},
    luke=  {
    "name": "Luke Skywalker",
    "hp": 100,
    "ap": 5,
    'id':'luke',
    reset: function () {
        this.hp = 100;
        this.ap = 5;  
    },
},
    vader= {
    "name": "Darth Vader",
    "hp": 150,
    "ap": 20,
    'id': 'vader',
    reset: function () {
        this.hp = 150;
        this.ap = 20;  
    },
},
    maul=  {
    "name": "Darth Maul",
    'hp': 180,
    'ap': 25,
    'id': 'maul',
    reset: function () {
        this.hp = 180;
        this.ap = 25; 
     }, 
},

];



//creates character buttons on load
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

//character and defender selection
var charSelected = false;
var defenderSelected = false;
var yourChar = "";
var yourCharAp;
var defender = "";
var yourCharHP;
var defenderHP;

$('.obiwan').on('click', function () {
    if (!charSelected){
      $('#enemies-available').append($('.char-button'));
      $('#your-character').append($('.obiwan'));
      $('.obiwan').addClass('yourChar');
      yourCharAp = 0;
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
      yourCharAp = 0;
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
      yourCharAp = 0;
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
      yourCharAp = 0;
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
// on attack function
$('#attack').on('click', function (){
    if (charSelected && defenderSelected && yourChar.hp > 0) {
      yourCharAp += yourChar.ap;
      defender.hp = defender.hp - yourCharAp;
      $('.defender').html(defender.name + " " + defender.hp);
      $('#attackmessage').html('You attacked ' + defender.name + ' for ' + yourCharAp + " damage.");
      $('#deadmessage').empty();
    }
    else if (yourChar.hp <= 0){
      $('#deadmessage').html('You have been defeated. Game Over.');
      return;
    }

    if (charSelected && defenderSelected && defender.hp > 0) {
      yourChar.hp =  yourChar.hp - defender.ap;
      $('.yourChar').html(yourChar.name + " " + yourChar.hp);
      $('#counterattackmessage').html(defender.name + ' attacked you back for ' + defender.ap + " damage.");
    }

    else if (defender.hp <= 0) {
      $('#deadmessage').html(defender.name + " defeated! Choose another enemy to battle.");
      defenderSelected = false;
      $('#defender').empty();
      $('#defender').html('Defender: ');
    }

    if ($('#enemies-available').is(':empty') && defender.hp <=0) {
        $('#deadmessage').html(defender.name + " defeated! YOU WON!");
        return;
    }
});





$('#reset').on('click', function () {
    obiwan.reset();
    luke.reset();
    vader.reset();
    maul.reset();   
    createChar();
    charSelected = false;
    defenderSelected = false;
    yourChar = "";
    yourCharAp;
    defender = "";
    $('#defender').empty();
    $('#defender').html('Defender: ');
    $('#your-character').empty();
    $('#your-character').html('Your character: ');
    $('#enemies-available').empty();
    $('#attackmessage').empty();
    $('#counterattackmessage').empty();
    $('#deadmessage').empty();
    console.log(charSelected);
    console.log(defenderSelected); 
});


});
