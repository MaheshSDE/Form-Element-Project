let myFormEl = document.getElementById("addUserForm");

let nameEl = document.getElementById("name");
let nameErrorMessageEl = document.getElementById("nameErrMsg");

let emailEl = document.getElementById("email");
let emailErrorMessageEl = document.getElementById("emailErrMsg");

let statusEl = document.getElementById("status");
let genderMaleEl = document.getElementById("genderMale");
let genderFemaleEl = document.getElementById("genderFemale");

let formData = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
};

nameEl.addEventListener("change", function() {
    if (event.target.value === "") {
        nameErrorMessageEl.textContent = "Required*"
    } else {
        nameErrorMessageEl.textContent = "";
    }
    formData.name = event.target.value;
});

emailEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        emailErrorMessageEl.textContent = "Required*";
    } else {
        emailErrorMessageEl.textContent = "";
    }
    formData.email = event.target.value;
});

statusEl.addEventListener("change", function(event) {
    formData.status = event.target.value;
});

genderMaleEl.addEventListener("change", function(event) {
    formData.gender = event.target.value;
});

genderFemaleEl.addEventListener("change", function(event) {
    formData.gender = event.target.value;
});


myFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    let {
        name,
        email
    } = formData;
    if (name === "") {
        nameErrorMessageEl.textContent = "Required*";
    }
    if (email === "") {
        emailErrorMessageEl.textContent = "Required*";
    }

    let options = {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            Accept: "application/json",
            Authorization: "Bearer a88d9e2d2633e0a1961bf3a71b211cc7991dc6d0824bf321860ac9e69a8f42a0"
        },
        body: JSON.stringify(formData)
    };
    let url = "https://gorest.co.in/public-api/users";

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has already been taken") {
                    emailErrorMessageEl.textContent = "Email Already Exists!!";
                }
            }
        });
});