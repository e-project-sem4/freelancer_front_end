var user_business_id;
var url = baseUrl + `/api/v1/job/` + JSON.parse(localStorage.job_id);
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
$(document).ready(function () {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    onLoadPage();
    const data = localStorage.getItem('user-info');
    const obj = JSON.parse(data);
    if (localStorage.getItem("access-token") === null) {
        document.getElementById("logout").innerHTML = "Login";
        document.getElementById("logout").setAttribute("href", "/login");
    }
    var html = '';
    var itemHtmlButton =``
    var itemHtmlChatTitle =``
    obj.chatKeyUsers.forEach(item => {
        html += `<div class="chat-list-item" id="'${item.id}'" onclick="clickItemChat('${item.id}','${item.senderId}', '${item.receiverId}', '${item.chatRoomKey}')"><p>'${item.jobName}'</p>  </div></a>`;
        console.log(item);      
        //check user type
        if (user_business_id == item.senderId) {
            itemHtmlButton = ` <button class="btn btn-danger" href="#" data-abc="true" onclick="ButtonDrop()" >Layoff</button>`
            itemHtmlChatTitle = `<strong>Chat with your freelancer</strong>`
        }
        else {
            itemHtmlButton = ` <button class="btn btn-danger" href="#" data-abc="true" onclick="ButtonDrop()" >Quit Job </button>`
            itemHtmlChatTitle = `<strong>Chat with your business</strong>`
        }
    });
    $("#DropOut").html(itemHtmlButton)
    $('#chatTitle').html(itemHtmlChatTitle);
    $('#chat-list').html(html);
    



});

//get job_detail to check user type
$.ajax({
    type: 'GET',
    url: url,
    contentType: "application/json; charset=utf-8",
    dataType: "JSON",
    async: false,
    success: function (res) {
        user_business_id = res.result.user_business_id;
    }
})
function ButtonDrop() {
    console.log("do nothing yet")
}

var person = localStorage.getItem('sender_id');
var person2 = localStorage.getItem('receiver_id');
var room_key = localStorage.getItem('room_key');
var fileAttachment;
function onLoadPage() {
    onLoadMessage();
}

function onLoadMessage() {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    // console.log(person);
    // console.log(person2);
    // console.log(room_key);
    $('#chat-content').html('');
    // document.getElementById("chat-content").html = '';
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
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    if (fileAttachment != null) {
        sendFile();
    } else {
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
}
$("#input-message").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        sendmessage();
    }
});

function sendFile() {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const ref = firebase.storage().ref();
    const name = fileAttachment.name;
    const metadata = {
        contentType: fileAttachment.type
    }
    const task = ref.child(name).put(fileAttachment, metadata);
    task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
        sendmessage(url);
        onLoadMessage();
    })
    fileAttachment = null;
    return false;
}

function onchangeInputFile() {
    fileAttachment = document.querySelector("#file-input-chat").files[0];
    if (fileAttachment != null) {
        document.getElementById("input-message").value = fileAttachment.name;
        document.getElementById("input-message").readOnly = true;
        document.getElementById("close-attach-file").style.display = "block";
    }
}

function onCloseAttachFile() {
    if (fileAttachment != null) {
        document.getElementById("input-message").value = '';
        document.querySelector("#file-input-chat").value = '';
        document.getElementById("input-message").readOnly = false;
        document.getElementById("close-attach-file").style.display = "none";
        fileAttachment = null;
    }
}

function clickItemChat(id, senderId, receiverId, roomKeyId) {
    person = senderId;
    person2 = receiverId;
    room_key = roomKeyId;
    var chat_list = document.getElementById('chat-list').childNodes;
    console.log(chat_list);
    // chat_list.getElementsByClassName('chat-list-item');
    for (item of chat_list) {
        item.addEventListener('click', function () {
            if (this.classList.contains('active')) {
                this.classList.remove("active");
                alert('remove');
            } else {
                alert('add');
                this.classList.add("active");
            }
        })
    }
    onLoadMessage();
}