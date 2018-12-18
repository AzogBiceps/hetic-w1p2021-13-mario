oxo.inputs.listenKey('enter', function() {
  if (oxo.screens.getCurrentScreen !== 'home') {
    oxo.screens.loadScreen('home', home);
  }
});