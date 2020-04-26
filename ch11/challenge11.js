const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
let i = 0;

const readline = require('readline');
const rl = readline.Interface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt(`Soal : ${data[i].definition} \nJawaban: `);
rl.prompt();
rl.on('line', (line) => { //akan dieksekusi apabila setelah prompt ada input "enter" dari user
    if (line.trim().toLowerCase() == data[i].term.toLowerCase()) {
        console.log(`selamat anda benar!  \n`);
        i++;
    } else {
        console.log(`Salah atuh euy! \n`);
    }

    if (i < data.length) { //data.length = 3 (loop condition)
        rl.setPrompt(`Soal: ${data[i].definition}\nJawaban: `);
        rl.prompt(); //Membentuk looping, karena rl.prompt trigger rl.on("line") untuk dieksekusi (biasanya input dalam bentuk enter)
    } else {
        rl.close();
    }
}).on('close', ()=>{
    console.log(`Terima telah bermain!`);
    process.exit(0);
});
