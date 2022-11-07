const loginForm = document.querySelector("form");
const query = "/admin_homepage";
loginForm.addEventListener("submit",(event)=>{
	event.preventDefault();
	const formData = new FormData(loginForm);
	const data = Object.fromEntries(formData);
    console.log(data.password);

	fetch("/admin_login/"+data.password).then((res) =>{
        res.json().then((result)=>{
            {
                if(result.message == "ok")
				{
                    
                    location.href = query;
                }
            }
    }).catch((error)=>{
		window.alert("Please enter correct Admin key!");
    })
    })

})
