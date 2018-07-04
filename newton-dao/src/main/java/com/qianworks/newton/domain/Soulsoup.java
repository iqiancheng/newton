package com.qianworks.newton.domain;

import lombok.Data;

import java.util.Date;

@Data
public class Soulsoup {

    private String uuid;

    private String content;

    private String author;

    private String source;

    private Integer version;

    private String modifier;

    private String creator;

    private Date gmtCreated;

    private Date gmtModified;

    private String isDeleted;

}