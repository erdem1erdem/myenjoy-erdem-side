package com.iptvdemo

import android.net.Uri
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import org.videolan.libvlc.LibVLC
import org.videolan.libvlc.Media
import org.videolan.libvlc.MediaPlayer

class VLCPlayerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var libVLC: LibVLC = LibVLC(reactContext)
    private var mediaPlayer: MediaPlayer = MediaPlayer(libVLC)

    override fun getName(): String {
        Log.d("VLCPlayerModule", "getName called")
        return "VLCPlayer"
    }

    @ReactMethod
    fun playVideo(url: String) {
        Log.d("VLCPlayerModule", "playVideo called with URL: $url")
        try {
            val media = Media(libVLC, Uri.parse(url))
            mediaPlayer.media = media
            mediaPlayer.play()
            Log.d("VLCPlayerModule", "Video playback started")
        } catch (e: Exception) {
            Log.e("VLCPlayerModule", "Error during video playback: ${e.message}")
        }
    }

    @ReactMethod
    fun stopVideo() {
        Log.d("VLCPlayerModule", "stopVideo called")
        if (mediaPlayer.isPlaying) {
            mediaPlayer.stop()
            Log.d("VLCPlayerModule", "Video playback stopped")
        } else {
            Log.d("VLCPlayerModule", "No video is currently playing")
        }
    }

    @ReactMethod
    fun releasePlayer() {
        Log.d("VLCPlayerModule", "releasePlayer called")
        try {
            mediaPlayer.release()
            libVLC.release()
            Log.d("VLCPlayerModule", "VLC player resources released")
        } catch (e: Exception) {
            Log.e("VLCPlayerModule", "Error releasing VLC player resources: ${e.message}")
        }
    }
}
