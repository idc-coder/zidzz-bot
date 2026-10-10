const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const axios = require('axios');
const FormData = require('form-data');
module.exports = async (sock, from, m, command, q, type) => {
    try {
        if (command === 'brat') {
            if (!q) return sock.sendMessage(from, { text: '❌ Masukkan teks!' }, { quoted: m });
            return await sock.sendMessage(from, { sticker: { url: `https://itzpire.site{encodeURIComponent(q)}` } }, { quoted: m });
        }
        const isImage = type === 'imageMessage';
        const isQuoted = type === 'extendedTextMessage' && m.message.extendedTextMessage.contextInfo?.quotedMessage?.imageMessage;
        if (!isImage && !isQuoted) return sock.sendMessage(from, { text: '❌ Kirim/reply foto!' }, { quoted: m });
        const img = isImage ? m.message.imageMessage : m.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
        const stream = await downloadContentFromMessage(img, 'image');
        let buf = Buffer.from([]);
        for await (const chunk of stream) { buf = Buffer.concat([buf, chunk]); }
        const form = new FormData(); form.append('file', buf, { filename: 's.jpg', contentType: 'image/jpeg' });
        const up = await axios.post('https://itzpire.site', form, { headers: form.getHeaders() });
        await sock.sendMessage(from, { sticker: { url: `https://itzpire.site{encodeURIComponent(up.data.file.url)}` } }, { quoted: m });
    } catch { sock.sendMessage(from, { text: '❌ Gagal membuat stiker.' }, { quoted: m }); }
};

