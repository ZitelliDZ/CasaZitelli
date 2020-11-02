const { Router } = require('express');
require('dotenv').config();
const nodemailer = require('nodemailer');
const router = Router();

router.post('/send-email', async (req, res) => {
    const { validarNombre, validarEmail, validarTelefono, validarAsunto, validationMensaje } = req.body;
    
    contentHTML = `

        <h1>Información del Usuario</h1>
        <ul>
            <li>Nombre: ${validarNombre}</li>
            <li>Email: ${validarEmail}</li>
            <li>Teléfono: ${validarTelefono}</li>
            <li>Asunto: ${validarAsunto}</li>
            <li>Mensaje:</li>
        </ul>
        <p>${validationMensaje}</p>
    `;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS

        }
    });

    let mailoption = {
        from: process.env.EMAIL,
        to: process.env.EMAILL,
        subject: 'CasaZitelli',
        text: contentHTML
    };
    
    await transporter.sendMail(mailoption, function(err, data) {
        if (err){
            res.redirect('/pages/fallo.html');
        }else{
            res.redirect('/pages/exito.html');
        }
    });

    
    
});

module.exports = router;