using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orchard.ContentManagement.MetaData;
using Orchard.Data.Migration;

namespace EXPEDIT.Roster
{
    public class RosterMigration : DataMigrationImpl
    {
        /// <summary>
        /// This method creates the initial db structure.
        /// </summary>
        /// <returns>Version number.</returns>
        public int Create()
        {
            // This creates the table for our PersistedPart in the underlying db store.
            SchemaBuilder.CreateTable("GlobalSessionPartRecord",
                                      table => table
                                                   .ContentPartRecord()
                                                   .Column<Guid>("GSID")
                );

            return 1;
        }

        /// <summary>
        /// This method creates additional structure/alters the old structure.
        /// It is mostly used when you create new versions of your module and you 
        /// need to change the existing db structure (add columns, add new tables and such).
        /// 
        /// Update methods are named by convention: UpdateFromX, 
        /// where X is the number returned from prior method.
        /// </summary>
        /// <returns></returns>
        public int UpdateFrom1()
        {

            // As an example, we create here a new widget that users will be able to put on their sites.
            // We'll use our both parts here.
            // A widget is just another content item - we define here the parts from which it will be assembled.
            ContentDefinitionManager.AlterTypeDefinition("RosterWidget",
               cfg => cfg
                   .WithPart("GlobalSessionPart")
                   .WithPart("RosterPart")
                   .WithPart("CommonPart")
                   .WithPart("WidgetPart")
                   .WithSetting("Stereotype", "Widget")
               );

            // We return 2, so the next update method will be called UpdateFrom2 and so on...
            return 2;
        }
    }
}