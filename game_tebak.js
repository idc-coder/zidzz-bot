const axios = require('axios');
module.exports = async (sock, from, m, command) => {
    try {
        if (command === 'tebakgambar') {
            const res = await axios.get('https://itzpire.site');
            await sock.sendMessage(from, { image: { url: res.data.data.img }, caption: `🎯 *Kuis Tebak Gambar!*\n\n💡 *Clue:* ${res.data.data.deskripsi}\n\n*Jawaban:* ||${res.data.data.jawaban}||` }, { quoted: m });
        } else if (command === 'tebakkata') {
            const res = await axios.get('https://itzpire.site');
            await sock.sendMessage(from, { text: `🧠 *Kuis Tebak Kata!*\n\n*Soal:* ${res.data.data.soal}\n💡 *Clue:* ${res.data.data.bantuan}\n\n*Jawaban:* ||${res.data.data.jawaban}||` }, { quoted: m });
        } else if (command === 'susunkata') {
            const res = await axios.get('https://itzpire.site');
            await sock.sendMessage(from, { text: `🔠 *Kuis Susun Kata!*\n\n*Acakan:* ${res.data.data.soal}\n💡 *Tipe:* ${res.data.data.tipe}\n\n*Jawaban:* ||${res.data.data.jawaban}||` }, { quoted: m });
        }
    } catch { sock.sendMessage(from, { text: '❌ Server game sibuk.' }, { quoted: m }); }
};

