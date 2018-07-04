package com.qianworks.newton.dao;

import com.qianworks.newton.domain.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMapper {


    /**
     *
     */
    int insertSelective(User record);


    /**
     *
     */
    int updateByPrimaryKeySelective(User record);

}