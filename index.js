/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */
let readlineSync = require('readline-sync');
let fs = require('fs');
let allContacts = [];

function loadData() {
    let loadFile = fs.readFileSync('./data.json', { encoding: 'utf8' });
    allContacts = JSON.parse(loadFile);
}

function saveFile() {
    let contentFile = JSON.stringify(allContacts);
    fs.writeFileSync('./data.json', contentFile, { encoding: 'utf8' })
}

function addContact() {
    let name = readlineSync.question('Name: ');
    let phone = readlineSync.question('Phone: ');
    let human = {
        name: name,
        phone: phone
    }
    allContacts.push(human);
    saveFile();
    console.log('<<< Additon contact successful!!');
}

function setContact() {
    let findName = readlineSync.question('Name: ');
    let findPhone = readlineSync.question('Phone: ');
    let findHuman = {
        name: findName,
        phone: findPhone
    }
    let i = 1;
    for (let human of allContacts) {
        if (human.name == findHuman.name && human.phone == findHuman.phone) {
            let newName = readlineSync.question('Enter new Name: ');
            let newPhone = readlineSync.question('Enter new Phone: ');
            let newHuman = {
                name: newName,
                phone: newPhone
            }
            human.name = newHuman.name;
            human.phone = newHuman.phone;
            break;
        } else if (i === allContacts.length) {
            console.log('<<< Not found!', findHuman.name, findHuman.phone);
            break;
        }
        i++;
    }
    saveFile();
}

function removeContact() {
    let findName = readlineSync.question('Name: ');
    let findPhone = readlineSync.question('Phone: ');
    let findHuman = {
        name: findName,
        phone: findPhone
    }
    for (let human of allContacts)
        if (human.name == findHuman.name && human.phone == findHuman.phone) {
            let index = allContacts.indexOf(human);
            if (index > -1) {
                allContacts.splice(index, 1);
            }

        }
    saveFile();
    console.log('<<< Successfully removed if exist phone or name');
}

function findContact() {
    let findName = readlineSync.question('Name: ');
    let findPhone = readlineSync.question('Phone: ');
    let findHuman = {
        name: findName,
        phone: findPhone
    }
    for (let human of allContacts) {
        if (human.name == findHuman.name && human.phone == findHuman.phone) {
            console.log('<<< In the contact list, there are people you are looking for!');
            break;
        } else {
            console.log('<<< There are no people in your contact list!');
            break;
        }
    }
}

function listContact() {
    for (let human of allContacts) {
        console.log(human.name, human.phone);
    }
}

function mainMenu() {
    console.log('1. Additon contact');
    console.log('2. Setting contact');
    console.log('3. Remove contact');
    console.log('4. Find contact');
    console.log('5. Print list contact');
    console.log('6. saveAndExit');
    let choose = readlineSync.question('>>> ');
    switch (choose) {
        case '1':
            addContact();
            mainMenu();
            break;
        case '2':
            setContact();
            mainMenu();
            break;
        case '3':
            removeContact();
            mainMenu();
            break;
        case '4':
            findContact();
            mainMenu();
            break;
        case '5':
            listContact();
            mainMenu();
            break;
        case '6':
            saveFile();
            break;
        default:
            console.log('Wrong option!');
            mainMenu();
            break;
    }
}

function main() {
    loadData();
    mainMenu();
}
main();