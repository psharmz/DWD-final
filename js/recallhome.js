var position = 1;
var up = 56; //2
var down = 50; //8
var left = 52; //4
var right = 54; //6

var next = 110; // UPDATED

var back = 48; 

//1-103 2-104 3-105 4-100 5-101 6-102 7-97 8-98 9-99  *-96  #-110

function uniKeyCode(event) {
    var key = event.keyCode;
    console.log("the key binding is " + key); 

    if (key == left) {
        if(position>1){
            document.getElementById("opacity"+position.toString()).style.opacity = "0.2";
            document.getElementById("opacity"+(position-1).toString()).style.opacity = "1";
            position--;
        }
        else if(position == 1){
            document.getElementById("opacity"+position.toString()).style.opacity = "0.2";
            position = 14;
            document.getElementById("opacity"+position.toString()).style.opacity = "1";
        }
    }

    if (key == right) {
        if(position<14){
            document.getElementById("opacity"+position.toString()).style.opacity = "0.2";
            document.getElementById("opacity"+(position+1).toString()).style.opacity = "1";
            position++;
        }
        else if(position == 14){
            document.getElementById("opacity"+position.toString()).style.opacity = "0.2";
            position = 1;
            document.getElementById("opacity"+position.toString()).style.opacity = "1";
        }
    }

    if (key == up) {
        if(position>4){
            document.getElementById("opacity"+position.toString()).style.opacity = "0.2";
            document.getElementById("opacity"+(position-4).toString()).style.opacity = "1";
            position = position-4;
        }
        else if(position == 1){
            document.getElementById("opacity"+position.toString()).style.opacity = "0.2";
            position = 13;
            document.getElementById("opacity"+position.toString()).style.opacity = "1";
        }
        else if(position == 2){
            document.getElementById("opacity"+position.toString()).style.opacity = "0.2";
            position = 14;
            document.getElementById("opacity"+position.toString()).style.opacity = "1";
        }
        else if(position == 3){
            document.getElementById("opacity"+position.toString()).style.opacity = "0.2";
            position = 11;
            document.getElementById("opacity"+position.toString()).style.opacity = "1";
        }
        else if(position == 4){
            document.getElementById("opacity"+position.toString()).style.opacity = "0.2";
            position = 12;
            document.getElementById("opacity"+position.toString()).style.opacity = "1";
        }
    }

    if (key == down) {
        if(position<11){
            document.getElementById("opacity"+position.toString()).style.opacity = "0.2";
            document.getElementById("opacity"+(position+4).toString()).style.opacity = "1";
            position = position+4;
        }
        else if(position == 11){
            document.getElementById("opacity"+position.toString()).style.opacity = "0.2";
            position = 3;
            document.getElementById("opacity"+position.toString()).style.opacity = "1";
        }
        else if(position == 12){
            document.getElementById("opacity"+position.toString()).style.opacity = "0.2";
            position = 4;
            document.getElementById("opacity"+position.toString()).style.opacity = "1";
        }
        else if(position == 13){
            document.getElementById("opacity"+position.toString()).style.opacity = "0.2";
            position = 1;
            document.getElementById("opacity"+position.toString()).style.opacity = "1";
        }
        else if(position == 14){
            document.getElementById("opacity"+position.toString()).style.opacity = "0.2";
            position = 2;
            document.getElementById("opacity"+position.toString()).style.opacity = "1";
        }
    }

    if (key == next){
        window.location = 'recall_'+position.toString()+'.html';
    }

    if (key == back){
        window.location = 'recordrecall.html';
    }
}