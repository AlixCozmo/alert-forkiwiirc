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
function MessageHandler() {
    //let returnvalue;
    let lengthfuel;
    let lengthchat;
    //console.log("GrabMessage Started!");
    GrabChannels();
    InitEventListener();
    GrabMessage(false, 0, 0);
    //console.log("waiting 5 seconds..");
    setTimeout(1000);
    messagestringchat = messagestringchat.toLowerCase();
    messagestringfuel = messagestringfuel.toLowerCase();
    lengthchat = messagelengthchat;
    lengthfuel = messagelengthfuel;
    for (let x = 0; x < 5; x++) {
        GrabMessage(true, lengthchat, lengthfuel);
        lengthchat = lengthchat--;
        lengthfuel = lengthfuel--;
        CheckMessage();
    }
}

function GrabMessage(lengthbool, lengthsecondarychat, lengthsecondaryfuel) { // if lengthbool is true, this function will use the provided number from the parameter instead of length.
    if (lengthbool == false) {
        console.log("grabmessage");
        setTimeout(2000);
        if (activechannels.includes("#ratchat")) {
            console.log("ratchat");
            messagelengthchat = InjectLengthScript("#ratchat", 'mlc');
            messagestringchat = InjectScript("#ratchat", messagelengthchat, "message", 'msc');
            messagetimechat = InjectScript("#ratchat", messagelengthchat, "time", 'mtc');
        }
        if (activechannels.includes("#fuelrats")) {
            console.log("fuelrats");
            messagelengthfuel = InjectLengthScript("#fuelrats", 'mlf');
            messagestringfuel = InjectScript("#fuelrats", messagelengthfuel, "message", 'msf');
            messagetimefuel = InjectScript("#fuelrats", messagelengthfuel, "time", 'mtf');
        }
        return;
    }
    if (lengthbool == true) {
        if (activechannels.includes("#ratchat")) {
            console.log("ratchat, lb");
            messagelengthchat = InjectLengthScript("#ratchat", 'msc');
            messagestringchat = InjectScript("#ratchat", lengthsecondarychat, "message", 'msc');
            messagetimechat = InjectScript("#ratchat", lengthsecondarychat, "time", 'mtc');
        }
        if (activechannels.includes("#fuelrats")) {
            console.log("fuelrats, lb");
            messagelengthfuel = InjectLengthScript("#fuelrats", 'mlf');
            messagestringfuel = InjectScript("#fuelrats", lengthsecondaryfuel, "message", 'msf');
            messagetimefuel = InjectScript("#fuelrats", lengthsecondaryfuel, "time", 'mtf');
        }
        return;
    }
}

function AddVariables() {
    for (let x = 0; x < activechannels.length; x++) {
        messagelength.length = messagelength.length++;
        messagelength.push(words[wordnumber]);
    }
    return;
}

function GrabChannels() {
    console.log("grabchannels");
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
                    return;
                    
                } else {
                    console.log("no channels found");
                }
            } else {
                console.log("no channels found");
            }
        }

    }
    console.log("no channels found");
}

function InitEventListener() {
    document.addEventListener('msc', function (event) {
        messagestringchat = event.detail;
    });
    document.addEventListener('msf', function (event) {
        messagestringfuel = event.detail;
    });
    document.addEventListener('mtc', function (event) {
        messagetimechat = event.detail;
        if (type == "time") {
            messagetimechat = parseInt(datareturn);
        }
    });
    document.addEventListener('mtf', function (event) {
        messagetimefuel= event.detail;
        if (type == "time") {
            messagetimefuel = parseInt(datareturn);
        }
    });
    document.addEventListener('mlc', function (event) {
        messagelengthchat = event.detail;
        messagelengthchat = parseInt(messagelengthchat);
    });
    document.addEventListener('mlf', function (event) {
        messagelengthfuel = event.detail;
        messagelengthfuel = parseInt(messagelengthfue);
    });
}

function InjectLengthScript(Channel, event) {
    let datareturn;
    let script = document.createElement('script');
    let string = 'var length = window.kiwi.state.getBufferByName(1, "CHANNEL").messagesObj.messages.length; document.dispatchEvent(new CustomEvent("EVENT", {detail: data}));';
    string = string.replace('CHANNEL', Channel);
    string = string.replace('EVENT', event);
    script.textContent = string;
    (document.head||document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
    return datareturn;
}

function InjectScript(Channel, length, type, event) {
    let datareturn;
    let script = document.createElement('script');
    let string = 'var data = window.kiwi.state.getBufferByName(1, "CHANNEL").messagesObj.messages[LENGTH].TYPE; document.dispatchEvent(new CustomEvent("EVENT", {detail: data}));';
    string = string.replace('CHANNEL', Channel);
    string = string.replace('LENGTH', length);
    string = string.replace('TYPE', type);
    string = string.replace('EVENT', event);
    script.textContent = string;
    (document.head||document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);   
    return datareturn;
}

function CheckMessage() { // Returns 1 if successful, 0 if not.
        //console.log("checking if string matches..");
        if (messagestringchat.includes("ratsignal") && (messagetimechat > lasttimechat)) {
            lasttimechat = messagetimechat;
            console.log("RAT!");
            PlaySound(1);
            return 1;
        }
        if (messagestringchat.includes("hatsignal") && (messagetimechat > lasttimechat)) {
            lasttimechat = messagetimechat;
            console.log("HAT!");
            PlaySound(2);
            return 1;
        }
        if (messagestringchat.includes("test") && (messagetimechat > lasttimechat)) {
            lasttimechat = messagetimechat;
            console.log("test!");
            PlaySound(4);
            return 1;
        }
        if (messagestringchat.includes("joined") && (messagetimechat > lasttimechat)) {
            lasttimechat = messagetimechat;
            console.log("joined!");
            PlaySound(4);
            return 1;
        }

        if (messagestringfuel.includes("code red") && messagestringfuel.includes("ratsignal") && (messagetimefuel > lasttimefuel)) {
            lasttimefuel = messagetimechat;
            console.log("CODE RED!");
            PlaySound(3);
            return 1;
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
        
        return 0;
    }

/*function MessageHandler() {
    GrabMessage();
    CheckMessage();
    //ResetVar();
}
*/

    

function ResetVar() {
    window.messagestringfuel = null;
    window.messagestringchat = null;
    window.messagetimechat = null;
    window.messagetimefuel = null;
}

function PlaySound(snumber) {
    if (snumber == 1) { // ratsignal
        var audio1 = new Audio('https://confluence.fuelrats.com/download/attachments/7635267/ratsounds_ratsignal.wav?version=1&modificationDate=1488766734831&api=v2');
        audio1.play();
        console.log("played sound 1");
    }
    if (snumber == 2) { // hatsignal
        var audio2 = new Audio('https://confluence.fuelrats.com/download/attachments/7635267/ratsounds_hatsignal.wav?version=1&modificationDate=1488767044207&api=v2');
        audio2.play();
        console.log("played sound 2");
    }
    if (snumber == 3) { // code red
        var audio3 = new Audio('https://confluence.fuelrats.com/download/attachments/7635267/ratsounds_codered.wav?version=1&modificationDate=1488766987707&api=v2');
        audio3.play();
        console.log("played sound 3");
    }
    if (snumber4 == 4) { // snickers
        var audio = new Audio('https://confluence.fuelrats.com/download/attachments/7635267/ratsounds_snickers.wav?version=1&modificationDate=1488767074177&api=v2');
        audio4.play();
        console.log("played sound 4");
    }
}
setInterval(MessageHandler, 1000);