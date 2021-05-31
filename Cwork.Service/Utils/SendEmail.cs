using System.Net.Mail;
using System.Text;
using Cwork.Domain.Models;
using Microsoft.Extensions.Configuration;

namespace Cwork.Service.Utils
{
    public class SendEmail
    {
        private string _host;
        private string _from;
        private string _alias;
        private string _pass;
        public SendEmail(IConfiguration config)
        {
            var smtpSection = config.GetSection("SMTP");
            if (smtpSection != null)
            {
                _host = smtpSection.GetSection("Host").Value;
                _from = smtpSection.GetSection("From").Value;
                _alias = smtpSection.GetSection("Alias").Value;
                _pass = smtpSection.GetSection("Pass").Value;
                
            }
        }
        public void SendEmailHelper(EmailModel objData)
        {
            try
            {
                using (SmtpClient client = new SmtpClient(_host,587))
                {
                    MailMessage mailMessage = new MailMessage();
                    mailMessage.From = new MailAddress(_from, _alias);
                    mailMessage.BodyEncoding = Encoding.UTF8;
                    mailMessage.To.Add(objData.toemail);
                    mailMessage.Body = objData.message;
                    mailMessage.Subject = objData.subject;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new System.Net.NetworkCredential(_from, _pass);
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    client.EnableSsl = true;
                    client.Send(mailMessage);
                }
                
            }
            catch
            {
                throw;
            }
        }
    }
}