

function GrabMessage() {
    let messagestring;
    console.log("GrabMessage Started!");
    for (let messageloop = 0; messageloop < 10; messageloop++) {
        console.log("messageloop: " + messageloop);
        console.log("messageloop+240: " + messageloop+240);
        messagestring = window.kiwi.state.getBufferByName(1, "#ratchat").messagesObj.messages[messageloop+240].message;
        messagestring = messagestring.toLower();
        if (messagestring.includes("ratsignal")) {
            console.log("RAT!");
        }
        if (messagestring.includes("hatsignal")) {
            console.log("HAT!");
        }

        }

}

setInterval(GrabMessage, 5000);