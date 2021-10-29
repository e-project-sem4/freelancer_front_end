var status;
var pageSize = 5;
var page = 1;
var search = "";
var sort = 0;
var totals = 0;

$(document).ready(function () {
  if(localStorage.getItem("access-token-admin")==null){
    location.href="/admin/login"
  }
  loadAll(search,status,page,pageSize,sort)
  pagination(totalRow);
  $('#error').hide();
});

function loadAll(search,status,page,pageSize,sort) {
  const url =
    baseUrl +
    `/api/v1/complexities/search?page=${page}&size=${pageSize}&sort=${sort}&keySearch=${search}&status=${status}`;
  $.ajax({
    type: "GET",
    url: url,
    contentType: "application/json; charset=utf-8",
    dataType: "JSON",
    async: false,
    success: function (res) {
      const complexity = res.result;
      totalRow = res.total;
      let itemTempHtml = "";
      for (let i = 0; i < complexity.length; i++) {
        if(complexity[i].status ==1){
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
                                ${complexity[i].complexityText}
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
      $("#complexity-list").html(itemTempHtml);
    },
  });
}


$("#search-input").change(function () {
  search = $("#search-input").val();
  loadAll(search,status,page,pageSize,sort);
});


// phân trang
function pagination(totalRow) {
  var totals = Math.ceil(totalRow / pageSize);
  $('#pagination-demo').twbsPagination({
    totalPages: totals,
    visiblePages: pageSize,
    onPageClick: function (event, page) {
      loadAll(search,status,page,pageSize,sort);
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
  loadAll(search,status,page,pageSize,sort);

}
$("#create-data").on('click', function (event) {
  var name = document.getElementById("name-data").value;
  var status = 0;
  if (document.querySelector('#customCheck1').checked) {
    status = 1;
  };
  const createForm = {
    complexityText: name,
    status: status
  };
  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      // VALIDATE
      if ($("#name-data").val() == "") {
        $('#error').show();
      } else {
        $.ajax({
          type: 'POST',
          url: baseUrl + "/api/v1/complexities",
          contentType: "application/json",
          data: JSON.stringify(createForm),
          dataType: "JSON",
          async: false,
          success: function (res) {
            if (res) {
              Swal.fire('Saved!', '', 'success')
              location.href = "/admin/list-complexity"
            }
          },
          error() {
            Swal.fire('Thất bại', '', 'info')
          },
        });
      }
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
})
