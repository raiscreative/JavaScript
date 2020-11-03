document.getElementById('button').addEventListener('click', getDataFromExternalAPI);



function getDataFromExternalAPI() {
        fetch('https://random.dog/woof.json')
            .then(res => res.json())
            .then(data => {
                if(data.url.includes('.mp4')) {
                    getDataFromExternalAPI();
                }
                else {
                    output.innerHTML = `<img src=${data.url} alt="dog" />`;
                    var button1 = document.createElement("button");
                    button.innerHTML = "Reset data";
                }
            })
            .catch(err => {
                alert("sorry, we couldn't access the API");
        });
}
    


var buttons = document.getElementsByClassName("buttons")[0];
buttons.appendChild(button1);

button1.addEventListener ("click", getDataFromExternalAPI);