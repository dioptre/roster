using System.Collections.Generic;
using Orchard.Environment.Extensions.Models;
using Orchard.Security.Permissions;

namespace EXPEDIT.Roster {
    public class Permissions : IPermissionProvider {
        public static readonly Permission CompanyOwner = new Permission { Description = "Company Owner", Name = "CompanyOwner" };
        public static readonly Permission CompanyManager = new Permission { Description = "Company Manager", Name = "CompanyManager", ImpliedBy = new[] { CompanyOwner } };
        public static readonly Permission Developer = new Permission { Description = "Developer", Name = "Developer" };

        public virtual Feature Feature { get; set; }

        public IEnumerable<Permission> GetPermissions() {
            return new[] {
                CompanyOwner,
                CompanyManager,
                Developer
            };            
        }

        public IEnumerable<PermissionStereotype> GetDefaultStereotypes() {
            return new[] {
                new PermissionStereotype {
                    Name = "Administrator", Permissions = new[] { Developer }
                },
                new PermissionStereotype {
                    Name = "Editor",
                    Permissions = new[] { CompanyManager, CompanyOwner}
                },
                new PermissionStereotype {
                    Name = "Moderator",
                },
                new PermissionStereotype {
                    Name = "Author",
                },
                new PermissionStereotype {
                    Name = "Contributor",
                },
            };
        }

    }
}