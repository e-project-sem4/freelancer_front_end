var status;
var pageSize = 5;
var page = 1;
var search = "";
var sort = 0;
var totals = 0;
var startAt = "";
var endAt= "";
$(document).ready(function () {
  if(localStorage.getItem("access-token-admin")==null){
    location.href="/admin/login"
  }
  toastr.options = {
    "closeButton": true,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "300",
    "timeOut": "1000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
  loadAll(search, page, pageSize, sort, startAt, endAt,status);
  pagination(totalRow);
});



function changeStatus(id,s){

  const url =
  baseUrl +
  `/api/v1/users/admin/${id}`;

  const param = {
   status:s
  };
  $.ajax({
    type: "PATCH",
    url: url,
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(param),
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        String(localStorage.getItem("access-token-admin"))
      );
    },
    dataType: "JSON",
    async: false,
    success: function (res) {
        toastr.success("Success!");
      
      if (localStorage.getItem("access-token-admin") == null) {
        location.href = "/admin/login"
      }
      loadAll(search, page, pageSize, sort, startAt, endAt,status);
      pagination(totalRow);
      $('#error').hide();

    },

  
})
};


function loadAll(search, page, pageSize, sort, startAt, endAt,status) {
  const url =
    baseUrl +
    `/api/v1/users/searchList?page=${page}&size=${pageSize}&sort=${sort}&keySearch=${search}&startAt=${startAt}&endAt=${endAt}&status=${status}`;
  $.ajax({
    type: "GET",
    url: url,
    contentType: "application/json; charset=utf-8",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        String(localStorage.getItem("access-token-admin"))
      );
    },
    dataType: "JSON",
    async: false,
    success: function (res) {
      const lists = res.result;
      console.log(lists)
      totalRow = res.total;
      let itemTempHtml = "";
      for (let i = 0; i < lists.length; i++) {
        var d = new Date(lists[i].createAt).toLocaleDateString();
         //check ảnh
         if (lists[i].thumbnail == null) {
          avatar = 'https://res.cloudinary.com/trinhlh96/image/upload/v1634989584/fei7k5xyqsunvostz3yb.jpg'
        } else {
          avatar = lists[i].thumbnail
        }

        if (lists[i].roles == "ROLE_ADMIN") {
          rolesUser = '<span class="badge badge-pill badge-danger">ROLE_ADMIN</span>'
        } else {
          rolesUser = '<span class="badge badge-pill badge-primary">ROLE_USER</span>'
        }
        if (lists[i].status == 1) {
          statusUser = `<div class="btn-group mb-1">
          <button type="button" class="btn btn-secondary">Active</button>
          <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="sr-only">Toggle Dropdown</span>
          </button>
          <div class="dropdown-menu" x-placement="bottom-start" style="position: absolute; transform: translate3d(79px, 42px, 0px); top: 0px; left: 0px; will-change: transform;">
              <a onClick="changeStatus(${lists[i].id},2);" class="dropdown-item alert-warning" href="#">Deactivate</a>
              <a onClick="changeStatus(${lists[i].id},0);" class="dropdown-item alert-danger" href="#">Delete</a>
          </div>
      </div>`
        } else {
          statusUser = `<div class="btn-group mb-1">
          <button type="button" class="btn btn-danger">Deactivate</button>
          <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="sr-only">Toggle Dropdown</span>
          </button>
          <div class="dropdown-menu" x-placement="bottom-start" style="position: absolute; transform: translate3d(79px, 42px, 0px); top: 0px; left: 0px; will-change: transform;">
              <a onClick="changeStatus(${lists[i].id},1);" class="dropdown-item alert-secondary" href="#">Active</a>
              <a onClick="changeStatus(${lists[i].id},0);" class="dropdown-item alert-danger" href="#">Delete</a>
          </div>
      </div>`
        }
        ;
        itemTempHtml += `
                    <div class="card d-flex flex-row mb-3">
                        <a class="d-flex w-10" href="/admin/user-details?id=${lists[i].id}">
                          <img src="${avatar}" alt="Fat Rascal" class="list-thumbnail responsive border-0" />
                        </a>
                        <div class="d-flex flex-grow-1 min-width-zero">
                            <div style="text-align: center;" class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                <a class=" w-15 w-xs-100" href="/admin/user-details?id=${lists[i].id}">
                                ${lists[i].username}
                                </a>
                                <p class="mb-1  w-15 w-xs-100">${lists[i].fullName} </p>
                                <p class="list-item-heading mb-1 truncate mb-1  w-15 w-xs-100">${lists[i].email} </p>
                                <p class="mb-1  w-15 w-xs-100">${lists[i].phone} </p>
                                <p class="mb-1  w-15 w-xs-100">${d}</p>
                                <p class="mb-1  w-15 w-xs-100">${lists[i].balance} USD</p>
                                <div class="w-15 w-xs-100">`+ rolesUser + `</div>
                                <div class="w-15 w-xs-100">`
                                if(lists[i].roles == "ROLE_CLIENT"){
                                  itemTempHtml +=
                                  statusUser
                                }
                                itemTempHtml+=
                               `</div>
                            </div>
                            <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">
                                <label class="custom-control custom-checkbox mb-0">
                                    <input type="checkbox" class="custom-control-input">
                                    <span class="custom-control-label"></span>
                                </label>
                            </div>
                        </div>
                    </div>
        `;
      }
      $("#user-list").html(itemTempHtml);
    },
  });
}
// phân trang
function pagination(totalRow) {
  var totals = Math.ceil(totalRow / pageSize);
  $('#pagination-demo').twbsPagination({
    totalPages: totals,
    visiblePages: pageSize,
    onPageClick: function (event, page) {
      loadAll(search, page, pageSize, sort, startAt, endAt,status);
    }
  });
}
function changePage() {
  page = 1;
  pageSize = $("#dropdown-page").val();
  $("#pagination-api").html(`<ul id="pagination-demo" class="pagination justify-content-center mb-0"></ul>`);
  pagination(totalRow);
}
function changeSort() {
  page = 1;
  sort = $("#dropdown-sort").val();
  loadAll(search, page, pageSize, sort, startAt, endAt,status);
}
$("#search-input").change(function () {
  search = $("#search-input").val();
  loadAll(search, page, pageSize, sort, startAt, endAt,status);
  $("#pagination-api").html(`<ul id="pagination-demo" class="pagination justify-content-center mb-0"></ul>`);
  pagination(totalRow);
});
$('#datepicker').on('changeDate', function() {
  
  start = new Date(document.getElementById("startDay").value);
  end = new Date(document.getElementById("endDay").value + " 23:59:59")
  startAt = start.getTime();
  endAt = end.getTime();
  
  loadAll(search, page, pageSize, sort, startAt, endAt,status);
});
function changeOrder() {
  status = $("#dropdown-order").val();
  loadAll(search, page, pageSize, sort, startAt, endAt,status);
  $("#pagination-api").html(`<ul id="pagination-demo" class="pagination justify-content-center mb-0"></ul>`);
  pagination(totalRow);
}