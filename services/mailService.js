const nodemailer = require("nodemailer");

function sendEmail(message) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    transporter.sendMail(message, function (err, info) {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
}

exports.sendEmailApplySuccess = function ({ toUser }) {
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser.email,
    subject: "[ST United] Confirmation letter",
    html: `
            Dear ${toUser.fullname},<br><br>
            Thank you for your interest in job opportunities at ST United <br>
            We have received your application.Profile is being reviewed. <br>
            Please check your email regularly. <br><br>
            Good luck! <br><br>
            Best regards, <br><br>
            <hr>
            <p><span style="color: #0000ff;"><strong>(MS) Vien Ta</strong></span></p>
            <p><span style="color: #808080;"><strong>HR Assistant - ST United Ltd.</strong></span></p>
            <p>Mobile (+84)368 492 885<br /><strong>Website:&nbsp;<a href="http://www.stunited.vn/" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=http://www.stunited.vn/&amp;source=gmail&amp;ust=1650606780334000&amp;usg=AOvVaw0q91QHoMBiZiz9Rgd_BnIU">www.stunited.vn</a></strong><strong>| Email:&nbsp;<a href="mailto:ngoc.nguyen@stunited.vn" target="_blank" rel="noopener">tuyendung.stunited@gmail.com</a></strong>&nbsp;<br /><span style="color: #808080; font-family: Verdana, sans-serif;">Head Office: No.14 An Thuong 18th Street, Ngu Hanh Son, Danang, Vietnam.</span></p>
            <p><span style="color: #808080; font-family: Verdana, sans-serif;">Branch: Floor 5th, NAPA Tower, 368 Tran Hung Dao Street, Son Tra, Danang, Vietnam.</span></p>
        `,
  };
  return sendEmail(message);
};

exports.sendEmailReject = function ({ toUser, reason }) {
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser.email,
    subject:
      "[ST United] Thank you for your interest in job opportunities at ST United",
    html: `
            Dear ${toUser.fullname},<br><br>
            Thank you for your interest in job opportunities at ST United <br>
            <p><strong>ST United Company</strong> thank you for your interest and application. Human Resources Department appreciates your experience as well as your ability.</p>
            <p>Unfortunately, we are unable to accept your application at this time. The reason is: ${reason}</p>
            <p>We hope to have the opportunity to cooperate with you in the future.</p>
            <p>Best regards, <br><br>
            <hr>
            <p><span style="color: #0000ff;"><strong>(MS) Vien Ta</strong></span></p>
            <p><span style="color: #808080;"><strong>HR Assistant - ST United Ltd.</strong></span></p>
            <p>Mobile (+84)368 492 885<br /><strong>Website:&nbsp;<a href="http://www.stunited.vn/" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=http://www.stunited.vn/&amp;source=gmail&amp;ust=1650606780334000&amp;usg=AOvVaw0q91QHoMBiZiz9Rgd_BnIU">www.stunited.vn</a></strong><strong>| Email:&nbsp;<a href="mailto:ngoc.nguyen@stunited.vn" target="_blank" rel="noopener">tuyendung.stunited@gmail.com</a></strong>&nbsp;<br /><span style="color: #808080; font-family: Verdana, sans-serif;">Head Office: No.14 An Thuong 18th Street, Ngu Hanh Son, Danang, Vietnam.</span></p>
            <p><span style="color: #808080; font-family: Verdana, sans-serif;">Branch: Floor 5th, NAPA Tower, 368 Tran Hung Dao Street, Son Tra, Danang, Vietnam.</span></p>
            `,
  };
  return sendEmail(message);
};

