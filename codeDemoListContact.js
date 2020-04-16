var readlineSync = require('readline-sync');
var fs = require('fs');
var listContact = [];
var listContactString;
//khai báo 1 đối tượng người
function human(name, phone) {
    this.name = name;
    this.phone = phone;
}
//hàm load file từ hệ thống
function loadFile() {
    listContactString = fs.readFileSync('./data.json', { encoding: 'utf-8' });
    listContact = JSON.parse(listContactString);
}
//hàm lưu file vào hệ thống
function saveFile() {
    listContactString = JSON.stringify(listContact);
    fs.writeFileSync('./data.json', listContactString);
}
// hàm thêm 1 contact
function addContact() {
    var name = readlineSync.question('My name: ');
    var phone = readlineSync.question('My phone: ');
    var aHuman = new human(name, phone);
    listContact.push(aHuman);
    saveFile();
    console.log('Successfully added !');
}
//hàm sửa contact
function setContact() {
    var inputName = readlineSync.question('Input my name (up case/ low case): ');
    var inputPhone = readlineSync.question('Input my phone: ');

    var oldHuman = new human(inputName, inputPhone);
    for (var key of listContact) {
        if (key.name == oldHuman.name && key.phone == oldHuman.phone) {
            var newName = readlineSync.question('My new name: ');
            var newPhone = readlineSync.question('My new phone: ');
            var newHuman = new human(newName, newPhone);
            listContact.splice(listContact.indexOf(key), 1, newHuman);
            saveFile();
            console.log('Success insteaded !');
            break;
        }
    }
}
//hàm xóa contact
function removeContact() {
    var inputName = readlineSync.question('Input my name (up case/ low case) ');
    var inputPhone = readlineSync.question('Input my phone: ');
    var sellect = readlineSync.question('Are you remove human have like name or like phone ? (1/2) ');

    switch (sellect) {
        case '1':
            //xóa những người tên name
            listContact = listContact.filter(element => element.name != inputName);
            break;
        default:
            //chỉ xóa 1 người có phone
            listContact = listContact.filter(element => element.phone != inputPhone);
    }
    saveFile();
    console.log('Successfully removed if exist phone or name');
}
//hàm chuyển dấu tiếng việt sang tiếng anh
function change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str;
}
//hàm tìm kiếm
function searchContact() {
    var inputName = readlineSync.question('Input my name: ');
    var inputPhone = readlineSync.question('Input my phone: ');
    console.log('Result search : ');
    var listContactTrue = listContact.filter(function(index) {
        return index.phone.includes(inputPhone) == true ||
            index.name.toLowerCase().includes(change_alias(inputName));
    });
    listContactTrue.forEach(function(element) {
        console.log(element.name + ':', element.phone);
    });
}
//hàm hiển thị contact
function showContact() {
    loadFile();
    listContact.forEach(function(element) {
        console.log(element.name + ':', element.phone);
    });
}
//hàm option
function option() {
    console.log('1. Add contact');
    console.log('2. Set contact');
    console.log('3. Remove contact');
    console.log('4. Search contact');
    console.log('5. Show contact');
    var select = readlineSync.question('> ');
    switch (select) {
        case '1':
            addContact();
            break;
        case '2':
            setContact();
            break;
        case '3':
            removeContact();
            break;
        case '4':
            searchContact();
            break;
        case '5':
            showContact();
            break;
        default:
            console.log('Wrong option');
            break;
    }
    var isContinue = readlineSync.question('Are you want to continue ? (.../n)  ');
    while (isContinue != 'n') {
        option();
    }
    if (isContinue == 'n') {
        console.log('Bye bye ...');
    }
}

function main() {
    loadFile();
    console.log(listContact);
    //option();
}
main();