let arr=[];
document.addEventListener("DOMContentLoaded", function() {
    fetch("/approvebulletin").then((res) =>{
        res.json().then((result)=>{
        for(let i=0;i<result.length;i++)
        {
            arr.push(result[i]);
            document.getElementById("show_requests").innerHTML += "<h2>"+result[i].name+"<br>"+result[i].lastName+"<br>"+result[i].rollNo+"<br>"+result[i].email+"<br>"+result[i].content+"</h2><input name='approval' type='checkbox' id= '"+"check"+i+"'><label for='approval'> Check to approve </label><br></br>";
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
            fetch("/approvebulletin/"+arr[i]._id+"&"+arr[i].email).then((res) =>{
                res.json().then((result)=>{
                console.log("task Done");
            }).catch((error)=>{
                window.alert("Error! Could Not Delete");
            })
            })
            fetch("/bulletinpost",{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(arr[i])
            }).then((res)=>{
                res.json().then((inf)=>{
                    console.log(inf);
                    window.alert("Approved Successfully")
                }).catch((error) =>{
                    console.log(error);
                })
            })
            

        }
    }
  });