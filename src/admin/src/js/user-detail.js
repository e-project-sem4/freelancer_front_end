var url_string = window.location.href
var url123 = new URL(url_string);
var c = url123.searchParams.get("id");

$(document).ready(function () {
    if (localStorage.getItem("access-token-admin") == null) {
        location.href = "/admin/login"
    }

    loadDetails();
});

function loadDetails() {
    var current_user_id;
    if (localStorage.getItem('user-info') != null)
        current_user_id = JSON.parse(localStorage.getItem('user-info')).id;

    const url = baseUrl + `/api/v1/users/` + c;
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            String(localStorage.getItem("access-token-admin"))
          );
        },
        async: false,
        success: function (res) {
            const obj = res.result;
            console.log(obj)
            var itemHtml = "";
            itemHtml += `
            <p class="list-item-heading mb-4">Summary</p>
            <div style="display: flex;justify-content: center;">
                <a  href="#">
                   <img alt="Profile Picture" src="${obj.user.thumbnail}" class="img-thumbnail border-1 rounded-circle list-thumbnail align-self-center" />
                </a>
            </div>
            <p style="padding-top: 20px;" class="text-muted text-small mb-2">Name</p>
            <p class="mb-3">
                ${obj.user.fullName}
            </p>
            <p class="text-muted text-small mb-2">Username</p>
            <p class="mb-3">
                ${obj.user.username}
            </p>
            <p class="text-muted text-small mb-2">Balance</p>
            <p class="mb-3">
            ${obj.user.Balance}
            </p>

            <p class="text-muted text-small mb-2">Date</p>
            <p class="mb-3">
            ${new Date(obj.user.updateAt).toLocaleDateString()}
            </p>

            <p class="text-muted text-small mb-2">Labels</p>
            <div>
                <p class="d-sm-inline-block mb-1">`;
                if(obj.business.id != null){
                    itemHtml +=
                `
                <a href="#">
                <span class="badge badge-pill badge-outline-theme-3 mb-1">BUSINESS</span>
                </a>
                `
                }
               if(obj.freelancer.id != null){
                   itemHtml+=
                   `
                </p>
                <p class="d-sm-inline-block  mb-1">
                    <a href="#">
                        <span class="badge badge-pill badge-outline-secondary mb-1">FREELANCER</span>
                    </a>
                </p>
                   `
               }   
               itemHtml+=
            `</div>            
            `
            $('#detail').html(itemHtml);
        }
    })
}








