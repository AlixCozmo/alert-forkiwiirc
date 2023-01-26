/*var lasttimefuel = 0;
var lasttimechat = 0;
var messagestringchat;
var messagestringfuel;
var messagetimechat = 0;
var messagetimefuel = 0;
var messagelengthchat;
var messagelengthfuel;
*/
const activechannels = [];
const messagelength = [];
const messagetime = [];
var messagestring = [];
const lasttime = [];
var channelcounter = 0;

setInterval(MessageHandler, 1000);
function MessageHandler() {
    console.log("start");
    let returnvalue = 0;
    let lengthchat;
    //console.log("GrabMessage Started!");
    GrabChannels();
    for (channelcounter = 0; channelcounter < activechannels.length; channelcounter++) {
        console.log("activechannellength: " + activechannels.length);
        console.log("channelcounter: " + channelcounter);
        setTimeout(GrabMessage(false, 0, 0), 1000);
        setTimeout(returnvalue = CheckForNull(channelcounter), 3000);
        if (returnvalue == 1) {
            console.warn("active channel: " + activechannels[channelcounter]);;
            lengthchat = messagelength[channelcounter];
            for (let x = 0; x < 5; x++) { // Goes back 5 messages and checks for keyword match
                    lengthchat = lengthchat--;
                    GrabMessage(true, lengthchat);
                    messagestring = messagestring.map(element => element.toLowerCase()); // Turns messagestring into lowercase
                    CheckMessage();
                }
            } else {
                console.error("Caution! One or more values are null!");
                if (messagestring[channelcounter] == null) {
                    console.error("messagestring is null");
                }
                if (messagetime[channelcounter] == 0) {
                    console.error("messagetime is 0");
                }
                if (messagelength[channelcounter] == null) {
                    console.error("messagelength is null");
                }
            }
            
    }
}

function GrabMessage(lengthbool, lengthsec) { // if lengthbool is true, this function will use the provided number from the parameter instead of length.
    if (lengthbool == false) {
        console.log("grabmessage");
        console.warn("BEFBEF!!, LENGTH:" + messagelength[channelcounter]); // using warn instead of log to not spam the log
        messagelength[channelcounter] = InjectLengthScript(activechannels[channelcounter]);
        setTimeout(console.warn("AFTAFT!!, LENGTH:" + messagelength[channelcounter]), 800); // using warn instead of log to not spam the log
        if (messagelength[channelcounter] != null) {
            console.warn("AFTAFT!!, LENGTH:" + messagelength[channelcounter])
            messagestring[channelcounter] = InjectMessageScript(activechannels[channelcounter], messagelength[channelcounter]);
            messagetime[channelcounter] = InjectTimeScript(activechannels[channelcounter], messagelength[channelcounter]);
        }
    }
    if (lengthbool == true) {
        console.log("grabmessage lb");
        messagelength[channelcounter] = InjectLengthScript(activechannels[channelcounter]);
        console.log("messagelength lb: " + messagelength[channelcounter]);
        if (messagelength[channelcounter] != null) {
            messagestring[channelcounter] = InjectMessageScript(activechannels[channelcounter], lengthsec);
            messagetime[channelcounter] = InjectTimeScript(activechannels[channelcounter], lengthsec);
        }
    }
}

function CheckForNull(Channelcounter) { // Returns 0 if one of the arrays are null
    if (((messagelength[Channelcounter] || messagestring[Channelcounter]) == null) || ((messagetime[Channelcounter]) == 0)) {
        console.error("One or more values are null!");
        return 0;
    }
    if ((messagelength[Channelcounter] != null && messagestring[Channelcounter]) != null && (messagetime[Channelcounter] != 0)) { 
        console.log("No values are null!");
        return 1;
    }
}

/*function AddVariables() {
    for (let x = 0; x < activechannels.length; x++) {
        messagelength.length = messagelength.length++;
        messagelength.push(words[wordnumber]);
    }
    return;
}
*/

