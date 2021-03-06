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

    // set the key functions
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
        //begin recording on key press 1 
        if (key == 49) {
            if ( recording_status == 'inactive' ) {
                start();
            } 
        }

        //stop recording on key press 4
        if (key == 52) {
            if ( recording_status == 'recording' ) {
                stop();
            }      
        }

        //replay recording on key press 3
        if (key == 51) {
            play();   
        }

        //submit recording on key press 9 
        if (key == 57) {
            save();
        }       

    }

    // start recording function
    function start() {
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

    // stop recording function
    function stop() {
        mediaRecorder.stop();
        // button.classList.remove( 'recording' );
        recording_status = 'inactive';
      
        if ( navigator.vibrate ) navigator.vibrate( [ 200, 100, 200 ] );

        // var now = Math.ceil( new Date().getTime() / 1000 );

        // var t = parseTime( now - time );

    }

    //play back the recording
    function play() {
        audio.play();
    }

    //display date and time
    function getDateTime() {
      var day = new Date;
      var newd = day.getDay();
      var newm = day.getUTCMonth();
      var d = day.getUTCDate();
      var y = day.getUTCFullYear();

      week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      //12hr time format
      var date = new Date;
      var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
      var am_pm = date.getHours() >= 12 ? "PM" : "AM";
      hours = hours < 10 ? "0" + hours : hours;
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      time = hours + ":" + minutes + ":" + seconds + " " + am_pm;

      //save as string
      return week[newd] + ', ' + month[newm] + ' ' + d + ', ' + y + time; 
    }


    //save the recording
    function save() {

                // blob = new Blob( chunks, type );
                // audioSrc = window.URL.createObjectURL( blob );

                // audio.src = audioSrc;

                // chunks = [];

        var clipName = getDateTime(); 
        console.log(clipName)
        a.download = 'record.ogg';
        // a.href = audioSrc;
        // document.body.appendChild( a );
        // a.click();

        // document.body.removeChild( a );
    }

} else {
    if ( location.protocol != 'https:' ) {
      msg_box.innerHTML = lang.mic_error + '<br>'  + lang.use_https;
    } else {
      msg_box.innerHTML = lang.mic_error; 
    }
    // button.disabled = true;
}



