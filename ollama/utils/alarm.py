
def alarm():
    import nava, time
    from nava import stop
    sound_id = nava.play('./alarm.wav', async_mode=True)
    time.sleep(8)
    stop(sound_id)

