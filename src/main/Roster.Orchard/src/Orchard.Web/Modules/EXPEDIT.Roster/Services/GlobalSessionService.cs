using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using JetBrains.Annotations;
using Orchard.ContentManagement;
using Orchard.FileSystems.Media;
using Orchard.Localization;
using EXPEDIT.Roster.Models;
using Orchard.Security;
using Orchard.Settings;
using Orchard.Validation;
using Orchard;
using System.Transactions;
using Orchard.Logging;
using EXPEDIT.Roster.ViewModels;
using System.Threading.Tasks;
using System.Data;
using System.Data.Common;
using System.Data.Entity;
using Orchard.Tasks.Scheduling;



namespace EXPEDIT.Roster.Services
{
    [UsedImplicitly]
    public class GlobalSessionService : IGlobalSessionService
    {
        private readonly IStorageProvider _storageProvider;
        private readonly IOrchardServices _orchardServices;
        private readonly IContentManager _contentManager;
        private readonly IConcurrentTaskService _concurrentTasks;
        private readonly IUserService _userService;

        public GlobalSessionService(
            IStorageProvider storageProvider,
            IOrchardServices orchardServices,
            IContentManager contentManager,
            IConcurrentTaskService concurrentTasks,
            IUserService userService

          )
        {
            _contentManager = contentManager;
            _storageProvider = storageProvider;
            _orchardServices = orchardServices;
            _concurrentTasks = concurrentTasks;
            _userService = userService;
            T = NullLocalizer.Instance;
            Logger = NullLogger.Instance;
        }

        public Localizer T { get; set; }
        public ILogger Logger { get; set; }

        public bool VerifySession(RosterViewModel m)
        {
            throw new NotImplementedException();
        }

        public Guid GetGlobalSession(Guid localSessionID)
        {
            throw new NotImplementedException();
        }

        public void KillAllSessionsAsync(Guid localSessionID)
        {
            var m = _contentManager.New<GlobalSessionPart>("GlobalSession");
            //fetch GSID from LSID
            m.GSID = GetGlobalSession(localSessionID);
            _contentManager.Create(m, VersionOptions.Published);
            _concurrentTasks.ExecuteAsyncTask(KillAllSessions, m.ContentItem);
        }

        public void KillAllSessions(ContentItem c)
        {
            var m = c.As<GlobalSessionPart>();
            throw new NotImplementedException();
            //_userService.EmailUsers();

        }



    }
}
