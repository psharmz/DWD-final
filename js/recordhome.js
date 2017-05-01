var position = 1;
var navigate = 87; //w FOR NOW change this later
var play = 65; //a FOR NOW change this later

if ( navigator.mediaDevices === undefined ) {
    navigator.mediaDevices = {};
}


if ( navigator.mediaDevices.getUserMedia === undefined ) {
    navigator.mediaDevices.getUserMedia = function ( constrains ) {
        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia
        if ( !getUserMedia )  {
            return Promise.reject( new Error( 'getUserMedia is not implemented in this browser' ) );
        }

        return new Promise( function( resolve, reject ) {
            getUserMedia.call( navigator, constrains, resolve, reject );
        } );
    }
}

if ( navigator.mediaDevices.getUserMedia ) {
    var recording_status = 'inactive',
        mediaRecorder,
        chunks = [],
        audio = new Audio(),
        mediaStream,
        audioSrc,
        type = {
            'type': 'audio/ogg,codecs=opus'
        },
        ctx,
        analys,
        blob;

function uniKeyCode(event) {
    var key = event.keyCode;
    console.log("the key binding is " + key); 

    //toggle through the memories
    if (key == navigate) {
        // if we are on the first element
        if(position == 1){
            console.log("we are hitting this alllllright"); 
            document.getElementById("entry"+(position).toString()).classList.remove("selected-entry");
            document.getElementById('audio'+(position).toString()).pause();
            document.getElementById('audio'+(position).toString()).currentTime = 0;

            document.getElementById("entry"+(position+1).toString()).classList.add("selected-entry");
            document.getElementById('audio'+(position+1).toString()).play();
            position++;
            console.log("the postion is now" + position.toString());
        }

        // if we are on the second element
        else if(position == 2){
            document.getElementById("entry"+(position).toString()).classList.remove("selected-entry");
            document.getElementById('audio'+(position).toString()).pause();
            document.getElementById('audio'+(position).toString()).currentTime = 0;

            document.getElementById("entry"+(position-1).toString()).classList.add("selected-entry");
            document.getElementById('audio'+(position-1).toString()).play();

            position--;
            console.log("we are now hitting this");
        }

    }

    //add recording functionality 
    if (key == )

}
