import nodemailer from "nodemailer";

// Função para enviar e-mail
export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    // Configuração do transporte SMTP (aqui vamos usar o Gmail como exemplo)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Seu e-mail do Gmail
        pass: process.env.GMAIL_PASS, // Sua senha do Gmail ou App Password
      },
    });

    // Opções do e-mail
    const mailOptions = {
      from: process.env.GMAIL_USER, // Remetente
      to, // Destinatário
      subject, // Assunto
      text, // Corpo do e-mail
    };

    // Enviar e-mail
    await transporter.sendMail(mailOptions);
    console.log("E-mail enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
};
