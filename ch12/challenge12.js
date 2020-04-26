let args = process.argv.slice(2); //memotong argument dua didepan (tidak diikutsertakan)
let wrong = 0;
let skip = [];
const fs = require('fs');
const data = JSON.parse(fs.readFileSync(args[0])); //membuat object dari file yang sudah dibaca
const readline = require('readline');
const rl = readline.Interface({
    input: process.stdin,
    output: process.stdout
});

if (args[0] != 'data.json') {
    console.log(`Maaf file pertanyaan yang anda masukan salah.`);
} else {
    rl.setPrompt(`Soal : ${data[0].definition} \nJawaban : `)
    rl.prompt();
    rl.on('line', (line) => {
        if (line.trim().toLowerCase() == data[0].term.toLowerCase()) {
            console.log(`Anda beruntung! \n`);
            data.shift();
        } else if (line.trim().toLowerCase() == 'skip') {
            console.log(`\n`);
            skip = data.splice(0, 1);
            data.push(skip[0]);
        } else {
            wrong++;
            console.log(`Anda kurang beruntung, anda telah salah ${wrong} kali!, Silahkan coba lagi \n`);
            rl.prompt();
        }

        if (data.length == 0) {
            rl.close();
        } else {
            rl.setPrompt(`Soal : ${data[0].definition} \nJawaban : `);
            rl.prompt();
        }
    }).on('close', () => {
        console.log(`Anda Berhasil`);
        process.exit(0);
    });
}