using Orchard.UI.Resources;

namespace EXPEDIT.Roster
{
    public class ResourceManifest : IResourceManifestProvider
    {
        public void BuildManifests(ResourceManifestBuilder builder)
        {
            builder.Add().DefineStyle("Roster").SetUrl("roster.css");
        }
    }
}
