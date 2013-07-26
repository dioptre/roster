using System.Linq;
using System.Web.Routing;
using Orchard.Environment;
using Orchard.Localization;
using Orchard.UI.Navigation;
using Orchard.ContentManagement;
using Orchard.Security;

public class MainMenu : IMenuProvider
{
    public Localizer T { get; set; }

    public void GetMenu(IContent menu, NavigationBuilder builder)
    {
        builder.Add(T("Home"), "1",
            subMenu => subMenu.Url("~/"));

        builder.Add(T("Help"), "2",
            subMenu => subMenu.Url("~/help").Permission(StandardPermissions.AccessFrontEnd));
    }
}