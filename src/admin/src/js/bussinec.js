var pageSize = 10;
var page = 1;
var totalPage = 0;
var complexity = "";
var search = "";
var sort = 0;
var skill = "";
var start = page * pageSize - pageSize + 1;
var end = pageSize * page;

$(document).ready(function () {
  if(localStorage.getItem("access-token-admin")==null){
    location.href="/admin/login"
  }
  loadAllJob(search, page, pageSize, sort, complexity, skill);

  // loadAllSkill();
  // loadAllComplexity();
  // $('#totalResult').html(`${start}-${end}`)
});

function loadAllJob(searchKey, page, pageSize, sort, complexity, skill) {
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
      const jobList = res.result;
      console.log(jobList)
      totalPage = res.total;
      let itemHtml = "";
      let itemTempHtml = "";
      for (let i = 0; i < jobList.length; i++) {
        var d = new Date(jobList[i].createAt).toLocaleDateString();
        if(jobList[i].isPaymentStatus ==1){
          str = '<span class="badge badge-pill badge-primary">Đã thanh toán</span>'
        }else{
          str = '<span class="badge badge-pill badge-danger">Chưa thanh toán</span>'
        }
        ;
        itemTempHtml += `
                    <div class="card d-flex flex-row mb-3">
                        <div class="d-flex flex-grow-1 min-width-zero">
                            <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                <a class="list-item-heading mb-1 truncate w-20 w-xs-100" href="Layouts.Details.html">
                                ${jobList[i].name}
                                </a>
                                <p class="mb-1 text-muted text-small w-15 w-xs-100">${jobList[i].userBusiness.user.fullName} </p>
                                <p class="mb-1 text-muted text-small w-15 w-xs-100">${d}</p>
                                <p class="mb-1 text-muted text-small w-15 w-xs-100">${jobList[i].paymentAmount} USD</p>
                                <div class="w-15 w-xs-100">`+ str+`</div>
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
      $("#job-list").html(itemTempHtml);
    },
  });
}


$("#search-input").change(function() {
  search = $("#search-input").val();
  loadAllJob(search, page, pageSize, sort, complexity, skill);
});


function changePage() {
  page = 1;
  pageSize = $("#dropdown-page").val();

  start = page * pageSize - pageSize + 1;
  end = pageSize * page;
  $('#totalResult').html(`${start}-${end}`)
  loadAllJob(search, page, pageSize, sort, complexity, skill);
}
function changeSort() {
  page = 1;
  sort = $("#dropdown-sort").val();
  loadAllJob(search, page, pageSize, sort, complexity, skill);

}
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
// $(".btn-prev").on("click", function () {
//   if (page > 0) {
//     page--;
//     start = page * pageSize - pageSize + 1;
//     end = pageSize * page;
//     $('#totalResult').html(`${start}-${end}`)

//     loadAllJob($("#exampleInputName1").val(), page, pageSize, sort, complexity, skill);
//   }
// });
// $(".btn-next").on("click", function () {
//   if (page * pageSize < totalPage) {
//     page++;
//     start = page * pageSize - pageSize + 1;
//     end = pageSize * page;
//     $('#totalResult').html(`${start}-${end}`)

//     loadAllJob($("#exampleInputName1").val(), page, pageSize, sort, complexity, skill);
//   }
// });

