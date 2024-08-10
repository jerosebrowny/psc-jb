document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('toggle-password');
    const copyPassword = document.getElementById('copy-password');
    const generatePassword = document.getElementById('generate-password');
    const strengthMeter = document.getElementById('strength-meter');
    const feedback = document.getElementById('feedback');

    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const strength = calculateStrength(password);
        updateUI(strength);
    });

    togglePassword.addEventListener('click', () => {
        // Toggle password visibility
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.textContent = 'Hide';
        } else {
            passwordInput.type = 'password';
            togglePassword.textContent = 'Show';
        }
    });

    copyPassword.addEventListener('click', () => {
        // Copy password to clipboard
        navigator.clipboard.writeText(passwordInput.value)
            .then(() => {
                alert('Password copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    });

    generatePassword.addEventListener('click', () => {
        // Generate a strong random password
        const password = generateRandomPassword();
        passwordInput.value = password;
        const strength = calculateStrength(password);
        updateUI(strength);
    });

    function calculateStrength(password) {
        let strength = 0;
        let hasUpperCase = /[A-Z]/.test(password);
        let hasLowerCase = /[a-z]/.test(password);
        let hasNumber = /[0-9]/.test(password);
        let specialCharacters = new Set(password.match(/[^A-Za-z0-9]/g) || []);
        let hasSpecialChars = specialCharacters.size >= 2;

        if (password.length >= 8 && password.length <= 12) {
            strength += 20;
        }

        if (hasUpperCase) strength += 20;
        if (hasLowerCase) strength += 20;
        if (hasNumber) strength += 20;
        if (hasSpecialChars) strength += 20;

        return strength;
    }

    function updateUI(strength) {
        let width = '0%';
        let color = 'red';
        let message = 'Very Weak';

        if (strength >= 40) {
            color = 'orange';
            message = 'Weak';
        }
        if (strength >= 60) {
            color = 'yellow';
            message = 'Fair';
        }
        if (strength >= 80) {
            color = 'lightgreen';
            message = 'Good';
        }
        if (strength >= 100) {
            color = 'green';
            message = 'Strong';
        }

        width = `${strength}%`;
        strengthMeter.style.width = width;
        strengthMeter.style.backgroundColor = color;
        feedback.textContent = message;
    }

    function generateRandomPassword() {
        const length = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
        const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
        const allChars = upperCase + lowerCase + numbers + specialChars;

        let password = '';
        password += upperCase[Math.floor(Math.random() * upperCase.length)];
        password += specialChars[Math.floor(Math.random() * specialChars.length)];
        password += specialChars[Math.floor(Math.random() * specialChars.length)];
        password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];

        for (let i = password.length; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }

        return shuffleString(password);
    }

    function shuffleString(str) {
        return str.split('').sort(() => Math.random() - 0.5).join('');
    }
});
