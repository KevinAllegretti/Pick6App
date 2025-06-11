// Switch between login and registration forms
/*document.getElementById('show-register').addEventListener('click', function() {
    console.log('Clicked on Register link');
    document.querySelector('.form.login').classList.remove('active');
    document.querySelector('.form.register').classList.add('active');
    console.log('Login form class:', document.querySelector('.form.login').className);
    console.log('Register form class:', document.querySelector('.form.register').className);
});

document.getElementById('show-login').addEventListener('click', function() {
    console.log('Clicked on Login link');
    document.querySelector('.form.register').classList.remove('active');
    document.querySelector('.form.login').classList.add('active');
    console.log('Register form class:', document.querySelector('.form.register').className);
    console.log('Login form class:', document.querySelector('.form.login').className);
});

/*
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    
    if (status === 'success') {
        alert('Email verified successfully! You can now log in.');
    } else if (status === 'failed') {
        alert('Email verification failed. Please try again or contact support.');
    }
});*/

// Handle login form submission
/*
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    var json = JSON.stringify(object);

    fetch('https://www.pick6.club/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: json,
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.message); // Show error message
        } else if (data.redirect) {
            window.location.href = data.redirect; // Perform redirection
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during the login process. Please try again.');
    });
});*/
/*
// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    var json = JSON.stringify(object);

    console.log('=== LOGIN DEBUG START ===');
    console.log('Attempting login with data:', object);
    console.log('JSON being sent:', json);

    fetch('https://www.pick6.club/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: json,
    })
    .then(response => {
        console.log('Login response status:', response.status);
        console.log('Login response ok:', response.ok);
        console.log('Login response headers:', [...response.headers.entries()]);
        
        if (!response.ok) {
            console.error('Response not OK, status:', response.status);
        }
        
        return response.text(); // Get raw text first
    })
    .then(rawData => {
        console.log('Raw response data:', rawData);
        
        // Try to parse as JSON
        try {
            const data = JSON.parse(rawData);
            console.log('Parsed JSON data:', data);
            
            if (data.error) {
                console.log('Login error:', data.message);
                alert(data.message); // Show error message
            } else if (data.redirect) {
                console.log('Login success, redirecting to:', data.redirect);
                window.location.href = data.redirect; // Perform redirection
            } else {
                console.log('Unexpected response format:', data);
                alert('Unexpected response from server');
            }
        } catch (parseError) {
            console.error('Failed to parse JSON:', parseError);
            console.log('Raw data that failed to parse:', rawData);
            alert('Server returned invalid response');
        }
    })
    .catch(error => {
        console.error('Fetch error details:', error);
        console.log('Error name:', error.name);
        console.log('Error message:', error.message);
        alert('An error occurred during the login process. Please try again.');
    });
    
    console.log('=== LOGIN DEBUG END ===');
});

// Add this function to test basic connectivity
async function testConnection() {
    console.log('=== CONNECTION TEST START ===');
    try {
        console.log('Testing connection to server...');
        const response = await fetch('https://www.pick6.club/getCurrentWeek');
        console.log('Test response status:', response.status);
        console.log('Test response ok:', response.ok);
        
        const data = await response.json();
        console.log('Test response data:', data);
        console.log('=== CONNECTION TEST SUCCESS ===');
    } catch (error) {
        console.error('=== CONNECTION TEST FAILED ===');
        console.error('Connection test error:', error);
    }
}

// Call this when the page loads
document.addEventListener('DOMContentLoaded', function() {
    testConnection();
});


// Handle registration form submission
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    let object = {};
    formData.forEach((value, key) => object[key] = value);
    let json = JSON.stringify(object);

    fetch('https://www.pick6.club/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: json,
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.message); // Show error message from the server
        } else {
            alert(data.message); // Success message
            document.querySelector('.form.register').classList.remove('active'); // Hide registration form
            document.querySelector('.form.login').classList.add('active'); // Show login form
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during the registration process. Please try again.');
    });
});

*/

// Password management system
class PasswordManager {
    constructor() {
        this.storageKey = 'pick6_saved_credentials';
        this.init();
    }

    init() {
        // Add "Remember me" checkbox to login form if it doesn't exist
        this.addRememberMeCheckbox();
        // Load and display saved credentials
        this.loadSavedCredentials();
    }

