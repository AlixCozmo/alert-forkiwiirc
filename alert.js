var lasttimefuel = 0;
var lasttimechat = 0;
var messagestringchat;
var messagestringfuel;
var messagetimechat = 0;
var messagetimefuel = 0;
var messagelengthchat;
var messagelengthfuel;


setInterval(10000);
function GrabMessage() {
    console.log("GrabMessage Started!");
        messagelengthchat = InjectLengthScript("#ratchat");
        messagelengthfuel = InjectLengthScript("#fuelrats");
        messagestringchat = InjectScript("#ratchat", messagelengthchat);
        messagestringfuel = InjectScript("#fuelrats", messagelengthfuel);
        messagetimechat = InjectScript("#ratchat", messagelengthchat);
        messagetimefuel = InjectScript("#fuelrats", messagelengthfuel);
        console.log("waiting 5 seconds..");
        setTimeout(5000);
        messagestringchat = messagestringchat.toLowerCase();
        messagestringfuel = messagestringfuel.toLowerCase();
}

function InjectLengthScript(Channel) {
    let datareturn;
    let script = document.createElement('script');
    let string = 'var length = window.kiwi.state.getBufferByName(1, "CHANNEL").messagesObj.messages.length; document.dispatchEvent(new CustomEvent("dataevent", {detail: data}));';
    string = string.replace('CHANNEL', Channel);
    script.textContent = string;
    (document.head||document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
    while (datareturn == null) {
        document.addEventListener('dataevent', function (event) {
            datareturn = event.detail;
            datareturn = parseInt(datareturn);
        });
    }
    return datareturn;
}

function InjectScript(Channel, length) {
    let datareturn;
    let script = document.createElement('script');
    let string = 'var data = window.kiwi.state.getBufferByName(1, "CHANNEL").messagesObj.messages[LENGTH].message; document.dispatchEvent(new CustomEvent("dataevent", {detail: data}));';
    string = string.replace('CHANNEL', Channel);
    string = string.replace('LENGTH', length-1);
    script.textContent = string;
    (document.head||document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
    while (datareturn == null) {
        document.addEventListener('dataevent', function (event) {
            datareturn = event.detail;
        });
    }   
    return datareturn;
}

function CheckMessage() {
        // RATCHAT
        console.log("checking if string matches..");
        if (messagestringchat.includes("ratsignal" && lasttimechat != messagetimechat)) {
            lasttimechat = messagetimechat;
            console.log("RAT!");
            PlaySound(1);
        }
        if (messagestringchat.includes("hatsignal" && lasttimechat != messagetimechat)) {
            lasttimechat = messagetimechat;
            console.log("HAT!");
            PlaySound(2);
        }
        if (messagestringchat.includes("test" && lasttimechat != messagetimechat)) {
            lasttimechat = messagetimechat;
            console.log("test!");
            PlaySound(4);
        }
        if (messagestringchat.includes("joined") && lasttimechat != messagetimechat) {
            lasttimechat = messagetimechat;
            console.log("joined!");
            PlaySound(4);
        }
        
        // FUELRAT
        if (messagestringfuel.includes("ratsignal" && lasttimefuel != messagetimefuel)) {
            lasttimefuel = messagetimechat;
            console.log("RAT!");
            PlaySound(1);
        }
        if (messagestringfuel.includes("hatsignal" && lasttimefuel != messagetimefuel)) {
            lasttimefuel = messagetimechat;
            console.log("HAT!");
            PlaySound(2);
        }
        if (messagestringfuel.includes("code red" && lasttimefuel != messagetimefuel)) {
            lasttimefuel = messagetimechat;
            console.log("CODE RED!");
            PlaySound(3);
        }
        
    }

function MessageHandler() {
    GrabMessage();
    CheckMessage();
    //ResetVar();
}

    

function ResetVar() {
    window.messagestringfuel = null;
    window.messagestringchat = null;
    window.messagetimechat = null;
    window.messagetimefuel = null;
}

function PlaySound(snumber) {
    if (snumber == 1) { // ratsignal
    var audio = new Audio('https://confluence.fuelrats.com/download/attachments/7635267/ratsounds_ratsignal.wav?version=1&modificationDate=1488766734831&api=v2');
    audio.play(); 
    }
    if (snumber == 2) { // hatsignal
        var audio = new Audio('https://confluence.fuelrats.com/download/attachments/7635267/ratsounds_hatsignal.wav?version=1&modificationDate=1488767044207&api=v2');
        audio.play(); 
    }
    if (snumber == 3) { // code red
        var audio = new Audio('https://confluence.fuelrats.com/download/attachments/7635267/ratsounds_codered.wav?version=1&modificationDate=1488766987707&api=v2');
        audio.play(); 
    }
    if (snumber == 4) { // snickers
        var audio = new Audio('https://confluence.fuelrats.com/download/attachments/7635267/ratsounds_snickers.wav?version=1&modificationDate=1488767074177&api=v2');
        audio.play(); 
    }
}
setInterval(MessageHandler, 1000);
