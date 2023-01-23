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
        var script = document.createElement('script');
        var script2 = document.createElement('script');
        var script3 = document.createElement('script');
        var script4 = document.createElement('script');
        var script5 = document.createElement('script');
        var script6 = document.createElement('script');
        var string = 'var messagestringfuel = window.kiwi.state.getBufferByName(1, "#fuelrats").messagesObj.messages[LENGTH].message; document.dispatchEvent(new CustomEvent("msf", {detail: messagestringfuel}));';
        var string3 = 'var messagestringchat = window.kiwi.state.getBufferByName(1, "#ratchat").messagesObj.messages[LENGTH].message; document.dispatchEvent(new CustomEvent("msc", {detail: messagestringchat}));'; // messagestringchat
        var string2 = 'var messagetimefuel = window.kiwi.state.getBufferByName(1, "#fuelrats").messagesObj.messages[LENGTH].time; document.dispatchEvent(new CustomEvent("mtf", {detail: messagetimefuel}));';
        var string4 = 'var messagetimechat = window.kiwi.state.getBufferByName(1, "#ratchat").messagesObj.messages[LENGTH].time; document.dispatchEvent(new CustomEvent("mtc", {detail: messagetimechat}));'; // messagetimechat
        var string5 = 'var messagelengthchat = window.kiwi.state.getBufferByName(1, "#ratchat").messagesObj.messages.length; document.dispatchEvent(new CustomEvent("mlc", {detail: messagelengthchat}));' // messagelengthchat
        var string6 = 'var messagelengthfuel = window.kiwi.state.getBufferByName(1, "#fuelrats").messagesObj.messages.length; document.dispatchEvent(new CustomEvent("mlf", {detail: messagelengthfuel}));';
        script5.textContent = string5;
        script6.textContent = string6;
        (document.head||document.documentElement).appendChild(script5);
        script5.parentNode.removeChild(script5);
        (document.head||document.documentElement).appendChild(script6);
        script6.parentNode.removeChild(script6);
        document.addEventListener('mlc', function (event) {
            messagelengthchat = event.detail;
        
            // Do something with you data from CRX
        });
        document.addEventListener('mlf', function (event) {
            messagelengthfuel = event.detail;
        
            // Do something with you data from CRX
        });
        string = string.replace('LENGTH', messagelengthfuel-1);
        string2 = string2.replace('LENGTH', messagelengthfuel-1);
        string3 = string3.replace('LENGTH', messagelengthchat-1);
        string4 = string4.replace('LENGTH', messagelengthchat-1);
        script3.textContent = string3;
        script4.textContent = string4;
        script2.textContent = string2;
        script.textContent = string;
        (document.head||document.documentElement).appendChild(script3);
        script3.parentNode.removeChild(script3);
        (document.head||document.documentElement).appendChild(script4);
        script4.parentNode.removeChild(script4);
        (document.head||document.documentElement).appendChild(script);
        script.parentNode.removeChild(script);
        (document.head||document.documentElement).appendChild(script2);
        script2.parentNode.removeChild(script2);
        document.addEventListener('msc', function (event) {
            messagestringchat = event.detail;
        
            // Do something with you data from CRX
        });
        document.addEventListener('mtc', function (event) {
            messagetimechat = event.detail;
        
            // Do something with you data from CRX
        });
        document.addEventListener('msf', function (event) {
            messagestringfuel = event.detail;
        
            // Do something with you data from CRX
        });
        document.addEventListener('mtf', function (event) {
            messagetimefuel = event.detail;
        
            // Do something with you data from CRX
        });
        messagelengthchat = parseInt(messagelengthchat);
        messagelengthfuel = parseInt(messagelengthfuel);
        console.log("waiting 5 seconds..");
        setTimeout(5000);
        messagestringchat = messagestringchat.toLowerCase();
        messagestringfuel = messagestringfuel.toLowerCase();


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
        
         FUELRAT
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
        if (messagestringfuel.includes("Code Red" && lasttimefuel != messagetimefuel)) {
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
