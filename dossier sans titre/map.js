var elements = document.querySelectorAll('div.element');
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
            // console.log('deja choisi');
        }
        map = element.className.split(' ')[1]
        console.log(map)
    });
})

document.getElementById("arrow").addEventListener("click", function(){
    console.log("fleches")
    window.location = "game.html?p1=" + map;
})
