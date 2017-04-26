function uniKeyCode(event) {
    var key = event.keyCode;
    //go back to record or recall homepage
    if (key == 55) {
        window.location = 'recordrecall.html';
    }
    //continue onto the next page
    if (key == 57) {
        window.location = 'recordandsave.html';
    }
}