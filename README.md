# kandy-hackathon
Front end for hackathon

First, npm install
Then, run node index.js

Add the kandy javascript.

  <script src="https://kandy-portal.s3.amazonaws.com/public/javascript/kandy/2.3.0/kandy.js"></script>

Create the incoming-video stylesheet entry:

    #incoming-video {
      background: url('/assets/quick_starts/video_placeholder.png') no-repeat center;
      background-color: #000;
      background-size: contain;
      height: 300px;
    }

If you don't change the background's url entry, you'll get 404 errors.

In $(document).ready (or the non jquery equivalent) you can add the audio source.


    // Create audio objects to play incoming calls and outgoing calls sound
    var $audioRingIn = $('<audio>', { loop: 'loop', id: 'ring-in' });
    var $audioRingOut = $('<audio>', { loop: 'loop', id: 'ring-out' })

    // Load audio source to DOM to indicate call events
    var audioSource = {
      ringIn: [
        { src: 'https://kandy-portal.s3.amazonaws.com/public/sounds/ringin.mp3', type: 'audio/mp3' },
        { src: 'https://kandy-portal.s3.amazonaws.com/public/sounds/ringin.ogg', type: 'audio/ogg' }
      ],
      ringOut: [
        { src: 'https://kandy-portal.s3.amazonaws.com/public/sounds/ringout.mp3', type: 'audio/mp3' },
        { src: 'https://kandy-portal.s3.amazonaws.com/public/sounds/ringout.ogg', type: 'audio/ogg' }]
      };

      audioSource.ringIn.forEach(function(entry) {
        var $source = $('<source>').attr('src', entry.src);
        $audioRingIn.append($source);
      });

      audioSource.ringOut.forEach(function(entry) {
        var $source = $('<source>').attr('src', entry.src);
        $audioRingOut.append($source);
      });

Setup your Kandy listeners

    kandy.setup({
      listeners: {
        callinitiated: onCallInitiate,
        callinitiatefailed: onCallInitiateFail,
        callrejected: onCallRejected,
        callrejectfailed: onCallRejectFailed,
        callignored: onCallIgnored,
        callignorefailed: onCallIgnoreFailed,
        callincoming: onCallIncoming,
        callanswered: onCallAnswer,
        callanswerFailed: onCallAnsweredFailed,
        oncall: onCall,
        callended: onCallTerminate,
        callendfailed: onCallEndedFailed
      },
      remoteVideoContainer: $('#incoming-video')[0],
      localVideoContainer: $('#outgoing-video')[0],
    });

Make sure you use the correct containers for remoteVideoContainer and localVideoContainer (if you want to see yourself when talking)

Setup your event handlers for each onCall event.  I'm not pasting those here because there's a lot of them and you can just look at public/index.html.

Setup event handlers for the answer and end buttons:

  // Event handler for call answer button
  $('#answer-call-btn').on('click', function() {
    console.log("Call id in answer-call-btn: "+callId);
    kandy.call.answerCall(callId, true);
    UIState.oncall();
  })

  // Event handler for call end button
  $('#end-call-btn').on('click', function() {
    kandy.call.endCall(callId);
    UIState.initial();
  })

Setup login user buttons and login user functions

    $('#login-user-1').click(function(e) {
      e.preventDefault();
      console.log("clicked user 1");
      loginUser1();
    });
    $('#login-user-2').click(function(e) {
      e.preventDefault();
      console.log("clicked user 2");
      loginUser2();
    });
    function loginUser1() {
      $('#status').html("Logging in... please wait...");
      kandy.login(projectAPIKey, user1, password1, function() {
        UIState.authenticated(user1)
      },
      function() {
        console.log("failed logging in");
      });
    }

    function loginUser2() {
      $('#status').html("Logging in... please wait...");
      kandy.login(projectAPIKey, user2, password2, function(msg) {
        UIState.authenticated(user2)
      });
    }

I realize this isn't a great tutorial, but I was busy making artwork for my actual hackathon project.


![Shady Penguins](https://photos-4.dropbox.com/t/2/AAA7KCWGlnfOL1pLejo62VdDAMjAdT7XfGtJ3ZFib_vfWQ/12/23413808/jpeg/32x32/1/1439085600/0/2/2015-08-08%2017.03.37.jpg/CLCIlQsgASACIAMgBCAFIAYgBygBKAIoBw/KnjGQlPnC7_h6vU2FK-rls589js1psUzhohqZpVHV4E?size=1024x768&size_mode=2)



