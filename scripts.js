const form = document.getElementById('registerForm');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('showPassword');
const submitButton = document.getElementById('submitButton');

// Валідаційні функції
function validateName(name) {
    return /^[A-ZА-Я][a-zа-яA-ZА-Я]*$/.test(name); // Починається з великої літери, тільки літери
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Коректний формат email
}

function validatePassword(password) {
    return /[A-Z]/.test(password) && // Велика літера
           /[a-z]/.test(password) && // Маленька літера
           /[0-9]/.test(password) && // Цифра
           /[!@#$%^&*]/.test(password) && // Спеціальний символ
           password.length >= 8; // Мінімум 8 символів
}

// Жива валідація
function validateField(input, validator, errorElement, errorMessage) {
    const value = input.value.trim();
    if (validator(value)) {
        input.classList.add('valid');
        input.classList.remove('invalid');
        errorElement.textContent = ''; // Очищення помилок
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        errorElement.textContent = errorMessage; // Виведення помилки
    }
    toggleSubmitButton(); // Оновлення стану кнопки
}

// Увімкнення/вимкнення кнопки
function toggleSubmitButton() {
    const allFieldsValid =
        firstNameInput.classList.contains('valid') &&
        lastNameInput.classList.contains('valid') &&
        emailInput.classList.contains('valid') &&
        passwordInput.classList.contains('valid');
    
    console.log({
        firstNameValid: firstNameInput.classList.contains('valid'),
        lastNameValid: lastNameInput.classList.contains('valid'),
        emailValid: emailInput.classList.contains('valid'),
        passwordValid: passwordInput.classList.contains('valid'),
        allFieldsValid,
    });
    
    submitButton.disabled = !allFieldsValid;
}


// Відображення/приховування пароля
showPasswordCheckbox.addEventListener('change', () => {
    console.log("Показати пароль:", showPasswordCheckbox.checked); // Лог для перевірки
    passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
});


// Події input для живої валідації
firstNameInput.addEventListener('input', () =>
    validateField(
        firstNameInput,
        validateName,
        document.getElementById('firstNameError'),
        'Ім\'я має починатися з великої літери та містити лише літери'
    )
);

lastNameInput.addEventListener('input', () =>
    validateField(
        lastNameInput,
        validateName,
        document.getElementById('lastNameError'),
        'Прізвище має починатися з великої літери та містити лише літери'
    )
);

emailInput.addEventListener('input', () =>
    validateField(
        emailInput,
        validateEmail,
        document.getElementById('emailError'),
        'Невірний формат e-mail'
    )
);

passwordInput.addEventListener('input', () =>
    validateField(
        passwordInput,
        validatePassword,
        document.getElementById('passwordError'),
        'Пароль має бути не менш ніж 8 символів, містити великі літери, цифри та спеціальні символи'
    )
);

// Обробка форми
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Зупиняємо стандартну відправку форми
    console.log({
        firstName: firstNameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
    });
    alert('Дані успішно надіслані!');
});
