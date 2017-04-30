var next = 190; //f
var back = 48; //g
function uniKeyCode(event) {
    var key = event.keyCode;
    //if (key == next) {
    //    window.location = homepage.html';
    //}

    if (key == back) {
        window.location = 'recallhome.html';
    }

    if (key == next) {
        window.location = 'homepage.html'; 
    }
}