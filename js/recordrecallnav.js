function uniKeyCode(event) {
    var key = event.keyCode;
    // console.log("the key binding is " + key);
    //recall a memory
    if (key == 55) {
        window.location = 'recallhome.html';
    }
    //record a memory
    if (key == 57) {
        window.location = 'recall_14.html';
    }
}71