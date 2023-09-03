const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const submitButton = document.querySelector('#btn-submit-form');
const closeModalButton = document.querySelector('#btn-close-modal');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

const emailRegEx = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,5}))$/);

const colorError = 'red';
const colorNormal = 'green';

const doBorderPaint = (element, color) => {
    element.style.borderColor = color;
}

const isEmpty = (element) => {
    if (element.value !== "") {
        doBorderPaint(element, colorNormal);
        return true;
    }

    doBorderPaint(element, colorError);
    return false;
}

const isEmail = (element) => {
    if (emailRegEx.exec(element.value)) {
        doBorderPaint(element, colorNormal);
        return true;
    }
    doBorderPaint(element, colorError);
    return false;
}

const isValid = (name, email, message) => {
    return isEmpty(name) && isEmail(email) && isEmpty(message)
    ? true
    : false; 
};

const showOverlay = () => {
    overlay.classList.remove('hidden');
};

const hideOverlay = () => {
    overlay.classList.add('hidden');
};

const showModal = () => {
    modal.classList.remove('hidden');
};

const hideModal = () => {
    modal.classList.add('hidden');
};

const appendData = (name, email, message) => {
    const formData = {
        'name': name,
        'email': email,
        'message': message
    };
    const dataElement = document.createElement('div');
    dataElement.classList.add('flexible-dataframe');
    modal.appendChild(dataElement);
    dataElement.innerHTML = `<hr class="mg-top-3"><p class="mg-top-3"><strong>Имя: </strong>${formData['name']}</p>
    <p class="mg-top-3"><strong>Email: </strong>${formData['email']}</p>
    <p class="mg-top-3"><strong>Сообщение: </strong>${formData['message']}</p>
    `;
};

const removeData = () => {
    const dataElement = document.querySelector('.flexible-dataframe');
    modal.removeChild(dataElement);
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (isValid(nameInput, emailInput, messageInput)) {
        showOverlay();
        showModal();
        appendData(nameInput.value, emailInput.value, messageInput.value);
    }
});

closeModalButton.addEventListener('click', () => {
    hideModal();
    hideOverlay();
    removeData();
});