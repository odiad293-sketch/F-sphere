// Display an error inside the error card
export function displaySignupError(title, message) {
    const errorCard = document.querySelector('.error-card');

    if (!errorCard) return;

    const errorTitle = errorCard.querySelector('h3');
    const errorMessage = errorCard.querySelector('p');
    const closeButton = errorCard.querySelector('.error-close');

    errorTitle.textContent = title;
    errorMessage.textContent = message;

    errorCard.style.display = 'flex';

    // Close the error card
    closeButton.onclick = () => {
        errorCard.style.display = 'none';
    };
}

// Hide the error card
export function hideSignupError() {
    const errorCard = document.querySelector('.error-card');

    if (errorCard) {
        errorCard.style.display = 'none';
    }
}

