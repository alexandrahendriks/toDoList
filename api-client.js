const baseUrl = "http://192.168.178.20:3000";

//GET request
async function getData() {
    try {
        const response = await fetch(baseUrl, { method: "GET", headers: { "Content-Type": "application/json",}});
        const result = await response.json();
        return result;
    } catch (err){
        console.log(err);
    }
}
//POST request
async function postTask (data) {
    const toPost = {description: data, done: false};
    try {
        const response = fetch(baseUrl,{
            method: "POST",
            body: JSON.stringify(toPost),
            headers: {
              "Content-Type": "application/json",
              }
        }) 
        return response;
    } catch (err) {
        console.log(err);
    }

}

//DELET request
 async function deletPost (idValue) {
    const id = idValue;
    const url = `${baseUrl}/${id}`;
    try {
        await fetch (url, { method: "DELETE"});
    } catch (err) {
        console.log(err);
    }
} 

//PUT request DONE
function doneRequest (idValue) {
    const data = {done: true};
    const Url = `${baseUrl}/${idValue}`;
    fetch (Url, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json"}});
}

//PUT request UNDONE
function unDoneRequest(idValue) {
    const data = {done: false};
    const Url = `${baseUrl}/${idValue}`;
    fetch (Url, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json"}}); 
}

