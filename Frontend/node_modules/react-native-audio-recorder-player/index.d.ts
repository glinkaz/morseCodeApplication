export declare enum AudioSourceAndroidType {
    DEFAULT = 0,
    MIC = 1,
    VOICE_UPLINK = 2,
    VOICE_DOWNLINK = 3,
    VOICE_CALL = 4,
    CAMCORDER = 5,
    VOICE_RECOGNITION = 6,
    VOICE_COMMUNICATION = 7,
    REMOTE_SUBMIX = 8,
    UNPROCESSED = 9,
    RADIO_TUNER = 1998,
    HOTWORD = 1999
}
export declare enum OutputFormatAndroidType {
    DEFAULT = 0,
    THREE_GPP = 1,
    MPEG_4 = 2,
    AMR_NB = 3,
    AMR_WB = 4,
    AAC_ADIF = 5,
    AAC_ADTS = 6,
    OUTPUT_FORMAT_RTP_AVP = 7,
    MPEG_2_TS = 8,
    WEBM = 9
}
export declare enum AudioEncoderAndroidType {
    DEFAULT = 0,
    AMR_NB = 1,
    AMR_WB = 2,
    AAC = 3,
    HE_AAC = 4,
    AAC_ELD = 5,
    VORBIS = 6
}
export declare enum AVEncodingOption {
    lpcm = "lpcm",
    ima4 = "ima4",
    aac = "aac",
    MAC3 = "MAC3",
    MAC6 = "MAC6",
    ulaw = "ulaw",
    alaw = "alaw",
    mp1 = "mp1",
    mp2 = "mp2",
    mp4 = "mp4",
    alac = "alac",
    amr = "amr",
    flac = "flac",
    opus = "opus",
    wav = "wav"
}
type AVEncodingType = AVEncodingOption.lpcm | AVEncodingOption.ima4 | AVEncodingOption.aac | AVEncodingOption.MAC3 | AVEncodingOption.MAC6 | AVEncodingOption.ulaw | AVEncodingOption.alaw | AVEncodingOption.mp1 | AVEncodingOption.mp2 | AVEncodingOption.mp4 | AVEncodingOption.alac | AVEncodingOption.amr | AVEncodingOption.flac | AVEncodingOption.opus | AVEncodingOption.wav;
export declare enum AVModeIOSOption {
    gamechat = "gamechat",
    measurement = "measurement",
    movieplayback = "movieplayback",
    spokenaudio = "spokenaudio",
    videochat = "videochat",
    videorecording = "videorecording",
    voicechat = "voicechat",
    voiceprompt = "voiceprompt"
}
export type AVModeIOSType = AVModeIOSOption.gamechat | AVModeIOSOption.measurement | AVModeIOSOption.movieplayback | AVModeIOSOption.spokenaudio | AVModeIOSOption.videochat | AVModeIOSOption.videorecording | AVModeIOSOption.voicechat | AVModeIOSOption.voiceprompt;
export declare enum AVEncoderAudioQualityIOSType {
    min = 0,
    low = 32,
    medium = 64,
    high = 96,
    max = 127
}
export declare enum AVLinearPCMBitDepthKeyIOSType {
    'bit8' = 8,
    'bit16' = 16,
    'bit24' = 24,
    'bit32' = 32
}
export interface AudioSet {
    AVSampleRateKeyIOS?: number;
    AVFormatIDKeyIOS?: AVEncodingType;
    AVModeIOS?: AVModeIOSType;
    AVNumberOfChannelsKeyIOS?: number;
    AVEncoderAudioQualityKeyIOS?: AVEncoderAudioQualityIOSType;
    AudioSourceAndroid?: AudioSourceAndroidType;
    AVLinearPCMBitDepthKeyIOS?: AVLinearPCMBitDepthKeyIOSType;
    AVLinearPCMIsBigEndianKeyIOS?: boolean;
    AVLinearPCMIsFloatKeyIOS?: boolean;
    AVLinearPCMIsNonInterleavedIOS?: boolean;
    AVEncoderBitRateKeyIOS?: number;
    OutputFormatAndroid?: OutputFormatAndroidType;
    AudioEncoderAndroid?: AudioEncoderAndroidType;
    AudioEncodingBitRateAndroid?: number;
    AudioSamplingRateAndroid?: number;
    AudioChannelsAndroid?: number;
}
export type RecordBackType = {
    isRecording?: boolean;
    currentPosition: number;
    currentMetering?: number;
};
export type PlayBackType = {
    isMuted?: boolean;
    currentPosition: number;
    duration: number;
};
declare class AudioRecorderPlayer {
    private _isRecording;
    private _isPlaying;
    private _hasPaused;
    private _hasPausedRecord;
    private _recorderSubscription;
    private _playerSubscription;
    private _playerCallback;
    mmss: (secs: number) => string;
    mmssss: (milisecs: number) => string;
    /**
     * Set listerner from native module for recorder.
     * @returns {callBack((e: RecordBackType): void)}
     */
    addRecordBackListener: (callback: (recordingMeta: RecordBackType) => void) => void;
    /**
     * Remove listener for recorder.
     * @returns {void}
     */
    removeRecordBackListener: () => void;
    /**
     * Set listener from native module for player.
     * @returns {callBack((e: PlayBackType): void)}
     */
    addPlayBackListener: (callback: (playbackMeta: PlayBackType) => void) => void;
    /**
     * remove listener for player.
     * @returns {void}
     */
    removePlayBackListener: () => void;
    /**
     * start recording with param.
     * @param {string} uri audio uri.
     * @returns {Promise<string>}
     */
    startRecorder: (uri?: string, audioSets?: AudioSet, meteringEnabled?: boolean) => Promise<string>;
    /**
     * Pause recording.
     * @returns {Promise<string>}
     */
    pauseRecorder: () => Promise<string>;
    /**
     * Resume recording.
     * @returns {Promise<string>}
     */
    resumeRecorder: () => Promise<string>;
    /**
     * stop recording.
     * @returns {Promise<string>}
     */
    stopRecorder: () => Promise<string>;
    /**
     * Resume playing.
     * @returns {Promise<string>}
     */
    resumePlayer: () => Promise<string>;
    playerCallback: (event: PlayBackType) => void;
    /**
     * Start playing with param.
     * @param {string} uri audio uri.
     * @param {Record<string, string>} httpHeaders Set of http headers.
     * @returns {Promise<string>}
     */
    startPlayer: (uri?: string, httpHeaders?: Record<string, string>) => Promise<string>;
    /**
     * Stop playing.
     * @returns {Promise<string>}
     */
    stopPlayer: () => Promise<string>;
    /**
     * Pause playing.
     * @returns {Promise<string>}
     */
    pausePlayer: () => Promise<string>;
    /**
     * Seek to.
     * @param {number} time position seek to in millisecond.
     * @returns {Promise<string>}
     */
    seekToPlayer: (time: number) => Promise<string>;
    /**
     * Set volume.
     * @param {number} setVolume set volume.
     * @returns {Promise<string>}
     */
    setVolume: (volume: number) => Promise<string>;
    /**
     * Set subscription duration. Default is 0.5.
     * @param {number} sec subscription callback duration in seconds.
     * @returns {Promise<string>}
     */
    setSubscriptionDuration: (sec: number) => Promise<string>;
}
export default AudioRecorderPlayer;
