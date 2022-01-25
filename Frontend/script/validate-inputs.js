let ALL_INPUT_VALID;

const form = document.getElementById('form');
const email = document.getElementById('email');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const subject = document.getElementById('subject');
const description = document.getElementById('description');
const phone = document.getElementById('phone');
const address = document.getElementById('address');


function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Das ist keine Email');
    ALL_INPUT_VALID = false; 
  }
}

function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`
        
    );
    ALL_INPUT_VALID = false; 

  } else if (input.value.length > max) {
    showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
    );
    ALL_INPUT_VALID = false; 

  } else {
    showSuccess(input);
  }
}

function checkPhone(input) {
  const re = /^(?:(?:|0{1,2}|\+{0,2})41(?:|\(0\))|0)([1-9]\d)(\d{3})(\d{2})(\d{2})$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Phonenumber is not valid');
    ALL_INPUT_VALID = false; 

  }
}
function checkLastname(input) {
  const re = (/^[A-Za-z]+$/);
  if (re.test(input.value.trim())) {
    //showSuccess(input);
    checkLength(lastName, 3, 50);
  } else {
    showError(input, 'Lastname is not valid');
    ALL_INPUT_VALID = false; 

  }
}

function checkFirstname(input) {
  const re = (/^[A-Za-z]+$/);
  if (re.test(input.value.trim())) {
    //showSuccess(input);
    checkLength(firstName, 2, 20);
  } else {
    showError(input, 'Firstname is not valid');
    ALL_INPUT_VALID = false; 

  }
}
function checkSubject(input) {
  const re = (/^[A-Za-z]+$/);
  if (re.test(input.value.trim())) {
    //showSuccess(input);
    checkLength(subject, 8, 20);
  } else {
    showError(input, 'Subject is not valid');
    ALL_INPUT_VALID = false; 

  }
}

function checkDescription(input) {
  const re = (/^[A-Za-z\s]+$/);
  if (re.test(input.value.trim())) {
    //showSuccess(input);
    checkLength(description, 10, 50)
  } else {
    showError(input, 'Description is not valid');
    ALL_INPUT_VALID = false; 

  }
}

function checkAddress(input) {
  const re = (/^[0-9a-zA-Z\s]+$/);
  if (re.test(input.value.trim())) {
    //showSuccess(input);
    checkLength(address, 2, 20);
  } else {
    showError(input, 'Address is not valid');
    ALL_INPUT_VALID = false; 

  }
}



//


/**
 * Get fieldname
 * @param input: HTML-Element by its id
 * @returns {string}: Returns caption of the input field with first Letter in capital
 */
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}




function validateForm(){
  if(!checkRequired([email, firstName, lastName, subject, description, phone, address ])){

    
    checkFirstname(firstName);
    checkLastname(lastName);
    checkEmail(email);
    checkPhone(phone);
    checkSubject(subject);
    checkDescription(description);
    checkAddress(address);
  }
}

window.onload = () => {
  console.log(`Make test call to the server ...`);
  getWelcome().then(
      result => {
        console.log(`Response from server: ${result}`);
      },
      error => {
        console.log(error)
      }
  );
};


form.addEventListener('submit', function(e) {
  ALL_INPUT_VALID = true;
  e.preventDefault();
  validateForm();
  if (ALL_INPUT_VALID){
    
    let formData = {
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        subject: subject.value,
        description: description.value,
        phone: phone.value,
        address: address.value
      }

    console.log(`All input is valid. Send data to server: 
      ${JSON.stringify(formData)}`);


    sendForm2(formData).then(
        result => {
          console.log(`Response from server: ${result}`);
          window.location.href = './confirm.html';
        },
        error => {
          console.log(error);
        }
    );


  } else {
    console.log("At least one validation failed. No data sent to contact-server.")
  }

});
