package com.Bus.TicketReservation.Controller;

import com.Bus.TicketReservation.DTO.LoginResponse;
import com.Bus.TicketReservation.Entity.User;
import com.Bus.TicketReservation.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController
{
    @Autowired
    UserService service;

    @PostMapping("/register")
    public LoginResponse register(@RequestBody User u)
    {
        return service.register(u);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody User u) {
        return service.login(u);
    }


}
