$(document).ready(function () {
  loadCountAccout();
});

function loadCountAccout() {
  const url =
  baseUrl +
  '/api/v1/admin/dashboard';
  $.ajax({
    type: "GET",
    url: url,
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
    let item = 
      `<a href="#" class="card">
      <div class="card-body text-center">
          <i class="iconsmind-Alarm"></i>
          <p class="card-text mb-0">User Account</p>
          <p class="lead text-center">${res[1]}</p>
      </div>
  </a>
  <a href="#" class="card">
      <div class="card-body text-center">
          <i class="iconsmind-Basket-Coins"></i>
          <p class="card-text mb-0">User Freelancer</p>
          <p class="lead text-center">${res[2]}</p>
      </div>
  </a>

  <a href="#" class="card">
      <div class="card-body text-center">
          <i class="iconsmind-Arrow-Refresh"></i>
          <p class="card-text mb-0">User Business</p>
          <p class="lead text-center">${res[3]}</p>
      </div>
  </a>`
  $("#count-account").html(item);
    },
  });
}