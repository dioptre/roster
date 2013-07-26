using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using JetBrains.Annotations;
using Orchard.ContentManagement;
using Orchard.FileSystems.Media;
using Orchard.Localization;
using Orchard.Security;
using Orchard.Settings;
using Orchard.Validation;
using Orchard;
using System.Security.Principal;
using System.Text.RegularExpressions;
using System.Transactions;
using Orchard.Messaging.Services;
using Orchard.Logging;
using Orchard.Tasks.Scheduling;
using Orchard.Data;

namespace EXPEDIT.Roster.Services {
    
    [UsedImplicitly]
    public class UserService : IUserService {
        private readonly IOrchardServices _orchardServices;
        private readonly IContentManager _contentManager;
        private readonly IMessageManager _messageManager;
        private readonly IScheduledTaskManager _taskManager;
        public ILogger Logger { get; set; }


        public UserService(IContentManager contentManager, IOrchardServices orchardServices, IMessageManager messageManager, IScheduledTaskManager taskManager)
        {
            _orchardServices = orchardServices;
            _contentManager = contentManager;
            _messageManager = messageManager;
            _taskManager = taskManager;
            T = NullLocalizer.Instance;
            Logger = NullLogger.Instance;
        }

        public Localizer T { get; set; }

        public void CleanAncientSessions();

        public void EmailUsers(string[] emails, string subject, string body, bool retry = false)
        {
            var data = new Dictionary<string,string>();
            data.Add("Subject", subject); 
            data.Add("Body", body);
            Orchard.Email.Models.SmtpSettingsPart smtpSettings = null;
            if (_orchardServices.WorkContext != null) smtpSettings = _orchardServices.WorkContext.CurrentSite.As<Orchard.Email.Models.SmtpSettingsPart>();
            try
            {
                if (emails == null)
                    emails = new string[] { };
                var recipients = emails.Union(new string[] { smtpSettings.Address }).Where(f => !string.IsNullOrEmpty(f)).ToArray();
                _messageManager.Send(recipients, EXPEDIT.Roster.Handlers.EmailMessageHandler.DEFAULT_EXPEDIT_ROSTER_EMAIL_TYPE, "email", data);
            }
            catch
            {
            }
            finally
            {
                Logger.Information(string.Format("Attempted sending notification for: {0}.\r\n\r\n Regarding: \r\n\r\n {1}\n\nRetry:{2}", subject, body, retry));
            }
        }

       
    }
}