function GrabChannels() { // Gets the currently active channels and places them into the activechannels array
    console.log("grabchannels");
    let element=document.getElementsByClassName("kiwi-statebrowser-channel-name");
    //let element=document.getElementsByClassName("kiwi-statebrowser kiwi-theme-bg");
    let text = "";
    let words = "";
    activechannels.length = 0; // empties the array so that a bunch of same data doesn't flood the array.
    for (let elementnumber = 0; elementnumber < element.length; elementnumber++) {
        text = element[elementnumber].innerText;
        words=text.split(" ");
        for(let wordnumber=0; wordnumber < words.length; wordnumber++) {
            console.log("wordslength: " + words.length);
            if (words[wordnumber].startsWith("#")) {
                if (words[wordnumber].endsWith("a") || words[wordnumber].endsWith("b") || words[wordnumber].endsWith("c") 
                || words[wordnumber].endsWith("d") || words[wordnumber].endsWith("e") || words[wordnumber].endsWith("f") 
                || words[wordnumber].endsWith("g") || words[wordnumber].endsWith("h") || words[wordnumber].endsWith("i") 
                || words[wordnumber].endsWith("j") || words[wordnumber].endsWith("k") || words[wordnumber].endsWith("l")
                || words[wordnumber].endsWith("m") || words[wordnumber].endsWith("n") || words[wordnumber].endsWith("o") 
                || words[wordnumber].endsWith("p") || words[wordnumber].endsWith("q") || words[wordnumber].endsWith("r")
                || words[wordnumber].endsWith("s") || words[wordnumber].endsWith("t") || words[wordnumber].endsWith("u")
                || words[wordnumber].endsWith("v") || words[wordnumber].endsWith("w") || words[wordnumber].endsWith("x")
                || words[wordnumber].endsWith("y") || words[wordnumber].endsWith("z") || words[wordnumber].endsWith("0") 
                || words[wordnumber].endsWith("1") || words[wordnumber].endsWith("2") || words[wordnumber].endsWith("3")
                || words[wordnumber].endsWith("4") || words[wordnumber].endsWith("5") || words[wordnumber].endsWith("6") 
                || words[wordnumber].endsWith("7") || words[wordnumber].endsWith("8")|| words[wordnumber].endsWith("9"))
                {
                    activechannels.length = activechannels.length++;
                    activechannels.push(words[wordnumber]);
                    console.warn("active channels: " + activechannels);
                    continue;
                    
                }
            }
        }
    }

    if (activechannels.length == 0) {
        console.warn("no channels found");
        return 0;
    } else {
        return 1;
    }
}

