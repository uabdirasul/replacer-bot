const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
require("dotenv").config();

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const token = process.env.TELEGRAM_BOT_TOKEN;
const api_endpoint_post = process.env.API_ENDPOINT_POST;
const bot_username = process.env.BOT_USERNAME;

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Function to format text
function updateText(text) {
  return text
    .replace(/U'/g, "Ú")
    .replace(/U’/g, "Ú")
    .replace(/A'/g, "Á")
    .replace(/A’/g, "Á")
    .replace(/O'/g, "Ó")
    .replace(/O’/g, "Ó")
    .replace(/N'/g, "Ń")
    .replace(/N’/g, "Ń")
    .replace(/I'/g, "Í")
    .replace(/I’/g, "Í")
    .replace(/g'/g, "ǵ")
    .replace(/g’/g, "ǵ")
    .replace(/o'/g, "ó")
    .replace(/o’/g, "ó")
    .replace(/n'/g, "ń")
    .replace(/n’/g, "ń")
    .replace(/u'/g, "ú")
    .replace(/u’/g, "ú")
    .replace(/a'/g, "á")
    .replace(/a’/g, "á")
    .replace(/i'/g, "ı")
    .replace(/i’/g, "ı");
}

// Event listener for messages
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // If the message is "/start", send a welcome message
  if (text === "/start") {
    bot.sendMessage(
      chatId,
      "Welcome! \nBul bot arqalı eski álipbedegi háriplerińizdi jańasına tez ózgertip alıwıńız múmkin. Onıń ushın tekstińizde ózgertiliwi kerek bolǵan hárip ' yáki ’ belgisi arqalı jazılıwı kerek. Mısalı: Sa'lem -> Sálem \n\nWebsayt: https://replaceletter.netlify.app/"
    );

    axios
      .post(`${api_endpoint_post}`, {
        name: `${bot_username}`,
        user_id: chatId,
        interaction_time: getFormattedInteractionTime()
      })
      .then((response) => {
        console.log("Interaction recorded:", response.data);
      })
      .catch((error) => {
        console.error("Error recording interaction:", error);
      });
    // to stop further execution
    return;
  }
  // Apply formatting function to the received text
  const formattedText = updateText(text);

  // Send the formatted text back to the user
  bot.sendMessage(chatId, formattedText);
});

function getFormattedInteractionTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // zero-pad month
  const day = String(now.getDate()).padStart(2, "0"); // zero-pad day
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");
  const millisecond = String(now.getMilliseconds()).padStart(6, "0"); // include milliseconds

  return `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond}`;
}

// Log any errors
bot.on("polling_error", (error) => {
  console.log(error);
});
