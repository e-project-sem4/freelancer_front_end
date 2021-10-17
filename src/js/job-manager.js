

$(function JobManager() {
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr){
            xhr.setRequestHeader(
                "Authorization", token
            );
        },
        dataType: "JSON",
        async: false,    
        success: function (res) {

        }
    
})
})