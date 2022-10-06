var form = document.getElementById('form');
var username = document.getElementById('username');
var email = document.getElementById('email');
var password = document.getElementById('password');
var confirmPass = document.getElementById('double-password');
var nationality = document.getElementById('nationality');
var dob = document.getElementById('dob');

form.addEventListener('submit', e => {
    if (!validateData() || !haveChecked()) {
        e.preventDefault();
    }
    else {
        alert("Data saved successfully");
    }
});

function validateData() {
	var usernameValue = username.value;
	var emailValue = email.value.trim();
	var passwordValue = password.value;
    var nationalityValue = nationality.value;
    var dobValue = dob.value;
    var confirmPassValue = confirmPass.value;
    var flag = 1;
	
	if (usernameValue === '') {
		invalidMsg(username, 'Username cannot be blank');
        flag = 0;
	} 
	else if (!isUsername(usernameValue)) {
        invalidMsg(username, 'Not a valid username');
        flag = 0;
    }
    else {
        validMsg(username);
    }
	
	if (emailValue === '') {
		invalidMsg(email, 'Email cannot be blank');
        flag = 0;
	} 
    else if (!isEmail(emailValue)) {
		invalidMsg(email, 'Not a valid email');
        flag = 0;
	} 
    else {
		validMsg(email);
	}
	
	if(passwordValue === '') {
		invalidMsg(password, 'Password cannot be blank');
        flag = 0;
	} 
    else if (!isPassword(passwordValue)) {
        invalidMsg(password, 'Invalid password format');
        flag = 0;
    }
    else {
		validMsg(password);
	}

    if (confirmPassValue === '') {
        invalidMsg(confirmPass, 'Please confirm password');
        flag = 0;
    }
    else if (!passMatch(passwordValue, confirmPassValue)) {
		invalidMsg(confirmPass, 'Passwords do not match');
        flag = 0;
	}
    else {
        validMsg(confirmPass);
    }

    if (nationalityValue === '') {
        invalidMsg(nationality, 'Nationality cannot be blank');
        flag = 0;
    } 
    else {
        validMsg(nationality);
    }

    if (dobValue === '') {
        invalidMsg(dob, 'Date of Birth cannot be blank');
        flag = 0;
    } 
    else {
        dobValue = dobValue.split('-');
        yearStr = dobValue[0];
        monthStr = dobValue[1];
        dayStr = dobValue[2];
        
        var year = parseInt(yearStr);
        var month = parseInt(monthStr);
        var day = parseInt(dayStr);

        if (!validDOB(year, month, day)) {
            invalidMsg(dob, 'You must be at least 18');
            flag = 0;
        }
        else {
            validMsg(dob);
        }
    }

    return flag;
}

//validation 1 -> password and confirm password must be the same
function passMatch(password, confirmPass) {
    if (password !== confirmPass) {
        return false;
    }

    return true;
}

//validation 2 -> username must be valid
function isUsername(username) {
    //length between 5-30
    var len = username.length;
    if (len < 5 || len > 30) {
        return false;
    }

    //all characters have to be either alphanumeric, or underscore or dot
    var flag = 0;
    for (var i = 0; i < len; i++) {
        if (username[i].toLowerCase() ===  username[i].toUpperCase() && isNaN(username[i]) && username[i] !== '.' && username[i] !== '_') {
            flag = 1;
            break;
        }
    }

    if (flag) {
        return false;
    }

    //no repeated dots consecutively e.g. ..username
    var latestDot = -1;
    var dot = -1;
    for (var i = 0; i < len; i++) {
        if (username[i] == '.') {
            dot = i;
            if (latestDot != -1) {
                if (dot - latestDot == 1) {
                    return false;
                }
            }
        }
        latestDot = dot;
    }

    //first or last character can't be a dot
    if (username[0] === '.' || username[len-1] === '.') {
        return false;
    }

    return true;
}

