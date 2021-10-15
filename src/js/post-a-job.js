$(document).ready(function () {
  $("#job_name").val("");
  $("#payment_amount").val("");
  $(".js-example-basic-multiple").select2({
    placeholder: "Choose event type",
  });

  $("#post-job").on("click", function (event) {
    const jobName = $("#job_name").val();
    const expectedDuration = $(".duration").val();
    const complexity = $(".complexity").val();
    const paymentAmount = $("#payment_amount").val();
    const otherSkill = $(".js-example-basic-multiple")
      .select2("val")
      .map((item) => {
        return {
          skill_id: item,
        };
      });
    const description = $("#description").val();
    const param = {
      name: jobName,
      expected_duration_id: expectedDuration,
      complexity_id: complexity,
      paymentAmount: paymentAmount,
      otherSkills: otherSkill,
      description: description,
    };
    $.ajax({
      type: "POST",
      url: baseUrl + "/api/v1/job",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(param),
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          String(localStorage.getItem("access-token"))
        );
      },
      dataType: "JSON",
      async: false,
      success: function (res) {
        if (res.status !== "-1") {
          $("#success").html(` <div class="alert alert-success" role="alert">
                                  Post job successfull!
                                </div>`);
          setTimeout((location.href = "/job-list"), 500);
        }
      },
      error:function(xhr) {
        if(xhr.status ==403){
          return window.location ="/login";
        }
        $("#success").html(` <div class="alert alert-danger" role="alert">
                                    Post job failed!
                              </div>`);
      },
    });
    event.preventDefault();
  });
}),
  jQuery(function () {});

function getExpectedComplexity(e, idx) {
  $.ajax({
    type: "GET",
    url: baseUrl + "/api/v1/complexities/search?status=1",
    contentType: "application/json; charset=utf-8",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        String(localStorage.getItem("access-token"))
      );
    },
    dataType: "JSON",
    async: false,
    success: function (res) {
      let dropdownListComplexity = res.result;
      let tempHtml = "";
      let tempHtmlDropdown = "";
      if (res) {
        for (let i = 0; i < dropdownListComplexity.length; i++) {
          tempHtml = `<option value=${dropdownListComplexity[i].id}>${dropdownListComplexity[i].complexityText}</option>`;
          tempHtmlDropdown += tempHtml;
        }
        $("#complexity").html(tempHtmlDropdown);
      }
    },
    error() {
      console.log("sai");
    },
  });
}

function complexitySelect() {
  return (value = $(".complexity").val());
}

function getExpectedDuration() {
  $.ajax({
    type: "GET",
    url: baseUrl + "/api/v1/durations/search?status=1",
    contentType: "application/json; charset=utf-8",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        String(localStorage.getItem("access-token"))
      );
    },
    dataType: "JSON",
    async: false,
    success: function (res) {
      let dropdownListDuration = res.result;
      let tempHtml = "";
      let tempHtmlDropdown = "";
      if (res) {
        for (let i = 0; i < dropdownListDuration.length; i++) {
          tempHtml = `<option value=${dropdownListDuration[i].id}>${dropdownListDuration[i].durationText}</option>`;
          tempHtmlDropdown += tempHtml;
        }
        $("#expected_duration").html(tempHtmlDropdown);
      }
    },
    error() {
      console.log("sai");
    },
  });
}

function durationSelect() {
  return (value = $(".duration").val());
}

function getJobSkill() {
  $.ajax({
    type: "GET",
    url: baseUrl + "/api/v1/skills/search?status=1",
    contentType: "application/json; charset=utf-8",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        String(localStorage.getItem("access-token"))
      );
    },
    dataType: "JSON",
    async: false,
    success: function (res) {
      let dropdownListSkill = res.result;
      let tempHtml = "";
      let tempHtmlDropdown = "";
      if (res) {
        for (let i = 0; i < dropdownListSkill.length; i++) {
          tempHtml = `<option value=${dropdownListSkill[i].id}>${dropdownListSkill[i].skillName}</option>`;
          tempHtmlDropdown += tempHtml;
        }
        $(".skills").html(tempHtmlDropdown);
      }
    },
    error() {
      console.log("sai");
    },
  });
}

getExpectedComplexity();
getExpectedDuration();
getJobSkill();
