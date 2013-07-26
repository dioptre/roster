using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard;
using System.ServiceModel;
using EXPEDIT.Roster.ViewModels;
using System.Threading.Tasks;
using Orchard.ContentManagement;

namespace EXPEDIT.Roster.Services
{
    [ServiceContract]
    public interface IGlobalSessionService : IDependency
    {
        [OperationContract]
        bool VerifySession(RosterViewModel m);
    }
}

