const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
var path = require("path");
const { MAIL_SERVICE, MAIL_USER_EMAIL, MAIL_USER_PASSWORD, MAIL_HOST , MAIL_PORT} = process.env;
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};
exports.mailTransporter = nodemailer.createTransport({
    service: MAIL_SERVICE,
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false,
    auth: {
        user: MAIL_USER_EMAIL,
        pass: MAIL_USER_PASSWORD
    }
}).use('compile', hbs(handlebarOptions));


