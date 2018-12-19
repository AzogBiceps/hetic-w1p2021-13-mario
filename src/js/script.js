oxo.inputs.listenKey('enter', function() {

  if (oxo.screens.getCurrentScreen() !== 'home') {

    oxo.screens.currentScreen = "home"
    
    oxo.screens.loadScreen('home', (callback) => {
      console.log(callback)
    });
  }
});

oxo.inputs.listenKey('enter', function() {

  if (oxo.screens.getCurrentScreen() == 'home') {

    oxo.screens.currentScreen = "game"
  }
});





// // Lancer jeu tout bouton homepage
// document.addEventListener("keydown", function(event) {
//   window.location.href = "game";
// });