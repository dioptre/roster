using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using Orchard;
using EXPEDIT.Roster.Models;
using System.ServiceModel;
using EXPEDIT.Roster.ViewModels;
using System.Threading.Tasks;
using Orchard.ContentManagement;

namespace EXPEDIT.Roster.Services
{
    [ServiceContract]
    public class IGlobalSessionService : IDependency
    {
        [OperationContract]
        bool VerifySession(RosterViewModel m);
    }
}

