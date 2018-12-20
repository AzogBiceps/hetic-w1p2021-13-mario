// oxo.inputs.listenKey('enter', function() {

//   if (oxo.screens.getCurrentScreen() !== 'home') {

//     oxo.screens.currentScreen = "home"

//     oxo.screens.loadScreen('home', (callback) => {
//       console.log(callback)
//     });
//   }
// });

let data = {
  player1: '',
  player2: '',
  map: '',
}

function character() {
  var elements = document.querySelectorAll('div.element');
  var count = 0;
  let players = []

  elements.forEach(element => {
    element.addEventListener('click', function() {
      console.log(count);
      if (count == 0){
        console.log('add')
        players.push(element.className.split(' ')[1])
        element.classList.add("selected");
        count++;
      } else if (count == 1 && !element.className.includes("selected")) {

        console.log('add other')
        players.push(element.className.split(' ')[1])
        element.classList.add(document.querySelector('.selectedPlayerTwo') ? 'selected' : 'selectedPlayerTwo');
        count++;
      } else if (element.className.includes("selected")) {
        count--;
        players = players.filter(function(player) { return player != element.className.split(' ')[1]; });
        players[count] == undefined;
        console.log(players[1]);
        element.classList.remove('selected');
        element.classList.remove('selectedPlayerTwo');
      }
      console.log(players);
      document.getElementById("go").addEventListener("click", function(){
        if (players[1] !== undefined && players[0] !== undefined) {

          console.log("Go")
          data.player1 = players[0]
          data.player2 = players[1]

          oxo.screens.loadScreen('maps', map);
        }

      });
    })

  });

  // Press ENTER to pass the home screen if characters is not already the currentscreen
  oxo.inputs.listenKey('enter', function() {

    console.log(oxo.screens.getCurrentScreen());
    if (oxo.screewns.getCurrentScreen() == 'home') {

      oxo.screens.loadScreen('characters', character);
    }
  });

  // document.getElementById("back").addEventListener("click", function(){

  //   // data.player1 = players[0]
  //   players = []
  //   count = 0
  //   elements.forEach(element => {
  //     element.classList.remove("selected");
  //     element.classList.remove("selectedPlayerTwo");
  //   })
  // });
}

function map(){
  var elements = document.querySelectorAll('div.element__maps');
  var count = 0;
  console.log(elements);

  elements.forEach(element => {
    element.addEventListener('click', function(){
      if (count == 0){
        element.classList.add('selected');
        count = 1;
      } else {
        elements.forEach(elm => elm.classList.remove("selected"))
        element.classList.add("selected")
        // console.log('already choosen');
      }
      map = element.className.split(' ')[1]

    });
  })

  document.getElementById("go").addEventListener("click", function(){
    data.map = map
    console.log(data)

    oxo.screens.loadScreen('game', game);
  })
}

// function game(){
//   console.log("GameVie");
//   console.log(data);
// }





oxo.inputs.listenKey('enter', function() {

  if (oxo.screens.getCurrentScreen() !== 'home') {

    oxo.screens.currentScreen = "home"

    oxo.screens.loadScreen('home', (callback) => {
      console.log(callback)
    });
  }
});

oxo.inputs.listenKey('enter', function() {

  console.log(oxo.screens.getCurrentScreen())
  if (oxo.screens.getCurrentScreen() == 'home') {

    oxo.screens.loadScreen('characters', character);
  }
});

oxo.inputs.listenKey('space', function() {

  console.log(oxo.screens.getCurrentScreen())
  if (oxo.screens.getCurrentScreen() == 'game') {

    oxo.screens.loadScreen('end', end);
  }
});



// var data = {
//   player1: '',
//   player2: '',
//   map: ''
// }

function character() {
  var elements = document.querySelectorAll('div.element');
  var count = 0;
  let players = []

  elements.forEach(element => {
    element.addEventListener('click', function() {
      console.log(count);
      if (count == 0){
        console.log('add')
        players.push(element.className.split(' ')[1])
        element.classList.add("selected");
        count++;
      } else if (count == 1 && !element.className.includes("selected")) {

        console.log('add other')
        players.push(element.className.split(' ')[1])
        element.classList.add(document.querySelector('.selectedPlayerTwo') ? 'selected' : 'selectedPlayerTwo');
        count++;
      } else if (element.className.includes("selected")) {
        count--;
        players = players.splice(players.indexOf(element.className.split(' ')[1]) - 1, 1);
        element.classList.remove('selected');
        element.classList.remove('selectedPlayerTwo');
      }

    })
  });

  // document.getElementById("back").addEventListener("click", function(){

  //   // data.player1 = players[0]
  //   players = []
  //   count = 0
  //   elements.forEach(element => {
  //     element.classList.remove("selected");
  //     element.classList.remove("selectedPlayerTwo");
  //   })
  // });

  document.getElementById("go").addEventListener("click", function(){
    console.log("Go");
    data.player1 = players[0];
    data.player2 = players[1];

    oxo.screens.loadScreen('maps', map);
  });
}





