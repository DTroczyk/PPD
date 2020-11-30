using System;
using System.Collections.Generic;
using System.Text;
using Api.BLL.Entities;

namespace Api.Services.Interfaces
{
    public interface IRegisterService
    {
        public string Register(User user);
    }
}
