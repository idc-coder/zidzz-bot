module.exports = async (sock, from, m, command, args) => {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ Khusus di dalam grup!' }, { quoted: m });
    const groupMetadata = await sock.groupMetadata(from);
    const participants = groupMetadata.participants;
    const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
    if (!participants.find(p => p.id === botId)?.admin) return sock.sendMessage(from, { text: '❌ Bot harus jadi admin!' }, { quoted: m });

    if (command === 'kick') {
        let target = args ? args.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null;
        if (m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]) target = m.message.extendedTextMessage.contextInfo.mentionedJid[0];
        if (!target) return sock.sendMessage(from, { text: '❌ Tag targetnya!' }, { quoted: m });
        await sock.groupParticipantsUpdate(from, [target], 'remove');
        await sock.sendMessage(from, { text: '✨ Anggota dikeluarkan!' }, { quoted: m });
    } else if (command === 'close') {
        await sock.groupSettingUpdate(from, 'announcement');
        await sock.sendMessage(from, { text: '🔒 Chat grup ditutup!' }, { quoted: m });
    } else if (command === 'open') {
        await sock.groupSettingUpdate(from, 'not_announcement');
        await sock.sendMessage(from, { text: '🔓 Chat grup dibuka!' }, { quoted: m });
    }
};

