const nodemailer = require('nodemailer');

async function createEtherealAccount() {
    try {
        let testAccount = await nodemailer.createTestAccount();
        console.log("MAIL_HOST=smtp.ethereal.email");
        console.log(`MAIL_USER=${testAccount.user}`);
        console.log(`MAIL_PASS=${testAccount.pass}`);
    } catch (error) {
        console.log("Error creating account:", error);
    }
}

createEtherealAccount();
