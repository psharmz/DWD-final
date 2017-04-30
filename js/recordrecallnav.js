function uniKeyCode(event) {
    var key = event.keyCode;
    // console.log("the key binding is " + key);
    //recall a memory
    if (key == 55) {
        window.location = 'recallhome.html';
    }
    //record a memory
    if (key == 49) {
        window.location = 'recordhome.html';
    }
}71