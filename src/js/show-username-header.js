$(document).ready(function () {
    const data=  localStorage.getItem('user-info')
   const output =   document.getElementById('test')
    const obj = JSON.parse(data);
     output.innerHTML= obj.username
});