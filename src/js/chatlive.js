
$(document).ready(function () {

    const firebaseConfig = {
        apiKey: "AIzaSyAeLh4a8GTJk0SFmWlC4DuZsNYCYhs3D1Q",
        authDomain: "august-list-328603.firebaseapp.com",
        databaseURL: "https://august-list-328603-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "august-list-328603",
        storageBucket: "august-list-328603.appspot.com",
        messagingSenderId: "948951260730",
        appId: "1:948951260730:web:241f74606e09ee93135f03",
        measurementId: "G-GS4LMG5QB1"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    onLoadPage();
});
var person = localStorage.getItem('sender_id');
var person2 = localStorage.getItem('receiver_id');
var room_key = localStorage.getItem('room_key');
function onLoadPage() {
    onLoadMessage();
}

function onLoadMessage() {
    $('#message-box').html('');
    var size = 10;
    firebase.database().ref(room_key).limitToLast(size).on("child_added", function (snapshot) {
        var html = '';
        var senderJob = snapshot.val().sender;
        var messageJob = snapshot.val().message;
        if (senderJob == person)
            html += '<div class="media media-chat"><div class="media-body"><p>' + messageJob + '</p></div></div>';
        else if (senderJob == person2)
            html += '<div class="media media-chat media-chat-reverse"><div class="media-body"><p>' + messageJob + '</p></div></div>';
        document.getElementById('chat-content').innerHTML += html;
        var objDiv = document.getElementById("chat-content");
        objDiv.scrollTop = objDiv.scrollHeight;
    });

}

function sendmessage(mess) {
    if (!mess || mess == '')
        mess = document.getElementById("input-message").value;
    var sender = person;
    if (mess == '')
        return;
    firebase.database().ref(room_key).push().set({
        "sender": sender,
        "message": mess,
        "status": 0
    });
    document.getElementById("input-message").value = '';
    var objDiv = document.getElementById("chat-content");
    objDiv.scrollTop = objDiv.scrollHeight;
    return false;
}
$("#input-message").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        sendmessage();
    }
});

function sendFile() {
    const ref = firebase.storage().ref();
    const file = document.querySelector("#input-file").files[0];
    console.log(file);
    const name = file.name;
    const metadata = {
        contentType: file.type
    }
    const task = ref.child(name).put(file, metadata);
    task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
        sendmessage(url);
        onLoadMessage();
    })
    return false;
}