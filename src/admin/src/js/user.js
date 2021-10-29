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
  loadAll(search, page, pageSize, sort, startAt, endAt,status);
  pagination(totalRow);
});

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
          statusUser = '<span class="badge badge-pill badge-secondary ">Open</span>'
        } else {
          statusUser = '<span class="badge badge-pill badge-danger">Closed</span>'
        }
        ;
        itemTempHtml += `
                    <div class="card d-flex flex-row mb-3">
                        <a class="d-flex w-10" href="/admin/list-job/${lists[i].id}">
                          <img src="${avatar}" alt="Fat Rascal" class="list-thumbnail responsive border-0" />
                        </a>
                        <div class="d-flex flex-grow-1 min-width-zero">
                            <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                <a class="list-item-heading mb-1 truncate w-20 w-xs-100" href="/admin/list-job/${lists[i].id}">
                                ${lists[i].username}
                                </a>
                                <p class="mb-1  w-15 w-xs-100">${lists[i].fullName} </p>
                                <p class="mb-1  w-15 w-xs-100">${lists[i].email} </p>
                                <p class="mb-1  w-15 w-xs-100">${lists[i].phone} </p>
                                <p class="mb-1  w-15 w-xs-100">${d}</p>
                                <p class="mb-1  w-15 w-xs-100">${lists[i].balance} USD</p>
                                <div class="w-15 w-xs-100">`+ rolesUser + `</div>
                                <div class="w-15 w-xs-100">`+ statusUser + `</div>
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
});
$('#datepicker').on('changeDate', function() {
  
  start = new Date(document.getElementById("startDay").value);
  end = new Date(document.getElementById("endDay").value + " 23:59:59")
  startAt = start.getTime();
  endAt = end.getTime();
  
  loadAll(search, page, pageSize, sort, startAt, endAt,status);
});