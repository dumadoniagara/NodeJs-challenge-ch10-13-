// implementasikan penggunaan readline pada fungsi yang telah dibuat di challenge-6
const readline = require('readline'); // the readline module provides an interface for reading data from a Readable stream (such as process.stdin) one line at a time. 
const rl = readline.createInterface({ //protokol membuat interface.
    input: process.stdin,
    output: process.stdout,
    prompt: 'tulis kalimatmu disini > '
});
rl.prompt(); //membuka input interface
rl.on('line', (line) => { // input data yg masuk di prosess line=input(dari prompt)
    if (line.trim() == `Good bye!`) {
        rl.close();
    } else {
        sentenceManipulation(line.trim());
        rl.prompt();
    }
})

function sentenceManipulation(sentence) {
    let stc = sentence.split(" "); //memasukkan suatu nilai string kedalam array yang terpisahkan oleh spasi
    let hasil = "";
    let cek = false;

    for (i = 0; i < stc.length; i++) {
        let n = stc[i].charAt(0);
        if (n == "a" || n == "i" || n == "u" || n == "e" || n == "o") {
            cek = true;
        } else {
            cek = false;
        }
        if (cek == true) {
            hasil += stc[i] + " ";
        } else {
            hasil += stc[i].slice(1) + n + "nyo" + " ";
        }
    }
    return console.log(`hasil konversi : ${hasil}`);
}