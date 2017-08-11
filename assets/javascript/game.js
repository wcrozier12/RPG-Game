$(document).ready(function(){
//character objects
//test
var characters = [

    char1=  {
    "name": "Daenerys Targaryen",
    "hp": 120,
    "ap": 8,
    'id': 'char1',
    reset: function () { //resets HP, AP, and onclick to each character when game is reset
        this.hp = 120;
        this.ap = 8;
        $('.char1').click(select0);
    },
},
    char2=  {
    "name": "Cersei Lannister",
    "hp": 100,
    "ap": 5,
    'id':'char2',
    reset: function () {
        this.hp = 100;
        this.ap = 5;  
        $('.char2').click(select1); 
    },
},
    char3= {
    "name": "Jon Snow",
    "hp": 150,
    "ap": 20,
    'id': 'char3',
    reset: function () {
        this.hp = 150;
        this.ap = 20;  
        $('.char3').click(select2); 
    },
},
    char4=  {
    "name": "Euron Greyjoy",
    'hp': 180,
    'ap': 25,
    'id': 'char4',
    reset: function () {
        this.hp = 180;
        this.ap = 25; 
        $('.char4').click(select3);
     }, 
},

];



//creates character buttons on load
var createChar = function() {
    for (var i = 0; i<characters.length; i++) {
      charButton = $('<div>');
      charButton.addClass('char-button characters ' + characters[i].id);
      charButton.attr('hp', characters[i].hp);
      charButton.attr('ap', characters[i].ap);
      charButton.html(characters[i].name + " " + characters[i].hp);
      $('#character-selection').append(charButton);
      characters[i].reset();
    
}
};


//character and defender selection
var charSelected = false;
var defenderSelected = false;
var yourChar = "";
var yourCharAp;
var defender = "";
var yourCharHP;
var defenderHP;
var reset = false;


var select0 = function () {
    if (!charSelected){
      $('#enemies-available').append($('.char-button'));
      $('#your-character').append($('.char1'));
      $('.char1').addClass('yourChar');
      yourCharAp = 0;
      yourChar = characters[0];
      charSelected = true;
      reset = true;
    }
    else if (charSelected && !defenderSelected && yourChar != characters[0]){
      $('#defender').append($('.char1'));
      $('.char1').addClass('defender');
      defenderSelected=true;
      defender = characters[0];
    }
};

var select1 = function () {
    if(!charSelected){
      $('#enemies-available').append($('.char-button'));
      $('#your-character').append($('.char2'));
      $('.char2').addClass('yourChar');
      yourCharAp = 0;
      charSelected = true;
      yourChar = characters[1];
      reset = true;
    }
    else if (charSelected && !defenderSelected && yourChar != characters[1]) {
      $('#defender').append($('.char2')); 
      $('.char2').addClass('defender');   
      defenderSelected= true;
      defender = characters[1];
    };
};

var select2 = function () {
    if(!charSelected){
      $('#enemies-available').append($('.char-button'));
      $('#your-character').append($('.char3'));
      $('.char3').addClass('yourChar');
      yourCharAp = 0;
      charSelected = true;
      yourChar = characters[2];
      reset = true;
        
    }
    else if (charSelected && !defenderSelected && yourChar != characters[2]) {
      $('#defender').append($('.char3')); 
      $('.char3').addClass('defender');
      defenderSelected = true;    
      defender = characters[2];    
    }
};

var select3 = function () {
    if(!charSelected){
      $('#enemies-available').append($('.char-button'));
      $('#your-character').append($('.char4'));
      $('.char4').addClass('yourChar');
      yourCharAp = 0;
      charSelected= true;
      yourChar = characters[3];
      reset = true;
    }

    else if (charSelected && !defenderSelected && yourChar != characters[3]) {
      $('#defender').append($('.char4')); 
      $('.char4').addClass('defender');
      defenderSelected = true; 
      defender = characters[3];        
    }
};

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
      $('.defender').hide();
    }

    if ($('#enemies-available').is(':empty') && defender.hp <=0) {
        $('#deadmessage').html(defender.name + " defeated! YOU WON!");
        return;
    }
});


createChar();
$('#reset').on('click', function () { 
    if(reset === true) {
    for (var i =0; i < characters.length; i++){
        characters[i].reset();
    };
    charSelected = false;
    defenderSelected = false;
    yourChar = "";
    defender = "";
    $('#defender').empty();
    $('#defender').html('Defender: ');
    $('#your-character').empty();
    $('#your-character').html('Your character: ');
    $('#enemies-available').empty();
    $('#attackmessage').empty();
    $('#counterattackmessage').empty();
    $('#deadmessage').empty();
    createChar();
    reset = false;
    }
});


});