    addRememberMeCheckbox() {
        const loginForm = document.getElementById('login-form');
        const submitButton = loginForm.querySelector('button[type="submit"]');
        
        // Check if checkbox already exists
        if (document.getElementById('remember-me')) return;
        
        // Create checkbox container
        const checkboxDiv = document.createElement('div');
        checkboxDiv.style.cssText = 'margin-bottom: 15px; display: flex; align-items: center; gap: 8px;';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'remember-me';
        checkbox.name = 'remember';
        
        const label = document.createElement('label');
        label.setAttribute('for', 'remember-me');
        label.textContent = 'Remember my login';
        label.style.cssText = 'font-size: 14px; color: #666; cursor: pointer;';
        
        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        
        // Insert before submit button
        submitButton.parentNode.insertBefore(checkboxDiv, submitButton);
    }

    // Save credentials to localStorage
    saveCredentials(username, password) {
        const credentials = this.getSavedCredentials();
        
        // Check if username already exists, update if so
        const existingIndex = credentials.findIndex(cred => cred.username === username);
        if (existingIndex !== -1) {
            credentials[existingIndex] = { username, password: this.encodePassword(password) };
        } else {
            credentials.push({ username, password: this.encodePassword(password) });
        }
        
        localStorage.setItem(this.storageKey, JSON.stringify(credentials));
        this.displaySavedCredentials();
    }

