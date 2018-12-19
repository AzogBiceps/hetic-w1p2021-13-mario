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



let data = {
  player1: '',
  player2: '',
  map: ''
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
  let map;

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

function game(){
  console.log("GameVie")
}









/** PARTIE GAME */

function game(){
  //création du tableau des joueurs avec des stats de base
  let players = initFighters(data);

  // si turn = true J1 joue sinon J2 joue
  let turn = true;

  while(getLife(players[0])!=0 && getLife(players[1])!=0){
    if(turn){ //J1 Joue
      // ici il faut récuperer la touche de l'utilisateur 1 et mettre l'action dans la fonction a la place de atk exemple: atk,soin,def
      action(turn,players,'atk');
      turn = !turn;
    } else {
      // ici il faut récuperer la touche de l'utilisateur 2 et mettre l'action dans la fonction a la place de atk exemple: atk,soin,def
      action(turn,players,'atk');
      turn = !turn;
    }
  }

  //J1 a toujours de la vie il gagne
  if(getLife(players[0]) > 0){
    //ici il faut charger la page final avec j1 en gagnant
    console.log('J1 a gagné');
  } else { //ici il faut charger la page final avec j2 en gagnant
    console.log('J2 a gagné')  ;
  }
}


/**
* action réalisé par un personnage
* @param {turn} boolean - true si j1 joue et false si j2 joue
* @param {players} array - tableau des objets joueurs
* @param {type} string - action du joueur
*/
function action(turn,players,type){
  let player1 = players[0];
  let player2 = players[1];

  //J1 joue
  if(turn){
      //action en fonction du type
      switch(type) {
        case 'heal':
          heal(player1);
          break;
        case 'def':
          def(player1);
          break;
        default:
          attack(turn,players);
      }
  } else {
      //action en fonction du type
      switch(type) {
        case 'heal':
          heal(player2);
          break;
        case 'def':
          def(player2);
          break;
        default:
          attack(turn,players);
      }
    }
}

/**
* Un joueur attaque l'autre
* @param {turn} boolean - true si j1 joue et false si j2 joue
* @param {players} array - tableau des objets joueurs
*/
function attack(tour,players){
  let player1 = players[0];
  let player2 = players[1];

  //J1 joue
  if(tour){
    //J2 est en mode def
    if(player2.def != 0){
      semiAttack(player2);
      player2.def = 0;
    } else {//J2 est en mode normal
      fullAttack(player2);
    }
    return false;
  } else {
    //J1 est en mode def
    if(player1.def != 0){
      semiAttack(player1);
      player1.def = 0;
    } else {//J2 est en mode def
      fullAttack(player1);
    }
    return true;
  }
}



//a modifier pour la valeur si vous voulez
function heal(player){
  player.LP +=1;
}

//le joueur passe en mode defense et gagne 0.5 de def prochain tour (=50% de reduction des dégats)
//a modifier pour la valeur si vous voulez
function def(player){
  player.def +=0.5;
}

//renvoit la vie du joueur
function getLife(player){
  return player.LP;
}

//effectue une attaque complete avec 8/10 de succes
function fullAttack(player){
  //creation d'un nombre aleatoire entre 1 et 10
  succes = Math.floor((Math.random() * 10) + 1);
  if(succes > 2){ // si le nombre est superieur a 2 succes
    player.LP -= 1;
  } else { // sinon fail
    //rater a vous de voir pour l'action
  }
}

//effectue une attaque sur un joueur en mode defense
function semiAttack(player){
  //le coup est toujours reussi en mode def
  player.LP -= 0.5;
}


/**
* Initialise l'état initial des deux combatans
* @param {datas} tableau - contient les deux joueurs et la map
* @return {players} -Tableau composé des deux joueurs avec des caractéristiques de combat
*/
function initFighters(datas){

  //on créer un tab avec J1 et J2 comportant des caractéristiques
  let players = [];
  players.push({'name':datas.player1,'LP':10,'def':0},{'name':datas.player2,'LP':10,'def':0});

  return players;
}