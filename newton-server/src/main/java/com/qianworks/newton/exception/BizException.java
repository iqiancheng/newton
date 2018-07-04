package com.qianworks.newton.exception;

/**
 * Created by Joseph on 8/16/16.
 */
public class BizException extends Exception {

    public BizException() {
    }

    public BizException(String var1) {
        super(var1);
    }

    public BizException(String var1, Throwable var2) {
        super(var1, var2);
    }

    public BizException(Throwable var1) {
        super(var1);
    }

    protected BizException(String var1, Throwable var2, boolean var3, boolean var4) {
        super(var1, var2, var3, var4);
    }
}
