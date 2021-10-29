
var totals = 0;
var totalPage = 0;
var pageSize = 5;
var page = 1;
var sort = 0;

var username = "";
var jobName = "";
var type = "";
var startAt = "";
var endAt = "";
$(document).ready(function () {
  if(localStorage.getItem("access-token-admin")==null){
    location.href="/admin/login"
  }
  loadAll(page, pageSize, sort,username, jobName, type,startAt,endAt)
  pagination(totalRow);
});

function loadAll(page, pageSize, sort,username, jobName, type,startAt,endAt) {
  const url =
    baseUrl +
    `/api/v1/transactions/search?page=${page}&size=${pageSize}&sort=${sort}&username=${username}&jobName=${jobName}&type=${type}&startAt=${startAt}&endAt=${endAt}`;
  $.ajax({
    type: "GET",
    url: url,
    contentType: "application/json; charset=utf-8",
    dataType: "JSON",
    async: false,
    success: function (res) {
      const lists = res.result;
      totalRow = res.total;
      console.log(lists);

      let itemTempHtml = "";
      for (let i = 0; i < lists.length; i++) {
        var d = new Date(lists[i].createAt).toLocaleDateString();
        if (lists[i].type == "RECHARGE") { // nạp tiền
          payment = '<span class="badge badge-pill badge-secondary">RECHARGE</span>'
        } else if(lists[i].type == "WITHDRAW"){ // rút tiền
          payment = '<span class="badge badge-pill badge-primary">WITHDRAW</span>'
        }
        else if(lists[i].type == "PAYMENT"){// nạp tiền tạo job paypal
          payment = '<span class="badge badge-pill badge-info">PAYMENT</span>'
        }
        else if(lists[i].type == "WAGE"){ // thanh toán tiền sau khi hoàn thành job
          payment = '<span class="badge badge-pill badge-success">WAGE</span>'
        }
    
        // if (lists[i].status == 1 || lists[i].status == 2) {
        //   statusJob = '<span class="badge badge-pill badge-secondary ">Open</span>'
        // } else if (lists[i].status == 3){
        //   statusJob = '<span class="badge badge-pill badge-danger">Complete</span>'
        // } else
        // {
        //   statusJob = '<span class="badge badge-pill badge-danger">Close</span>'
        // }

        // ;
        itemTempHtml += `
                    <div class="card d-flex flex-row mb-3">
                        <div class="d-flex flex-grow-1 min-width-zero">
                            <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                <a class="list-item-heading mb-1 truncate w-20 w-xs-100" href="/admin/job-details?id=${lists[i].id}">
                                ${lists[i].content}
                                </a>
                                <p class="mb-1  w-15 w-xs-100">${d}</p>
                                <p class="mb-1  w-15 w-xs-100">${lists[i].price} USD</p>
                                <p class="mb-1  w-15 w-xs-100">${payment} </p>
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
      $("#lists").html(itemTempHtml);
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
      loadAll(page, pageSize, sort,username, jobName, type,startAt,endAt)
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
  loadAll(page, pageSize, sort,username, jobName, type,startAt,endAt)
}
$("#search-input").change(function () {
  search = $("#search-input").val();
  loadAll(page, pageSize, sort,username, jobName, type,startAt,endAt)
});
$('#datepicker').on('changeDate', function() {
  
  start = new Date(document.getElementById("startDay").value);
  end = new Date(document.getElementById("endDay").value + " 23:59:59")
  startAt = start.getTime();
  endAt = end.getTime();
  loadAll(page, pageSize, sort,username, jobName, type,startAt,endAt)

});