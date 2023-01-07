import mailer from '@sendgrid/mail'
import UserModel from "./user.model.js"
import HttpStatus from "../util/HttpStatus.js"
import AdminModel from "./admin.model.js";

class EmailModel {

    static async mailCode(user_name, content) {
        return "<body style='background-color: #222533 padding: 20px font-size: 14px line-height: 1.43 font-family: Helvetica, Arial, sans-serif'>" +
            "<div style='max-width: 600px margin: 0 auto background-color: #fff box-shadow: 0 20px 50px rgba(0,0,0,0.05)'>" +
            "<table style='width: 100%'>" +
            "<tr> <td style='background-color: #fff text-align: center'> <img alt='' src='' style='width: 150px padding: 10px'> </td> </tr>" +
            "</table> <div style='padding: 20px 70px border-top: 1px solid rgba(0,0,0,0.05)'>" +
            "<h3 style='margin-top: 0'>Hi " + user_name + ",</h3>" +
            "<div style='color: #636363 font-size: 14px'>" +
            "<p>" + content + "</p> </div> <h4 style='margin-bottom: 10px'>Need Help? Get in touch!</h4>" +
            "<div style='color: #A5A5A5 font-size: 12px'> <p>If you have any questions, you can simply reply to this email</p> </div> </div>" +
            "<div style='background-color: #F5F5F5 padding: 40px text-align: center'> <div style='color: #A5A5A5 font-size: 12px margin-bottom: 20px padding: 0 30px'>" +
            "You are receiving this email because you're registered on the ShowOut app. </div>" +
            "<div style='margin-top: 20px padding-top: 20px border-top: 1px solid rgba(0,0,0,0.05)'>" +
            "<div style='color: #A5A5A5 font-size: 10px margin-bottom: 5px'>Address</div>" +
            `<div style='color: #A5A5A5 font-size: 10px'>Copyright ${MOMENT().year()} ShowOut. All rights reserved.</div>` +
            "</div> </div> </div> </body>"
    }

    static async sendMailUsingTemplate(templateId, user_id, data, email = undefined) {
        let personalizations = []
        if (!email) {
            let user_ = await UserModel.get(user_id)
            email = user_.email
        }
        personalizations.push({
            to: email,
            dynamic_template_data: data
        })
        const msg = {
            personalizations,
            template_id: templateId,
            from: 'ShowOut App <hello@showout.studio>',
        }

        try {
            mailer.setApiKey(process.env.SENDGRID_KEY)
            return mailer.send(msg)
        } catch (e) {
            console.log(e)
            return false
        }
    }

    static async sendVerificationMail (user_id, token, admin = false) {
        let user;
        if (admin)
            user = await AdminModel.get(user_id)
        else
            user = await UserModel.get(user_id)

        let verificationTemplate = process.env.PRE_SIGN_UP_OTP_VERIFICATION_TMP
        if (user.is_active)
            verificationTemplate = process.env.POST_SIGN_UP_OTP_VERIFICATION_TMP

        await EmailModel.sendMailUsingTemplate(verificationTemplate, user_id, {
            full_name: user.full_name,
            token
        }, user.email)
    }

    static async sendRawMail (user_id, title, mail_content, entityObj = undefined) {
        if (!entityObj)
            entityObj = await UserModel.get(user_id)

        const msg = {
            to: entityObj.email,
            from: 'ShowOut App <hello@showout.studio>',
            subject: title,
            html: EmailModel.mailCode(entityObj.full_name, mail_content),
        }
        let result = []
        try {
            mailer.setApiKey(process.env.SENDGRID_KEY)
            result = await mailer.send(msg)
        } catch (e) {
            console.log(result)
            return false
        }
        console.log(result[0].statusCode)
        return result[0].statusCode === HttpStatus.ACCEPTED
    }

    static async sendBulkMail (_user_group, title, html_content) {
        let personalizations = []
        let clients = await UserModel.getMultiple()
        for (const c of clients) {
            personalizations.push({
                to: c.email
            })
        }
        mailer.setApiKey(process.env.SENDGRID_KEY)
        const msg = {
            personalizations: personalizations,
            from: 'ShowOut App <hello@showout.studio>',
            subject: title,
            html: this.mailCode('there', html_content),
        }
        return mailer.send(msg)
    }
}

export default EmailModel