var pageSize = 5;
var page = 1;
var totalPage = 0;
var complexity = "";
var search = "";
var sort = 0;
var skill = "";
var totals = 0;
$(document).ready(function () {
  if(localStorage.getItem("access-token-admin")==null){
    location.href="/admin/login"
  }
  loadAll(search, page, pageSize, sort, skill);
  pagination(totalRow);

});

function loadAll(searchKey, page, pageSize, sort, skill) {
  const url =
    baseUrl +
    `/api/v1/freelancer/search?page=${page}&size=${pageSize}&sort=${sort}&keySearch=${searchKey}&skill_id=${skill}`;
  $.ajax({
    type: "GET",
    url: url,
    contentType: "application/json; charset=utf-8",
    dataType: "JSON",
    async: false,
    success: function (res) {
      const lists = res.result;
      console.log(lists)
      totalRow = res.total;
      let itemTempHtml = "";
      for (let i = 0; i < lists.length; i++) {
        //check ảnh
        if (lists[i].user.thumbnail == null) {
          avatar = 'https://res.cloudinary.com/trinhlh96/image/upload/v1634989584/fei7k5xyqsunvostz3yb.jpg'
        } else {
          avatar = lists[i].user.thumbnail
        }

        if (lists[i].statusSearchJob == 1) {
          statusJob = '<span class="badge badge-pill badge-secondary ">Open for jobs</span>'
        } else {
          statusJob = '<span class="badge badge-pill badge-danger">Close job</span>'
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
                                ${lists[i].user.fullName}
                                </a>
                                <p class="mb-1  w-15 w-xs-100">${lists[i].certifications} </p>
                                <p class="mb-1  w-15 w-xs-100">${lists[i].location}</p>
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
      loadAll(search, page, pageSize, sort, skill)
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
  loadAll(search, page, pageSize, sort, skill);
}
$("#search-input").change(function () {
  search = $("#search-input").val();
  loadAll(search, page, pageSize, sort, skill);
});

// function changeComplexity(data) {
//   complexity = data;
//   if (data === null) {
//     complexity = "";
//   }
//   loadAllJob(search, page, pageSize, sort, complexity, skill);
// }
// function changeSkill() {
//   const arrSkill = [...document.querySelectorAll(".checkbox-d")].filter(x => x.checked === true).map(e => +e.value).join(",");
//   loadAllJob(search, page, pageSize, sort, complexity, arrSkill)
// }

