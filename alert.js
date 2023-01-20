var messagestring // used to hold the message

function GrabMessage() {
messagestring = window.kiwi.state.getBufferByName(1, "#fuelrats").messagesObj.messages[249].message;

messagestring = messagestring.toLower();
if (messagestring.includes("ratsignal")) {
    console.log("RAT!");
}

}