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
    if (localStorage.getItem('user-info')) {
        $('#signup_register').css("display", "none");
    }

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const data = localStorage.getItem('user-info')
    if (data != null) {
        const output = document.getElementById('username')
        const obj = JSON.parse(data);
        output.innerHTML = obj.username;
        var chatKeyUsers = JSON.parse(localStorage.getItem('chatKeyUsers'));
        if (localStorage.getItem("access-token") === null) {
            document.getElementById("logout").innerHTML = "Login";
            document.getElementById("logout").setAttribute("href", "/login");
        }
        var html = '';
        if (localStorage.getItem("access-token") == null) {
            document.getElementById('dropdownMessage').style.display = "none";
        }
        var countMess = false;
        for (let index = 0; index < chatKeyUsers.length; index++) {
            const item = chatKeyUsers[index];
            var frontSender;
            if (frontSender != item.receiverId) {
                html += `<a id='${item.chatRoomKey}' class="dropdown-item" href="#" onclick="goToChat('${item.id}', '${item.senderId}', '${item.receiverId}', '${item.jobId}', '${item.chatRoomKey}', '${item.proposalId}')">`;
                firebase.database().ref(item.chatRoomKey).limitToLast(1).on("child_added", function (snapshot) {
                    var status = snapshot.val().status;
                    var sender = snapshot.val().sender;
                    frontSender = item.receiverId;
                    console.log(snapshot.val().status);
                    if (status == 0) {
                        if (sender != item.senderId && localStorage.getItem('room_key') != item.chatRoomKey) {
                            var tempHtml = `<span style="color: red; font-size: 20px">&bull;</span>`;
                            console.log('chatRoomKey: ' + item.chatRoomKey);
                            console.log('sender: ' + sender);
                            console.log('senderId: ' + item.senderId);
                            $('#' + item.chatRoomKey).prepend(tempHtml);
                        }
                        countMess = true;

                    }
                    if (localStorage.getItem('room_key') != null && localStorage.getItem('room_key') == item.chatRoomKey) {
                        updateStatusChat(item.chatRoomKey);
                    } else {

                        if (countMess && sender != item.senderId) {
                            $('#dot-alert').html(`<span style="color: red">&bull;</span>`);
                        }
                    }
                });
                html += item.jobName + `</a>`;
                if (index == chatKeyUsers.length - 1) {
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

function goToChat(id, sender_id, receiver_id, job_id, room_key, proposal_id) {
    localStorage.setItem('chat_room_id', id);
    localStorage.setItem('sender_id', sender_id);
    localStorage.setItem('receiver_id', receiver_id);
    localStorage.setItem('job_id', job_id);
    localStorage.setItem('room_key', room_key);
    localStorage.setItem('lastest_room_key', room_key);
    localStorage.setItem('proposal_id', proposal_id);
    updateStatusChat(room_key);
    setTimeout(function () {
        location.href = "/live-exch";
    }, 1000);
}

function updateStatusChat(room_key) {
    firebase.database().ref(room_key).on("child_added", function (snapshot) {
        if (snapshot.val().sender != localStorage.getItem('sender_id')) {
            firebase.database().ref().child('/' + room_key + '/' + snapshot.key).update({
                status: 1
            });
        }
    });
}