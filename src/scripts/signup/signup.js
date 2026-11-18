import { renderSignupPage, passwordVisibilityToggle} from './signup_UI.js';
import { createAccount } from './create_account.js';
export function signupInit() {

    renderSignupPage();
    passwordVisibilityToggle();

    const signupButton = document.querySelector('.signup-button');
    signupButton.addEventListener('click', async (event) => {
        event.preventDefault();
        await createAccount();
    });

}