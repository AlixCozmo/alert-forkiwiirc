var lasttime;

function GrabMessage() {
    let messagestring;
    let messagetime;
    console.log("GrabMessage Started!");
    for (let messageloop = 0; messageloop < 10; messageloop++) {
        console.log("messageloop: " + messageloop);
        console.log("messageloop+240: " + messageloop+240);
        messagestring = window.kiwi.state.getBufferByName(1, "#ratchat").messagesObj.messages[messageloop+240].message;
        messagetime = window.kiwi.state.getBufferByName(1, "#ratchat").messagesObj.messages[messageloop+240].time;
        messagestring = messagestring.toLower();
        if (messagestring.includes("ratsignal" && lasttime != messagetime)) {
            lastrat = messagestring;
            console.log("RAT!");
            console.log("messageloop: " + messageloop);
        }
        if (messagestring.includes("hatsignal" && lasttime != messagetime)) {
            lasthat = messagestring;
            console.log("HAT!");
            console.log("messageloop: " + messageloop);
        }

        }

}

setInterval(GrabMessage, 5000);