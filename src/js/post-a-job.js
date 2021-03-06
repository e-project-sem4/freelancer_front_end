var $skillsControls;
var ck;
$(document).ready(function () { 
  $("#job_name").val("");
  $("#payment_amount").val("");
  $skillsControls = $(".multipleSelect").select2();
  CKEDITOR.editorConfig = function(config) {
    config.language = 'en';  // Chọn ngôn ngữ
    config.uiColor = '#F7B42C'; // màu giao diện
    config.height = 300; 
    config.width = 500; 
    config.toolbarCanCollapse = true;
  };  
  CKEDITOR.replace('descriptionJob');
  toastr.options.timeOut=1000;
  toastr.options.fadeIn = 0;
  toastr.options.positionClass = "toast-top-left";
})

  $("#post-job").on("click", function (event) {
    event.preventDefault();
    const jobName = $("#job_name").val();
    const expectedDuration = $(".duration").val();
    const complexity = $(".complexity").val();
    const paymentAmount = $("#payment_amount").val();
    const otherSkill = $skillsControls.val().map((item) => {
      return {
        skill_id: item,
      };
    });
    const description = CKEDITOR.instances.descriptionJob.getData();
    if(description.length < 10){
      return
    }
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
      success:  function (res,xhr) {
        if (res.status === "0") {
          localStorage.setItem('id_job',res.result.id)         
          toastr.success('Post job successfull!')
          if(res.result.isPaymentStatus === 1){
            setInterval((location.href = `/job-details?id=${res.result.id}`),30000);
         }else if(res.result.isPaymentStatus === 0){
          setInterval((location.href = "/job-detail-payment"), 30000);
         }
        }
      },
      error:function(xhr) {
        if(xhr.status ===403){
          toastr.error('You must login')
          return window.location ="/login";
        }
        if(xhr.status ===400){
          toastr.error('Post job failed!')
        }        
      },
    });
   
  });


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
