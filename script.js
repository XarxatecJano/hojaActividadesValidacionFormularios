let isNameInputValid, isSurnameInputValid, isEmailInputValid, isPhoneInputValid, numberOfSelectedHobbies, selectedHobbies, uncheckedHobbies;
const nameInput = document.querySelector("#name_input");
const surnameInput = document.querySelector("#surname_input");
const phoneInput = document.querySelector("#phone_input");
const emailInput = document.querySelector("#email_input");
const hobbiesArea = document.querySelector("#hobbies_list");
const dniInput = document.querySelector("#dni_input");
const dniLetters = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P','D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K','E', 'T'];

function letterOfDniNumber(dniNumber){
    return dniLetters[dniNumber%23];
}

function isInputValid(input, check, errorMessage){
    let isValid = true;
    if (check) {
        isValid = false;
        printErrorMessage(input, errorMessage);
    }
    updateFormComponentClasses(document.querySelector(`label[for="${input.id}"]`), isValid, "redFont");
    return isValid;
}

function updateFormComponentClasses(component, isValid, classToUpdate){
    component.classList.remove(classToUpdate);
    if (!isValid) component.classList.add(classToUpdate);
}

function printErrorMessage(wrongInput, message){
    const nodeError = document.createElement("p");
    nodeError.classList.add("error");
    nodeError.textContent = message;
    wrongInput.insertAdjacentElement("afterend", nodeError);
}

function removeErrorMessages(){
    document.querySelectorAll(".error").forEach((element)=>{element.remove();});
}

function checkNumberOfSelectedCheckboxes(){
    selectedHobbies  = document.querySelectorAll('input[name="hobbies"]:checked');
    return selectedHobbies.length;
}

function checkIsHobbiesValid(){
    numberOfSelectedHobbies = checkNumberOfSelectedCheckboxes();
    isHobbiesValid = selectedHobbies.length>=2 && selectedHobbies.length<=3;
    if (!isHobbiesValid){
        printErrorMessage(document.querySelector("#hobbies_list"), "El número de hobbies seleccionados debe estar entre 2 y 3");
    }
    updateFormComponentClasses(document.querySelector("legend"), isHobbiesValid, "redFont");
}

function checkValidityForm(form){
    removeErrorMessages();
    isNameInputValid = isInputValid(nameInput, nameInput.validity.patternMismatch, "El nombre no tiene el formato adecuado") && isInputValid(nameInput, nameInput.validity.valueMissing, "El campo nombre es requerido");
    isSurnameInputValid = isInputValid(surnameInput, surnameInput.validity.patternMismatch, "El apellido no cumple el formato establecido") && isInputValid(surnameInput, surnameInput.validity.valueMissing, "El campo apellido es obligatorio");
    isPhoneInputValid = isInputValid(phoneInput, phoneInput.validity.patternMismatch,  "El teléfono no cumple el formato establecido");
    isEmailInputValid = isInputValid(emailInput, emailInput.validity.patternMismatch, "El email no cumple el formato establecido") && isInputValid(emailInput, emailInput.validity.valueMissing, "El campo email es requerido");
    isDniValid = isInputValid(dniInput, dniInput.validity.patternMismatch, "Un dni válidos son 8 números y una letra mayúscula") && isInputValid(dniInput, dniInput.validity.valueMissing, "El campo DNI es obligatorio") && isInputValid(dniInput, !(dniInput.value[dniInput.value.length-1] == letterOfDniNumber(parseInt(dniInput.value.substring(0,8)))), "La letra del DNI no corresponde el número");
    checkIsHobbiesValid();
    if (isNameInputValid && isSurnameInputValid && isEmailInputValid && isPhoneInputValid && isHobbiesValid && isDniValid){
        form.submit();
    }
}

document.querySelector("#form1").addEventListener("submit", (event)=>{
    event.preventDefault();
    checkValidityForm(event.target);
})



document.querySelectorAll("input[name='hobbies']").forEach((element)=>element.addEventListener("change", ()=>{
    
    uncheckedHobbies = document.querySelectorAll("input[name='hobbies']:not(:checked)");
    if(uncheckedHobbies.length<=3) {
        uncheckedHobbies.forEach((element)=>{
            element.setAttribute("disabled", "true");
        });
    } else {
        uncheckedHobbies.forEach((element)=>{
            element.removeAttribute("disabled");
        });
    };
}));