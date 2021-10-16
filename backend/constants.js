const nodemailer = require('nodemailer');


const is_dev = false 
const enable_email_verification = false

let mongo_URL;
let nodemailer_transporter;

if (!is_dev) {
    // connect to nie host for production mode
    mongo_URL = "mongodb://localhost:27017/test"
    // NIE smtp host
    nodemailer_transporter = nodemailer.createTransport({
        host: "10.55.99.61",
        port:25,
        secureConnection: false,
        tls: {
        ciphers:'SSLv3'
    }})
} else {
    // connect to test database for development mode. you can create your own development database at https://account.mongodb.com/account/login
    mongo_URL = "connectionStr"
    // Gmail for develoment mode
    nodemailer_transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        secure: true,
        auth: {
        user: "niewatiform@gmail.com",
        pass: "nie2020wati"
        }, tls: {
        rejectUnauthorized: true
        }
    })
}

module.exports = {
    is_dev : is_dev,
    mongo_URL: mongo_URL,
    enable_email_verification: enable_email_verification,
    SECRET: "KrI|rSl{npXvV!TT'I9Gh:]OSc!rd%>q5Ue%yZ|3tdWSq$GfEq",
    port_no: 5000,
    nodemailer_transporter: nodemailer_transporter
}
