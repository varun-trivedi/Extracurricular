const detailsForm = document.querySelector("form");
const fname = document.querySelector(".first");
const lname = document.querySelector(".second");
detailsForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const firstn = fname.value;
    const lastn = lname.value;
    const query = "/homepage?name="+firstn+"+"+lastn
    location.href = query;
})