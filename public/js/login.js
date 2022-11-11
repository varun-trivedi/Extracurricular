
const loginForm = document.querySelector("form");
loginForm.addEventListener("submit",(event)=>{
	event.preventDefault();
	const formData = new FormData(loginForm);
	const data = Object.fromEntries(formData);

	fetch("/users/"+data.name+"&"+data.password).then((res) =>{
        res.json().then((result)=>{
            {
				const query = "/homepage?name="+result[0].name;
                location.href = query;
        // for(let i=0;i<result.length;i++)
        // {
        //   document.getElementById("insert-here").innerHTML += "<h2>"+result[i].name+result[i].lastName+result[i].email+result[i].mobileNo+"</h2><input type='checkbox' id='entry' name='vehicle1' value='Bike'><label for='vehicle1'> Check to approve </label><br></br>";
        // }
        //checking use of innerhtml
            }
    }).catch((error)=>{
		window.alert("Error! No such user exists. Please Try Again");
    })
    })

})
