import './style.css';

class ValidateForm {
    constructor() {
        this.userEmail = document.getElementById('user_email');
        this.btn = document.querySelector('form');

        this.init();
    }
    init() {
        this.btn.addEventListener('submit', (e) => {
            e.preventDefault();
        });
        this.userEmail.addEventListener('input', () => {
            this.HandleValidateEmail();
        });
        this.userEmail.addEventListener('change', () => {
            this.HandleValidateEmail();
        });
    }

    HandleValidateEmail() {
        const emailError = document.getElementById('emailError');
        if (this.userEmail.validity.valid) {
            emailError.textContent = '';
            return;
        }

        if (this.userEmail.validity.typeMismatch) {
            emailError.textContent = 'Please enter email address';
        } else if (this.userEmail.validity.valueMissing) {
            emailError.textContent =
                "Because this information is crucial, please don't leave it";
        } else if (this.userEmail.validity.tooShort) {
            emailError.textContent = `You need to type ${this.userEmail.maxLength} for valid email, You are ${this.userEmail.value.length} character`;
        }
    }
}

new ValidateForm();
