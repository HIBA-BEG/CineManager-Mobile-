const nodemailer = require("nodemailer");
const SeanceDao = require("../dao/SeanceDao");

class EmailSender {
  async sendConfirmationEmail(email, reservation) {
   

    // console.log("Sending confirmation email to:", email);
    
    // console.log("Ma reservation: ", reservation);
    
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // console.log("Email User:", process.env.EMAIL_USER);
    // console.log("Email Pass:", process.env.EMAIL_PASS);

    // console.log(transporter);

    const seanceDetails = await SeanceDao.findById(reservation.seance);
    
    // console.log(seanceDetails);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reservation Confirmation",
      text: `Dear customer, your reservation has been confirmed. 
    Seance: ${seanceDetails.film.titre} 
    Duree: ${seanceDetails.film.duree} 
    Date: ${seanceDetails.date} 
    Seats: ${reservation.sieges.join(", ")} 
    Thank you for your reservation!`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Confirmation email sent successfully");
    } catch (error) {
      console.error("Error sending confirmation email:", error.message);
    }
  }
}

module.exports = new EmailSender();
