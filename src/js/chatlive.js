var jobId = JSON.parse(localStorage.job_id)
var url = baseUrl + `/api/v1/job/` + jobId;
//check_button
var user_business_id;
var user_freelancer_id;
var userName_Business;
var userName_freelancer;
var cmt_freelancer;
var cmt_business;
var grade_freelancer;
var grade_business;
var status_job;
var star_rating;
var proposal_id;
var jobId = JSON.parse(localStorage.job_id)
const urlJobDetail = baseUrl + `/api/v1/job/` + jobId;
var lastest_room_key;
// var person;
// var person2;
// var room_key;
var chat_room_id;
var fileAttachment;
function reply(value) {
    value_int = Number(value)
    star_rating = value_int
}
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
    person = localStorage.getItem('sender_id');
    person2 = localStorage.getItem('receiver_id');
    room_key = localStorage.getItem('room_key');
    lastest_room_key = localStorage.getItem('lastest_room_key');
    if (room_key && lastest_room_key != null)
        room_key = lastest_room_key;
    chat_room_id = localStorage.getItem('chat_room_id');
    proposal_id = localStorage.getItem("proposal_id");
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    onLoadPage();
    if (person != null)
        reloadKeyChat(person);
    var chatKeyUsers = JSON.parse(localStorage.getItem('chatKeyUsers'));
    if (localStorage.getItem("access-token") === null) {
        document.getElementById("logout").innerHTML = "Login";
        document.getElementById("logout").setAttribute("href", "/login");
    }
    var html = '';
    var itemHtmlButton = ``
    var itemHtmlChatTitle = ``
    loadJobDetails();
    //if you're business
    const sender_id = Number(person)
    if (user_business_id == sender_id && status_job == 2) {

        itemHtmlButton = `            
            <button class="btn btn-sm btn-success buttonStatus offset-md-4" href="#" data-abc="true"  value = 3 >Job done !</button>   
            <button class="btn btn-sm btn-danger buttonStatus" href="#" data-abc="true"  value = 4 >Layoff</button> `
        itemHtmlChatTitle = `<strong>Chat with your Freelancer : ${userName_freelancer} </strong>`
    }
    //if you're freelancer
    else if (user_freelancer_id == sender_id && status_job == 2) {
        itemHtmlButton = ` <button class="btn btn-sm btn-danger buttonStatus offset-md-8" href="#" data-abc="true"  value = 5 >Quit Job </button>`
        itemHtmlChatTitle = `<strong>Chat with your Business : ${userName_Business} </strong>`
    }
    //if the bussiness layoff,done job or the freelancer quit job 
    else if (status_job == 3) {
        itemHtmlChatTitle = `<h5 class ="text-danger">The job is closed </h5>`
        if (cmt_freelancer == null && grade_freelancer == null && user_freelancer_id == sender_id) {
            itemHtmlButton = `<button class="btn btn-sm btn-warning  buttonStatus offset-md-5" href="#" data-abc="true" value = 6 > Rate business ★</button>`
        }
        else if ((cmt_business == null && grade_business == null) && user_business_id == sender_id) {
            itemHtmlButton = `<button class="btn btn-sm btn-warning buttonStatus offset-md-5" href="#" data-abc="true" value = 7 > Rate Freelancer ★</button>`
        }
        else {
            itemHtmlButton = `<button class="btn btn-sm btn-warning buttonStatus offset-md-5" href="#" data-abc="true" type="button" disabled >Job is completed !</button>`
        }
    }
    else {
        itemHtmlButton = `            
            <button class="btn btn-sm btn-success buttonStatus offset-md-8" href="#" data-abc="true" type="button"  disabled>????!</button> `
        itemHtmlChatTitle = `<strong>Error ! </strong>`
    }
    $("#Status").html(itemHtmlButton)
    $(".buttonStatus").on("click", function () {
        const status = $(this).val()
        const url = baseUrl + `/api/v1/proposals/` + proposal_id;
        let wrap = document.createElement('div');
        wrap.setAttribute('class', 'row rating pt-3');
        wrap.innerHTML = `   
                   
                    <div class="col-md-5 mr-3 rate">
                    <input onclick="reply(this.id)"  type="radio" id="5" name="rate" value=5 />
                    <label for="5" title="text">5 stars</label>
                    <input onclick="reply(this.id)"  type="radio" id="4" name="rate" value=4 />
                    <label for="4" title="text">4 stars</label>
                    <input onclick="reply(this.id)" type="radio" id="3" name="rate" value=3 />
                    <label for="3" title="text">3 stars</label>
                    <input onclick="reply(this.id)"  type="radio" id="2" name="rate" value=2 />
                    <label for="2" title="text">2 stars</label>
                    <input onclick="reply(this.id)"  type="radio" id="1" name="rate" value=1  />
                    <label for="1" title="text">1 star</label>
                   </div>  
                   <div class="pt-3 col-md-12">
                   <div class="row">
                   <label class="ml-3" for="exampleFormControlTextarea1">Comment</label>
                   <textarea  class="form-control mr-3 ml-3 comment" id="exampleFormControlTextarea1" rows="3" ></textarea>
                   </div>
                   </div>
                   <div class="alert alert-danger rounded" role="alert"  id="error" hidden>Empty name</div>`

        swal({
            title: "Rated Capacity",
            text: "Star rating with ? ",
            icon: "info",
            className: '',
            buttons: true,
            closeOnClickOutside: false,
            content: {
                element: wrap
            },

        }).then((value) => {
            const cmt_rate = $(".comment").val();
            if (cmt_rate == null || cmt_rate == "" || star_rating == null) {
                swal("Comment and star are not empty !", {
                    icon: "warning",
                });
            } else {
                swal({
                    title: "Are you sure?",
                    text: "Once click, you will not be able to recover this!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {

                        swal("Hooray! thanks for rating!", {
                            icon: "success",
                            buttons: false
                        });

                        var param;
                        if (status == 3 || status == 4) {
                            param = {
                                clientComment: cmt_rate,
                                clientGrade: star_rating,
                                id: proposal_id,
                                proposal_status_catalog_id: status
                            }
                        } else if (status == 5) {
                            param = {
                                freelancerComment: cmt_rate,
                                freelancerGrade: star_rating,
                                id: proposal_id,
                                proposal_status_catalog_id: status
                            }
                        }
                        else if (status == 6) {
                            param = {
                                freelancerComment: cmt_rate,
                                freelancerGrade: star_rating,
                                id: proposal_id
                            }
                        }
                        else if (status == 7) {
                            param = {
                                clientComment: cmt_rate,
                                clientGrade: star_rating,
                                id: proposal_id
                            }
                        }
                        console.log(param)
                        $.ajax({
                            type: 'PATCH',
                            url: url,
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(param),
                            dataType: "JSON",
                            async: false,
                            success: function (res) {
                                setTimeout(() => window.location.href = '/live-exch', 2000);
                            },
                            error() {
                                swal("Something was wrong !", {
                                    icon: "warning",
                                });
                            },
                        })

                    }

                });
            }

        });
    })

    chatKeyUsers.forEach(item => {
        html += `<div class="chat-list-item" id="${item.id}"  onclick="clickItemChat('${item.id}','${item.senderId}', '${item.receiverId}', '${item.chatRoomKey}', '${item.proposalId}')"><p>${item.jobName}</p>  </div></a>`;
        //check user type   


    });
    $('#chatTitle').html(itemHtmlChatTitle);
    $('#chat-list').html(html);
    var element = document.getElementById(chat_room_id);
    console.log(document.getElementById(chat_room_id))
    if (element != null)
        element.classList.add("active");


});
// get job_detail to check user type
function loadJobDetails() {


    $.ajax({
        type: 'GET',
        url: urlJobDetail,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        async: false,
        success: function (res) {
            var listProposal = res.result.proposals;
            console.log(listProposal);
            const pid = proposal_id;

            for (let i = 0; i < listProposal.length; i++) {
                if (listProposal[i].id == pid) {

                    user_freelancer_id = listProposal[i].user_freelancer_id;
                    userName_freelancer = listProposal[i].freeLancerName
                    cmt_freelancer = listProposal[i].freelancerComment
                    grade_freelancer = listProposal[i].freelancerGrade
                    cmt_business = listProposal[i].clientComment
                    grade_business = listProposal[i].clientGrade
                }
                else {
                    // alert("sai vong lap")
                }
            }
            userName_Business = res.result.userBusiness.user.fullName;
            status_job = res.result.status;
            user_business_id = res.result.user_business_id;
        }
    })
}

