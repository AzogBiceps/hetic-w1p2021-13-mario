/* $('.element').each(function() {
    $(this).mouseover(function() {
        $(this).addClass('active');
      $('.stage').children('.element').not('.active').addClass('inactive');
    });
    $(this).mouseleave(function() {
        $(this).removeClass('active');
        $('.stage').children('.element').not('.active').removeClass('inactive');
    });
}); */

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
        console.log(players);

    })
})

document.getElementById("back").addEventListener("click", function(){
    console.log("fleches")
    // data.player1 = players[0]
    players = []
    count = 0
    elements.forEach(element => {
        element.classList.remove("selected")
        element.classList.remove("selectedPlayerTwo")
    })
    
    //document.getElementById("arrow").addEventListener("click", function(){
        //console.log("fleches")
    // window.location = "game.html?p1=" + players[0] + "&p2=" +players[1];
})

/*var elements = document.querySelectorAll('div.element');
var count = 0;
let players = []
elements.forEach(element => {
    element.addEventListener('click', function() {
        element.addEventListener('click', function() {
            if (count == 1) {
                element.classList.remove("selected");
                count = 0;
            } else {
                element.classList.remove("selectedPlayerTwo");
                count = 1;
            }
           
        });
        if (count == 0){
            players.push(element.className.split(' ')[1])
            element.classList.add("selected");
            count++;
        } else if (count == 1 && !element.className.includes("selected")) {
            players.push(element.className.split(' ')[1])
            element.classList.add("selectedPlayerTwo");
            count++;
        }
    })
})
document.getElementById("arrow").addEventListener("click", function(){
    console.log("fleches")
    //data.player1 = players[0]
    players = []
    count = 0
    elements.forEach(element => {
        element.classList.remove("selected")
        element.classList.remove("selectedPlayerTwo")
    })
    */