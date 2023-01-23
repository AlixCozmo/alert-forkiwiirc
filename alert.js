var lasttimefuel = 0;
var lasttimechat = 0;
var messagestringchat;
var messagestringfuel;
var messagetimechat = 0;
var messagetimefuel = 0;
var messagelengthchat;
var messagelengthfuel;
const activechannels = [];
const messagelength = [];
const messagetime = [];

setInterval(10000);
function GrabMessage() {
    console.log("GrabMessage Started!");
    GrabChannels();
    if (activechannels.includes("#ratchat")) {
        messagelengthchat = InjectLengthScript("#ratchat");
        messagestringchat = InjectScript("#ratchat", messagelengthchat, "message");
        messagetimechat = InjectScript("#ratchat", messagelengthchat, "time");
    }
    if (activechannels.includes("#fuelrats")) {
        messagelengthfuel = InjectLengthScript("#fuelrats");
        messagestringfuel = InjectScript("#fuelrats", messagelengthfuel, "message");
        messagetimefuel = InjectScript("#fuelrats", messagelengthfuel, "time"); 
    }
    console.log("waiting 5 seconds..");
    setTimeout(5000);
    messagestringchat = messagestringchat.toLowerCase();
    messagestringfuel = messagestringfuel.toLowerCase();
}

function AddVariables() {
    for (let x = 0; x < activechannels.length; x++) {
        messagelength.length = messagelength.length++;
        messagelength.push(words[wordnumber]);
    }
}

function GrabChannels() {
    let element=document.getElementsByClassName("kiwi-statebrowser-channel-name");
    let text = "";
    let words = "";
    for (let elementnumber = 0; elementnumber < element.length; elementnumber++) {
        text = element[elementnumber].innerText;
        words=text.split(" ");
        for(let wordnumber=0; wordnumber < words.length; wordnumber++) {
            if (words[wordnumber].startsWith("#")) {
                if (words[wordnumber].endsWith("a") || words[wordnumber].endsWith("b") || words[wordnumber].endsWith("c") 
                || words[wordnumber].endsWith("d") || words[wordnumber].endsWith("e") || words[wordnumber].endsWith("f") 
                || words[wordnumber].endsWith("g") || words[wordnumber].endsWith("h") || words[wordnumber].endsWith("i") 
                || words[wordnumber].endsWith("j") || words[wordnumber].endsWith("k") || words[wordnumber].endsWith("l")
                || words[wordnumber].endsWith("m") || words[wordnumber].endsWith("n") || words[wordnumber].endsWith("o") 
                || words[wordnumber].endsWith("p") || words[wordnumber].endsWith("q") || words[wordnumber].endsWith("r")
                || words[wordnumber].endsWith("s") || words[wordnumber].endsWith("t") || words[wordnumber].endsWith("u")
                || words[wordnumber].endsWith("v") || words[wordnumber].endsWith("w") || words[wordnumber].endsWith("x")
                || words[wordnumber].endsWith("y") || words[wordnumber].endsWith("z")) 
                {
                    activechannels.length = activechannels.length++;
                    activechannels.push(words[wordnumber]);
                    console.log("active channels: " + activechannels);
                    
                }
            } 
        }

    }
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

function InjectScript(Channel, length, type) {
    let datareturn;
    let script = document.createElement('script');
    let string = 'var data = window.kiwi.state.getBufferByName(1, "CHANNEL").messagesObj.messages[LENGTH].TYPE; document.dispatchEvent(new CustomEvent("dataevent", {detail: data}));';
    string = string.replace('CHANNEL', Channel);
    string = string.replace('LENGTH', length-1);
    string = string.replace('TYPE', type);
    script.textContent = string;
    (document.head||document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
    while (datareturn == null) {
        document.addEventListener('dataevent', function (event) {
            datareturn = event.detail;
            if (type == "time") {
                datareturn = parseInt(datareturn);
            }
        });
    }   
    return datareturn;
}

function CheckMessage() {
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

        if (messagestringfuel.includes("code red") && messagestringfuel.includes("ratsignal") && lasttimefuel != messagetimefuel) {
            lasttimefuel = messagetimechat;
            console.log("CODE RED!");
            PlaySound(3);
        }
        /*
        
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
        */
        
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
