const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const token = process.env.TELEGRAM_BOT_TOKEN;

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
    // to stop further execution
    return;
  }
  // Apply formatting function to the received text
  const formattedText = updateText(text);

  // Send the formatted text back to the user
  bot.sendMessage(chatId, formattedText);
});

// Log any errors
bot.on("polling_error", (error) => {
  console.log(error);
});
