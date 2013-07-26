using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.ContentManagement;
using Orchard.ContentManagement.Drivers;
using Orchard.Localization;
using Orchard.UI.Notify;
using EXPEDIT.Roster.Models;

namespace EXPEDIT.Roster.Drivers
{
    
    /// <summary>
    /// Driver for the PersistedPart.
    /// Think about drivers as controllers for your parts. They are responsible for UI (display/edit your part).
    /// </summary>
    public class GlobalSessionPartDriver : ContentPartDriver<GlobalSessionPart>
    {
        private readonly INotifier _notifier;
        private const string TemplateName = "Parts/Roster.GlobalSession";
        public Localizer T { get; set; }

        /// <summary>
        /// Orchard notifier object will be injected here by IoC container. 
        /// It is used for displaying error/warning/info messages.
        /// </summary>
        /// <param name="notifier"></param>
        public GlobalSessionPartDriver(INotifier notifier) {
            _notifier = notifier;
            T = NullLocalizer.Instance;
        }

        /// <summary>
        /// This method is responsible only for displaying your part in the frontend.
        /// </summary>
        /// <param name="part">Your part.</param>
        /// <param name="displayType"></param>
        /// <param name="shapeHelper"></param>
        /// <returns></returns>
        protected override DriverResult Display(GlobalSessionPart part, string displayType, dynamic shapeHelper)
        {
            return ContentShape("Parts_EXPEDIT_GlobalSession",
                () => shapeHelper.Parts_Jumpstart_Persisted(ContentPart: part));
        }

        /// <summary>
        /// This method is responsible for displaying your part's edit form in the admin Dashboard (when creating/editing item).
        /// </summary>
        /// <param name="part">Your part.</param>
        /// <param name="shapeHelper"></param>
        /// <returns></returns>
        protected override DriverResult Editor(GlobalSessionPart part, dynamic shapeHelper)
        {
            return ContentShape("Parts_EXPEDIT_GlobalSession",
                    () => shapeHelper.EditorTemplate(TemplateName: TemplateName, Model: part, Prefix: Prefix));
        }

        /// <summary>
        /// This method saves data from the posted part's edit form.
        /// </summary>
        /// <param name="part">Your edited part.</param>
        /// <param name="updater"></param>
        /// <param name="shapeHelper"></param>
        /// <returns></returns>
        protected override DriverResult Editor(GlobalSessionPart part, IUpdateModel updater, dynamic shapeHelper)
        {
            if (updater.TryUpdateModel(part, Prefix, null, null))
            {
                _notifier.Information(T("Your global session id was updated successfully"));
            }
            else
            {
                _notifier.Error(T("Error during updating global session id!"));
            }
            return Editor(part, shapeHelper);
        }
    }
}
