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
var chat_room_id;
$(document).ready(function () {

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const data = localStorage.getItem('user-info')
    if (data != null) {
        const output = document.getElementById('username')
        const obj = JSON.parse(data);
        output.innerHTML = obj.username;
        if (localStorage.getItem("access-token") === null) {
            document.getElementById("logout").innerHTML = "Login";
            document.getElementById("logout").setAttribute("href", "/login");
        }
        var html = '';
        if (localStorage.getItem("access-token") == null) {
            document.getElementById('dropdownMessage').style.display = "none";
        }
        var countMess = false;
        for (let index = 0; index < obj.chatKeyUsers.length; index++) {
            const item = obj.chatKeyUsers[index];
            var frontSender;
            if (frontSender != item.receiverId) {
                html += `<a id='${item.receiverId}' class="dropdown-item" href="#" onclick="goToChat('${item.id}', '${item.senderId}', '${item.receiverId}', '${item.jobId}', '${item.chatRoomKey}')">`;
                firebase.database().ref(item.chatRoomKey).limitToLast(1).on("child_added", function (snapshot) {
                    var status = snapshot.val().status;
                    var sender = snapshot.val().sender;
                    frontSender = item.receiverId;
                    if (status == 0) {
                        countMess = true;
                        var tempHtml = `<span style="color: red; font-size: 20px">&bull;</span>`;
                        $('#' + sender).prepend(tempHtml);
                    }
                    if (localStorage.getItem('room_key') == item.chatRoomKey) {
                        updateStatusChat(item.chatRoomKey);
                    } else {
                        if (countMess != 0) {
                            $('#dot-alert').html(`<span style="color: red">&bull;</span>`);
                        }
                    }
                });
                html += item.jobName + `</a>`;
                if (index == obj.chatKeyUsers.length - 1) {
                    $('#message-chat-box-header').html(html);
                }
            }
        }
        $('#profile').on('click', function (event) {
            location.href = "/profile"
        });
        $('#changePassword').on('click', function (event) {
            location.href = "/ChangePassword"
        });
    }

})

function goToChat(id, sender_id, receiver_id, job_id, room_key) {
    localStorage.setItem('chat_room_id', id);
    localStorage.setItem('sender_id', sender_id);
    localStorage.setItem('receiver_id', receiver_id);
    localStorage.setItem('job_id', job_id);
    localStorage.setItem('room_key', room_key);
    updateStatusChat(room_key);
    setTimeout(function () {
        location.href = "/live-exch";
    }, 1000);
}
function updateStatusChat(room_key) {
    firebase.database().ref(room_key).on("child_added", function (snapshot) {
        firebase.database().ref().child('/' + room_key + '/' + snapshot.key).update({
            status: 1
        });
    });
}