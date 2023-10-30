const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const subscriptionInput = document.getElementsByName('subscription');
const submitButton = document.getElementById('submitButton');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const subscriptionError = document.getElementById('subscriptionError');
const spinner = document.getElementById('spinner');
const form = document.getElementById('form')
const thanksMessage = document.getElementById('thanksMessage');

function sendToSheet(subscription) {
    const name = encodeURIComponent(nameInput.value);
    const email = encodeURIComponent(emailInput.value);

    console.log(name);
    console.log(email);
    console.log(subscription)

    const link = 'https://script.google.com/macros/s/AKfycbx7aqZJ55NiEogUzEyTsrEe6QNYG5i9tviuVtheNH_boRAdCFhdPD1fMj-KV9N7DWC1hQ/exec'
    console.log(link)


    fetch(link, {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify({
            name: name,
            email: email,
            subscription: subscription
        }),
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        }
    }).then(response => showThankYouMessage())
        .catch(error => showErrorMessage())
}

function getSubscription() {
    for (i = 0; i < subscriptionInput.length; i++) {
        if (subscriptionInput[i].checked) {
            return subscriptionInput[i].value.trim()
        }
    }
}

function loadSpinner() {
    spinner.style.display = 'block';
    submitButton.disabled = true;
}

function removeSpinner() {
    spinner.style.display = 'none';
    submitButton.disabled = false;
}

function showThankYouMessage() {
    removeSpinner();
    form.style.display = 'none';
    thanksMessage.style.display = 'block';
}

function showErrorMessage() {
    removeSpinner();
    alert("There was an error. Please try again");
}

function validateAndSubmit() {

    let subscription = getSubscription()


    let isValid = true;

    if (!nameInput.value) {
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.style.display = 'none';
    }

    if (!emailInput.value) {
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    if (!subscription) {
        subscriptionError.style.display = 'block';
        isValid = false;
    } else {
        subscriptionError.style.display = 'none';
    }



    if (isValid) {
        loadSpinner()
        sendToSheet(subscription);
    }
}

submitButton.addEventListener('click', validateAndSubmit);