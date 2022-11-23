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