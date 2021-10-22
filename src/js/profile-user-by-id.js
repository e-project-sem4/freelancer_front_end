var url_string = window.location.href
var urlId = new URL(url_string);
var id = urlId.searchParams.get("id");
const url = baseUrl + `/api/v1/users/` + id;
const token = localStorage.getItem('access-token')
$(document).ready(function () {
    // $.ajax({
    //     type: 'GET',
    //     url: url,
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "JSON",
    //     beforeSend: function (xhr){
    //         xhr.setRequestHeader(
    //             "Authorization", token
    //         );
    //     },
    //     async: false,
    //     success: function (res) {
    //         let itemTempHtml = "";
    //         const userDetails = res.result;
    //         itemTempHtml = `
    //
    //         `
    //         $('#user-profile-by-id').html(itemTempHtml);
    //
    //     }
    //
    // })
    alert(id)

});