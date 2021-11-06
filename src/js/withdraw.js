var userInfo;

$(document).ready(function(){
userInfo = JSON.parse(localStorage.getItem("user-info"));
$("#user-name").html(userInfo.username);
$("#full-name").html(userInfo.fullName);
$("#email-user").html(userInfo.email);

})

function drawMoney(){ 
    const amount =  $("#amount").val();  
    const url = baseUrl + `/api/v1/users/cash?amount=${amount}`;
    const token = localStorage.getItem('access-token');
    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        confirmButtonText: 'Submit',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            $.ajax({
                type: "GET",
                url: url,
                contentType: "application/json; charset=utf-8",
                beforeSend: function (xhr) {
                  xhr.setRequestHeader(
                    "Authorization", token
                  );
                },
                dataType: "JSON",
                async: false,
                success: function (res) {
                    Swal.fire('Saved!', '', 'success')
                    window.location ="/history-deposit"
                }
            })
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
   
    
}