const db = require("../models");

module.exports = {
    confirm: function(req, res) {
        const errors = {};
        db.Token.findOne({token: req.params.token})
        .then(token => {
            if (!token) {
                errors.token = "Token Invalid";
                return res.status(400).json(errors);
            }
            db.User.findOne({_id: token.UserId})
            .then(user => {
                if (!user) {
                    errors.token = "User Does Not Exist";
                    return res.status(400).json(errors);
                } else if (user.isVerified) {
                    errors.token = "User has already verified email.";
                    return res.status(400).json(errors);
                }
                user.isVerified = true;
                db.User.findOneAndUpdate({_id: user._id}, user)
                    .then(dbModel => {
                        res.status(200).send("Account has been verified.");
                    })
                    .catch(err => res.status(422).json(err));
            })
            .catch(err => res.status(422).json(err));
        })
        .catch(error => res.status(422).json(error));
    },
    resend: function(req, res) {
        const errors = {};
         User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    errors.resend = "We were unable to find a user with that email.";
                    return res.status(400).json(errors);
                };
                if (user.isVerified) {
                    errors.resend = "This account has already been verified. Please log in.";
                    return res.status(400).json(errors);
                };
                const token = {
                    UserId: user._id,
                    token: crypto.randomBytes(16).toString("hex")
                };
                db.Token.create(token).then((token) => {
                    const transporter = nodemailer.createTransport({
                        service: "Sendgrid",
                            auth: {
                            user: keys.secrets.sendgridusername,
                            pass: keys.secrets.sendgridpass
                        }
                    });
                    var mailOptions = {
                        from: "no-reply@foodbook223.com",
                        to: user.email,
                        subject: "FoodBook Account Verification",
                        text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/confirmation\/' + token.token + '.\n'
                    };
                        transporter.sendMail(mailOptions, error => {
                        if (error) { 
                            return res.json(error); 
                        };
                        res.status(200).send("A verification email has been sent to: " + user.email + ".");
                    });
                })
                .catch(error => console.log(error));
            })
            .catch(error => res.status(422).json(error));
    }
}