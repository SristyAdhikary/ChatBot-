const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatbtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

// Function to create a chat <li> element with a message and class name
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; // Return chat <li> element
};

// Simple pattern-based response generator
const generateResponse = (incomingChatli) => {
  const messageElement = incomingChatli.querySelector("p");

  // Define a basic knowledge base
  const responses = {
    greetings: ["Hello! How can I assist you today?", "Hi there! What can I help you with?"],
    farewells: ["Goodbye! Have a great day!", "See you later! Take care!"],
    default: "Sorry, I didn't quite understand that. Can you please rephrase?",
    assistance: ["What specific help do you need?", "How can I support you with this?"],
    appreciation: ["Thank you for your kind words!", "I appreciate your feedback!"],
    clarification: ["Could you provide more details?", "Can you clarify what you mean?"],
    confirmation: ["Just to confirm, are you asking about...?", "So, you would like to know if...?"],
    apology: ["I'm sorry for the inconvenience. How can I make it right?", "I apologize for any confusion. How can I assist you further?"],
    feedback: ["I'd love to hear your feedback. What did you think?", "Your input is valuable. How was your experience?"],

    jokes: [
      "Why don't scientists trust atoms? Because they make up everything!",
      "What do you call fake spaghetti? An impasta!",
      "Why did the scarecrow win an award? Because he was outstanding in his field!"
    ],

    weather: [
      "I'm not able to check the weather right now, but you can look it up on a weather website or app.",
      "For the latest weather update, please check a weather service or app."
    ],

    news: [
      "I can't provide real-time news updates, but you can check a news website or app for the latest headlines.",
      "For the most recent news, please visit your favorite news source."
    ],

    day: [
      "Thanks for asking! How's your day going?",
      "My day is going well, thank you! How about yours?"
    ],

    songSuggestion: [
      "How about listening to 'Bohemian Rhapsody' by Queen? It's a classic!",
      "You might enjoy 'Blinding Lights' by The Weeknd. It's quite popular right now!",
      "Try 'Levitating' by Dua Lipa. It's got a great beat!"
    ]
  };

  // Simple pattern matching
  const userMessageLower = userMessage.toLowerCase();
  let responseText = responses.default;

  if (userMessageLower.includes("hello") || userMessageLower.includes("hi")) {
    responseText = responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
  } else if (userMessageLower.includes("bye") || userMessageLower.includes("goodbye")) {
    responseText = responses.farewells[Math.floor(Math.random() * responses.farewells.length)];
  } else if (userMessageLower.includes("joke") || userMessageLower.includes("tell me a joke")) {
    responseText = responses.jokes[Math.floor(Math.random() * responses.jokes.length)];
  } else if (userMessageLower.includes("weather")) {
    responseText = responses.weather[Math.floor(Math.random() * responses.weather.length)];
  } else if (userMessageLower.includes("news")) {
    responseText = responses.news[Math.floor(Math.random() * responses.news.length)];
  } else if (userMessageLower.includes("day")) {
    responseText = responses.day[Math.floor(Math.random() * responses.day.length)];
  } else if (userMessageLower.includes("song") || userMessageLower.includes("suggest a song")) {
    responseText = responses.songSuggestion[Math.floor(Math.random() * responses.songSuggestion.length)];
  } 

  // Set the response message
  messageElement.textContent = responseText;

  // Scroll to the bottom of the chatbox
  chatbox.scrollTo(0, chatbox.scrollHeight);
};

const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
  if (!userMessage) return;

  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  const outgoingChatli = createChatLi(userMessage, "outgoing");
  chatbox.appendChild(outgoingChatli);
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    // Display "Typing..." message while waiting for the response
    const incomingChatli = createChatLi("Typing...", "incoming");
    chatbox.appendChild(incomingChatli);
    generateResponse(incomingChatli);
  }, 600);
};

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without the Shift key and the window width is greater than 800px, handle the chat
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatbtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);
