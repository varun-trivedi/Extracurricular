
const addVenueForm = document.querySelector("form");
addVenueForm.addEventListener("submit",(event)=>{
	event.preventDefault();
	const formData = new FormData(addVenueForm);
	const data = Object.fromEntries(formData);
	fetch("/bookvenue",{
		method:"POST",
		headers:{
			"Content-Type" : "application/json"
		},
		body: JSON.stringify(data)
	}).then((res)=>{
		res.json().then((inf)=>{
			console.log(inf.rollNo);
			//const query = "/admin_homepage";
			console.log(inf);
			// if(inf.name == "ValidationError")
			// console.log("Error!");
			// else{
			// 	alert("User added successfully");
			// 	location.href = query;
			// }
		}).catch((error) =>{
			console.log(error);
		})
	})

})
