using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using System;
namespace EXPEDIT.Roster.ViewModels
{
    public class RosterViewModel
    {
        [HiddenInput, Required, DisplayName("Roster ID:")]
        public Guid? RosterID { get; set; }
        public SelectList RosterType { get; set; }

    }
}