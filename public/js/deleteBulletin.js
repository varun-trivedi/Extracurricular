let arr=[];
document.addEventListener("DOMContentLoaded", function() {
    fetch("/bulletin_retreival").then((res) =>{
        res.json().then((result)=>{
        for(let i=0;i<result.length;i++)
        {
            arr.push(result[i]);
            document.getElementById("show_requests").innerHTML += "<h2>"+result[i].rollNo+"<br>"+result[i].content+"<br></h2><input name='approval' type='checkbox' id= '"+"check"+i+"'><label for='approval'> Check to approve </label><br></br>";
        }
        //checking use of innerhtml
    }).catch((error)=>{
		window.alert("Error! No pending requests");
    })
    })
  });
  const element = document.getElementById("approve");
  element.addEventListener("click", function() {
    for(let i=0;i<arr.length;i++)
    {
        const box_id = document.getElementById("check" + i);
        if(box_id.checked)
        {
            fetch("/bulletin_delete/"+arr[i]._id).then((res) =>{
                res.json().then((result)=>{
                console.log("task Done");
            }).catch((error)=>{
                window.alert("Error! Could Not Delete");
            })
            })
            
            

        }
    }
  });