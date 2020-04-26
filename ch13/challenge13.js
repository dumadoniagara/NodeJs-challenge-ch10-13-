// Note : data13.json sudah di buat terlebih dahulu dalam folder yang sama berupa array kosong

let tempt = {};
const fs = require('fs');
let data = JSON.parse(fs.readFileSync('data13.json', 'utf8'));

function argInput(a) {
    let myArgs = process.argv;
    switch (a) {
        case 'command':
            return myArgs.splice(2, 1)[0];
        case 'argument':
            return myArgs.slice(2).join(" ");
        case 'tagArg':
            return myArgs.slice(3).join(" ");
    }
}

function updateId(data) {
    for (i = 0; i < data.length; i++) {
        data[i].id = i + 1;
    }
    return data;
}
// fungsi constructor object
function input(id, task, checklist, tag) {
    this.id = id;
    this.task = task;
    this.checklist = checklist;
    this.tag = tag;
}

// fitur
switch (argInput('command')) {
    case 'add':
        tempt = new input(data.length + 1, argInput('argument'), "", "");
        data.push(tempt);
        updateId(data);
        fs.writeFileSync('data13.json', JSON.stringify(data));
        console.log(`"${argInput('argument')}" berhasil ditambahkan`);
        break;

    case 'list':
        console.log(`Daftar Pekerjaan`);
        for (i = 0; i < data.length; i++) {
            console.log(`${data[i].id}. [${data[i].checklist}] ${data[i].task}.`)
        }
        break;
    case 'task':
        console.log(data[argInput('argument') - 1].task);
        break;

    case 'delete':
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == parseInt(argInput('argument'))) {
                console.log(`${data[i].task} telah dihapus`);
                data.splice(i, 1);
            }
        }
        updateId(data);
        fs.writeFileSync('data13.json', JSON.stringify(data));
        break;

    case 'complete':
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == parseInt(argInput('argument'))) {
                console.log(`${data[i].task} telah selesai`);
                data[i].checklist = 'X';
            }
        }
        fs.writeFileSync('data13.json', JSON.stringify(data));
        break;

    case 'uncomplete':
        for (i = 0; i < data.length; i++) {
            if (data[i].id == parseInt(argInput('argument'))) {
                console.log(`${data[i].task} status selesai telah dibatalkan`);
                data[i].checklist = '';
            }
        }
        fs.writeFileSync('data13.json', JSON.stringify(data));
        break;

    case 'tag':
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == parseInt(argInput('argument'))) {
                console.log(`Tag '${argInput('tagArg')}' telah ditambahkan ke daftar '${data[i].task}'`);
                data[i].tag = argInput('tagArg');
            }
        }
        fs.writeFileSync('data13.json', JSON.stringify(data));
        break;

    case 'filter':
        for (i = 0; i < data.length; i++) {
            if (data[i].task.includes(argInput('argument')) == true) {
                console.log(`${data[i].id}. [${data[i].checklist}] ${data[i].task}.\n`)
            }
        }
        break;

    case 'help':
        let help = [`<command>`, `list`, `task <task_id>`, `add <task_content>`, `delete <task_id>`, `complete <task_id>`, `uncomplete <task_id>`, `list:outstanding asc|desc`, `list:completed asc|desc`, `tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>`, `filter:<tag_name>`]
        console.log(`>>> JS TODO <<<`);
        for (i = 0; i < help.length; i++) {
            console.log(`$ node challenge13.js ${help[i]}`);
        }
        break;

    case 'list:completed':
        if (argInput('argument') == 'asc') {
            let num = 1;
            console.log(`Daftar Pekerjaan`);
            for (i = 0; i < data.length; i++) {
                if (data[i].checklist == 'X') {
                    console.log(`${num}. [${data[i].checklist}] ${data[i].task}.`);
                    num++;
                }
            }
        } else if (argInput('argument') == 'desc') {
            let num = 1;
            for (i = data.length - 1; i >= 0; i--) {
                if (data[i].checklist == 'X') {
                    console.log(`${num}. [${data[i].checklist}] ${data[i].task}.`)
                    num++;
                }
            }
        }
        break;
        
    case 'list:outstanding':
        if (argInput('argument') == 'asc') {
            console.log(`Daftar Pekerjaan`);
            for (i = 0; i < data.length; i++) {
                if (data[i].checklist == '') {
                    console.log(`${data[i].id}. [${data[i].checklist}] ${data[i].task}.`);
                }
            }
        } else if (argInput('argument') == 'desc') {
            for (i = data.length - 1; i >= 0; i--) {
                if (data[i].checklist == '') {
                    console.log(`${data[i].id}. [${data[i].checklist}] ${data[i].task}.`)
                }
            }
        }
        break;

    default:
        console.log('perintah yang anda masukan salah');
        break;
}


