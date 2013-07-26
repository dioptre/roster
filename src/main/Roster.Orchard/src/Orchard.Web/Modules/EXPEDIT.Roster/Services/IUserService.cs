using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using Orchard;
using EXPEDIT.Roster.Models;
using System.ServiceModel;

namespace EXPEDIT.Roster.Services
{
     [ServiceContract]
    public interface IUserService : IDependency 
    {
         [OperationContract]
         void EmailUsers(string[] recipients, string subject, string body, bool retry=false);

         [OperationContract]
         void CleanAncientSessions();

    }
}