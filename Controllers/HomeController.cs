using CovidData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace CovidData.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            LoginModel obj = new LoginModel();
            return View(obj);
        }

        [HttpPost]

        public ActionResult Index(LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var display = Userloginvalues()
                .Where(m => m.UserName == model.UserName && m.UserPassword == model.UserPassword)
                .FirstOrDefault();

            if (display != null)

            {
                 ViewBag.Status = "CORRECT UserNAme and Password";
                return RedirectToAction("CovidDataPage", "Home");
            }

            else
            {
                ViewBag.Status = "INCORRECT UserName or Password";
                ModelState.AddModelError("", "Prijava neuspješna. Unijeli ste pogrešne podatke za prijavu.");
            }
            return View(model);
        }

        public ActionResult CovidDataPage()
        {
            return View();
        }


        public List<LoginModel> Userloginvalues()
        {
            List<LoginModel> objModel = new List<LoginModel>();

            objModel.Add(new LoginModel { UserName = "user1", UserPassword = "password1" });

            objModel.Add(new LoginModel { UserName = "user2", UserPassword = "password2" });

            objModel.Add(new LoginModel { UserName = "user3", UserPassword = "password3" });

            objModel.Add(new LoginModel { UserName = "user4", UserPassword = "password4" });

            objModel.Add(new LoginModel { UserName = "user5", UserPassword = "password5" });

            return objModel;
        }

    }
}
