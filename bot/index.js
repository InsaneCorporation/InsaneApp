require('dotenv').config();
const fs = require('fs');
const { Telegraf } = require('telegraf');
const express = require('express');
const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

let users = fs.existsSync('users.json') ? JSON.parse(fs.readFileSync('users.json', 'utf-8')) : {};

bot.command('start', (ctx) => {
  ctx.reply('Bienvenue sur InsaneApp ! Clique ici pour te connecter :', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🚀 Ouvrir InsaneApp', web_app: { url: 'https://insanecorporation.github.io/ton-connect-page/index.html' } }]
      ]
    }
  });
});

app.use(express.json());

app.post('/api/connect', (req, res) => {
  const { telegram_id, telegram_username, wallet } = req.body;
  users[telegram_id] = {
    ...users[telegram_id],
    username: telegram_username,
    wallet,
  };
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
  console.log(`✅ [InsaneApp] Wallet ajouté pour ${telegram_username} (${telegram_id})`);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('🚀 Serveur Express sur http://localhost:3000'));
bot.launch();
