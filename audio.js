var focusMusicPlayer = undefined

function playQuestionFocusMusic() {
    focusMusicPlayer = new Howl({
        src: ['./Sounds/FocusSound.mp3'],
        autoplay: false,
        loop: true,
        volume: 0.7
    });
    focusMusicPlayer.play()
};

function playLastQuestionFocusMusic() {
     focusMusicPlayer = new Howl({
        src: ['./Sounds/lastFocus.mp3'],
        autoplay: false,
        loop: true,
        volume: 0.8
    });
    focusMusicPlayer.play()
}

function descreaseVolumeQuestionFocusMusic() {
    focusMusicPlayer.stop();
}

function increaseVolumeQuestionFocusMusic() {
    focusMusicPlayer.play();
}

function playAudio(url, didEndCallback) {
    var sound = new Howl({
        src: [url],
        autoplay: false,
        loop: false,
        volume: 0.5,
        onend: didEndCallback
    });
    sound.play();
};