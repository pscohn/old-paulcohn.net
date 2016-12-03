var folders = {
    'home': {
        'Projects': {
            'omnibook': '',
            'chat': '',
            'anchor': 'https://chrome.google.com/webstore/detail/anchor-floating-bars/coagnnooeahbjjljejfkfnnpnoejdpjp',
        },
        'games': {
            'dodgy': '/dodgy',
            'fly suicide': '',
        },
        'links': {
            'github': '<a href="http://github.com/pscohn" target="_blank">github</a>',
        },
        'Resume': {},
        'Contact': {},
        'Blog': {},
    },
}
var messages = {
    'help': '<p>ls: list current directory</p><p>cd <u>name</u>: change directory</p><p>cd ..: go up one level</p><p>open <u>link</u>: open a link</p>',
    'hi': '<p>Hello.</p>',
    'hello': '<p>Hi there.</p>',
    'wef': '<p>Easy for you to say.</p>',
    'asdf': '<p>Easy for you to say.</p>',
    'whoami': '<p>Look deep within yourself, you will find the answer.</p>',
    'mkdir': '<p>No, this is my website. Get your own.</p>',
    'date': function() { return new Date() },
    'kill': function() { window.location = 'http://google.com'; return '<p>Goodbye.</p>' },
    'pwd': function() {
        if (current === 'home') {
            return 'paulcohn.net/home';
        }
        return 'paulcohn.net/home/' + current;
    },
    'cat': '<img src="http://static.mybs.com/wp-content/uploads/2013/04/15xw914743.jpg" />',
}
var current = 'home';
var currentFolder = folders['home']

var ps1 = function() {
    return 'paulcohn.net:' + current + ' $ ';
}
var cd = function(folder) {
    if (folder === '..') {
        current = 'home';
        currentFolder = folders['home']
        $('#location').html(current);
        return;
    }

    if (folders['home'].hasOwnProperty(folder)) {
        current = folder;
        currentFolder = currentFolder[folder];
        $('#location').html(current);
    }
}

var open = function(item) {
    if (currentFolder.hasOwnProperty(item)) {
        console.log(currentFolder[item])
    }
}

var currentList = function(message) {
    for (var key in currentFolder) {
        if (typeof currentFolder[key] === 'string') {
            message += '<li>' + currentFolder[key] + '</li>';
        } else if (typeof currentFolder[key] === 'function') {
            message += '<li>' + currentFolder[key]() + '</li>';
        } else {
            message += '<li>' + key + '</li>';
        }
    }
    return message;
}

var oneOffs = function(message, arg) {
    if (messages.hasOwnProperty(arg)) {
        if (typeof messages[arg] === 'string') {
            message += messages[arg];
        } else if (typeof messages[arg] === 'function') {
            message += messages[arg]();
        }
        return message;
    }

    if (arg == 'ls') {
        return currentList(message);
    }

    message += '<li>paulcohn.net: ' + arg + ': command not found. use `help` for command list</li>';
    return message;

}

var parseInput = function(input) {
    var message = '<li>' + ps1() + input + '</li>';
    var args = input.split(' ');

    if (args.length === 1) {
        return oneOffs(message, args[0]);
    }
    if (args[0] === 'cd') {
        cd(args[1]);
        return message;
    }
    if (args[0] === 'open') {
        open(args[1]);
        return message;
    }
    return oneOffs(message, args[0]);
};

$('#form').submit(function(e) {
    e.preventDefault();
    var input = $('#input').val();
    $('#input').val('');
    var response = parseInput(input.toLowerCase());
    $('#scroll').append(response);
    window.scrollTo(0,document.body.scrollHeight);
});
$('#input').focus();
$(document).click(function() {
    if (typeof window.getSelection != 'undefined') {
        var text = window.getSelection().toString();
        if (text !== '') {
            return;
        }
        $('#input').focus();
    }
});