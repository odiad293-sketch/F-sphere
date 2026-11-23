import { renderSignupPage, passwordVisibilityToggle} from './signup_UI.js';
import { createAccount } from './create_account.js';
import { googleSignIn } from "./googleSignin.js"
export function signupInit() {

    renderSignupPage();
    passwordVisibilityToggle();

    const signupButton = document.querySelector('.signup-button');
    const googleButton =  document.querySelector('.google-signup');

    signupButton.addEventListener('click', async (event) => {
        event.preventDefault();
        await createAccount();
    });

    googleButton.addEventListener("click", async (event) => {
        event.preventDefault();
        await googleSignIn();
    });

}