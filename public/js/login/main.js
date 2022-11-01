
const loginForm = document.querySelector("form");
loginForm.addEventListener("submit",(event)=>{
	event.preventDefault();
	const formData = new FormData(loginForm);
	const data = Object.fromEntries(formData);
	fetch("/users",{
		method:"POST",
		headers:{
			"Content-Type" : "application/json"
		},
		body: JSON.stringify(data)
	}).then((res)=>{
		res.json().then((inf)=>{
			console.log(inf.passwordd);
			const query = "/homepage?name="+inf.namee;
			location.href = query;
		}).catch((error) =>{
			console.log(error);
		})
	})

})