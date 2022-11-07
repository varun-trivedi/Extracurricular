
const loginForm = document.querySelector("form");
loginForm.addEventListener("submit",(event)=>{
	event.preventDefault();
	const formData = new FormData(loginForm);
	const data = Object.fromEntries(formData);
	// fetch("/users/"+data.name+"&"+data.password).then((res) =>{
    //     res.json().then((result)=>{
    //         {
    //             window.alert(result[0].email);
    //         }
    // }).catch((error)=>{
    //     console.log(error);
    // })
    // })

	fetch("/users/"+data.name+"&"+data.password).then((res) =>{
        res.json().then((result)=>{
            {
				const query = "/homepage?name="+result[0].name;
                location.href = query;
            }
    }).catch((error)=>{
		window.alert("Error! No such user exists. Please Try Again");
    })
    })

})
