const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// Function to speak text
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 5;
    text_speak.pitch = 5;
    //text_speak.lang="en-GB"
        text_speak.lang="hi-GB"
    window.speechSynthesis.speak(text_speak);
}

// Function to wish based on the time of day
function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good morning, Vansh....hum apki seva me hazir hein... boliye kya seva kre apki");
    } else if (hour >= 12 && hour < 17) {
        speak("Good afternoon, Vansh....hum apki seva  me  hazirhein ...boliye kya seva kre apki");
    } else {
        speak("Good evening, Vansh...hum apki seva   me hazir hein ...boliye kya seva kre apki");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS");
    wishMe();
});

// Speech Recognition setup
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

async function fetchGeminiResponse(symbol) {
    const apiKey = "AIzaSyAoa-8M7Ry35kf1B6U_D95j_TlCDO66dnc"; // Replace with your actual API key
    const apiSecret = "AIzaSyAoa-8M7Ry35kf1B6U_D95j_TlCDO66dnc"; // Replace with your actual API secret
    const baseUrl = "https://api.gemini.com/v1"; // Gemini base API URL
    
    const endpoint = `/pubticker/${symbol}`; // Public ticker for the specified symbol, e.g., 'btcusd'
    const url = baseUrl + endpoint;

    // Fetch the data from Gemini API
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Authorization not always required for public endpoints in Gemini, 
            // typically used only for private endpoints
        }
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}

// Example usage:
fetchGeminiResponse('btcusd')
    .then(data => console.log(data))
    .catch(error => console.error("Error fetching data:", error));

const familyDetails = {
    father: "Deess Raaj",
    mother: "Nirmala Devi",
    bigBrother: "Raghav",
    daughter: "Tania",
    sweetSon: "you",
    myFathersBrother: "Rakesh Kumar",
    hisWife: "Anu",
    theirChildren: "Rohit and Rakshit"
};

function getFamilyDescription() {
    return `In your family, there are 8 members: 
            1. ${familyDetails.father} (father), 
            2. ${familyDetails.mother} (mother), 
            3. ${familyDetails.bigBrother} (big brother), 
            4. ${familyDetails.daughter} (daughter), 
            5. ${familyDetails.sweetSon} (sweet small son),
            6. ${familyDetails.myFathersBrother} (your father's brother),
            7. ${familyDetails.hisWife} (his wife),
            and 8. ${familyDetails.theirChildren} (their two children).`;
}

const friends = {
    bhai: "bunti",
    bhai2: "monti",
    bhai3: "piyush sharma",
    love : "kanika jamwal"
};

function getFriendDescription() {
    return `your friends are: 
            1. ${friends.bhai} (bhai), 
            2. ${friends.bhai2} (bhai2), 
            3. ${friends.bhai3} (bhai3), 
            and 4. ${friends.love} (love).`;
}

async function takeCommand(command) {
    // Convert command to lowercase for case-insensitivity
    command = command.toLowerCase();

    if (command.includes("hey") || command.includes("hello")) {
        speak("Hello Vansh, good to see you,.... how can I assist you?");
    } 

else if (command.includes("what is") || command.includes("who is") || command.includes("which is") ||command.includes("how ")) {
    const query = command.replace(/ /g, "+");
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
    speak("I've opened Google search for you....please read from it ");

    try {
        const chatGPTResponse = await fetchChatGPTResponse(command);
        if (chatGPTResponse) {
            speak("Here is what I found: " + chatGPTResponse);
        } else {
            speak("Sorry, I couldn't retrieve an answer at this time.");
        }
    } catch (error) {
        speak("Sorry, I couldn't retrieve an answer at this time ... you have read it from screen");
        console.error("Error fetching ChatGPT response:", error);
    }
} 
}