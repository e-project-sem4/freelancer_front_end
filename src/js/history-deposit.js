
var totals = 0;
var totalPage = 0;
var pageSize = 5;
var page = 1;
var sort = 1;

var username = "";
var jobName = "";
var type = "";
var startAt = "";
var endAt = "";
$(document).ready(function () {
username = JSON.parse(localStorage.getItem("user-info")).username
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
        itemTempHtml += `
                    <div class="card d-flex flex-row mb-3">
                        <div class="d-flex flex-grow-1 min-width-zero">
                            <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                <a class="list-item-heading mb-1 truncate w-20 w-xs-100" href="/admin/job-details?id=${lists[i].id}">
                                ${lists[i].content}
                                </a>
                                <p class="mb-1  w-15 w-xs-100">${d}</p>
                                <p class="mb-1  w-15 w-xs-100">${lists[i].price} USD</p>
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
    debugger
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
$("#export-excel").on('click', function(event){
  
  const url =
    baseUrl +
    `/api/v1/transactions/export/excel/transaction/user/${username}`;
  $.ajax({
    url: url,
    type: "GET",
    contentType: "application/octet-stream",
    async: false,
    success: function (res) {
      window.location  = url;
    } 
  })
})