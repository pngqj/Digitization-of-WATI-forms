const nodemailer = require('nodemailer');


const is_dev = true

//Gmail for develoment mode
const nodemailer_transporter = is_dev?
    nodemailer.createTransport({
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
    :
    nodemailer.createTransport({
        host: "10.55.99.61",
        port:25,
        secureConnection: false,
        tls: {
        ciphers:'SSLv3'
    }})


module.exports = {
    is_dev : is_dev,
    SECRET: "KrI|rSl{npXvV!TT'I9Gh:]OSc!rd%>q5Ue%yZ|3tdWSq$GfEq",
    port_no: 5000,
    nodemailer_transporter: nodemailer_transporter
}