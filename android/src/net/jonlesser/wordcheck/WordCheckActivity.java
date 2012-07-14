package net.jonlesser.wordcheck;

import android.os.Bundle;
import com.phonegap.*;

public class WordCheckActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.init();
        KeyBoard keyboard = new KeyBoard(this, appView);
        appView.addJavascriptInterface(keyboard, "KeyBoard");
        super.loadUrl("file:///android_asset/www/index.html");
    }
}