    // Get saved credentials from localStorage
    getSavedCredentials() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : [];
    }

    // Simple encoding (not secure, just obfuscation)
    encodePassword(password) {
        return btoa(password);
    }

    // Simple decoding
    decodePassword(encodedPassword) {
        return atob(encodedPassword);
    }

    // Delete specific credential
    deleteCredential(username) {
        const credentials = this.getSavedCredentials();
        const filtered = credentials.filter(cred => cred.username !== username);
        localStorage.setItem(this.storageKey, JSON.stringify(filtered));
        this.displaySavedCredentials();
    }

    // Load and display saved credentials
    loadSavedCredentials() {
        this.displaySavedCredentials();
    }

    // Display saved credentials in the UI
    displaySavedCredentials() {
        const credentials = this.getSavedCredentials();
        const loginForm = document.querySelector('.form.login');
        let savedCredentialsDiv = document.getElementById('saved-credentials');

        if (credentials.length === 0) {
            if (savedCredentialsDiv) {
                savedCredentialsDiv.style.display = 'none';
            }
            return;
        }

        // Create saved credentials div if it doesn't exist
        if (!savedCredentialsDiv) {
            savedCredentialsDiv = document.createElement('div');
            savedCredentialsDiv.id = 'saved-credentials';
            savedCredentialsDiv.style.cssText = `
                margin-bottom: 20px;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 8px;
                border: 1px solid #e9ecef;
            `;
            
            const title = document.createElement('h4');
            title.textContent = 'Saved Accounts:';
            title.style.cssText = 'margin: 0 0 10px 0; color: #333; font-size: 14px; font-weight: 600;';
            
            const credentialsList = document.createElement('div');
            credentialsList.id = 'credentials-list';
            
            savedCredentialsDiv.appendChild(title);
            savedCredentialsDiv.appendChild(credentialsList);
            
            // Insert after the title
            const titleElement = loginForm.querySelector('.title');
            titleElement.parentNode.insertBefore(savedCredentialsDiv, titleElement.nextSibling);
        }

        savedCredentialsDiv.style.display = 'block';
        const credentialsList = document.getElementById('credentials-list');
        credentialsList.innerHTML = '';

        credentials.forEach(cred => {
            const credDiv = document.createElement('div');
            credDiv.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 12px;
                cursor: pointer;
                border-radius: 4px;
                margin-bottom: 5px;
                transition: background-color 0.2s ease;
                background: white;
                border: 1px solid #dee2e6;
            `;
            
            credDiv.innerHTML = `
                <span style="font-weight: 500; color: #333;">${cred.username}</span>
                <span style="color: #dc3545; cursor: pointer; font-size: 16px; font-weight: bold;" onclick="passwordManager.deleteCredential('${cred.username}')">&times;</span>
            `;
            
            // Add hover effect
            credDiv.addEventListener('mouseenter', () => {
                credDiv.style.backgroundColor = '#e9ecef';
            });
            credDiv.addEventListener('mouseleave', () => {
                credDiv.style.backgroundColor = 'white';
            });
            
            credDiv.addEventListener('click', (e) => {
                if (!e.target.onclick) {  // Don't fill if clicking delete button
                    this.fillLoginForm(cred.username, cred.password);
                }
            });
            
            credentialsList.appendChild(credDiv);
        });
    }

    // Fill login form with selected credential
    fillLoginForm(username, encodedPassword) {
        const usernameField = document.querySelector('input[name="username"]');
        const passwordField = document.querySelector('input[name="password"]');
        
        if (usernameField && passwordField) {
            usernameField.value = username;
            passwordField.value = this.decodePassword(encodedPassword);
        }
    }
}

// Initialize password manager
const passwordManager = new PasswordManager();

// Switch between login and registration forms
document.getElementById('show-register').addEventListener('click', function() {
    console.log('Clicked on Register link');
    document.querySelector('.form.login').classList.remove('active');
    document.querySelector('.form.register').classList.add('active');
    console.log('Login form class:', document.querySelector('.form.login').className);
    console.log('Register form class:', document.querySelector('.form.register').className);
});

document.getElementById('show-login').addEventListener('click', function() {
    console.log('Clicked on Login link');
    document.querySelector('.form.register').classList.remove('active');
    document.querySelector('.form.login').classList.add('active');
    console.log('Register form class:', document.querySelector('.form.register').className);
    console.log('Login form class:', document.querySelector('.form.login').className);
});

/*
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    
    if (status === 'success') {
        alert('Email verified successfully! You can now log in.');
    } else if (status === 'failed') {
        alert('Email verification failed. Please try again or contact support.');
    }
});*/

// Handle login form submission
/*
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    var json = JSON.stringify(object);

    fetch('https://www.pick6.club/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: json,
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.message); // Show error message
        } else if (data.redirect) {
            window.location.href = data.redirect; // Perform redirection
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during the login process. Please try again.');
    });
});*/

// Handle login form submission - ENHANCED VERSION
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    
    // Extract credentials and remember preference
    const username = object.username;
    const password = object.password;
    const rememberMe = object.remember;
    
    // Remove remember checkbox from data sent to server
    delete object.remember;
    
    var json = JSON.stringify(object);

    console.log('=== LOGIN DEBUG START ===');
    console.log('Attempting login with data:', object);
    console.log('Remember me checked:', !!rememberMe);
    console.log('JSON being sent:', json);

    fetch('https://www.pick6.club/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: json,
    })
    .then(response => {
        console.log('Login response status:', response.status);
        console.log('Login response ok:', response.ok);
        console.log('Login response headers:', [...response.headers.entries()]);
        
        if (!response.ok) {
            console.error('Response not OK, status:', response.status);
        }
        
        return response.text(); // Get raw text first
    })
    .then(rawData => {
        console.log('Raw response data:', rawData);
        
        // Try to parse as JSON
        try {
            const data = JSON.parse(rawData);
            console.log('Parsed JSON data:', data);
            
            if (data.error) {
                console.log('Login error:', data.message);
                alert(data.message); // Show error message
            } else if (data.redirect) {
                console.log('Login success, redirecting to:', data.redirect);
                
                // Save credentials if "Remember me" is checked and login was successful
                if (rememberMe) {
                    passwordManager.saveCredentials(username, password);
                    console.log('Credentials saved for user:', username);
                }
                
                window.location.href = data.redirect; // Perform redirection
            } else {
                console.log('Unexpected response format:', data);
                alert('Unexpected response from server');
            }
        } catch (parseError) {
            console.error('Failed to parse JSON:', parseError);
            console.log('Raw data that failed to parse:', rawData);
            alert('Server returned invalid response');
        }
    })
    .catch(error => {
        console.error('Fetch error details:', error);
        console.log('Error name:', error.name);
        console.log('Error message:', error.message);
        alert('An error occurred during the login process. Please try again.');
    });
    
    console.log('=== LOGIN DEBUG END ===');
});

// Add this function to test basic connectivity
async function testConnection() {
    console.log('=== CONNECTION TEST START ===');
    try {
        console.log('Testing connection to server...');
        const response = await fetch('https://www.pick6.club/getCurrentWeek');
        console.log('Test response status:', response.status);
        console.log('Test response ok:', response.ok);
        
        const data = await response.json();
        console.log('Test response data:', data);
        console.log('=== CONNECTION TEST SUCCESS ===');
    } catch (error) {
        console.error('=== CONNECTION TEST FAILED ===');
        console.error('Connection test error:', error);
    }
}

// Call this when the page loads
document.addEventListener('DOMContentLoaded', function() {
    testConnection();
});

// Handle registration form submission
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    let object = {};
    formData.forEach((value, key) => object[key] = value);
    let json = JSON.stringify(object);

    fetch('https://www.pick6.club/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: json,
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.message); // Show error message from the server
        } else {
            alert(data.message); // Success message
            document.querySelector('.form.register').classList.remove('active'); // Hide registration form
            document.querySelector('.form.login').classList.add('active'); // Show login form
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during the registration process. Please try again.');
    });
});