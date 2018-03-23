window.onload = () => {
    //Redirect user to right user to the right url if he comes from somewhere else
    if(window.location.pathname !== '/FrontController/login.do'){
        window.location.replace('login.do');
    }


    document.getElementById("login").addEventListener("click", loginEvent);

    document.body.addEventListener("keydown", (e) => {
        if (e.keyCode == 13) {
            loginEvent();
            console.log("ENTER HAS BEEN PRESSED");
        }
    });
}

function loginEvent() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        //If the request is DONE (4), and everything is OK
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            console.log(data);

            //Call login response processing
            login(data);
        }
    };

    //Doing a HTTP to a specific endpoint
    xhr.open("POST", `login.do?username=${username}&password=${password}`);

    //Sending our request
    xhr.send();
}

function login(data) {
    //If message is a member of the JSON it was AUTHENTICATION FAILED
    if (data.message) {
        document.getElementById("loginMessage").innerHTML = '<span class="label label-danger label-center">Wrong credentials.</span>';
    } else {
        //Using session storage of JavaScript
        sessionStorage.setItem("customerId", data.id);
        sessionStorage.setItem("customerUsername", data.username);
        window.location.replace("home.do");
    }
}