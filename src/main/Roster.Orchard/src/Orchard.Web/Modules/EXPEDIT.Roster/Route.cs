using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Routing;
using Orchard.Mvc.Routes;

namespace EXPEDIT.Roster
{
    public class Routes : IRouteProvider
    {
        public void GetRoutes(ICollection<RouteDescriptor> routes)
        {
            foreach (var routeDescriptor in GetRoutes())
                routes.Add(routeDescriptor);
        }

        public IEnumerable<RouteDescriptor> GetRoutes()
        {
            return new[] {
                new RouteDescriptor {
                    Priority = 5,
                    Route = new Route(
                        "Roster/{controller}/{action}",
                        new RouteValueDictionary {
                            {"area", "Roster"},
                            {"controller", "User"},
                            {"action", "Index"}
                        },
                        new RouteValueDictionary {
                            {"area", "Roster"},
                            {"controller", "User"}
                        },
                        new RouteValueDictionary {
                            {"area", "Roster"}
                        },
                        new MvcRouteHandler())
                },
                 new RouteDescriptor {
                    Priority = 5,
                    Route = new Route(
                        "Roster/{controller}/{action}/{id}/{verb}",
                        new RouteValueDictionary {
                            {"area", "Roster"},
                            {"controller", "User"}                            
                        },
                        new RouteValueDictionary {
                            {"area", "Roster"},
                            {"controller", "User"},                          
                        },
                        new RouteValueDictionary {
                            {"area", "Roster"}
                        },
                        new MvcRouteHandler())
                }
            };
        }
    }
}