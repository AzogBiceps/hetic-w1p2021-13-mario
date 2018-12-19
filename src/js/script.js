oxo.inputs.listenKey('enter', function() {

  if (oxo.screens.getCurrentScreen() !== 'home') {

    oxo.screens.currentScreen = "home"
    
    oxo.screens.loadScreen('home', (callback) => {
      console.log(callback)
    });
  }
});
