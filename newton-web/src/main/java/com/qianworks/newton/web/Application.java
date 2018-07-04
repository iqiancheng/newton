package com.qianworks.newton.web;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;


/**
 * 程序主入口
 * @author <a href="i@qiancheng.me">千橙</a>
 */
@SpringBootApplication
@ComponentScan(basePackages="com.qianworks")
public class Application extends SpringBootServletInitializer {
    
    /**
     * 启动类
    	* 
    	* @param args  启动参数
     */
    public static void main(String[] args) {
        System.setProperty("spring.devtools.restart.enabled", "false");
        SpringApplication.run(Application.class);
    }
}
