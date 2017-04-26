function uniKeyCode(event) {
    var key = event.keyCode;
    //recall a memory 1 is 49 i char
    if (key == 49) {
        window.location = 'recallhome.html';
    }
    //record a memory
    if (key == 55) {
        window.location = 'recordhome.html';
    }
}