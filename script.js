document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#registration-form');
    const tableBody = document.querySelector('#table-body');
    const deleteSelectedButton = document.querySelector('#delete-selected');
    const duplicateSelectedButton = document.querySelector('#duplicate-selected');

    // Додати обробник події для кожного поле, щоб видаляти повідомлення про помилки при виправленні
    const inputFields = form.querySelectorAll('input, select');
    inputFields.forEach(input => {
        input.addEventListener('input', () => {
            const errorId = input.id + '-error';
            const errorElement = document.querySelector('#' + errorId);
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    });

    // Отримайте всі радіокнопки статі
    const genderRadios = document.querySelectorAll('input[name="gender"]');

    genderRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            // Отримайте елемент повідомлення про помилку
            const genderError = document.querySelector('#gender-error');
            // Якщо радіокнопка була вибрана, видаліть повідомлення про помилку
            if (genderError.textContent) {
                genderError.textContent = '';
            }
        });
    });
        

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const lastName = document.querySelector('#last-name').value;
        const firstName = document.querySelector('#first-name').value;
        const middleName = document.querySelector('#middle-name').value;
        const birthdate = document.querySelector('#birthdate').value;
        const gender = document.querySelector('input[name="gender"]:checked');
        const phone = document.querySelector('#phone').value;

        const emailError = document.querySelector('#email-error');
        const passwordError = document.querySelector('#password-error');
        const lastNameError = document.querySelector('#last-name-error');
        const firstNameError = document.querySelector('#first-name-error');
        const middleNameError = document.querySelector('#middle-name-error');
        const birthdateError = document.querySelector('#birthdate-error');
        const genderError = document.querySelector('#gender-error');
        const phoneError = document.querySelector('#phone-error');

        const emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(email)) {
            emailError.textContent = 'Некоректна електронна пошта';
        }

        if (password.length < 8) {
            passwordError.textContent = 'Пароль повинен містити принаймні 8 символів';
        }

        if (lastName.length === 0) {
            lastNameError.textContent = "Це поле обов'язкове для заповнення";
        }

        if (firstName.length === 0) {
            firstNameError.textContent = "Це поле обов'язкове для заповнення";
        }

        if (middleName.length === 0) {
            middleNameError.textContent = "Це поле обов'язкове для заповнення";
        }

        if (birthdate.length === 0) {
            birthdateError.textContent = "Це поле обов'язкове для заповнення";
        }

        if (!gender) {
            genderError.textContent = "Виберіть стать";
        }
        

        var phonePattern = /^\+38\(0\d{2}\)\s\d{3}-\d{2}-\d{2}$/;
        if (!phonePattern.test(phone)) {
            phoneError.textContent = 'Некоректний номер телефону';
        }

        if (emailError.textContent || lastNameError.textContent || firstNameError.textContent || middleNameError.textContent || birthdateError.textContent || genderError.textContent || phoneError.textContent) {
            return; 
        }

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${email}</td>
            <td>${lastName}</td>
            <td>${firstName}</td>
            <td>${middleName}</td>
            <td>${birthdate}</td>
            <td>${gender.value}</td>
            <td>${phone}</td>
            
        `;
        tableBody.appendChild(newRow);
        form.reset();
    });

    $('#phone').inputmask('+38(099) 999-99-99');


    tableBody.addEventListener('click', function (event) {
        if (event.target.type === 'checkbox') {
            updateActionButtonsState();
        } else if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Видалити') {
            event.target.closest('tr').remove();
        } else if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Дублювати') {
            const rowToDuplicate = event.target.closest('tr');
            const newRow = rowToDuplicate.cloneNode(true);
            tableBody.appendChild(newRow);
        }
    });

    deleteSelectedButton.addEventListener('click', function () {
        const selectedCheckboxes = tableBody.querySelectorAll('input[type="checkbox"]:checked');
        selectedCheckboxes.forEach((checkbox) => {
            checkbox.closest('tr').remove();
        });
        updateActionButtonsState();
    });

    duplicateSelectedButton.addEventListener('click', function () {
        const selectedCheckboxes = tableBody.querySelectorAll('input[type="checkbox"]:checked');
        selectedCheckboxes.forEach((checkbox) => {
            const rowToDuplicate = checkbox.closest('tr');
            const newRow = rowToDuplicate.cloneNode(true);
            tableBody.appendChild(newRow);
        });
        updateActionButtonsState();
    });

    function updateActionButtonsState() {
        const selectedCheckboxes = tableBody.querySelectorAll('input[type="checkbox"]:checked');
        if (selectedCheckboxes.length > 0) {
            deleteSelectedButton.style.display = 'block';
            duplicateSelectedButton.style.display = 'block';
        } else {
            deleteSelectedButton.style.display = 'none';
            duplicateSelectedButton.style.display = 'none';
        }
    }



});
