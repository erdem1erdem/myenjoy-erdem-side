package com.iptvapp;

import android.app.Activity;
import android.os.Process;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class ExitAppModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;

    ExitAppModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "ExitApp";
    }

    @ReactMethod
    public void exitApp(Promise promise) {
        try {
            Activity activity = getCurrentActivity();
            if (activity != null) {
                activity.finish();
                Process.killProcess(Process.myPid());
                promise.resolve(null);
            } else {
                promise.reject("Activity is null", "Current activity is null");
            }
        } catch (Exception e) {
            promise.reject("Error", e.getMessage());
        }
    }
}
