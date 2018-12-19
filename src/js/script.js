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