function InjectLengthScript(Channel) { // This function is intended to obtain how many messages there are.
    let datareturn;
    let script = document.createElement('script');
    let string = 'var lengthdata = window.kiwi.state.getBufferByName(1, "CHANNEL").messagesObj.messages.length; document.dispatchEvent(new CustomEvent("dataeventlength", {detail: lengthdata}));';
    string = string.replace('CHANNEL', Channel);
    script.textContent = string;
    document.addEventListener('dataeventlength', (e) => datareturn = LengthScriptEvent(e.detail));
    (document.head||document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
    document.removeEventListener('dataeventlength', LengthScriptEvent);
    console.warn("AFT4ARR, LENGTH:" + datareturn); // using warn instead of log to not spam the log
    return datareturn;
}

function LengthScriptEvent(datareturn) {
    //datareturn = event.detail;
    //console.warn("AFTRECEIVED!!, LENGTH:" + datareturn); // using warn instead of log to not spam the log
    datareturn = parseInt(datareturn);
    datareturn = datareturn - 1; // decreases length by one because for some reason when I use the value from this I get an undefined error
    // but decreasing it by 1 seems to make it work as intended.
    //console.warn("AFTAFTRECEIVED!!, LENGTH:" + datareturn); // using warn instead of log to not spam the log
    return datareturn;
}

function InjectMessageScript(Channel, length) { // Injects a script onto the site, this one is intended to get a message
    let datareturn;
    let script = document.createElement('script');
    let string = 'var messagedata = window.kiwi.state.getBufferByName(1, "CHANNEL").messagesObj.messages[LENGTH].message; document.dispatchEvent(new CustomEvent("dataeventmessage", {detail: messagedata}));';
    string = string.replace('CHANNEL', Channel);
    string = string.replace('LENGTH', length);
    script.textContent = string;
    document.addEventListener('dataeventmessage', (e) => datareturn = (e.detail));
    (document.head||document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
    document.removeEventListener('dataeventmessage', (e) => datareturn = (e.detail));
    console.warn("MESSAGE, LENGTH:" + datareturn); // using warn instead of log to not spam the log
    return datareturn;
}

function InjectTimeScript(Channel, length) { // Injects a script onto the site, this one is intended to obtain the message time
    let datareturn;
    let script = document.createElement('script');
    let string = 'var timedata = window.kiwi.state.getBufferByName(1, "CHANNEL").messagesObj.messages[LENGTH].time; document.dispatchEvent(new CustomEvent("dataeventtime", {detail: timedata}));';
    string = string.replace('CHANNEL', Channel);
    string = string.replace('LENGTH', length);
    script.textContent = string;
    document.addEventListener('dataeventtime', (e) => datareturn = TimeScriptEvent(e.detail));
    (document.head||document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
    document.removeEventListener('dataeventtime', (e) => datareturn = TimeScriptEvent(e.detail));
    console.warn("TIME, LENGTH:" + datareturn); // using warn instead of log to not spam the log
    return datareturn;
}

function TimeScriptEvent(datareturn) {
    datareturn = parseInt(datareturn);
    return datareturn;
}

function CheckMessage() { // Returns 1 if successful, 0 if not.
        console.log("checking if string matches..");
        if (messagestring[channelcounter].includes("ratsignal") && ((messagetime[channelcounter] > lasttime[channelcounter]) || (lasttime[channelcounter] == null))) {
            lasttime[channelcounter] = messagetime[channelcounter];
            console.log("RAT!");
            PlaySound(1);
            return 1;
        }
        if (messagestring[channelcounter].includes("code red") && messagestring[channelcounter].includes("ratsignal") && ((messagetime[channelcounter] > lasttime[channelcounter]) || (lasttime[channelcounter] == null))) {
            lasttime[channelcounter] = messagetime[channelcounter];
            console.log("CODE RED!");
            PlaySound(3);
            return 1;
        }
        if (messagestring[channelcounter].includes("hatsignal") && ((messagetime[channelcounter] > lasttime[channelcounter]) || (lasttime[channelcounter] == null))) {
            lasttime[channelcounter] = messagetime[channelcounter];
            console.log("HAT!");
            PlaySound(2);
            return 1;
        }
        if (messagestring[channelcounter].includes("test") && ((messagetime[channelcounter] > lasttime[channelcounter]) || (lasttime[channelcounter] == null))) {
            lasttime[channelcounter] = messagetime[channelcounter];
            console.log("test!");
            PlaySound(4);
            return 1;
        }
        console.log(messagestring[channelcounter]);
        console.log(messagetime[channelcounter]);
        console.log(lasttime[channelcounter]);
        if (messagestring[channelcounter].includes("joined") && ((messagetime[channelcounter] > lasttime[channelcounter]) || (lasttime[channelcounter] == null))) {
            lasttime[channelcounter] = messagetime[channelcounter];
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
    if (snumber == 4) { // snickers
        var audio4 = new Audio('https://confluence.fuelrats.com/download/attachments/7635267/ratsounds_snickers.wav?version=1&modificationDate=1488767074177&api=v2');
        audio4.play();
        console.log("played sound 4");
    }
}