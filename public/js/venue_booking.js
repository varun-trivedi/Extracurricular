
const addVenueForm = document.querySelector("form");
addVenueForm.addEventListener("submit",(event)=>{
	event.preventDefault();
	const formData = new FormData(addVenueForm);
	const data = Object.fromEntries(formData);

	fetch("/bookvenuecheck/"+data.rollNo).then((res) =>{
		res.json().then((result)=>{
		const s = result[0].role;
		if(result.length == 0)
		{
			window.alert("No such student in database");
			history.back();
		}
		if(s == "Student")
		{
			window.alert("You don't have the required position");
			history.back();
		}
		else{
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
					if(inf.name == "ValidationError")
					window.alert(inf.message);
					else
					window.alert("booking application submitted")
					// else{
					// 	alert("User added successfully");
					// 	location.href = query;
					// }
				}).catch((error) =>{
					console.log(error);
				})
			})
		}
	}).catch((error)=>{
		window.alert("Error!Here");
	})
	})


	

})
