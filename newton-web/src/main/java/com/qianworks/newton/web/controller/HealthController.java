package com.qianworks.newton.web.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class HealthController {
    
    @RequestMapping(value = "/health", method = RequestMethod.GET)
    @ResponseBody
    public String health() {
        return "OK";
    }

}