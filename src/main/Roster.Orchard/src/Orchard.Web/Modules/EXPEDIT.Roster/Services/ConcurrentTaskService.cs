﻿using System;
using System.Linq;
using JetBrains.Annotations;
using Orchard.ContentManagement;
using Orchard.Localization;
using Orchard;
using System.Transactions;
using Orchard.Logging;
using Autofac;
using Orchard.Data;
using Orchard.Environment.Configuration;
using Orchard.Environment.Descriptor;
using System.Threading.Tasks;
using Orchard.Environment.ShellBuilders;
using System.Reflection;
using System.Collections.Concurrent;

namespace EXPEDIT.Roster.Services {

    [UsedImplicitly]
    public class ConcurrentTaskService : IConcurrentTaskService
    {
        private static readonly ConcurrentDictionary<string, MethodInfo> _interfaceMethodsCache = new ConcurrentDictionary<string, MethodInfo>();

        private readonly ShellSettings _shellSettings;
        private readonly IShellDescriptorManager _shellDescriptorManager;
        private readonly IShellContextFactory _shellContextFactory;

        public ConcurrentTaskService(
            ShellSettings shellSettings,
            IShellDescriptorManager shellDescriptorManager,
            IShellContextFactory shellContextFactory
            )
        {
            T = NullLocalizer.Instance;
            Logger = NullLogger.Instance;

            _shellSettings = shellSettings;
            _shellDescriptorManager = shellDescriptorManager;
            _shellContextFactory = shellContextFactory;
        }

        public Localizer T { get; set; }
        public ILogger Logger { get; set; }



        public void ExecuteAsyncTask(Action<ContentItem> task, ContentItem data)
        {
            ProcessAsync(new ShellTask
            {
                ProcessId = Guid.NewGuid().ToString("n"),
                TaskId = Guid.NewGuid().ToString("n"),
                ShellAction = task,
                ShellContextFactory = _shellContextFactory,
                ShellData = data,
                ShellDescriptor = _shellDescriptorManager.GetShellDescriptor(),
                ShellSettings = _shellSettings
            });
        }

        public static void ProcessAsync(ShellTask taskInfo)
        {
            var task = new Task((taskInfoObject) =>
            {
                var shellTask = (ShellTask)taskInfoObject;
                ProcessAsyncShellTask(shellTask);
                return;
            }, taskInfo);
            task.Start();
        }

        private static void ProcessAsyncShellTask(ShellTask shellTask)
        {
            // Force reloading extensions if there were extensions installed
            // See http://orchard.codeplex.com/workitem/17465
            //if (shellTask.MessageName == "IRecipeSchedulerEventHandler.ExecuteWork")
            //{
            //    var ctx = _orchardHost().GetShellContext(entry.ShellSettings);
            //}

            var shellContext = shellTask.ShellContextFactory.CreateDescribedContext(shellTask.ShellSettings, shellTask.ShellDescriptor);
            using (shellContext.LifetimeScope)
            {
                using (var standaloneEnvironment = shellContext.LifetimeScope.CreateWorkContextScope())
                {

                    ILogger logger = NullLogger.Instance;
                    ITransactionManager transactionManager;
                    if (!standaloneEnvironment.TryResolve(out transactionManager))
                        transactionManager = null;

                    try
                    {


                        foreach (var interfaceType in shellTask.ShellAction.Method.DeclaringType.GetInterfaces())
                        {
                            string methodKey = String.Format("{0}_{1}_{2}", shellTask.ShellAction.GetType().FullName, shellTask.ShellAction.Method.DeclaringType, shellTask.ShellAction.Method.Name);
                            MethodInfo method;
                            if (!_interfaceMethodsCache.TryGetValue(methodKey, out method))
                            {
                                var m = (from o in interfaceType.GetMethods()
                                         where o.Name == shellTask.ShellAction.Method.Name
                                         && o.GetParameters().Length == 1
                                         && shellTask.ShellData.GetType().IsAssignableFrom(o.GetParameters()[0].ParameterType)
                                         select o).First();

                                method = _interfaceMethodsCache.GetOrAdd(methodKey, m);
                            }
                            if (method != null)
                            {
                                object obj;
                                if (Autofac.ResolutionExtensions.TryResolve(shellContext.LifetimeScope, interfaceType, out obj))
                                    method.Invoke(obj, new object[] { shellTask.ShellData });
                                return;
                            }


                        }

                        throw new NotSupportedException("Could not invoke (missing) long running concurrent method using IoC.");

                    }
                    catch
                    {
                        throw;
                    }
                    finally
                    {
                        // any database changes in this using(env) scope are invalidated
                        if (transactionManager != null)
                            transactionManager.Cancel();
                    }
                }
            }
        }
    }

}
