package com.qianworks.newton.web.exception;

/**
 * 手动抛出的业务异常
 * 
 * @author Vincent
 * @version 2016年4月20日
 * @see RestException
 * @since
 */
public class RestException extends RuntimeException {

    /**
     * 意义，目的和功能，以及被用到的地方<br>
     */
    private static final long serialVersionUID = -7750741109866617713L;

    public RestException() {
        super();
    }

    public RestException(String message) {
        super(message);
    }

    public RestException(String message, Throwable cause) {
        super(message, cause);
    }

    public RestException(Throwable cause) {
        super(cause);
    }

}