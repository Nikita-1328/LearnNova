const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  const host = process.env.MAIL_HOST
  const user = process.env.MAIL_USER
  const pass = process.env.MAIL_PASS
  if (!host || !user || !pass) {
    throw new Error(
      "Mail is not configured: set MAIL_HOST, MAIL_USER, and MAIL_PASS in server/.env"
    )
  }

  const port = parseInt(process.env.MAIL_PORT || "587", 10)
  const secure = process.env.MAIL_SECURE === "true" || port === 465
  // Google App Passwords are shown as "xxxx xxxx xxxx xxxx" — SMTP auth needs them without spaces.
  const passNormalized = String(pass).replace(/\s+/g, "")

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass: passNormalized },
    })

    const info = await transporter.sendMail({
      from: `"LearnNova" <${user}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    })
    console.log(info.response)

    // Ethereal (and other nodemailer test inboxes) — open this URL to read the message; it is not delivered to a real mailbox.
    const previewUrl = nodemailer.getTestMessageUrl(info)
    if (previewUrl) {
      console.log("Email preview (Ethereal / test inbox):", previewUrl)
    }

    return info
  } catch (error) {
    console.error("[mailSender] Send failed:", error.message)
    if (error.response) console.error("[mailSender] SMTP:", error.response)
    if (error.code) console.error("[mailSender] Code:", error.code)
    throw error
  }
}

module.exports = mailSender
