$(function loadProfileFreelancer() {
    const getUserInfo =localStorage.getItem("user-info")
    const id = JSON.parse(getUserInfo).id;  
    const url = baseUrl + `/api/v1/users/${id}`;
    const token = localStorage.getItem('access-token')
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr){
            xhr.setRequestHeader(
                "Authorization", token
            );
        },
        dataType: "JSON",
        async: false,    
        success: function (res) {       
            const ProfileList = res.result;                 
            let itemHtmlInfo = `<img src="https://via.placeholder.com/400X400//88929f/5a6270C/O https://placeholder.com/" height="150" alt="" class="d-block mx-auto shadow rounded-pill mb-4">
                <h2 class="text-white mb-2">${ProfileList.fullName}</h5>              
                
                <ul class="candidates-profile-icons list-inline mb-3">
                    <li class="list-inline-item"><a href="#" class="text-warning"><i class="mdi mdi-star"></i></a></li>
                    <li class="list-inline-item"><a href="#" class="text-warning"><i class="mdi mdi-star"></i></a></li>
                    <li class="list-inline-item"><a href="#" class="text-warning"><i class="mdi mdi-star"></i></a></li>
                    <li class="list-inline-item"><a href="#" class="text-warning"><i class="mdi mdi-star"></i></a></li>
                    <li class="list-inline-item"><a href="#" class="text-warning"><i class="mdi mdi-star"></i></a></li>
                </ul>`;
                // console.log(SkillList[i].skillName)
                // itemHtml += itemTempHtml
                 
            $('#InfoProfileList').html(itemHtmlInfo)       
            let itemHtmlSkill =""   
            let itemTempHtmlSkill = ""
            Skills = ProfileList.userFreelancers.hasSkills
            for (let i = 0; i < Skills.length; i++) {
                itemTempHtmlSkill = `
                <Button class="btn btn-light"># ${Skills[i].skill.skillName}</Button>
                `;
                // console.log(SkillList[i].skillName)
                itemHtmlSkill += itemTempHtmlSkill
            }   
            $('#SkillProfileList').html(itemHtmlSkill)
            
            let itemHtmlCertifications =`<div class="col-lg-4 col-md-6 mt-4 pt-5">
            <div class="border rounded candidates-profile-education text-center text-muted">
                <div class="profile-education-icon border rounded-pill bg-white text-primary">
                    <i class="mdi mdi-36px mdi-school"></i>
                </div>
                <h6 class="text-uppercase f-17"><a href="#" class="text-muted">${ProfileList.userFreelancers.certifications}</a></h6>
                <p class="f-14 mb-1">May 2016 - April 2017</p>
                <p class="pb-3 mb-0">Diploma In Management Studies</p>
                
                <p class="pt-3 border-top mb-0">Suspendisse faucibus et pellentesque egestas lacus ante convallis.</p>
            </div>
        </div>`
        $('#CertificationsProfileList').html(itemHtmlCertifications)    
        let itemHtmlJob =""   
        let itemTempHtmlJob = ""
        
        jobList = ProfileList.userBusinesses.jobs
        for (let i = 0; i < jobList.length; i++) {
            itemTempHtmlJob = `<div class="col-lg-10 mt-4 pt-2">
            <div class="job-list-box border rounded">
                <div class="p-3">                           
                    <div class="row align-items-center">                                 
                       <div class="col-lg-2">
                          <div class="company-logo-img">
                            <img src="images/featured-job/img-1.png" alt="" class="img-fluid mx-auto d-block">
                          </div>
                        </div>                               
                            <div class="col-lg-7 col-md-9">
                                    <div class="job-list-desc">
                                               <h4 class="mb-2"><a href="#" class="text-dark">${jobList[i].name}</a></h4>
                                                      <ul class="list-inline mb-0">
                                                           <li class="list-inline-item mr-3">
                                                                       <p id="limit" class="text-muted mb-0"><i class="mdi mdi-animation mr-2"></i>Description: ${jobList[i].description}</p>
                                                                 </li>

                                                            <li class="list-inline-item mr-3">
                                                                          <p class="text-break mb-0"><i class="mdi mdi-alarm-light mr-2"></i>Complexity : ${jobList[i].complexity.complexityText}</p>
                                                              </li>`;
                                                              itemTempHtmlJob += `<li class="list-inline-item mr-3">
                                  <p class="text-break mb-0">
                                  <i class="mdi mdi-arrow-decision mr-2"></i>Skill main:`;
let listSkill = "";
for (let j = 0; j < jobList[i].otherSkills.length; j++) {
listSkill += jobList[i].otherSkills[j].skill?.skillName + ", ";
}
listSkill = listSkill.substring(0, listSkill.length - 2);
itemTempHtmlJob += listSkill;
itemTempHtmlJob += `</p>
                             </li>
                         </ul>
                         
                     </div>
                     </div>
                 
                
             </div>
         </div>
     </div>
 </div>`;

 itemHtmlJob += itemTempHtmlJob;
                       
        }
        $('#JoblistBusinness').html(itemHtmlJob)
        var time = new Date().getTime(); // get your number
        var date = new Date(date); // create Date object
        
        
            // var dateFl = new Date(ProfileList.userFreelancers.createAt);
            // var dateBn = new Date(ProfileList.userBusinesses.createAt)
            // console.log(dateBn.getTime.toString)
           
            $("#desBn").val(date.toString());
            // $("#desFl").val(dateFl.toDateString);
        }
    })
});