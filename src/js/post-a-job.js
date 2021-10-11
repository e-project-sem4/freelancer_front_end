// $(document).ready(function () {
//     $('#post-job').on("click",function (event){
//         const url = baseUrl + `/api/v1/job?job_name=${jobName}&expected_duration=${expectedDuration}
//         &complexity=${complexity}&paymentAmount=${paymentAmount}&description=${description}`;
//         const jobName = $("#job_name").val();
//         const expectedDuration = $('#expectedDuration').val();
//         const complexity = $('#complexity').val();
//         const paymentAmount = $('#payment_amount').val();
//         const job_skill_list = [$('#job_skill').val()];
//         const otherSkill = job_skill_list.values();
//         const description = $('#description').val();
//         const
//         const jobPostForm ={
//             jobName: jobName,
//             expectedDuration: expectedDuration,
//             complexity: complexity,
//             paymentAmount: paymentAmount,
//             job_skill: job_skill,
//             description: description,
//         }
//         $.ajax({
//             type: 'POST',
//             url: url,
//             contentType: "application/json; charset=utf-8",
//             data:JSON.stringify(jobPostForm),
//             beforeSend: function (xhr) {
//                 xhr.setRequestHeader(
//                     "Authorization", token
//                 );
//             },
//             dataType: "JSON",
//             async: false,
//             success: function (res) {
//                 if(res ){
//                     location.href="/post-a-job"
//                 }
//             },
//             error(){
//                 console.log("sai");
//             },
//         });
//         event.preventDefault()
//     })
// });
// $(function getExpectedDuration(){
//
//     const expectedDuration = $('#expected_duration').val();
//     $.ajax({
//         type: 'GET',
//         url: baseUrl+"/api/v1/complexity",
//         contentType: "application/json; charset=utf-8",
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader(
//                 "Authorization", token
//             );
//         },
//         dataType: "JSON",
//         async: false,
//         success: function (res) {
//             if(res ){
//                 console.log(expectedDuration)
//             }
//         },
//         error(){
//             console.log("sai");
//         },
//     });
//
//
// });
//
// $(function getComplexity(){
//
//     const complexity = $('#complexity').val();
//     $.ajax({
//         type: 'GET',
//         url: url,
//         contentType: "application/json; charset=utf-8",
//         data:JSON.stringify(jobPostForm),
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader(
//                 "Authorization", token
//             );
//         },
//         dataType: "JSON",
//         async: false,
//         success: function (res) {
//             if(res ){
//                 location.href="/post-a-job"
//             }
//         },
//         error(){
//             console.log("sai");
//         },
//     });
//
//
// });
//
// $(function getJobSkill(){
//
//     const jobSKill = $('#jobSKill').val();
//     $.ajax({
//         type: 'GET',
//         url: url,
//         contentType: "application/json; charset=utf-8",
//         data:JSON.stringify(jobPostForm),
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader(
//                 "Authorization", token
//             );
//         },
//         dataType: "JSON",
//         async: false,
//         success: function (res) {
//             if(res ){
//                 location.href="/post-a-job"
//             }
//         },
//         error(){
//             console.log("sai");
//         },
//     });
//
//
// });