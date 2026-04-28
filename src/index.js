import './style.css';

class ValidateForm {
    constructor() {
        this.userEmail = document.getElementById('user_email');
        this.btn = document.querySelector('form');
        this.postal = document.getElementById('postal');
        this.country = document.getElementById('country');

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

        this.postal.addEventListener('input', () => {
            this.handlePostalCode();
        });
        this.country.addEventListener('change', () => {
            this.handlePostalCode();
        });
    }

    handlePostalCode() {
        const postalError = document.getElementById('postalError');
        const constraints = {
            ch: [
                '^(CH-)?\\d{4}$',
                'Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950',
            ],
            fr: [
                '^(F-)?\\d{5}$',
                'French postal codes must have exactly 5 digits: e.g. F-75012 or 75012',
            ],
            de: [
                '^(D-)?\\d{5}$',
                'German postal codes must have exactly 5 digits: e.g. D-12345 or 12345',
            ],
            nl: [
                '^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$',
                'Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS',
            ],
        };

        const selectedCountry = this.country.value;
        const [code, error] = constraints[selectedCountry];
        const constraint = new RegExp(code, '');

        console.log(constraint);

        const value = this.postal.value;
        const isEmpty = value.length === 0;
        const isValid = constraint.test(value);

        if (isEmpty) {
            postalError.textContent = '';
            this.postal.className = '';
            return;
        }

        postalError.textContent = isValid ? '' : error;

        this.postal.classList.toggle('valid', isValid);
        this.postal.classList.toggle('invalid', !isValid);
    }

    HandleValidateEmail() {
        const emailError = document.getElementById('emailError');
        if (this.userEmail.validity.valid) {
            emailError.textContent = '';
            return;
        }

        if (this.userEmail.validity.valueMissing) {
            emailError.textContent =
                "Because this information is crucial, please don't leave it";
        } else if (this.userEmail.validity.tooShort) {
            emailError.textContent = `You need to type ${this.userEmail.minLength} for valid email, You are ${this.userEmail.value.length} character`;
        } else if (this.userEmail.validity.typeMismatch) {
            emailError.textContent = 'Please enter email address';
        }
    }
}

new ValidateForm();
