using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
﻿using System.ComponentModel.DataAnnotations;
using Orchard.ContentManagement.Records;
using Orchard.ContentManagement;

namespace EXPEDIT.Roster.Models
{
    public class GlobalSessionPartRecord : ContentPartRecord
    {
        public virtual Guid GSID { get; set; }
    }

    public class GlobalSessionPart : ContentPart<GlobalSessionPartRecord>
    {
        public Guid GSID
        {
            get { return Record.GSID; }
            set { Record.GSID = value; }
        }

        public Guid LSID { get; set; }

        public DateTime Expiry { get; set; }
    }
}