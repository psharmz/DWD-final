function uniKeyCode(event) {
    var key = event.keyCode;
    //go back to record home
    if (key == 55) {
        window.location = 'recordhome.html';
    }
    //continue onto the next page
    if (key == 57) {
        window.location = 'thanks.html';
    }
}