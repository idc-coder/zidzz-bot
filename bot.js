const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, delay } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const readline = require('readline');
const config = require('./config');
const chalk = require('chalk');
const boxen = require('boxen');
const os = require('os');
const fs = require('fs');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

let isDashboardPrinted = false;
let isSocketInitialized = false;
let botMode = "PUBLIC"; 
let readPesanDiTermux = true; 
let sockInstance = null;
async function startBot(io) {
    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState('session_zidzz');
    
    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        version, 
        printQRInTerminal: false, 
        auth: state,
        browser: ['Mac OS', 'Chrome', '125.0.0.0'] 
    });
    
    sockInstance = sock;

    if (!isDashboardPrinted) {
        console.clear();
        console.log(chalk.cyan.bold(`
         ⢀⡤⠖⠚⠋⠉⠉⠉⠙⠓⠦⣄⡀          
       ⢀⡴⠋⠀⠀⠀⠤⠄⠀⠀⠀⠀⠀⠈⠙⢦⡀       ${chalk.white.bgCyan.bold('    [ ZIDZZ MAINFRAME v10.0 ]   ')}
      ⢠⠟⠀⠀⠀⠠⠤⠒⠒⠒⠒⠤⠄⠀⠀⠀⠻⣄      ${chalk.gray('> ENGINE :')} ${chalk.green.bold('ONLINE')}
      ⡟⠀⠀⠀⢈⣉⣉⣉⡉⠉⠉⣉⣉⣉⡁⠀⠀⠀⢹     ${chalk.gray('> STATUS :')} ${chalk.red.bold('NOTIF BYPASS FIX')}
      ⡇⠀⠀⠀⠟⢿⣿⣿⡿⠀⠀⢿⣿⣿⠻⠀⠀⠀⢸     ${chalk.gray('> COMPAT :')} ${chalk.yellow('WA BIZ & NORMAL OK')}
      ⢻⡀⠀⠀⠀⠈⠙⠛⠁⠀⠀⠈⠛⠋⠁⠀⠀⢀⡟
       ⠙⢦⡀⠀⠀⠀⠀⠀⠀⠢⠀⠀⠀⠀⠀⢀⡴⠋       
         ⠉⠓⠦⣄⣀⣀⣀⣀⣀⣀⣀⣀⣄⠤⠖⠚⠉       
    `));
        console.log(boxen(`${chalk.red.bold('👑 ROOT ACCOUNT')}\n• Owner: ${chalk.cyan(config.ownerNumber.split('@')[0])}`, { padding: 0, borderStyle: 'round', borderColor: 'red' }));
        console.log(boxen(
            `${chalk.yellow.bold('💻 CONSOLE MANAGEMENT COMMANDS')}\n` +
            ` 1: Broadcast All Group      4: Toggle Log Chat Monitor\n` +
            ` 2: Diagnostik RAM Termux   5: Clear Session Cache\n` +
            ` 3: Switch Self/Public Mode  7: Safe Shutdown Bot\n` +
            `-----------------------------------------------------\n` +
            ` 8: Tambah Akun VIP Baru     10: Atur Slot Open Jadibot\n` +
            ` 9: Tambah Akun VVIP Baru    [p]: Pairing Code Manual`,
            { padding: 0, borderStyle: 'round', borderColor: 'yellow' }
        ));
        isDashboardPrinted = true;
    }
    const handleOwnerInput = async () => {
        while (true) {
            const input = await question(chalk.red.bold("\n[ZIDZZ-GOJO@ROOT] # "));
            if (input === '7') {
                console.log(chalk.red.bold("\n⚠️ Melakukan Shutdown..."));
                process.exit(0);
            }
            else if (input === '4') {
                readPesanDiTermux = !readPesanDiTermux;
                console.log(chalk.yellow(`✔ Monitor Chat: ${readPesanDiTermux ? "ON" : "OFF"}`));
            }
            else if (input === '3') {
                botMode = botMode === "PUBLIC" ? "SELF" : "PUBLIC";
                console.log(chalk.yellow(`✔ Mode Bot Berhasil Diubah: ${botMode}`));
            }
            else if (input.toLowerCase() === 'p') {
                let num = await question(chalk.cyan('Masukkan Nomor WA Bot (628xxx): '));
                num = num.replace(/[^0-9]/g, '');
                try {
                    console.log(chalk.gray("Mendorong sinyal request pairing..."));
                    await delay(1000);
                    let code = await sockInstance.requestPairingCode(num);
                    let formattedCode = code?.match(/.{1,4}/g)?.join('-') || code;
                    console.log(chalk.green.bold(`\n👉 KODE PAIRING ANDA: ${formattedCode}`));
                    console.log(chalk.yellow("(*) Cek aplikasi WhatsApp Anda sekarang, pop-up akan otomatis muncul."));
                } catch (err) { 
                    console.log(chalk.red("Gagal memicu kode. Ketik 'p' lagi untuk memaksa ulang jaringan.")); 
                }
            } else {
                await require('./commands/owner_panel')(sockInstance, input, question);
            }
        }
    };

    if (!isSocketInitialized) { setTimeout(() => { handleOwnerInput(); }, 1000); }

    sock.ev.on('connection.update', async (up) => {
        const { connection, qr, lastDisconnect } = up;
        if (qr && !sock.authState.creds.registered) {
            console.log(chalk.white.bold('\n[ CADANGAN SINKRONISASI ] QR CODE DI TERMINAL KELUAR:'));
            require('qrcode-terminal').generate(qr, { small: true });
        }
        if (connection === 'close') {
            if ((lastDisconnect?.error instanceof Boom)?.output?.statusCode !== DisconnectReason.loggedOut) startBot(io);
        } else if (connection === 'open') {
            console.log(chalk.green.bold(`\n[ SYSTEM ] CONNECTED!`));
            io.emit('bot-ready');
        }
    });

    if (!isSocketInitialized) {
        io.on('connection', (socket) => {
            socket.on('submit-number', async (num) => {
                try {
                    await delay(1000);
                    let code = await sockInstance.requestPairingCode(num.replace(/[^0-9]/g, ''));
                    socket.emit('pairing-code', code?.match(/.{1,4}/g)?.join('-') || code);
                } catch { socket.emit('pairing-code', 'ERROR: CODE REJECTED'); }
            });
        });
        isSocketInitialized = true;
    }

    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('messages.upsert', async (chat) => {
        try {
            // FIX: Validasi array messages dan penunjukan objek pertama yang benar
            if (!chat.messages || chat.messages.length === 0) return;
            const msg = chat.messages[0];
            if (!msg.message) return;
            
            // FIX CRITICAL: Paksa targeting JID agar chat mandiri di WA biasa & bisnis bisa membalas sempurna
            let from = msg.key.remoteJid; 
            if (from === 'status@broadcast') return;
            if (msg.key.fromMe) { from = msg.key.remoteJid; }

            // Ekstraksi tipe body teks yang fleksibel untuk WA Biasa, Business, dan Pesan Sementara
            const type = Object.keys(msg.message)[0];
            let body = '';
            if (type === 'conversation') {
                body = msg.message.conversation;
            } else if (type === 'extendedTextMessage') {
                body = msg.message.extendedTextMessage.text;
            } else if (type === 'imageMessage') {
                body = msg.message.imageMessage.caption;
            } else if (type === 'videoMessage') {
                body = msg.message.videoMessage.caption;
            } else if (type === 'viewOnceMessageV2') {
                const inner = Object.keys(msg.message.viewOnceMessageV2.message)[0];
                body = msg.message.viewOnceMessageV2.message[inner]?.caption || msg.message.viewOnceMessageV2.message[inner]?.text || '';

            } else if (type === 'ephemeralMessage') {
                const inner = Object.keys(msg.message.ephemeralMessage.message)[0];
                body = msg.message.ephemeralMessage.message[inner]?.caption || msg.message.ephemeralMessage.message[inner]?.text || '';
            }

            const kataKunci = body ? body.toLowerCase().trim() : '';
            const isCommand = body ? body.startsWith(config.prefix) : false;

            if (msg.key.fromMe && !isCommand) return;
            if (readPesanDiTermux && body) console.log(chalk.white(`[ CHAT ] Msg: "${body}"`));
            if (botMode === "SELF" && !from.includes(config.ownerNumber.replace(/[^0-9]/g, ''))) return;

            if (kataKunci === 'bot' && !msg.key.fromMe) {
                return await sockInstance.sendMessage(from, { text: "Kangen gw ya? Gw sih emang terbaik. 😎" }, { quoted: msg });
            }

            if (!isCommand) return;
            const args = body.trim().split(/ +/).slice(1); 
            const q = args.join(' ');
            const command = body.slice(config.prefix.length).trim().split(/ +/).shift().toLowerCase();

            // ========================================================
            // COMPLETE 100+ COMMANDS ENGINE ROUTER
            // ========================================================
            if (command === 'menu' || command === 'help' || command === 'menugame' || command === 'menugroup' || command === 'menutools' || command === 'menudownload') {
                return require('./commands/menu')(sockInstance, from, msg);
            }
            
            const gameCmds = [
                'artinama', 'fakta', 'jokes', 'joke', 'katabijak', 'bijak', 
                'katagalau', 'galau', 'sipaling', 'sp', 'asahotak', 'ao', 
                'bingo', 'blackjack', 'jack', 'claim', 'connect4', 'cn4', 
                'family100', 'fam', 'hangman', 'hm', 'jawab', 'jwb', 
                'mathquiz', 'mq', 'mendingmana', 'mm', 'minesweeper', 'mw', 
                'tebakbom', 'misi', 'pokemon', 'poke', 'quiz', 'trivia', 
                'sambungkata', 'sak', 'siapakahaku', 'siapaaku', 'sa', 
                'slot', 'tebakanime', 'ta', 'tebakfreefire', 'tff', 
                'tebakff', 'tebakheroml', 'tml', 'tebakhewan', 'th', 
                'tebakjkt48', 'jkt48', 'tebaklagu', 'tlagu', 'tebaknegara', 
                'tn', 'tebakpemainbola', 'tp', 'tebakunsur', 'tu', 
                'tebakvtuber', 'tv', 'trueorfalse', 'tof', 'ulartangga', 'ut'
            ];
            if (gameCmds.includes(command)) return require('./commands/game_tebak')(sockInstance, from, msg, command, q, args);

            const groupCmds = [
                'cekid', 'cekpesan', 'changelanguage', 'setlang', 'donasi', 
                'saweria', 'limit', 'point', 'profile', 'me', 'rank', 
                'lb', 'shop', 'buy', 'source', 'sc', 'stats', 'stat', 
                'addmember', 'add', 'afk', 'anti', 'hidetag', 'htag', 
                'h', 'tag', 'tagall', 'linkgroup', 'linkgrup', 'jadibot', 
                'listbot', 'logout', 'mygrp', 'private', 'public', 'savekontak', 'self', 'setgrup', 'setgroup'
            ];
            if (groupCmds.includes(command)) return require('./commands/admin')(sockInstance, from, msg, command, q, args);

            const toolCmds = [
                'ttt', 'tictactoe', 'ww', 'werewolf', 'twitterqc', 'tqc', 
                'whatsappqc', 'waqc', 'mediaplayerqc', 'mpqc', 'freefire', 
                'ff', 'mlbb', 'attp', 'ttp', 'cuaca', 'weather', 'hd', 
                'remini', 'jadwalsholat', 'sholat', 'translate', 'tr', 
                'removebg', 'rbg'
            ];
            if (toolCmds.includes(command)) return require('./commands/sticker')(sockInstance, from, msg, command, q);

            const dlCmds = [
                'random', 'r', 'whatanime', 'what', 'capcut', 'cc', 
                'pinterestvideo', 'pinvid', 'play', 'addlimit', 'ban', 'addpoint'
            ];
            if (dlCmds.includes(command)) return require('./commands/download')(sockInstance, from, msg, command, q);

            if (['tiktok', 'tt', 'youtube', 'yt', 'instagram', 'ig'].includes(command)) return require('./commands/download')(sockInstance, from, msg, command, q, args);
            if (['sticker', 's'].includes(command)) return require('./commands/sticker')(sockInstance, from, msg, command, q, type);
            if (['ai', 'apakah', 'kapankah', 'cekcek', 'truth', 'dare'].includes(command)) return require('./commands/fun')(sockInstance, from, msg, command, q);

        } catch (e) {
            console.error(e);
        }
    });
}
module.exports = { startBot };


