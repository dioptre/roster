using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using Orchard;
using System.ServiceModel;
using Orchard.ContentManagement;

namespace EXPEDIT.Roster.Services
{
    [ServiceContract]
    public interface IConcurrentTaskService : IDependency {

        [OperationContract]
        void ExecuteAsyncTask(Action<ContentItem> task, ContentItem data);
    }

}