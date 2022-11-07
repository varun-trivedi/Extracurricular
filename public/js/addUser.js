
const addUserForm = document.querySelector("form");
addUserForm.addEventListener("submit",(event)=>{
	event.preventDefault();
	const formData = new FormData(addUserForm);
	const data = Object.fromEntries(formData);
	fetch("/addUsers",{
		method:"POST",
		headers:{
			"Content-Type" : "application/json"
		},
		body: JSON.stringify(data)
	}).then((res)=>{
		res.json().then((inf)=>{
			console.log(inf.password);
			const query = "/admin_homepage";
			console.log(inf);
			if(inf.name == "ValidationError")
			console.log("Error!");
			else{
				alert("User added successfully");
				location.href = query;
			}
		}).catch((error) =>{
			console.log(error);
		})
	})

})
