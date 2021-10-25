$(document).ready(function () {

    // onInstanceFirebase();

    const data = localStorage.getItem('user-info')
    // if (data)
    const output = document.getElementById('username')
    const obj = JSON.parse(data);
    output.innerHTML = obj.username

    if (localStorage.getItem("access-token") === null) {
        document.getElementById("logout").innerHTML = "Login";
        document.getElementById("logout").setAttribute("href", "/login");
    }
    // document.getElementById('dropdownMessage').style.display = "none";

    var html = '';
    obj.chatKeyUsers.forEach(item => {
        html += `<a class="dropdown-item" href="#" onclick="goToChat('${item.id}', '${item.senderId}', '${item.receiverId}', '${item.jobId}', '${item.chatRoomKey}')">` + item.jobName + `</a>`;
    });
    $('#message-chat-box-header').html(html);
    $('#profile').on('click', function (event) {
        location.href = "/profile"
    });
    $('#changePassword').on('click', function (event) {
        location.href = "/ChangePassword"
    });

})

function goToChat(id, sender_id, receiver_id, job_id, room_key) {
    localStorage.setItem('chat_room_id', id);
    localStorage.setItem('sender_id', sender_id);
    localStorage.setItem('receiver_id', receiver_id);
    localStorage.setItem('job_id', job_id);
    localStorage.setItem('room_key', room_key);
    location.href = "/live-exch";
}

function onInstanceFirebase() {
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
    console.log(firebase);
    // firebase.initializeApp(firebaseConfig);
    onLoadAlert();
}
function onLoadAlert() {
    // $('#message-box').html('');
    // var size = 10;
    // firebase.database().ref(room_key).limitToLast(size).on("child_added", function (snapshot) {
    //     var html = '';
    //     var senderJob = snapshot.val().sender;
    //     var messageJob = snapshot.val().message;
    //     if (senderJob == person)
    //         html += '<div class="media media-chat"><div class="media-body"><p>' + messageJob + '</p></div></div>';
    //     else if (senderJob == person2)
    //         html += '<div class="media media-chat media-chat-reverse"><div class="media-body"><p>' + messageJob + '</p></div></div>';
    //     document.getElementById('chat-content').innerHTML += html;
    //     var objDiv = document.getElementById("chat-content");
    //     objDiv.scrollTop = objDiv.scrollHeight;
    // });

}