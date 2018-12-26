import { v4 } from 'uuid';
import * as MailGun from "mailgun-js";
import * as fs from 'fs';
import * as path from 'path';
import * as utils from 'util';

const readFileAsync = utils.promisify(fs.readFile);

/**
 ** Class responsible for all the mail
 ** functionalities in the application
 *
 * @export
 * @class MailHelper
 */
class MailHelper {

  /**
   ** generates confirmEmail callback URL after storing
   ** storing some data in the redis client
   *
   * @static
   * @param {string} url
   * @param {string} userId
   * @param {Redis} redis
   * @returns {Promise<string>}
   * @memberof MailHelper
   */

  public async createConfirmEmailLink(url: string, userId: string) {
    const id: string = v4();
    //TODO implement confirmationRequest
    return `${url}/confirm/${id}`;
  }


  /**
   *
   * @static
   * @param {string} url
   * @param {string} email
   * @param {string} name
   * @returns {Promise<MailGun.messages.SendResponse>}
   * @memberof MailHelper
   */
  public async sendConfirmationEmail(url: string, email: string, name: string): Promise<MailGun.messages.SendResponse> {
    try {
      const fileData = await readFileAsync(path.join(__dirname, '../html-templates/confirm.html'));
      const mailGunOptions: MailGun.ConstructorParams = {
        apiKey: process.env['MAILGUN_API_KEY'],
        domain: process.env['MAILGUN_DOMAIN']
      };
      const mailgun = new MailGun(mailGunOptions);
      const htmlString = fileData.toString();
      const finalHtmlString = htmlString
        .replace('###name###', name)
        .replace('###callbackurl###', url);


      const mailData: MailGun.messages.SendData = {
        from: process.env['EMAIL'],
        to: email,
        subject: 'Email Confirmation',
        html: finalHtmlString
      };

      return mailgun.messages().send(mailData);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new MailHelper();