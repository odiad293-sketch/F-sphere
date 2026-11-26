export function renderhtml() {
    const headerContainer = document.querySelector("header")
    let headerhtml = `
      <div class="right-side">
            <img src="../images/logo.png" alt="logo">
            <h1>F-Sphere</h1>
        </div>
        <div class="left-side">
            <nav class="button-container">
                <button class="login-btn">Login</button>
                <button class="signup-btn">Signup</button>
            </nav>
        </div>
    `
    headerContainer.innerHTML = headerhtml;

    const mainUIContainer = document.querySelector("main")

    let mainUI = `
        
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


        <div class="overlay">
            <div class="loading-container">
                <div class="spiner"></div>
                <p>loading...</p>
            </div>
        </div>

        <section id="hero-section">
            <div class="email-lcon">
                <span class="material-symbols-outlined">
                    mail
                </span>
            </div>
            <div class="hero-content">
                <span class="successMessage">We have just sent another verification email.</span>
                <h2>Verify your email</h2>
                <p>We've sent a verification link to your email address. Please check your inbox.</p>
            </div>
        </section>

        <section class="main-content">
            <div class="email">
                <p class="user-email">youremail@gmail.com</p>
            </div>
            <button id="verified-btn">i have verified my email</button>
        </section>

        <section class="requet-section">
            <span>Didn't receive the email?</span>
            <button class="resend">Resend verification email</button>
        </section>
    `

    mainUIContainer.innerHTML = mainUI;
}