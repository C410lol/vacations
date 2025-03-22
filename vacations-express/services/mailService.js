const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gcaio7463@gmail.com',
        pass: 'bjur klcb hjel pikd'
    }
});




module.exports.sendAuthLinkEmail = (emailTo, token) => {
    const mailOptions = {
        from: 'gcaio7463@gmail.com',
        to: emailTo,
        subject: 'Link de acesso',
        text: `Clique no link ou copie e cole em seu navegador para acessar o sistema: http://localhost:5173/auth?token=${token}`
    }

    return transport.sendMail(mailOptions);
}