/** GAME */

function game(){
  /*creation of players array with basics stats
  creation of the players table with basic stats*/
  console.log(data);
  function initFighters(data){
    //on créer un tab avec J1 et J2 comportant des caractéristiques
    //create a tab with J1 and J2 with features
    //let players = [];
    players.push({'name':data.player1,'LP':10,'def':0},{'name':data.player2,'LP':10,'def':0});

    return players }};

  // let players = initFighters(data);
  // console.log(players);
  // // si turn = true J1 joue sinon J2 joue
  // //if turn = true J1 plays otherwise J2 plays
  let turn = true;
  let player1 = players[0];
  let player2 = players[1];

  while(getLife(player1)!=0 && getLife(player2)!=0){
    if(turn){
       // J1 plays
       // ici il faut récuperer la touche de l'utilisateur 1 et mettre l'action dans la fonction a la place de atk exemple: atk,soin,def 
       //here you need to retrieve the user key 1 and put the action in the function instead of atk example: atk,heal,def     
      oxo.inputs.listenKeyOnce('q', function() {
        console.log('q');
        action(player2,player1,'atk');
        turn = !turn;
      });
    } else {
       // ici il faut récuperer la touche de l'utilisateur 2 et mettre l'action dans la fonction a la place de atk exemple: atk,soin,def
       //here you need to retrieve the user key 2 and put the action in the function instead of atk example: atk,heal,def 
      oxo.inputs.listenKeyOnce('k', function() {
        action(player2,player1,'atk');
        turn = !turn;
      });
    }

  //J1 a toujours de la vie il gagne
  //J1 always has life he wins
  if(getLife(player1) > 0){
   //ici il faut charger la page final avec j1 en gagnant
   //here you need to load the final page with J1 by winning
    console.log('J1 a gagné');
  } else { //ici il faut charger la page final avec j2 en gagnant
   //here you need to load the final page with J2 by winning
    console.log('J2 a gagné')  ;
  }
}

  /**
  * action réalisé par un personnage
  * action realized by a character
   @param {playerAtk} object - joueur qui joue Player who plays
   @param {playerDef} object - joueur ennemie Player enemy
   @param {type} string - action du joueur Action of the player
  */
  function action(playerAtk,playerDef,type){
    //action en fonction du type
    //Action according to the type
    switch(type) {
      case 'heal':
      heal(playerAtk);
      break;
      case 'def':
      def(playerAtk);
      break;
      default:
      attack(playerAtk,playerDef);
    }
  }

  /**
   Un joueur attaque l'autre
  A player attacks the other one
   @param {playerAtk} object - joueur qui joue Player who plays
   @param {playerDef} object - joueur ennemie Player enemy
  */
  function attack(playerAtk,playerDef){

    //J2 est en mode def
    //J2 is in defense
    if(playerDef != 0){
      semiAttack(playerDef);
      playerDef.def = 0;
    } else {//J2 est en mode normal
      //J2 is normal
      fullAttack(playerDef);
    }
    return false;
  }



  //a modifier pour la valeur si vous voulez
  //Has to modify for the value
  function heal(player){
    player.LP +=1;
  }

  //le joueur passe en mode defense et gagne 0.5 de def prochain tour (=50% de reduction des dégats)
  //the player switches to defense mode and wins 0.5 of next def round (=50% damage reduction)
  //a modifier pour la valeur si vous voulez
  //Has to modify for the value
  function def(player){
    player.def +=0.5;
  }

  //renvoit la vie du joueur
  //refers to the life of the player
  function getLife(player){
    return player.LP;
  }

  //effectue une attaque complete avec 8/10 de succes
  //performs a complete attack with 8/10 succes
  function fullAttack(player){
    //creation d'un nombre aleatoire entre 1 et 10
    //creation of a random number between 1 and 10
    succes = Math.floor((Math.random() * 10) + 1);
    if(succes > 2){ // si le nombre est superieur a 2 succes
      //if the number is greater than 2 succes
      player.LP -= 1;
    } else { // sinon fail
      //else fail
      //rater a vous de voir pour l'action
      //
    }
  }

  //effectue une attaque sur un joueur en mode defense
  //makes an attack on a player in defense mode
  function semiAttack(player){
    //le coup est toujours reussi en mode def
    //the blow is always successful in defense mode
    player.LP -= 0.5;
  }

  /**
  * Initialise l'état initial des deux combattants
  *Initializes the initial state of the two combatants
  * @param {data} tableau - contient les deux joueurs et la map contains both players and map
  * @return {players} -Tableau composé des deux joueurs avec des caractéristiques de combat Table composed of the two players with combat characteristics
  */
  // function initFighters(data){
  //   //on créer un tab avec J1 et J2 comportant des caractéristiques
  //   //create a tab with J1 and J2 with features
  // //  let players = [];
  //   players.push({'name':data.player1,'LP':10,'def':0},{'name':data.player2,'LP':10,'def':0});

  //   return players }};
