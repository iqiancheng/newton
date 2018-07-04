package com.qianworks.newton.dao;

import com.qianworks.newton.domain.Soulsoup;

public interface SoulsoupMapper {

    /**
     *
     */
    int insertSelective(Soulsoup record);


    /**
     *
     */
    int updateByPrimaryKeySelective(Soulsoup record);


}