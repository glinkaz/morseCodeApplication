var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform, } from 'react-native';
var RNAudioRecorderPlayer = NativeModules.RNAudioRecorderPlayer;
export var AudioSourceAndroidType;
(function (AudioSourceAndroidType) {
    AudioSourceAndroidType[AudioSourceAndroidType["DEFAULT"] = 0] = "DEFAULT";
    AudioSourceAndroidType[AudioSourceAndroidType["MIC"] = 1] = "MIC";
    AudioSourceAndroidType[AudioSourceAndroidType["VOICE_UPLINK"] = 2] = "VOICE_UPLINK";
    AudioSourceAndroidType[AudioSourceAndroidType["VOICE_DOWNLINK"] = 3] = "VOICE_DOWNLINK";
    AudioSourceAndroidType[AudioSourceAndroidType["VOICE_CALL"] = 4] = "VOICE_CALL";
    AudioSourceAndroidType[AudioSourceAndroidType["CAMCORDER"] = 5] = "CAMCORDER";
    AudioSourceAndroidType[AudioSourceAndroidType["VOICE_RECOGNITION"] = 6] = "VOICE_RECOGNITION";
    AudioSourceAndroidType[AudioSourceAndroidType["VOICE_COMMUNICATION"] = 7] = "VOICE_COMMUNICATION";
    AudioSourceAndroidType[AudioSourceAndroidType["REMOTE_SUBMIX"] = 8] = "REMOTE_SUBMIX";
    AudioSourceAndroidType[AudioSourceAndroidType["UNPROCESSED"] = 9] = "UNPROCESSED";
    AudioSourceAndroidType[AudioSourceAndroidType["RADIO_TUNER"] = 1998] = "RADIO_TUNER";
    AudioSourceAndroidType[AudioSourceAndroidType["HOTWORD"] = 1999] = "HOTWORD";
})(AudioSourceAndroidType || (AudioSourceAndroidType = {}));
export var OutputFormatAndroidType;
(function (OutputFormatAndroidType) {
    OutputFormatAndroidType[OutputFormatAndroidType["DEFAULT"] = 0] = "DEFAULT";
    OutputFormatAndroidType[OutputFormatAndroidType["THREE_GPP"] = 1] = "THREE_GPP";
    OutputFormatAndroidType[OutputFormatAndroidType["MPEG_4"] = 2] = "MPEG_4";
    OutputFormatAndroidType[OutputFormatAndroidType["AMR_NB"] = 3] = "AMR_NB";
    OutputFormatAndroidType[OutputFormatAndroidType["AMR_WB"] = 4] = "AMR_WB";
    OutputFormatAndroidType[OutputFormatAndroidType["AAC_ADIF"] = 5] = "AAC_ADIF";
    OutputFormatAndroidType[OutputFormatAndroidType["AAC_ADTS"] = 6] = "AAC_ADTS";
    OutputFormatAndroidType[OutputFormatAndroidType["OUTPUT_FORMAT_RTP_AVP"] = 7] = "OUTPUT_FORMAT_RTP_AVP";
    OutputFormatAndroidType[OutputFormatAndroidType["MPEG_2_TS"] = 8] = "MPEG_2_TS";
    OutputFormatAndroidType[OutputFormatAndroidType["WEBM"] = 9] = "WEBM";
})(OutputFormatAndroidType || (OutputFormatAndroidType = {}));
export var AudioEncoderAndroidType;
(function (AudioEncoderAndroidType) {
    AudioEncoderAndroidType[AudioEncoderAndroidType["DEFAULT"] = 0] = "DEFAULT";
    AudioEncoderAndroidType[AudioEncoderAndroidType["AMR_NB"] = 1] = "AMR_NB";
    AudioEncoderAndroidType[AudioEncoderAndroidType["AMR_WB"] = 2] = "AMR_WB";
    AudioEncoderAndroidType[AudioEncoderAndroidType["AAC"] = 3] = "AAC";
    AudioEncoderAndroidType[AudioEncoderAndroidType["HE_AAC"] = 4] = "HE_AAC";
    AudioEncoderAndroidType[AudioEncoderAndroidType["AAC_ELD"] = 5] = "AAC_ELD";
    AudioEncoderAndroidType[AudioEncoderAndroidType["VORBIS"] = 6] = "VORBIS";
})(AudioEncoderAndroidType || (AudioEncoderAndroidType = {}));
export var AVEncodingOption;
(function (AVEncodingOption) {
    AVEncodingOption["lpcm"] = "lpcm";
    AVEncodingOption["ima4"] = "ima4";
    AVEncodingOption["aac"] = "aac";
    AVEncodingOption["MAC3"] = "MAC3";
    AVEncodingOption["MAC6"] = "MAC6";
    AVEncodingOption["ulaw"] = "ulaw";
    AVEncodingOption["alaw"] = "alaw";
    AVEncodingOption["mp1"] = "mp1";
    AVEncodingOption["mp2"] = "mp2";
    AVEncodingOption["mp4"] = "mp4";
    AVEncodingOption["alac"] = "alac";
    AVEncodingOption["amr"] = "amr";
    AVEncodingOption["flac"] = "flac";
    AVEncodingOption["opus"] = "opus";
    AVEncodingOption["wav"] = "wav";
})(AVEncodingOption || (AVEncodingOption = {}));
export var AVModeIOSOption;
(function (AVModeIOSOption) {
    AVModeIOSOption["gamechat"] = "gamechat";
    AVModeIOSOption["measurement"] = "measurement";
    AVModeIOSOption["movieplayback"] = "movieplayback";
    AVModeIOSOption["spokenaudio"] = "spokenaudio";
    AVModeIOSOption["videochat"] = "videochat";
    AVModeIOSOption["videorecording"] = "videorecording";
    AVModeIOSOption["voicechat"] = "voicechat";
    AVModeIOSOption["voiceprompt"] = "voiceprompt";
})(AVModeIOSOption || (AVModeIOSOption = {}));
export var AVEncoderAudioQualityIOSType;
(function (AVEncoderAudioQualityIOSType) {
    AVEncoderAudioQualityIOSType[AVEncoderAudioQualityIOSType["min"] = 0] = "min";
    AVEncoderAudioQualityIOSType[AVEncoderAudioQualityIOSType["low"] = 32] = "low";
    AVEncoderAudioQualityIOSType[AVEncoderAudioQualityIOSType["medium"] = 64] = "medium";
    AVEncoderAudioQualityIOSType[AVEncoderAudioQualityIOSType["high"] = 96] = "high";
    AVEncoderAudioQualityIOSType[AVEncoderAudioQualityIOSType["max"] = 127] = "max";
})(AVEncoderAudioQualityIOSType || (AVEncoderAudioQualityIOSType = {}));
export var AVLinearPCMBitDepthKeyIOSType;
(function (AVLinearPCMBitDepthKeyIOSType) {
    AVLinearPCMBitDepthKeyIOSType[AVLinearPCMBitDepthKeyIOSType["bit8"] = 8] = "bit8";
    AVLinearPCMBitDepthKeyIOSType[AVLinearPCMBitDepthKeyIOSType["bit16"] = 16] = "bit16";
    AVLinearPCMBitDepthKeyIOSType[AVLinearPCMBitDepthKeyIOSType["bit24"] = 24] = "bit24";
    AVLinearPCMBitDepthKeyIOSType[AVLinearPCMBitDepthKeyIOSType["bit32"] = 32] = "bit32";
})(AVLinearPCMBitDepthKeyIOSType || (AVLinearPCMBitDepthKeyIOSType = {}));
var pad = function (num) {
    return ('0' + num).slice(-2);
};
var AudioRecorderPlayer = /** @class */ (function () {
    function AudioRecorderPlayer() {
        var _this = this;
        this.mmss = function (secs) {
            var minutes = Math.floor(secs / 60);
            secs = secs % 60;
            minutes = minutes % 60;
            return pad(minutes) + ':' + pad(secs);
        };
        this.mmssss = function (milisecs) {
            var secs = Math.floor(milisecs / 1000);
            var minutes = Math.floor(secs / 60);
            var seconds = secs % 60;
            var miliseconds = Math.floor((milisecs % 1000) / 10);
            return pad(minutes) + ':' + pad(seconds) + ':' + pad(miliseconds);
        };
        /**
         * Set listerner from native module for recorder.
         * @returns {callBack((e: RecordBackType): void)}
         */
        this.addRecordBackListener = function (callback) {
            if (Platform.OS === 'android') {
                _this._recorderSubscription = DeviceEventEmitter.addListener('rn-recordback', callback);
            }
            else {
                var myModuleEvt = new NativeEventEmitter(RNAudioRecorderPlayer);
                _this._recorderSubscription = myModuleEvt.addListener('rn-recordback', callback);
            }
        };
        /**
         * Remove listener for recorder.
         * @returns {void}
         */
        this.removeRecordBackListener = function () {
            if (_this._recorderSubscription) {
                _this._recorderSubscription.remove();
                _this._recorderSubscription = null;
            }
        };
        /**
         * Set listener from native module for player.
         * @returns {callBack((e: PlayBackType): void)}
         */
        this.addPlayBackListener = function (callback) {
            _this._playerCallback = callback;
        };
        /**
         * remove listener for player.
         * @returns {void}
         */
        this.removePlayBackListener = function () {
            _this._playerCallback = null;
        };
        /**
         * start recording with param.
         * @param {string} uri audio uri.
         * @returns {Promise<string>}
         */
        this.startRecorder = function (uri, audioSets, meteringEnabled) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this._isRecording) {
                    this._isRecording = true;
                    return [2 /*return*/, RNAudioRecorderPlayer.startRecorder(uri !== null && uri !== void 0 ? uri : 'DEFAULT', audioSets, meteringEnabled !== null && meteringEnabled !== void 0 ? meteringEnabled : false)];
                }
                return [2 /*return*/, 'Already recording'];
            });
        }); };
        /**
         * Pause recording.
         * @returns {Promise<string>}
         */
        this.pauseRecorder = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this._hasPausedRecord) {
                    this._hasPausedRecord = true;
                    return [2 /*return*/, RNAudioRecorderPlayer.pauseRecorder()];
                }
                return [2 /*return*/, 'Already paused recording.'];
            });
        }); };
        /**
         * Resume recording.
         * @returns {Promise<string>}
         */
        this.resumeRecorder = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this._hasPausedRecord) {
                    this._hasPausedRecord = false;
                    return [2 /*return*/, RNAudioRecorderPlayer.resumeRecorder()];
                }
                return [2 /*return*/, 'Currently recording.'];
            });
        }); };
        /**
         * stop recording.
         * @returns {Promise<string>}
         */
        this.stopRecorder = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this._isRecording) {
                    this._isRecording = false;
                    this._hasPausedRecord = false;
                    return [2 /*return*/, RNAudioRecorderPlayer.stopRecorder()];
                }
                return [2 /*return*/, 'Already stopped'];
            });
        }); };
        /**
         * Resume playing.
         * @returns {Promise<string>}
         */
        this.resumePlayer = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this._isPlaying) {
                    return [2 /*return*/, 'No audio playing'];
                }
                if (this._hasPaused) {
                    this._hasPaused = false;
                    return [2 /*return*/, RNAudioRecorderPlayer.resumePlayer()];
                }
                return [2 /*return*/, 'Already playing'];
            });
        }); };
        this.playerCallback = function (event) {
            if (_this._playerCallback) {
                _this._playerCallback(event);
            }
            if (event.currentPosition === event.duration) {
                _this.stopPlayer();
            }
        };
        /**
         * Start playing with param.
         * @param {string} uri audio uri.
         * @param {Record<string, string>} httpHeaders Set of http headers.
         * @returns {Promise<string>}
         */
        this.startPlayer = function (uri, httpHeaders) { return __awaiter(_this, void 0, void 0, function () {
            var myModuleEvt;
            return __generator(this, function (_a) {
                if (!uri) {
                    uri = 'DEFAULT';
                }
                if (!this._playerSubscription) {
                    if (Platform.OS === 'android') {
                        this._playerSubscription = DeviceEventEmitter.addListener('rn-playback', this.playerCallback);
                    }
                    else {
                        myModuleEvt = new NativeEventEmitter(RNAudioRecorderPlayer);
                        this._playerSubscription = myModuleEvt.addListener('rn-playback', this.playerCallback);
                    }
                }
                if (!this._isPlaying || this._hasPaused) {
                    this._isPlaying = true;
                    this._hasPaused = false;
                    return [2 /*return*/, RNAudioRecorderPlayer.startPlayer(uri, httpHeaders)];
                }
                return [2 /*return*/];
            });
        }); };
        /**
         * Stop playing.
         * @returns {Promise<string>}
         */
        this.stopPlayer = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this._isPlaying) {
                    this._isPlaying = false;
                    this._hasPaused = false;
                    return [2 /*return*/, RNAudioRecorderPlayer.stopPlayer()];
                }
                return [2 /*return*/, 'Already stopped playing'];
            });
        }); };
        /**
         * Pause playing.
         * @returns {Promise<string>}
         */
        this.pausePlayer = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this._isPlaying) {
                    return [2 /*return*/, 'No audio playing'];
                }
                if (!this._hasPaused) {
                    this._hasPaused = true;
                    return [2 /*return*/, RNAudioRecorderPlayer.pausePlayer()];
                }
                return [2 /*return*/];
            });
        }); };
        /**
         * Seek to.
         * @param {number} time position seek to in millisecond.
         * @returns {Promise<string>}
         */
        this.seekToPlayer = function (time) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, RNAudioRecorderPlayer.seekToPlayer(time)];
            });
        }); };
        /**
         * Set volume.
         * @param {number} setVolume set volume.
         * @returns {Promise<string>}
         */
        this.setVolume = function (volume) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (volume < 0 || volume > 1) {
                    throw new Error('Value of volume should be between 0.0 to 1.0');
                }
                return [2 /*return*/, RNAudioRecorderPlayer.setVolume(volume)];
            });
        }); };
        /**
         * Set subscription duration. Default is 0.5.
         * @param {number} sec subscription callback duration in seconds.
         * @returns {Promise<string>}
         */
        this.setSubscriptionDuration = function (sec) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, RNAudioRecorderPlayer.setSubscriptionDuration(sec)];
            });
        }); };
    }
    return AudioRecorderPlayer;
}());
export default AudioRecorderPlayer;