exports.sendEmailStatusTest = function ({ toUser, time, date }) {
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser.email,
    subject: "[ST United] Invitation to the Recruitment Process",
    html: `
        Dear ${toUser.fullname},<br><br>
        Thank you for your interest in job opportunities at ST United <br>
        This is a friendly reminder that your Invitation to the Recruitment Process - Test with Dev Plus is at ${time} (Indochina Time) on ${date}. <br>
        <p><span style="color: #808080; font-family: Verdana, sans-serif;"><strong>Location</strong>: Floor 5th, NAPA Tower, 368 Tran Hung Dao Street, Son Tra, Danang, Vietnam.</span></p>
        <p>Best regards, <br><br>
        <hr>
            <p><span style="color: #0000ff;"><strong>(MS) Vien Ta</strong></span></p>
            <p><span style="color: #808080;"><strong>HR Assistant - ST United Ltd.</strong></span></p>
            <p>Mobile (+84)368 492 885<br /><strong>Website:&nbsp;<a href="http://www.stunited.vn/" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=http://www.stunited.vn/&amp;source=gmail&amp;ust=1650606780334000&amp;usg=AOvVaw0q91QHoMBiZiz9Rgd_BnIU">www.stunited.vn</a></strong><strong>| Email:&nbsp;<a href="mailto:ngoc.nguyen@stunited.vn" target="_blank" rel="noopener">tuyendung.stunited@gmail.com</a></strong>&nbsp;<br /><span style="color: #808080; font-family: Verdana, sans-serif;">Head Office: No.14 An Thuong 18th Street, Ngu Hanh Son, Danang, Vietnam.</span></p>
            <p><span style="color: #808080; font-family: Verdana, sans-serif;">Branch: Floor 5th, NAPA Tower, 368 Tran Hung Dao Street, Son Tra, Danang, Vietnam.</span></p>
        `,
  };
  return sendEmail(message);
};

exports.sendEmailStatusInterview = function ({ toUser, time, date }) {
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser.email,
    subject: "[ST United] Invitation to the Recruitment Process",
    html: `
        Dear ${toUser.fullname},<br><br>
        Thank you for your interest in job opportunities at ST United <br>
        This is a friendly reminder that your Invitation to the Recruitment Process - Interview with Dev Plus is at ${time} (Indochina Time) on ${date}. <br>
        <p><span style="color: #808080; font-family: Verdana, sans-serif;"><strong>Location</strong>: Floor 5th, NAPA Tower, 368 Tran Hung Dao Street, Son Tra, Danang, Vietnam.</span></p>
        <p>Best regards, <br><br>
        <hr>
            <p><span style="color: #0000ff;"><strong>(MS) Vien Ta</strong></span></p>
            <p><span style="color: #808080;"><strong>HR Assistant - ST United Ltd.</strong></span></p>
            <p>Mobile (+84)368 492 885<br /><strong>Website:&nbsp;<a href="http://www.stunited.vn/" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=http://www.stunited.vn/&amp;source=gmail&amp;ust=1650606780334000&amp;usg=AOvVaw0q91QHoMBiZiz9Rgd_BnIU">www.stunited.vn</a></strong><strong>| Email:&nbsp;<a href="mailto:ngoc.nguyen@stunited.vn" target="_blank" rel="noopener">tuyendung.stunited@gmail.com</a></strong>&nbsp;<br /><span style="color: #808080; font-family: Verdana, sans-serif;">Head Office: No.14 An Thuong 18th Street, Ngu Hanh Son, Danang, Vietnam.</span></p>
            <p><span style="color: #808080; font-family: Verdana, sans-serif;">Branch: Floor 5th, NAPA Tower, 368 Tran Hung Dao Street, Son Tra, Danang, Vietnam.</span></p>
        `,
  };
  return sendEmail(message);
};

exports.sendEmailStatusPass = function ({ toUser, date }) {
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser.email,
    subject: "[ST United] Welcome to ST United",
    html: `
        Dear ${toUser.fullname},<br><br>
        <p>We congratulate you on your admission, effective ${date}. We are all delighted that you will be joining our team!</p>
        <p>Best regards, <br><br>
        <hr>
            <p><span style="color: #0000ff;"><strong>(MS) Vien Ta</strong></span></p>
            <p><span style="color: #808080;"><strong>HR Assistant - ST United Ltd.</strong></span></p>
            <p>Mobile (+84)368 492 885<br /><strong>Website:&nbsp;<a href="http://www.stunited.vn/" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=http://www.stunited.vn/&amp;source=gmail&amp;ust=1650606780334000&amp;usg=AOvVaw0q91QHoMBiZiz9Rgd_BnIU">www.stunited.vn</a></strong><strong>| Email:&nbsp;<a href="mailto:ngoc.nguyen@stunited.vn" target="_blank" rel="noopener">tuyendung.stunited@gmail.com</a></strong>&nbsp;<br /><span style="color: #808080; font-family: Verdana, sans-serif;">Head Office: No.14 An Thuong 18th Street, Ngu Hanh Son, Danang, Vietnam.</span></p>
            <p><span style="color: #808080; font-family: Verdana, sans-serif;">Branch: Floor 5th, NAPA Tower, 368 Tran Hung Dao Street, Son Tra, Danang, Vietnam.</span></p>
        `,
  };

  return sendEmail(message);
};
