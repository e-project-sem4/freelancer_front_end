var pageSize = 5;
var page = 1;
var totalPage = 0;
var complexity = "";
var search = "";
var sort = 0;
var skill = "";
var totals = 0;
$(document).ready(function () {
  loadAll(search, page, pageSize, sort, complexity, skill);
  pagination(totalRow);
});

function loadAll(searchKey, page, pageSize, sort, complexity, skill) {
  const url =
    baseUrl +
    `/api/v1/job/search?page=${page}&size=${pageSize}&sort=${sort}&keySearch=${searchKey}&complexity_id=${complexity}&skill_id=${skill}`;
  $.ajax({
    type: "GET",
    url: url,
    contentType: "application/json; charset=utf-8",
    dataType: "JSON",
    async: false,
    success: function (res) {
      const lists = res.result;
      totalRow = res.total;
      let itemTempHtml = "";
      for (let i = 0; i < lists.length; i++) {
        var d = new Date(lists[i].createAt).toLocaleDateString();
        if (lists[i].isPaymentStatus == 1) {
          payment = '<span class="badge badge-pill badge-primary">Paid</span>'
        } else {
          payment = '<span class="badge badge-pill badge-danger">Unpaid</span>'
        }
        if (lists[i].status == 1) {
          statusJob = '<span class="badge badge-pill badge-secondary ">Open</span>'
        } else {
          statusJob = '<span class="badge badge-pill badge-danger">Closed</span>'
        }

        ;
        itemTempHtml += `
                    <div class="card d-flex flex-row mb-3">
                        <div class="d-flex flex-grow-1 min-width-zero">
                            <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                <a class="list-item-heading mb-1 truncate w-20 w-xs-100" href="/admin/list-job/${lists[i].id}">
                                ${lists[i].name}
                                </a>
                                <p class="mb-1  w-15 w-xs-100">${lists[i].userBusiness.user.fullName} </p>
                                <p class="mb-1  w-15 w-xs-100">${d}</p>
                                <p class="mb-1  w-15 w-xs-100">${lists[i].paymentAmount} USD</p>
                                <div class="w-15 w-xs-100">`+ payment + `</div>
                                <div class="w-15 w-xs-100">`+ statusJob + `</div>
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
      loadAll(search, page, pageSize, sort, complexity, skill)
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
  loadAll(search, page, pageSize, sort, complexity, skill);
}
$("#search-input").change(function () {
  search = $("#search-input").val();
  loadAll(search, page, pageSize, sort, complexity, skill);
});

// function changeComplexity(data) {
//   complexity = data;
//   if (data === null) {
//     complexity = "";
//   }
//   loadAll(search, page, pageSize, sort, complexity, skill);
// }
// function changeSkill() {
//   const arrSkill = [...document.querySelectorAll(".checkbox-d")].filter(x => x.checked === true).map(e => +e.value).join(",");
//   loadAll(search, page, pageSize, sort, complexity, arrSkill)
// }


