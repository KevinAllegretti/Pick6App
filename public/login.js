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
