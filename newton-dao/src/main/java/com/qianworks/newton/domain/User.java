package com.qianworks.newton.domain;

import lombok.Data;

import java.util.Date;

@Data
public class User {

    private String uuid;

    private String userName;

    private String nickName;

    private String avatar;

    private String mobile;

    private String email;

    private String realName;

    private String idcardNo;

    private String password;

    private String encryptPwd;

    private String isActivated;

    private String remark;

    private Integer version;

    private String modifier;

    private String creator;

    private Date gmtCreated;

    private Date gmtModified;

    private String isDeleted;

}