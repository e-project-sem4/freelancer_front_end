var status;
var pageSize = 5;
var page = 1;
var search = "";
var sort = 1;
var totals = 0;

$(document).ready(function () {
  if (localStorage.getItem("access-token-admin") == null) {
    location.href = "/admin/login"
  }
  loadAll(search,status,page,pageSize,sort);
  pagination(totalRow);
  $('#error').hide();

});

function loadAll(search,status,page,pageSize,sort) {
  const url =
    baseUrl +
    `/api/v1/skills/search?page=${page}&size=${pageSize}&sort=${sort}&keySearch=${search}&status=${status}`;
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
        if (lists[i].status == 1) {
          str = '<span class="badge badge-pill badge-primary">Active</span>'
        } else {
          str = '<span class="badge badge-pill badge-danger">Deactivation</span>'
        }
        ;
        itemTempHtml += `
                    <div class="card d-flex flex-row mb-3">
                        <div class="d-flex flex-grow-1 min-width-zero">
                            <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                <a style="padding-left: 210px;" class=" list-item-heading mb-1 truncate w-100 w-xs-100" href="Layouts.Details.html">
                                ${lists[i].skillName}
                                </a>
                                <div style="padding-left: 60px;" class="w-60 w-xs-100">`+ str + `</div>
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


$("#search-input").change(function () {
  search = $("#search-input").val();
  loadAll(search,status,page,pageSize,sort);
  $("#pagination-api").html(`<ul id="pagination-demo" class="pagination justify-content-center mb-0"></ul>`);
  pagination(totalRow);
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
    skillName: name,
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
          url: baseUrl + "/api/v1/skills",
          contentType: "application/json",
          data: JSON.stringify(createForm),
          dataType: "JSON",
          async: false,
          success: function (res) {
            if (res) {
              Swal.fire('Saved!', '', 'success')
              location.href = "/admin/list-skill"
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
function changeOrder() {
  status = $("#dropdown-order").val();
  loadAll(search,status,page,pageSize,sort);
  $("#pagination-api").html(`<ul id="pagination-demo" class="pagination justify-content-center mb-0"></ul>`);
  pagination(totalRow);
}
