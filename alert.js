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
const messagestring = [];
const lasttime = [];

setInterval(MessageHandler, 1000);
function MessageHandler() {
    console.log("start");
    let returnvalue = 0;
    //let lengthfuel;
    //let lengthchat;
    //console.log("GrabMessage Started!");
    GrabChannels();
    for (let i = 0; i < activechannels.length; i++) {
        returnvalue = GrabMessage(false, 0, 0);
        if (returnvalue == 1) {
            console.log("waiting 5 seconds..");
            setTimeout(5000);
            console.log("done");
            messagestring[i] = messagestring[i].toLowerCase();
            lengthchat = messagelength[i];
            for (let x = 0; x < 5; x++) { // Goes back 5 messages and checks for keyword match
                    lengthchat = lengthchat--;
                    GrabMessage(true, lengthchat, i);
                    setTimeout(1000);
                    CheckMessage(i);
                }
            } else {
                console.error("Caution! One or more values are null!");
                if (messagestring[i] == null) {
                    console.error("messagestring is null");
                }
                if (messagetime[i] == 0) {
                    console.error("messagetime is 0");
                }
                if (messagelength[i] == null) {
                    console.error("messagelength is null");
                }
            }
    }
}

function GrabMessage(lengthbool, lengthsec, channelcounter) { // if lengthbool is true, this function will use the provided number from the parameter instead of length.
    if (lengthbool == false) {
        console.log("grabmessage");
        setTimeout(2000);
            messagelength[channelcounter] = InjectLengthScript(activechannels[channelcounter]);
            console.log("waiting for 1 second before continuing..");
            setTimeout(1000);
            console.log("messagelength: " + messagelength[channelcounter]);
            if (messagelength[channelcounter] != null) {
                messagestring[channelcounter] = InjectScript(activechannels[channelcounter], messagelength[channelcounter], "message");
                messagetime[channelcounter] = InjectScript(activechannels[channelcounter], messagelength[channelcounter], "time");
            }
        if (((messagelength[channelcounter] || messagestring[channelcounter]) == null) || ((messagetime[channelcounter]) == 0)) {
            return 0;
        }
        return 1;
    }
    if (lengthbool == true) {
            console.log("grabmessage lb");
            messagelength[channelcounter] = InjectLengthScript(activechannels[channelcounter]);
            console.log("waiting for 1 second before continuing..");
            setTimeout(1000);
            console.log("messagelength lb: " + messagelength[channelcounter]);
            if (messagelength[channelcounter] != null) {
                messagestring[channelcounter] = InjectScript(activechannels[channelcounter], lengthsec, "message");
                messagetime[channelcounter] = InjectScript(activechannels[channelcounter], lengthsec, "time");
            }
        }
        if (((messagelength[channelcounter] || messagestring[channelcounter]) == null) || ((messagetime[channelcounter]) == 0)) {
            return 0;
        }
        return 1;
    }

function AddVariables() {
    for (let x = 0; x < activechannels.length; x++) {
        messagelength.length = messagelength.length++;
        messagelength.push(words[wordnumber]);
    }
    return;
}

function GrabChannels() { // Gets the currently active channels and places them into the activechannels array
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
                    activechannels.length = 0; // empties the array so that a bunch of same data doesn't flood the array.
                    activechannels.length = activechannels.length++;
                    activechannels.push(words[wordnumber]);
                    console.log("active channels: " + activechannels);
                    return 1;
                    
                } else {
                    console.log("no channels found");
                    return 0;
                }
            } else {
                console.log("no channels found");
                return 0;
            }
        }

    }
    console.log("no channels found");
    return 0;
}

function InjectLengthScript(Channel) { // Same as InjectScript except this one is intended to obtain how many messages there are.
    let datareturn;
    let script = document.createElement('script');
    let string = 'var length = window.kiwi.state.getBufferByName(1, "CHANNEL").messagesObj.messages.length; document.dispatchEvent(new CustomEvent("dataevent", {detail: data}));';
    string = string.replace('CHANNEL', Channel);
    script.textContent = string;
    (document.head||document.documentElement).appendChild(script);
        document.addEventListener('dataevent', function (event) {
            datareturn = event.detail;
            console.error("BEFRECEIVED!!, LENGTH:" + datareturn); // using error instead of log to not spam the log
            datareturn = parseInt(datareturn);
            console.warn("AFTRECEIVED!!, LENGTH:" + datareturn); // using warn instead of log to not spam the log
        });
    setTimeout(1000);
    script.parentNode.removeChild(script);
    document.removeEventListener('dataevent', function (event) {
    });
    return datareturn;
}

function InjectScript(Channel, length, type) { // Injects a script onto the site
    let datareturn;
    let script = document.createElement('script');
    let string = 'var data = window.kiwi.state.getBufferByName(1, "CHANNEL").messagesObj.messages[LENGTH].TYPE; document.dispatchEvent(new CustomEvent("dataevent", {detail: data}));';
    string = string.replace('CHANNEL', Channel);
    string = string.replace('LENGTH', length);
    string = string.replace('TYPE', type);
    script.textContent = string;
    (document.head||document.documentElement).appendChild(script);
        document.addEventListener('dataevent', function (event) {
            datareturn = event.detail;
            //console.log("RECEIVED!!, REG");
            if (type == "time") {
                datareturn = parseInt(datareturn);
            }
        });
    setTimeout(1000);
    script.parentNode.removeChild(script);
    document.removeEventListener('dataevent', function (event) {
    });
    return datareturn;
}

function CheckMessage(channelcounter) { // Returns 1 if successful, 0 if not.
        console.log("checking if string matches..");
        if (messagestring[channelcounter].includes("ratsignal") && (messagetime[channelcounter] > lasttime[channelcounter])) {
            lasttimechat = messagetimechat;
            console.log("RAT!");
            PlaySound(1);
            return 1;
        }
        if (messagestring[channelcounter].includes("code red") && messagestring[channelcounter].includes("ratsignal") && (messagetime[channelcounter] > lasttime[channelcounter])) {
            lasttimechat = messagetimechat;
            console.log("CODE RED!");
            PlaySound(3);
            return 1;
        }
        if (messagestring[channelcounter].includes("hatsignal") && (messagetime[channelcounter] > lasttime[channelcounter])) {
            lasttimechat = messagetimechat;
            console.log("HAT!");
            PlaySound(2);
            return 1;
        }
        if (messagestring[channelcounter].includes("test") && (messagetime[channelcounter] > lasttime[channelcounter])) {
            lasttimechat = messagetimechat;
            console.log("test!");
            PlaySound(4);
            return 1;
        }
        if (messagestring[channelcounter].includes("joined") && (messagetime[channelcounter] > lasttime[channelcounter])) {
            lasttimechat = messagetimechat;
            console.log("joined!");
            PlaySound(4);
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

function PlayAudio(){
    var files = this.files;
    var file = URL.createObjectURL(files[0]); 
                audio_player.src = file; 
    audio_player.play();
  };

function PlaySound(snumber) { // Plays audio, different sounds will be played depending on the value of the given number.
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