//validation 3 -> email must be valid
function isEmail(email) {
    //minimal characters possible a@a.aa
    //a is any alphabet
    //so minimum length is 6
    var len = email.length;
    if (len < 6) {
        return false;
    }

    //dot can't be first character
    if (email[0] == '.') {
        return false;
    }

    //before @ can't be .
    //@ . must exist
    //@ can't be first character
    var isDotHere = email.indexOf('.');
    var at = email.indexOf('@');
    if (at == -1 || at == 0 || email[at-1] == '.' || isDotHere == -1) {
        return false;
    }

    var dotLast = -1;
    for (var i = 0; i < email.length; i++) {
        if (email[i] == '.') {
            dotLast = i;
        }
    }

    //no repeated consecutive dots
    var latestDot = -1;
    var dot = -1;
    for (var i = 0; i < email.length; i++) {
        if (email[i] == '.') {
            dot = i;
            if (latestDot != -1) {
                if (dot - latestDot == 1) {
                    return false;
                }
            }
        }
        latestDot = dot;
    }

    //dot can't be last character
    if (dotLast + 1 == len) {
        return false;
    }

    //can't be .@gmail
    //between @ and . there must be at least 1 character
    if (dotLast - at <= 1) {
        return false;
    }

    //minimum 2 alphabet after last dot
    // e.g. .com or .id
    if (len - dotLast + 1 < 2) {
        return false;
    }

    //alphabet after last dot
    var flag = 0;
    for (var i = dotLast + 1; i < len; i++) {
        if (email[i].toLowerCase() == email[i].toUpperCase()) {
            flag = 1;
            break;
        }
    }

    if (flag) {
        return false;
    }

    return true;
}

//validation 4 -> must be at least 18
function validDOB(year, month, day) {
    var d = new Date();
    var ds = d.getDate();
    var ms = d.getMonth() + 1;
    var ys = d.getFullYear();

    var age = ys - year;

    if (ms < month) {
        age--;
    }
    else if (ms === month && ds < day) {
        age--;
    }

    if (age >= 18) {
        return true;
    }
}

//validation 5 -> password
function isPassword(password) {
    var len = password.length;

    //between 8-20 character
    if (len < 8 || len > 20) {
        return false;
    }

    //have at least 1 uppercase
    var flag = 0;
    for (var i = 0; i < len; i++) {
        if (password[i] === password[i].toUpperCase() && password[i].toLowerCase() !== password[i].toUpperCase()) {
            flag = 1;
            break;
        }
    }

    if (flag == 0) {
        return false;
    }

    //have at least 1 lowercase
    var flag2 = 0;
    for (var i = 0; i < len; i++) {
        if (password[i] === password[i].toLowerCase() && password[i].toLowerCase() !== password[i].toUpperCase()) {
            flag2 = 1;
            break;
        }
    }

    if (!flag2) {
        return false;
    }

    //have at least 1 alphabet
    var flag3 = 0;
    for (var i = 0; i < len; i++) {
        if (password[i].toLowerCase() !== password[i].toUpperCase()) {
            flag3 = 1;
            break;
        }
    }

    if (!flag3) {
        return false;
    }

    //have at least 1 number
    var flag4 = 0;
    for (var i = 0; i < len; i++) {
        if (!isNaN(password[i])) {
            flag4 = 1;
            break;
        }
    }

    if (!flag4) {
        return false;
    }

    //at least have 1 special characters , ! @ - . # ? _ &
    var comma = password.indexOf(',');
    var exclamation = password.indexOf('!');
    var at = password.indexOf('@');
    var dash = password.indexOf('-');
    var period = password.indexOf('.');
    var hash = password.indexOf('#');
    var question = password.indexOf('?');
    var under = password.indexOf('_');
    var ampersand = password.indexOf('&');

    if (comma != -1 || exclamation != -1 || at != -1 || dash != -1 || period != -1 || hash != -1 || question != -1 || under != -1 || ampersand != -1) {
        return true;
    }
    else {
        return false;
    }
}

//change class name so css know what to display
//set inner text so user know what is still invalid
function invalidMsg(input, message) {
	var container = input.parentElement;
	var small = container.querySelector('small');
	container.className = 'input-msg invalid';
	small.innerText = message;
}

function validMsg(input) {
	var container = input.parentElement;
	container.className = 'input-msg valid';
}

//function to show password
function showPass1() {
    var pass1 = document.getElementById("password");
    if (pass1.type === "password") {
      pass1.type = "text";
    } else {
      pass1.type = "password";
    }
}

function showPass2() {
    var pass2 = document.getElementById("double-password");
    if (pass2.type === "password") {
      pass2.type = "text";
    } else {
      pass2.type = "password";
    }
}


//function to check if user has agreed
function haveChecked() {
    var checkbox = document.getElementById("agree");
    var flag = 0;
    if (!checkbox.checked) {
        alert("Please agree to company's policy")
    } else {
        flag = 1;
    }
    return flag;
  }