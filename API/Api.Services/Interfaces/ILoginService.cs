﻿using Api.ViewModels.VMs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Api.Services.Interfaces
{
    public interface ILoginService
    {
        string IsAuthenticated(LoginModel request);
        bool IsValidUser(string userName, string password);
    }
}