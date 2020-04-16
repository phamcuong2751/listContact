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
    let loadFile = fs.readFileSync('./data.json', { encoding: 'utf-8' });
    allContacts = JSON.parse(loadFile);
}


function mainMenu() {
    console.log('1. Additon contact');
    console.log('2. Setting contact');
    console.log('3. Remove contact');
    console.log('4. Find contact');
    console.log('5. Save and exit');
    let choose = readlineSync.question('>>> ');
    switch (choose) {
        case '1':
            addContact();
            break;
        case '1':
            setContact();
            break;
        case '1':
            removeContact();
            break;
        case '1':
            findContact();
            break;
        case '1':
            saveAndExit();
            break;
        default:
            break;
    }

}

function main() {
    // mainMenu();
    loadData();
    console.log(allContacts);

}
main();