var position = 1;
var maxposition = 2;
var navigate = 87; //w FOR NOW change this later
var play = 65; //a FOR NOW change this later

var mem_time = ''; 

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
            if(position < maxposition) {
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
            else if(position == maxposition){
                document.getElementById("entry"+(position).toString()).classList.remove("selected-entry");
                document.getElementById('audio'+(position).toString()).pause();
                document.getElementById('audio'+(position).toString()).currentTime = 0;

                position = 1;

                document.getElementById("entry"+(position).toString()).classList.add("selected-entry");
                document.getElementById('audio'+(position).toString()).play();

                console.log("we are now hitting this");
            }

        }

        //start and stop recording on key press 1 
        if (key == 49) {
            if ( recording_status == 'inactive' ) {
                record();
                mem_time = getDateTime();
            } else stop(); 
        }

        //replay recording on key press 3
        if (key == 51) {
            replay();     
        }

        //submit recording, add it to the page on press 9 
        if (key == 57) {
            save();
        }   

    }

    // start recording function
    function record() {

        document.getElementById('audio'+(position).toString()).pause();
        document.getElementById('audio'+(position).toString()).currentTime = 0;

        navigator.mediaDevices.getUserMedia( { 'audio': true } ).then( function ( stream ) {
            mediaRecorder = new MediaRecorder( stream );
            mediaRecorder.start();

            // button.classList.add( 'recording' );
            recording_status = 'recording';

          
            if ( navigator.vibrate ) navigator.vibrate( 150 );

            time = Math.ceil( new Date().getTime() / 1000 );


            mediaRecorder.ondataavailable = function ( event ) {
                chunks.push( event.data );
            }

            mediaRecorder.onstop = function () {
                stream.getTracks().forEach( function( track ) { track.stop() } );

                blob = new Blob( chunks, type );
                audioSrc = window.URL.createObjectURL( blob );

                audio.src = audioSrc;

                chunks = [];
            }   

            
            
        } ).catch( function ( error ) {
            if ( location.protocol != 'https:' ) {
              msg_box.innerHTML = lang.mic_error + '<br>'  + lang.use_https;
            } else {
              msg_box.innerHTML = lang.mic_error; 
            }
            button.disabled = true;
        });
    }

    //play back the recording
    function replay() {
        audio.play();
    }

    // stop recording function
    function stop() {
        mediaRecorder.stop();
        // button.classList.remove( 'recording' );
        recording_status = 'inactive';
      
        if ( navigator.vibrate ) navigator.vibrate( [ 200, 100, 200 ] );

    }

    //save the recording
    function save() {

        maxposition++; 

        var entryName = "entry" + maxposition.toString(); 
        var audioID = "audio" + maxposition.toString();

        blob = new Blob( chunks, type );
        audioSrc = window.URL.createObjectURL( blob );

        // audio.src = audioSrc;

        // chunks = [];

        var ul = document.getElementById("voice_list");

        //create the list item element
        var li = document.createElement("li");
        li.setAttribute("class", "entry"); 
        li.setAttribute("id", entryName); 

        // timestamp as the name
        var p = document.createTextNode(mem_time); 

        //add the image
        var img = document.getElementById("sound-icon"); 
        var cln = img.cloneNode(true);

        //add the id to the audio file
        audio.setAttribute("id", audioID); 

        //need to reconstruct the voicememo

        li.appendChild(cln); 
        li.appendChild(p);
        li.appendChild(audio);

        //add it to the list
        ul.appendChild(li);

        // <li id="entry2" class="entry" >
        //     <img src="img/speaker-icon.png" class="icon" alt="icon" align="middle">
        //     <span> April 8 7:30 pm </span>
        //     <audio id="audio2">
        //         <source src="audio/1_1335.mp3" type="audio/ogg" />
        //     </audio>
        // </li>
    }

    // get the date and time 
    function getDateTime() {
      var day = new Date;
      var newm = day.getUTCMonth();
      var d = day.getUTCDate();
      var y = day.getUTCFullYear();

      month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      //12hr time format
      var date = new Date;
      var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
      var am_pm = date.getHours() >= 12 ? "pm" : "am";
      hours = hours < 10 ? "0" + hours : hours;
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      time = hours + ":" + minutes + " " + am_pm;

      //save as string
      return month[newm] + ' ' + d + ' ' + y + ' ' + time; 
    }

} else {
    if ( location.protocol != 'https:' ) {
      msg_box.innerHTML = lang.mic_error + '<br>'  + lang.use_https;
    } else {
      msg_box.innerHTML = lang.mic_error; 
    }
    // button.disabled = true;
}

