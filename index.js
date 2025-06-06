require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Ottieni il token dalle variabili d'ambiente
const token = process.env.BOT_TOKEN;
if (!token) {
  console.error('BOT_TOKEN non trovato nelle variabili d\'ambiente');
  process.exit(1);
}

// Crea una nuova istanza del bot

const bot = new TelegramBot(token, { polling: true });

// Gestisci il comando /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Ciao! Sono il tuo bot Telegram. Usa /help per vedere i comandi disponibili.');
});

// Gestisci il comando /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `
Comandi disponibili:
/start - Avvia il bot
/help - Mostra questo messaggio di aiuto
/info - Informazioni sul bot
/tris - gioco del tris
/memory - gioco del memory
`);
});

// Gestisci il comando /info
bot.onText(/\/info/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `
Bot creato durante il corso di Containerizzazione e Deployment.
Versione: 1.0.0
Ambiente: ${process.env.NODE_ENV || 'development'}
`);
});

bot.onText(/\/tris/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `
Link per il tris : https://erdomi08.github.io/tris-game/
`);
});

bot.onText(/\/memory/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `
Link per il memory: https://erdomi08.github.io/memory-game/
`);
});


// Gestisci messaggi non riconosciuti
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  
  // Ignora i comandi che abbiamo già gestito
  if (msg.text && (msg.text.startsWith('/start') || 
                   msg.text.startsWith('/help') || 
                   msg.text.startsWith('/info') ||
                  msg.text.startsWith('/tris') ||
                msg.text.startsWith('/memory'))) {
    return;
  }
  
  bot.sendMessage(chatId, 'Non ho capito. Usa /help per vedere i comandi disponibili.');
});

const axios = require('axios');

setInterval(() => {
     axios.get('https://telegram-bot.onrender.com')
    .then(() => console.log('Ping inviato per mantenere attivo il bot'))
    .catch(err => console.error('Errore nel ping:', err));
}, 9 * 60 * 1000); // Ogni 9 minuti

console.log('Bot avviato con successo!');