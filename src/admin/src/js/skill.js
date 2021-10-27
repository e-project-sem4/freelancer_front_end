var status = 1;
$(document).ready(function () {
  if(localStorage.getItem("access-token-admin")==null){
    location.href="/admin/login"
  }
  loadAll(status);
  // loadAll();
  // loadAllComplexity();
  // $('#totalResult').html(`${start}-${end}`)
});

function loadAll(status) {
  const url =
    baseUrl +
    `/api/v1/skills/search?status=${status}`;
  $.ajax({
    type: "GET",
    url: url,
    contentType: "application/json; charset=utf-8",
    dataType: "JSON",
    async: false,
    success: function (res) {
      const lists = res.result;
      console.log(lists)
      totalPage = res.total;
      let itemTempHtml = "";
      for (let i = 0; i < lists.length; i++) {
        if(lists[i].status ==1){
          str = '<span class="badge badge-pill badge-primary">Đang mở</span>'
        }else{
          str = '<span class="badge badge-pill badge-danger">Đang đóng</span>'
        }
        ;
        itemTempHtml += `
                    <div class="card d-flex flex-row mb-3">
                        <div class="d-flex flex-grow-1 min-width-zero">
                            <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                <a class="list-item-heading mb-1 truncate w-40 w-xs-100" href="Layouts.Details.html">
                                ${lists[i].skillName}
                                </a>
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
      $("#skill-list").html(itemTempHtml);
    },
  });
}


$("#search-input").change(function() {
  search = $("#search-input").val();
  loadAll(status);
});


function changePage() {
  page = 1;
  pageSize = $("#dropdown-page").val();

  start = page * pageSize - pageSize + 1;
  end = pageSize * page;
  $('#totalResult').html(`${start}-${end}`)
  loadAll(status);
}
function changeSort() {
  page = 1;
  sort = $("#dropdown-sort").val();
  loadAll(status);

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

