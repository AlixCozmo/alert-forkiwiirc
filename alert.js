var lasttime;

function GrabMessage() {
    let messagestringfuel;
    let messagestringchat;
    let messagetimechat;
    let messagetimefuel;
    console.log("GrabMessage Started!");
    for (let messageloop = 0; messageloop < 10; messageloop++) {
        console.log("messageloop: " + messageloop);
        console.log("messageloop+240: " + messageloop+240);
        messagestringfuel = window.kiwi.state.getBufferByName(1, "#fuelrats").messagesObj.messages[messageloop+240].message;
        messagetimefuel = window.kiwi.state.getBufferByName(1, "#fuelrats").messagesObj.messages[messageloop+240].time;
        messagestringchat = window.kiwi.state.getBufferByName(1, "#ratchat").messagesObj.messages[messageloop+240].message;
        messagetimechat = window.kiwi.state.getBufferByName(1, "#ratchat").messagesObj.messages[messageloop+240].time;
        messagestringchat = messagestring.toLower();
        messagestringfuel = messagestring.toLower();
        // RATCHAT
        if (messagestring.includes("ratsignal" && lasttime < messagetimechat)) {
            lastrat = messagestringchat;
            console.log("RAT!");
            console.log("messageloop: " + messageloop);
        }
        if (messagestring.includes("hatsignal" && lasttime < messagetimechat)) {
            lasthat = messagestringchat;
            console.log("HAT!");
            console.log("messageloop: " + messageloop);
        }
        // FUELRAT
        if (messagestring.includes("ratsignal" && lasttime < messagetimefuel)) {
            lastrat = messagestringfuel;
            console.log("RAT!");
            console.log("messageloop: " + messageloop);
        }
        if (messagestring.includes("hatsignal" && lasttime < messagetimefuel)) {
            lasthat = messagestringfuel;
            console.log("HAT!");
            console.log("messageloop: " + messageloop);
        }

    }

}

setInterval(GrabMessage, 5000);
