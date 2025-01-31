package com.iptvdemo

import android.net.Uri
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.widget.FrameLayout
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import org.videolan.libvlc.LibVLC
import org.videolan.libvlc.Media
import org.videolan.libvlc.MediaPlayer
import org.videolan.libvlc.util.VLCVideoLayout
import com.facebook.react.uimanager.annotations.ReactProp

class VLCPlayerViewManagerA : SimpleViewManager<VLCVideoLayout>() {

    private var libVLC: LibVLC? = null
    private var mediaPlayer: MediaPlayer? = null
    private var handler: Handler? = Handler(Looper.getMainLooper())
    private var lastPosition: Long = 0
    private val CHECK_INTERVAL = 5000L 

    override fun getName(): String {
        return "VLCPlayerViewA"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): VLCVideoLayout {
        val vlcLayout = VLCVideoLayout(reactContext)

        val options = arrayListOf(
            "--no-video-title-show",
            "--audio-time-stretch",
            "--network-caching=1000",
            "--file-caching=1000",
            "--live-caching=1000",
            "--rtsp-caching=1000",
            "--sout-keep",
            "--rtsp-tcp",
            "--avcodec-hw=any",
            "--codec=all",
            "--http-reconnect",
            "--audio-desync=0",
            "--aout=opensles",
            "--gain=1.0",
            "--drop-late-frames",
            "--skip-frames",
            "--clock-jitter=100",
            "--clock-synchro=0",
            "--vout=android-display",
            "--video-filter=deinterlace",
            "--deinterlace-mode=blend",
            "--vout=android_display,mediacodec=all",
            "-vvv"
        )

        try {
            if (libVLC == null) {
                libVLC = LibVLC(reactContext, options)
                mediaPlayer = MediaPlayer(libVLC)
            }

            vlcLayout.layoutParams = FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
            )
            mediaPlayer?.attachViews(vlcLayout, null, false, false)

            
            startFreezeCheck()

            
            handler?.postDelayed({
                mediaPlayer?.setVolume(0)
                handler?.postDelayed({
                    mediaPlayer?.setVolume(100)
                }, 2250)
            }, 0)

        } catch (e: Exception) {
            Log.e("VLCPlayerViewManagerA", "LibVLC oluşturulamadı: ${e.message}")
        }

        return vlcLayout
    }

    @ReactProp(name = "url")
    fun setUrl(vlcLayout: VLCVideoLayout, url: String) {
        try {
            val media = Media(libVLC, Uri.parse(url))

            media.setHWDecoderEnabled(true,true)
            media.addOption(":network-caching=1000")
            media.addOption(":file-caching=1000")
            media.addOption(":live-caching=1000")
            media.addOption(":rtsp-caching=1000")
            media.addOption(":demux=any")
            media.addOption(":http-reconnect")
            media.addOption(":rtsp-tcp")
            media.addOption(":audio-track=0")
            media.addOption(":codec=mediacodec")

            mediaPlayer?.apply {
                stop()
                this.media?.release()
                this.media = media
                play()
                defaultTimer()
               
            }
            defaultTimer()


        } catch (e: Exception) {
            Log.e("VLCPlayerViewManagerA", "Video oynatılırken hata oluştu: ${e.message}")
        }
    }

    private fun startFreezeCheck() {
        handler?.postDelayed(object : Runnable {
            override fun run() {
                mediaPlayer?.let {
                    val currentPosition = it.time
                    if (currentPosition == lastPosition) {
                        Log.d("VLCPlayerViewManagerA", "Video dondu, yeniden başlatılıyor...")
                        it.stop()
                        it.play() 
                        defaultTimer()
                    } else {
                        lastPosition = currentPosition
                    }
                }
                handler?.postDelayed(this, CHECK_INTERVAL) 
            }
        }, CHECK_INTERVAL)
    }

    override fun onDropViewInstance(view: VLCVideoLayout) {
        super.onDropViewInstance(view)
        releaseResources()
    }

    private fun releaseResources() {
        try {
            handler?.removeCallbacksAndMessages(null)

            mediaPlayer?.let {
                if (it.isPlaying) {
                    it.stop()
                }
                it.detachViews()
                it.release()
            }

            libVLC?.release()

            mediaPlayer = null
            libVLC = null

        } catch (e: Exception) {
            Log.e("VLCPlayerViewManagerA", "Kaynaklar serbest bırakılırken hata oluştu: ${e.message}")
        }
    }

    fun defaultTimer() {
        handler?.postDelayed({
            mediaPlayer?.setVolume(0) 
            handler?.postDelayed({
                mediaPlayer?.setVolume(100) 
            }, 2000)
        }, 0)
    }
    
}