const axios = require('axios');

module.exports = async (sock, from, m, command, q, args) => {
    try {
        switch (command) {
            // --- KATEGORI FUN ---
            case 'artinama':
                if (!q) return sock.sendMessage(from, { text: '❌ Masukkan nama!' }, { quoted: m });
                await sock.sendMessage(from, { text: `🔮 *ARTI NAMA [ ${q.toUpperCase()} ]*\n\nOrang yang penyayang, membawa rezeki, dan sukses.` }, { quoted: m });
                break;
            case 'fakta':
                await sock.sendMessage(from, { text: `💡 *FAKTA UNIK ZIDZZ*:\n\nSemut tidak memiliki paru-paru dan tidak pernah tidur.` }, { quoted: m });
                break;
            case 'jokes':
            case 'joke':
                await sock.sendMessage(from, { text: `😂 *JOKES BAPACK-BAPACK*:\n\n"Kenapa donat tengahnya bolong? Karena yang utuh cintaku padamu."` }, { quoted: m });
                break;
            case 'katabijak':
            case 'bijak':
                await sock.sendMessage(from, { text: `✍️ *KATA BIJAKSANA*:\n\n"Kegagalan adalah satu-satunya kesempatan untuk memulai lagi dengan lebih cerdas."` }, { quoted: m });
                break;
            case 'katagalau':
            case 'galau':
                await sock.sendMessage(from, { text: `💔 *ZIDZZ GALAU MODE*:\n\n"Aku tanpamu bagaikan kosan tanpa wifi, hampa dan tak tahu arah."` }, { quoted: m });
                break;
            case 'sipaling':
            case 'sp':
                await sock.sendMessage(from, { text: `👑 Si paling utama di grup ini jatuh kepada: @${m.key.participant || from.split('@')[0]}` }, { quoted: m });
                break;

            // --- KATEGORI GAME LENGKAP ---
            case 'asahotak':
            case 'ao':
                await sock.sendMessage(from, { text: `🧩 *ASAH OTAK ZIDZZ*\n\n*Soal:* Hewan apa yang punya sembilan nyawa?\n\n_Jawaban:_ ||Kucing||` }, { quoted: m });
                break;
            case 'bingo':
                await sock.sendMessage(from, { text: '🎲 *BINGO ARENA* 🎲\nPapan Bingo 5x5 kamu telah dibuat! Dapatkan baris angka keberuntungan kamu.' }, { quoted: m });
                break;
            case 'blackjack':
            case 'jack':
                let sk = Math.floor(Math.random() * 11) + 11;
                await sock.sendMessage(from, { text: `🃏 *BLACKJACK*\nSkor Anda: ${sk}\nHasil: ${sk <= 21 ? '🏆 MENANG!' : '💀 BUST/KALAH!'}` }, { quoted: m });
                break;
            case 'claim':
                await sock.sendMessage(from, { text: '🎁 Harian sukses diklaim! +100 koin masuk ke saldo Zidzz Store kamu.' }, { quoted: m });
                break;
            case 'connect4':
            case 'cn4':
                await sock.sendMessage(from, { text: '🔴 *CONNECT 4 LOBBY* 🔵\nPapan permainan c4 diaktifkan. Gunakan .cn4 drop [kolom]' }, { quoted: m });
                break;
            case 'family100':
            case 'fam':
                await sock.sendMessage(from, { text: `🎯 *FAMILY 100*\nKategori: Makanan pendamping nasi yang wajib ada.\nJawaban: 1. Kerupuk  2. Sambal  3. Tempe` }, { quoted: m });
                break;
            case 'hangman':
            case 'hm':
                await sock.sendMessage(from, { text: '🪓 *HANGMAN LOBBY*\nTebak kata tersembunyi sebelum tiang gantungan penuh! Kata: [_ _ _ _ _]' }, { quoted: m });
                break;
            case 'jawab':
            case 'jwb':
                await sock.sendMessage(from, { text: '🎯 Gunakan untuk membalas tebakan grup! Format: .jawab [kata]' }, { quoted: m });
                break;
            case 'mathquiz':
            case 'mq':
                let n1 = Math.floor(Math.random() * 50);
                let n2 = Math.floor(Math.random() * 20);
                await sock.sendMessage(from, { text: `🧮 *MATH QUIZ ZIDZZ*\nBerapakah hasil dari: *${n1} + ${n2}* ?\nJawaban tersembunyi: ||${n1+n2}||` }, { quoted: m });
                break;
            case 'mendingmana':
            case 'mm':
                await sock.sendMessage(from, { text: '🤷‍♂️ *MENDING MANA?*\n1. Punya pacar wibu tapi tajir\n2. Punya pacar model tapi miskin' }, { quoted: m });
                break;
            case 'minesweeper':
            case 'mw':
            case 'tebakbom':
                await sock.sendMessage(from, { text: '💣 *MINESWEEPER BOARD* 💣\n[⬜⬜⬜]\n[⬜🚩⬜]\n[⬜⬜⬜]\nHati-hati melangkah!' }, { quoted: m });
                break;
            case 'misi':
                await sock.sendMessage(from, { text: '📜 *MISI HARIAN ZIDZZ BOT*\n1. Jalankan .ai 3 kali (Hadiah: 50 Koin)\n2. Bikin stiker 1 kali (Hadiah: 20 Koin)' }, { quoted: m });
                break;
            case 'pokemon':
            case 'poke':
                await sock.sendMessage(from, { text: `🐾 *野生 POKEMON MUNCUL!*\n• Nama: Pikachu\n• Tipe: Electric\n• HP: 120` }, { quoted: m });
                break;
            case 'quiz':
            case 'trivia':
                await sock.sendMessage(from, { text: '🧠 *TRIVIA INDONESIA*\nSiapakah nama penemu benua Amerika?\nJawaban: ||Christopher Columbus||' }, { quoted: m });
                break;
            case 'sambungkata':
            case 'sak':
                await sock.sendMessage(from, { text: '🔤 *SAMBUNG KATA* dimulai! Kata dasar: *MAKAN*. Silakan sambung kata berawalan huruf *N*!' }, { quoted: m });
                break;
            case 'siapakahaku':
            case 'siapaaku':
            case 'sa':
                await sock.sendMessage(from, { text: `🕵️‍♂️ *SIAPAKAH AKU?*\n\n*Soal:* Aku memiliki layar, keyboard, dan baterai. Aku dipakai bekerja.\n\nJawaban: ||Laptop||` }, { quoted: m });
                break;
            case 'slot':
                const emo = ["🍎", "💎", "🎰"];
                const a = emo[Math.floor(Math.random()*3)], b = emo[Math.floor(Math.random()*3)], c = emo[Math.floor(Math.random()*3)];
                await sock.sendMessage(from, { text: `🎰 *SLOT MACHINE* 🎰\n\n     [ ${a} | ${b} | ${c} ]\n\nHasil: *${(a===b && b===c) ? 'WIN 🎉' : 'LOSE ❌'}*` }, { quoted: m });
                break;
            case 'tebakanime':
            case 'ta':
                await sock.sendMessage(from, { text: '🎬 *TEBAK ANIME*\nSiapakah karakter utama dari anime Jujutsu Kaisen?\nJawaban: ||Itadori Yuji||' }, { quoted: m });
                break;
            case 'tebakfreefire':
            case 'tff':
            case 'tebakff':
                await sock.sendMessage(from, { text: '🔫 *TEBAK FF*\nSenjata apa yang memiliki peluru terbanyak di Free Fire?\nJawaban: ||M249||' }, { quoted: m });
                break;
            case 'tebakheroml':
            case 'tml':
                await sock.sendMessage(from, { text: '🛡️ *TEBAK HERO ML*\nHero tank apa yang bisa menarik musuh dengan rantai?\nJawaban: ||Franco||' }, { quoted: m });
                break;
            case 'tebakhewan':
            case 'th':
                await sock.sendMessage(from, { text: '🦁 *TEBAK HEWAN*\nHewan apa yang memiliki leher terpanjang di dunia?\nJawaban: ||Jerapah||' }, { quoted: m });
                break;
            case 'tebakjkt48':
            case 'jkt48':
                await sock.sendMessage(from, { text: `🎤 *TEBAK MEMBER JKT48*\nSiapakah member JKT48 generasi 7 yang berbakat bermain gitar?\nJawaban: ||Zee||` }, { quoted: m });
                break;
            case 'tebaklagu':
            case 'tlagu':
                await sock.sendMessage(from, { text: '🎵 *TEBAK LAGU*\nLanjutan lirik: "Ku menangiiiis... membayangkan..."\nJawaban: ||Betapa kejamnya dirimu atas diriku||' }, { quoted: m });
                break;
            case 'tebaknegara':
            case 'tn':
                await sock.sendMessage(from, { text: '🌐 *TEBAK NEGARA*\nNegara apa yang memiliki julukan Negeri Tirai Bambu?\nJawaban: ||Cina||' }, { quoted: m });
                break;
            case 'tebakpemainbola':
            case 'tp':
                await sock.sendMessage(from, { text: '⚽ *TEBAK PEMAIN BOLA*\nSiapakah pemain sepak bola yang dijuluki CR7?\nJawaban: ||Cristiano Ronaldo||' }, { quoted: m });
                break;
            case 'tebakunsur':
            case 'tu':
                await sock.sendMessage(from, { text: '🧪 *TEBAK UNSUR KIMIA*\nApakah nama unsur kimia dengan lambang *O*?\nJawaban: ||Oksigen||' }, { quoted: m });
                break;
            case 'tebakvtuber':
            case 'tv':
                await sock.sendMessage(from, { text: 'virtual *TEBAK VTUBER*\nVtuber agensi Hololive ID yang hobi main game horor berambut tupai?\nJawaban: ||Ayunda Risu||' }, { quoted: m });
                break;
            case 'trueorfalse':
            case 'tof':
                await sock.sendMessage(from, { text: '⚖️ *TRUE OR FALSE*\nBenar atau salah bahwa ikan paus bertelur?\nJawaban: ||Salah (Paus melahirkan)||' }, { quoted: m });
                break;
            case 'ulartangga':
            case 'ut':
                await sock.sendMessage(from, { text: '🎲 Permainan *ULAR TANGGA ZIDZZ* dibuka! Ketik .ut kocok untuk jalan.' }, { quoted: m });
                break;
        }
    } catch { 
        await sock.sendMessage(from, { text: '❌ Error API Game Engine.' }, { quoted: m });
    }
};

function pilih(arr) { 
    return arr[Math.floor(Math.random() * arr.length)]; 
}

