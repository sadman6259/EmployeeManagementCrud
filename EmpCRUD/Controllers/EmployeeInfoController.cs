using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;
using System.Web.Http.Description;
using EmpCRUD.Models;

namespace EmpCRUD.Controllers
{
    public class EmployeeInfoController : ApiController
    {
        private EmployeeDbEntities db = new EmployeeDbEntities();

        // GET: api/EmployeeInfo
        public List<EmployeeInfo> GetEmployeeInfoes()
        {

            var EmpList = db.EmployeeInfoes.ToList();
            foreach(var item in EmpList)
            {
                item.Name = MakeName(item.FirstName, item.LastName);
                item.Address = MakeAddress(item.Street, item.City, item.Country);
                item.PhoneFormat = MakeNumberFormat(item.Phone);
            }
            return EmpList;
        }
        public string MakeAddress(string street,string city,string Country)
        {
            return street + "," + city + "," + Country;
        }
        public string MakeName(string FirstName,string LastName)
        {
            return FirstName + " " + LastName;
        }
        public string MakeNumberFormat(string phone)
        {
            string numformat = "";
            if (!string.IsNullOrEmpty(phone) && phone.Length >= 10)
            {
              numformat = Regex.Replace(phone, @"(\d{3})(\d{3})(\d{4})", "($1)$2-$3");


            }
            return numformat;
        }
        // GET: api/EmployeeInfo/5
        [ResponseType(typeof(EmployeeInfo))]
        public IHttpActionResult GetEmployeeInfo(int id)
        {
            EmployeeInfo employeeInfo = db.EmployeeInfoes.Find(id);
            if (employeeInfo == null)
            {
                return NotFound();
            }

            return Ok(employeeInfo);
        }

        // PUT: api/EmployeeInfo/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEmployeeInfo(int id, EmployeeInfo employeeInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employeeInfo.Id)
            {
                return BadRequest();
            }

            db.Entry(employeeInfo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeInfoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/EmployeeInfo
        [ResponseType(typeof(EmployeeInfo))]
        public IHttpActionResult PostEmployeeInfo(EmployeeInfo employeeInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.EmployeeInfoes.Add(employeeInfo);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = employeeInfo.Id }, employeeInfo);
        }

        // DELETE: api/EmployeeInfo/5
        [ResponseType(typeof(EmployeeInfo))]
        public IHttpActionResult DeleteEmployeeInfo(int id)
        {
            EmployeeInfo employeeInfo = db.EmployeeInfoes.Find(id);
            if (employeeInfo == null)
            {
                return NotFound();
            }

            db.EmployeeInfoes.Remove(employeeInfo);
            db.SaveChanges();

            return Ok(employeeInfo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeInfoExists(int id)
        {
            return db.EmployeeInfoes.Count(e => e.Id == id) > 0;
        }
    }
}