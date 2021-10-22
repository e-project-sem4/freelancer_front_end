var pageSize = 10;
var page = 1;
var totalPage = 0;
var search = "";
var sort = 0;
var skill = "";
var start = page * pageSize - pageSize + 1;
var end = pageSize * page;
$(document).ready(function () {
    loadAllSkill();
    loadAllFreelancer(search, page, pageSize, sort,skill);
});
function loadAllSkill() {
    const url = baseUrl + `/api/v1/skills/search?status=1`;
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        async: false,
        success: function (res) {
            const SkillList = res.result;
            let itemHtml = "";
            let itemTempHtml = "";
            for (let i = 0; i < SkillList.length; i++) {
                itemTempHtml = `<div id = "select-skill" class="custom-control custom-checkbox">
                                            <input type="checkbox" value="${SkillList[i].id}"  id="customCheckbox${i}" onclick="changeSkill()"  name="customCheckbox" class="custom-control-input checkbox-d">
                                            <label id="CheckboxSkills" class="custom-control-label ml-1 text-muted f-15" for="customCheckbox${i}">${SkillList[i].skillName}</label>
                                        </div>`;
                itemHtml += itemTempHtml;
            }
            $("#skillsList").html(itemHtml);
        },
    });
}
function loadAllFreelancer(searchKey, page, pageSize, sort ,skill) {
    const url =

        baseUrl +
        `/api/v1/freelancer/search?page=${page}&size=${pageSize}&sort=${sort}&keySearch=${searchKey}&skill_id=${skill}`;
    $.ajax({
        type: "GET",
        url: url,
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
            const freelancerList = res.result;
            totalPage = res.total;
            let itemHtml = "";
            let itemTempHtml = "";
            for (let i = 0; i < freelancerList.length; i++) {
                    itemTempHtml = `
    <div class="col-lg-12 mt-4 pt-2">
        <div class="job-list-box border rounded">
            <div class="p-3">
                <div class="row align-items-center">
                    <div class="col-lg-2">
                        <div class="company-logo-img">
                            <img src="https://via.placeholder.com/400X400//88929f/5a6270C/O https://placeholder.com/" alt="" class="img-fluid mx-auto d-block">
                        </div>
                    </div>
                    <div class="col-lg-7 col-md-9">
                        <div class="job-list-desc">
                            <h4 class="mb-2"><a href="/job-details?id=${freelancerList[i].id}"
                                                class="text-dark">${freelancerList[i].user.fullName}</a></h4>
                            <ul class="list-inline mb-0">
                                <div class="list-inline-item mr-3">
                                    <p id="limit" class="text-break mb-0"><i class="mdi mdi-account-card-details mr-2"></i>Overview:
                                        ${freelancerList[i].overview}</p>
                                </div>
                                <div class="list-inline-item mr-3">
                                    <p class="text-break mb-0"><i class="mdi mdi-map-marker mr-2"></i>Location :
                                        ${freelancerList[i].location}</p>
                                </div>
                                <div class="list-inline-item mr-3">
                                    <p class="text-break mb-0"><i class="mdi mdi-certificate mr-2"></i>Certifications :
                                        ${freelancerList[i].certifications}</p>
                                </div>`;
                itemTempHtml +=`
                <li class="list-inline-item mr-3">
                                <p class="text-break mb-0">
                                    <i class="mdi mdi-arrow-decision mr-2"></i>Skill:`;


                let listSkill = "";
                for (let j = 0; j < freelancerList[i].hasSkills.length; j++) {
                    listSkill += freelancerList[i].hasSkills[j].skill?.skillName + ", ";
                }
                listSkill = listSkill.substring(0, listSkill.length - 2);
                itemTempHtml += listSkill;
                itemTempHtml +=`
                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3">
                    <div class="job-list-button-sm text-right">
                        <div class="candidates-listing-btn mt-4">
                           <a href="/candidate-details?id=${freelancerList[i].id}" class="btn btn-primary-outline btn-sm">View Profile</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
                `;
                    itemHtml += itemTempHtml;
            }
            $("#freelancer-list").html(itemHtml);
        },
    });
}
$(".btn-prev").on("click", function () {
    if (page > 0) {
        page--;
        start = page * pageSize - pageSize + 1;
        end = pageSize * page;
        $('#totalResult').html(`${start}-${end}`)

        loadAllJob($("#exampleInputName1").val(), page, pageSize, sort, complexity,skill);
    }
});
$(".btn-next").on("click", function () {
    if (page * pageSize < totalPage) {
        page++;
        start = page * pageSize - pageSize + 1;
        end = pageSize * page;
        $('#totalResult').html(`${start}-${end}`)

        loadAllJob($("#exampleInputName1").val(), page, pageSize, sort, complexity,skill);
    }
});
function changeSkill(){
    const arrSkill = [...document.querySelectorAll(".checkbox-d")].filter(x => x.checked === true).map(e => +e.value).join(",");
    loadAllJob(search, page, pageSize, sort,arrSkill)
}
function changeSort(){
    page =1;
    sort = $('#dropdown-sort').val();
    loadAllJob(search, page, pageSize, sort,skill);

}
function changePage() {
    page = 1;
    pageSize = $("#dropdown-page").val();
    start = page * pageSize - pageSize + 1;
    end = pageSize * page;
    $('#totalResult').html(`${start}-${end}`)
    loadAllJob(search, page, pageSize, sort,skill);
}