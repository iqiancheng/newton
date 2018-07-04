package com.qianworks.newton.web.vo;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.io.Serializable;


/**
 * 返回的json格式
 * 
 * @author Vincent
 * @version 2016年2月15日
 * @see JsonResult
 * @since
 */
@JsonInclude(Include.NON_NULL)
@JsonPropertyOrder(value = {"code", "msg", "data"})
public class JsonResult implements Serializable {

    /**
     * 意义，目的和功能，以及被用到的地方<br>
     */
    private static final long serialVersionUID = 1L;

    /**
     * 状态码
     */
    private int code;

    /**
     * 返回的消息或者异常信息
     */
    private String msg;

    /**
     * 返回的数据
     */
    private Object data;

    public JsonResult() {
        super();
    }

    public JsonResult(int code, Object data) {
        super();
        this.code = code;
        if (data instanceof String) {
            this.msg = (String)data;
            return;
        }
        this.data = data;
    }


    public JsonResult(int code, String msg, Object data) {
        super();
        this.code = code;
        if (data instanceof String) {
            this.msg = (String) data;
            return;
        }
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

}
