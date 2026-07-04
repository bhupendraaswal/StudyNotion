const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    const info = await transporter.sendMail({
      from: `"Studynotion | By Suraj & Team" <${process.env.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    })

    console.log(info.response)
    return info
  } catch (error) {
    console.error("Mail sending failed:", error)
    throw new Error(error.message || "Failed to send email")
  }
}

module.exports = mailSender
