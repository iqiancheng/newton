package com.qianworks.newton.web.controller;


import com.qianworks.newton.dao.UserMapper;
import com.qianworks.newton.domain.User;
import com.qianworks.newton.web.vo.JsonResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.UUID;


@RestController
public class HealthController {

    @Resource
    private UserMapper userMapper;
    
    @RequestMapping(value = "/health", method = RequestMethod.GET)
    @ResponseBody
    public String health() {
        return "OK";
    }

    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    @ResponseBody
    public JsonResult addUser(){
        User user = new User();
        user.setUuid(UUID.randomUUID().toString().replace("-",""));
        user.setAvatar("http://qianworks.com/test.jpg");
        user.setEmail("i@qiancheng.me");
        user.setIdcardNo("3214253454645676456");
        user.setNickName("qiancheng");
        user.setUserName("iqiancheng");
        user.setMobile("12332489345");
        user.setPassword("234214");
        user.setEncryptPwd("24dsf8934j5k3450");
        user.setRealName("方瑜");
        user.setVersion(1);
        userMapper.insertSelective(user);
        return new JsonResult();
    }

}