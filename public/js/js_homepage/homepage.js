let arr=[];
document.addEventListener("DOMContentLoaded", function() {
    fetch("/bulletin_retreival").then((res) =>{
        res.json().then((result)=>{
        for(let i=0;i<result.length;i++)
        {
            arr.push(result[i]);
            document.getElementById("show_results").innerHTML += "<br><br>" +result[i].content;
        }
        //checking use of innerhtml
    }).catch((error)=>{
		console.log(error);
    })
    })
  });
  const clubRequestForm = document.querySelector("form");
clubRequestForm.addEventListener("submit",(event)=>{
	event.preventDefault();
	const formData = new FormData(clubRequestForm);
	const data = Object.fromEntries(formData);
	
	fetch("/feedback",{
    method:"POST",
    headers:{
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(data)
  }).then((res)=>{
    res.json().then((inf)=>{
      // const query = "/admin_homepage";
      console.log(inf);
      if(inf.name == "ValidationError")
      window.alert(inf.message);
      else{
        alert("Request Submitted successfully");
        // location.href = query;
      }
    }).catch((error) =>{
      console.log(error);
    })
  })
	
	

})
