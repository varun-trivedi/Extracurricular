const clubRequestForm = document.querySelector("form");
clubRequestForm.addEventListener("submit",(event)=>{
	event.preventDefault();
	const formData = new FormData(clubRequestForm);
	const data = Object.fromEntries(formData);
	
	fetch("/club_request/"+data.rollNo+"&"+data.clubName).then((res) =>{
		res.json().then((result)=>{
		if(result.length > 0)
		{
			window.alert("Application already pending");
			history.back();
		}
		else{
			fetch("/club_request",{
				method:"POST",
				headers:{
					"Content-Type" : "application/json"
				},
				body: JSON.stringify(data)
			}).then((res)=>{
				res.json().then((inf)=>{
					console.log(inf.clubName);
					// const query = "/admin_homepage";
					console.log(inf);
					if(inf.name == "ValidationError")
					console.log("Error!");
					else{
						alert("Request Submitted successfully");
						// location.href = query;
					}
				}).catch((error) =>{
					console.log(error);
				})
			})
		}
	}).catch((error)=>{
		window.alert("Error!");
	})
	})
	
	

})