var person = localStorage.getItem('sender_id');
var person2 = localStorage.getItem('receiver_id');
var room_key = localStorage.getItem('room_key');
var fileAttachment;

function onLoadPage() {
    onLoadMessage();
}
var sizeOfData = 10;
function onLoadMessage(sizeOfPage) {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    $('#chat-content').html('');
    // document.getElementById("chat-content").html = '';
    var size = 10;
    if (sizeOfPage != null)
        size = sizeOfPage;
    sizeOfData = 0;
    firebase.database().ref(room_key).limitToLast(size).on("child_added", function (snapshot) {
        var html = '';
        sizeOfData++;
        var senderJob = snapshot.val().sender;
        var messageJob = snapshot.val().message;
        if (senderJob == person)
            html += '<div class="media media-chat media-chat-reverse"><div class="media-body"><p>' + messageJob + '</p></div></div>';
        else if (senderJob == person2)
            html += '<div class="media media-chat"><div class="media-body"><p>' + messageJob + '</p></div></div>';
        document.getElementById('chat-content').innerHTML += html;
        var objDiv = document.getElementById("chat-content");
        objDiv.scrollTop = objDiv.scrollHeight;
    });

}

function sendmessage(mess) {
    debugger
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    if (fileAttachment != null) {
        sendFile();
    } else {
        if (!mess || mess == '')
            mess = document.getElementById("input-message").value;
        var sender = person;
        if (mess == '' || sender == null)
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

function clickItemChat(id, senderId, receiverId, roomKeyId, proposalId) {
    person = senderId;
    person2 = receiverId;
    room_key = roomKeyId;
    $('.chat-list-item').removeClass('active');
    var element = document.getElementById(id);
    element.classList.add("active");
    onLoadMessage();
    localStorage.setItem('chat_room_id', id);
    localStorage.setItem('sender_id', senderId);
    localStorage.setItem('receiver_id', receiverId);
    localStorage.setItem('room_key', roomKeyId);
    localStorage.setItem('lastest_room_key', lastest_room_key);
    localStorage.setItem('proposal_id', proposalId);
    sizeOfOnePageChat = 10;
    loadJobDetails();
}

function reloadKeyChat(sender_id) {
    $.ajax({
        type: "POST",
        url: baseUrl + "/api/v1/chatkeyuser/getbysender?senderId=" + sender_id,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                String(localStorage.getItem("access-token"))
            );
        },
        dataType: "JSON",
        async: false,
        success: function (res) {
            localStorage.setItem("chatKeyUsers", JSON.stringify(res.result));
        },
        error() {
            console.log("sai");
        },
    })
}
window.onbeforeunload = function () {
    lastest_room_key = room_key;
    localStorage.setItem('room_key', null);
};
var sizeOfOnePageChat = 10;
$('#chat-content').scroll(function () {
    if ($('#chat-content').scrollTop() == 0) {
        if (sizeOfData >= sizeOfOnePageChat) {
            sizeOfOnePageChat += 10;
            onLoadMessage(sizeOfOnePageChat);
        }
    }
});
function loadMoreMessage() {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    // $('#chat-content').html('');
    // document.getElementById("chat-content").html = '';
    var size = 10;

    firebase.database().ref(room_key).endAt(11).limitToLast(10).on("child_added", function (snapshot) {
        var html = '';
        var senderJob = snapshot.val().sender;
        var messageJob = snapshot.val().message;
        console.log(messageJob)
        if (senderJob == person)
            html += '<div class="media media-chat media-chat-reverse"><div class="media-body"><p>' + messageJob + '</p></div></div>';
        else if (senderJob == person2)
            html += '<div class="media media-chat"><div class="media-body"><p>' + messageJob + '</p></div></div>';
        $('#chat-content').prepend(html);
        // ('#' + sender).prepend(tempHtml);
        // var objDiv = document.getElementById("chat-content");
        // objDiv.scrollTop = objDiv.scrollHeight;
    });
}