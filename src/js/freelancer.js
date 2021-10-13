$(function loadProfileFreelancer() {
    const id = 3;
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
                <p class="text-white-50 h6 mb-2">${ProfileList.userFreelancers.overview}</p>
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

        }
    })
});