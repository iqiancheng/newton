package com.qianworks.newton.base;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.springframework.test.context.web.WebAppConfiguration;
import org.testng.annotations.Test;

@WebAppConfiguration
@ComponentScan(basePackages = "com.qianworks")
@ContextConfiguration(value={"classpath:**/*.xml"})
@EnableAutoConfiguration
public class ApplicationTests extends AbstractTestNGSpringContextTests {

	@Test
	public void contextLoads() {
	}

}