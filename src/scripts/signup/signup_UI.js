export function renderSignupPage() {
    let main = document.querySelector('main');
    let header = document.querySelector('header');
    
    let renderFormHTML = ` 
    <div class="overlay">
        <div class="loading-container">
            <div class="spiner"></div>
            <p>loading...</p>
        </div>
    </div>
   
    <section class="signup-form">

            <form id="signup-form">

                <div class="input-group">

                    <span class="material-symbols-outlined">
                        person
                    </span>

                    <input type="text" id="name" name="name" placeholder="Enter your full name" autocomplete="name"
                        required>

                </div>


                <div class="input-group" id="gamil-input">

                    <span class="material-symbols-outlined">
                        mail
                    </span>

                    <input type="email" id="email" name="email" placeholder="Enter your email" autocomplete="email"
                        required>

                </div>


                <div class="input-group">

                    <span class="material-symbols-outlined">
                        lock
                    </span>

                    <input type="password" id="password" name="password" placeholder="Create a password"
                        autocomplete="new-password" required>

                    <span class="material-symbols-outlined js-password-visibilityIcon">
                        visibility
                    </span>

                </div>


                <div class="input-group">

                    <span class="material-symbols-outlined">
                        lock
                    </span>

                    <input type="password" id="confirm-password" name="confirm-password"
                        placeholder="Confirm your password" autocomplete="new-password" required>

                    <span class="material-symbols-outlined js-confirm-password-visibilityIcon">
                        visibility
                    </span>


                </div>


                <button type="submit" class="signup-button">
                    Create Account
                </button>

            </form>


            <div class="separator">

                <span>OR</span>

            </div>


            <button type="button" class="google-signup">

                <!-- Official Google G logo -->
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
                    <path fill="#4285F4"
                        d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z" />
                    <path fill="#34A853"
                        d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z" />
                    <path fill="#FBBC05" d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z" />
                    <path fill="#EA4335"
                        d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.9 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.6 18.7 12 24 12Z" />
                </svg>

                <span>Continue with Google</span>

            </button>

            <div class="signup-link-container">
                <p class="signup-link">
                    Already have an account?
                    <a href="src/pages/signin.html">Sign In</a>
                </p>
            </div>

        </section>`;
    
    let renderHeaderHTML = `  <div class="logo-container">
            <div class="logo">
                <img src="src/images/logo.png" alt="F-Sphere logo" class="logo">

            </div>

            <h1 class="project-name">F-Sphere</h1>

            <span>The Frontend Developers' Space</span>

        </div>
      
      <div class="error-card">
    <div class="error-icon">
        !
    </div>

    <div class="error-content">
        <h3>Invalid credentials</h3>
        <p>Please check your email and password.</p>
    </div>

    <button class="error-close" type="button" aria-label="Close error">
        &times;
    </button>
</div>

        <div class="welcome-container">

            <h2>Create Account</h2>

            <p>Join our community and start connecting!</p>

        </div>
`
    header.innerHTML = renderHeaderHTML;
    main.innerHTML = renderFormHTML;
}

export function passwordVisibilityToggle() {
    let passwordInput = document.querySelector('#password');
    let confirmPasswordInput = document.querySelector('#confirm-password');
    let passwordVisibilityIcon = document.querySelector('.js-password-visibilityIcon');
    let confirmPasswordVisibilityIcon = document.querySelector('.js-confirm-password-visibilityIcon');
    
    passwordVisibilityIcon.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordVisibilityIcon.textContent = 'visibility_off';
        } else {
            passwordInput.type = 'password';
            passwordVisibilityIcon.textContent = 'visibility';
        }
    })
    
    confirmPasswordVisibilityIcon.addEventListener('click', () => {
        if (confirmPasswordInput.type === 'password') {
            confirmPasswordInput.type = 'text';
            confirmPasswordVisibilityIcon.textContent = 'visibility_off';
        } else {
            confirmPasswordInput.type = 'password';
            confirmPasswordVisibilityIcon.textContent = 'visibility';
        }
    })
}

export function lodingState(state) {
    const overlay = document.querySelector(".overlay");
    if (state === true) {
        overlay.style.display = "block";
    }
    else {
        overlay.style.display = "none";
    }
}