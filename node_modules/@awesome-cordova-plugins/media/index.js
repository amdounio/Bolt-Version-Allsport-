var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { AwesomeCordovaNativePlugin, cordovaInstance, instancePropertyGet, instancePropertySet, checkAvailability } from '@awesome-cordova-plugins/core';
import { Observable } from 'rxjs';
var MediaObject = /** @class */ (function () {
    function MediaObject(_objectInstance) {
        var _this = this;
        this._objectInstance = _objectInstance;
        this.onSuccess = new Observable(function (observer) {
            _this.successCallback = observer.next.bind(observer);
            return function () { return (_this.successCallback = function () { }); };
        });
        this.onError = new Observable(function (observer) {
            _this.errorCallback = observer.next.bind(observer);
            return function () { return (_this.errorCallback = function () { }); };
        });
        this.onStatusUpdate = new Observable(function (observer) {
            _this.statusCallback = observer.next.bind(observer);
            return function () { return (_this.statusCallback = function () { }); };
        });
    }
    MediaObject.prototype.getCurrentAmplitude = function () { return cordovaInstance(this, "getCurrentAmplitude", {}, arguments); };
    MediaObject.prototype.getCurrentPosition = function () { return cordovaInstance(this, "getCurrentPosition", {}, arguments); };
    MediaObject.prototype.getDuration = function () { return cordovaInstance(this, "getDuration", { "sync": true }, arguments); };
    MediaObject.prototype.play = function (iosOptions) { return cordovaInstance(this, "play", { "sync": true }, arguments); };
    MediaObject.prototype.pause = function () { return cordovaInstance(this, "pause", { "sync": true }, arguments); };
    MediaObject.prototype.release = function () { return cordovaInstance(this, "release", { "sync": true }, arguments); };
    MediaObject.prototype.seekTo = function (milliseconds) { return cordovaInstance(this, "seekTo", { "sync": true }, arguments); };
    MediaObject.prototype.setVolume = function (volume) { return cordovaInstance(this, "setVolume", { "sync": true }, arguments); };
    MediaObject.prototype.setRate = function (speedRate) { return cordovaInstance(this, "setRate", { "sync": true }, arguments); };
    MediaObject.prototype.startRecord = function () { return cordovaInstance(this, "startRecord", { "sync": true }, arguments); };
    MediaObject.prototype.stopRecord = function () { return cordovaInstance(this, "stopRecord", { "sync": true }, arguments); };
    MediaObject.prototype.pauseRecord = function () { return cordovaInstance(this, "pauseRecord", { "sync": true }, arguments); };
    MediaObject.prototype.resumeRecord = function () { return cordovaInstance(this, "resumeRecord", { "sync": true }, arguments); };
    MediaObject.prototype.stop = function () { return cordovaInstance(this, "stop", { "sync": true }, arguments); };
    Object.defineProperty(MediaObject.prototype, "successCallback", {
        get: function () { return instancePropertyGet(this, "successCallback"); },
        set: function (value) { instancePropertySet(this, "successCallback", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MediaObject.prototype, "errorCallback", {
        get: function () { return instancePropertyGet(this, "errorCallback"); },
        set: function (value) { instancePropertySet(this, "errorCallback", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MediaObject.prototype, "statusCallback", {
        get: function () { return instancePropertyGet(this, "statusCallback"); },
        set: function (value) { instancePropertySet(this, "statusCallback", value); },
        enumerable: false,
        configurable: true
    });
    return MediaObject;
}());
export { MediaObject };
export var MEDIA_STATUS;
(function (MEDIA_STATUS) {
    MEDIA_STATUS[MEDIA_STATUS["NONE"] = 0] = "NONE";
    MEDIA_STATUS[MEDIA_STATUS["STARTING"] = 1] = "STARTING";
    MEDIA_STATUS[MEDIA_STATUS["RUNNING"] = 2] = "RUNNING";
    MEDIA_STATUS[MEDIA_STATUS["PAUSED"] = 3] = "PAUSED";
    MEDIA_STATUS[MEDIA_STATUS["STOPPED"] = 4] = "STOPPED";
})(MEDIA_STATUS || (MEDIA_STATUS = {}));
export var MEDIA_ERROR;
(function (MEDIA_ERROR) {
    MEDIA_ERROR[MEDIA_ERROR["ABORTED"] = 1] = "ABORTED";
    MEDIA_ERROR[MEDIA_ERROR["NETWORK"] = 2] = "NETWORK";
    MEDIA_ERROR[MEDIA_ERROR["DECODE"] = 3] = "DECODE";
    MEDIA_ERROR[MEDIA_ERROR["SUPPORTED"] = 4] = "SUPPORTED";
})(MEDIA_ERROR || (MEDIA_ERROR = {}));
var MediaOriginal = /** @class */ (function (_super) {
    __extends(MediaOriginal, _super);
    function MediaOriginal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Constants
        /**
         * @hidden
         */
        _this.MEDIA_NONE = 0;
        /**
         * @hidden
         */
        _this.MEDIA_STARTING = 1;
        /**
         * @hidden
         */
        _this.MEDIA_RUNNING = 2;
        /**
         * @hidden
         */
        _this.MEDIA_PAUSED = 3;
        /**
         * @hidden
         */
        _this.MEDIA_STOPPED = 4;
        // error codes
        /**
         * @hidden
         */
        _this.MEDIA_ERR_ABORTED = 1;
        /**
         * @hidden
         */
        _this.MEDIA_ERR_NETWORK = 2;
        /**
         * @hidden
         */
        _this.MEDIA_ERR_DECODE = 3;
        /**
         * @hidden
         */
        _this.MEDIA_ERR_NONE_SUPPORTED = 4;
        return _this;
    }
    /**
     * Open a media file
     *
     * @param src {string} A URI containing the audio content.
     * @returns {MediaObject}
     */
    MediaOriginal.prototype.create = function (src) {
        var instance;
        if (checkAvailability(MediaOriginal.getPluginRef(), null, MediaOriginal.getPluginName()) === true) {
            // Creates a new media object
            instance = new (MediaOriginal.getPlugin())(src);
        }
        return new MediaObject(instance);
    };
    MediaOriginal.pluginName = "Media";
    MediaOriginal.repo = "https://github.com/apache/cordova-plugin-media";
    MediaOriginal.plugin = "cordova-plugin-media";
    MediaOriginal.pluginRef = "Media";
    MediaOriginal.platforms = ["Android", "Browser", "iOS", "Windows"];
    return MediaOriginal;
}(AwesomeCordovaNativePlugin));
var Media = new MediaOriginal();
export { Media };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGF3ZXNvbWUtY29yZG92YS1wbHVnaW5zL3BsdWdpbnMvbWVkaWEvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyx5RkFLTCxpQkFBaUIsRUFDbEIsTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDOztJQW9DMUMscUJBQW9CLGVBQW9CO1FBQXhDLGlCQWVDO1FBZm1CLG9CQUFlLEdBQWYsZUFBZSxDQUFLO1FBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxVQUFVLENBQU0sVUFBQyxRQUF1QjtZQUMzRCxLQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sY0FBTSxPQUFBLENBQUMsS0FBSSxDQUFDLGVBQWUsR0FBRyxjQUFPLENBQUMsQ0FBQyxFQUFqQyxDQUFpQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBYyxVQUFDLFFBQStCO1lBQ3pFLEtBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsT0FBTyxjQUFNLE9BQUEsQ0FBQyxLQUFJLENBQUMsYUFBYSxHQUFHLGNBQU8sQ0FBQyxDQUFDLEVBQS9CLENBQStCLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksVUFBVSxDQUFlLFVBQUMsUUFBZ0M7WUFDbEYsS0FBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuRCxPQUFPLGNBQU0sT0FBQSxDQUFDLEtBQUksQ0FBQyxjQUFjLEdBQUcsY0FBTyxDQUFDLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFRRCx5Q0FBbUI7SUFVbkIsd0NBQWtCO0lBVWxCLGlDQUFXO0lBWVgsMEJBQUksYUFBQyxVQUE4RTtJQU1uRiwyQkFBSztJQU1MLDZCQUFPO0lBUVAsNEJBQU0sYUFBQyxZQUFvQjtJQVEzQiwrQkFBUyxhQUFDLE1BQWM7SUFHeEIsNkJBQU8sYUFBQyxTQUFpQjtJQU16QixpQ0FBVztJQU1YLGdDQUFVO0lBTVYsaUNBQVc7SUFNWCxrQ0FBWTtJQU1aLDBCQUFJOzBCQWhJZ0Isd0NBQWU7Ozs7OzswQkFLZixzQ0FBYTs7Ozs7OzBCQUtiLHVDQUFjOzs7Ozs7c0JBMUNwQzs7O0FBaUxBLE1BQU0sQ0FBTixJQUFZLFlBTVg7QUFORCxXQUFZLFlBQVk7SUFDdEIsK0NBQVEsQ0FBQTtJQUNSLHVEQUFRLENBQUE7SUFDUixxREFBTyxDQUFBO0lBQ1AsbURBQU0sQ0FBQTtJQUNOLHFEQUFPLENBQUE7QUFDVCxDQUFDLEVBTlcsWUFBWSxLQUFaLFlBQVksUUFNdkI7QUFFRCxNQUFNLENBQU4sSUFBWSxXQUtYO0FBTEQsV0FBWSxXQUFXO0lBQ3JCLG1EQUFXLENBQUE7SUFDWCxtREFBTyxDQUFBO0lBQ1AsaURBQU0sQ0FBQTtJQUNOLHVEQUFTLENBQUE7QUFDWCxDQUFDLEVBTFcsV0FBVyxLQUFYLFdBQVcsUUFLdEI7O0lBNkcwQix5QkFBMEI7OztRQUNuRCxZQUFZO1FBQ1o7O1dBRUc7UUFDSCxnQkFBVSxHQUFHLENBQUMsQ0FBQztRQUNmOztXQUVHO1FBQ0gsb0JBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkI7O1dBRUc7UUFDSCxtQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQjs7V0FFRztRQUNILGtCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCOztXQUVHO1FBQ0gsbUJBQWEsR0FBRyxDQUFDLENBQUM7UUFFbEIsY0FBYztRQUNkOztXQUVHO1FBQ0gsdUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCOztXQUVHO1FBQ0gsdUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCOztXQUVHO1FBQ0gsc0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCOztXQUVHO1FBQ0gsOEJBQXdCLEdBQUcsQ0FBQyxDQUFDOzs7SUFFN0I7Ozs7O09BS0c7SUFDSCxzQkFBTSxHQUFOLFVBQU8sR0FBVztRQUNoQixJQUFJLFFBQWEsQ0FBQztRQUVsQixJQUFJLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ2pGLDZCQUE2QjtZQUM3QixRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsT0FBTyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7Ozs7Z0JBbldIO0VBMlMyQiwwQkFBMEI7U0FBeEMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvcmRvdmFJbnN0YW5jZSxcbiAgSW5zdGFuY2VQcm9wZXJ0eSxcbiAgQXdlc29tZUNvcmRvdmFOYXRpdmVQbHVnaW4sXG4gIFBsdWdpbixcbiAgY2hlY2tBdmFpbGFiaWxpdHksXG59IGZyb20gJ0Bhd2Vzb21lLWNvcmRvdmEtcGx1Z2lucy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgTWVkaWFPYmplY3Qge1xuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IG5vdGlmaWVzIHlvdSBvbiBhY3Rpb25zIHN1Y2Nlc3NcbiAgICovXG4gIG9uU3VjY2VzczogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgbm90aWZpZXMgeW91IHdoZW4gYW4gZXJyb3Igb2NjdXJzXG4gICAqL1xuICBvbkVycm9yOiBPYnNlcnZhYmxlPE1FRElBX0VSUk9SPjtcblxuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IG5vdGlmaWVzIHlvdSB3aGVuIHRoZSBmaWxlIHN0YXR1cyBjaGFuZ2VzXG4gICAqL1xuICBvblN0YXR1c1VwZGF0ZTogT2JzZXJ2YWJsZTxNRURJQV9TVEFUVVM+O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBASW5zdGFuY2VQcm9wZXJ0eSgpIHN1Y2Nlc3NDYWxsYmFjazogRnVuY3Rpb247XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIEBJbnN0YW5jZVByb3BlcnR5KCkgZXJyb3JDYWxsYmFjazogRnVuY3Rpb247XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIEBJbnN0YW5jZVByb3BlcnR5KCkgc3RhdHVzQ2FsbGJhY2s6IEZ1bmN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX29iamVjdEluc3RhbmNlOiBhbnkpIHtcbiAgICB0aGlzLm9uU3VjY2VzcyA9IG5ldyBPYnNlcnZhYmxlPGFueT4oKG9ic2VydmVyOiBPYnNlcnZlcjxhbnk+KSA9PiB7XG4gICAgICB0aGlzLnN1Y2Nlc3NDYWxsYmFjayA9IG9ic2VydmVyLm5leHQuYmluZChvYnNlcnZlcik7XG4gICAgICByZXR1cm4gKCkgPT4gKHRoaXMuc3VjY2Vzc0NhbGxiYWNrID0gKCkgPT4ge30pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5vbkVycm9yID0gbmV3IE9ic2VydmFibGU8TUVESUFfRVJST1I+KChvYnNlcnZlcjogT2JzZXJ2ZXI8TUVESUFfRVJST1I+KSA9PiB7XG4gICAgICB0aGlzLmVycm9yQ2FsbGJhY2sgPSBvYnNlcnZlci5uZXh0LmJpbmQob2JzZXJ2ZXIpO1xuICAgICAgcmV0dXJuICgpID0+ICh0aGlzLmVycm9yQ2FsbGJhY2sgPSAoKSA9PiB7fSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uU3RhdHVzVXBkYXRlID0gbmV3IE9ic2VydmFibGU8TUVESUFfU1RBVFVTPigob2JzZXJ2ZXI6IE9ic2VydmVyPE1FRElBX1NUQVRVUz4pID0+IHtcbiAgICAgIHRoaXMuc3RhdHVzQ2FsbGJhY2sgPSBvYnNlcnZlci5uZXh0LmJpbmQob2JzZXJ2ZXIpO1xuICAgICAgcmV0dXJuICgpID0+ICh0aGlzLnN0YXR1c0NhbGxiYWNrID0gKCkgPT4ge30pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCBhbXBsaXR1ZGUgb2YgdGhlIGN1cnJlbnQgcmVjb3JkaW5nLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBSZXR1cm5zIGEgcHJvbWlzZSB3aXRoIHRoZSBhbXBsaXR1ZGUgb2YgdGhlIGN1cnJlbnQgcmVjb3JkaW5nXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKClcbiAgZ2V0Q3VycmVudEFtcGxpdHVkZSgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgcG9zaXRpb24gd2l0aGluIGFuIGF1ZGlvIGZpbGUuIEFsc28gdXBkYXRlcyB0aGUgTWVkaWEgb2JqZWN0J3MgcG9zaXRpb24gcGFyYW1ldGVyLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBSZXR1cm5zIGEgcHJvbWlzZSB3aXRoIHRoZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCByZWNvcmRpbmdcbiAgICovXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoKVxuICBnZXRDdXJyZW50UG9zaXRpb24oKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkdXJhdGlvbiBvZiBhbiBhdWRpbyBmaWxlIGluIHNlY29uZHMuIElmIHRoZSBkdXJhdGlvbiBpcyB1bmtub3duLCBpdCByZXR1cm5zIGEgdmFsdWUgb2YgLTEuXG4gICAqXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYSBwcm9taXNlIHdpdGggdGhlIGR1cmF0aW9uIG9mIHRoZSBjdXJyZW50IHJlY29yZGluZ1xuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgZ2V0RHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIG9yIHJlc3VtZXMgcGxheWluZyBhbiBhdWRpbyBmaWxlLlxuICAgKlxuICAgKiBAcGFyYW0gaW9zT3B0aW9uc1xuICAgKiBAcGFyYW0gaW9zT3B0aW9ucy5udW1iZXJPZkxvb3BzXG4gICAqIEBwYXJhbSBpb3NPcHRpb25zLnBsYXlBdWRpb1doZW5TY3JlZW5Jc0xvY2tlZFxuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgcGxheShpb3NPcHRpb25zPzogeyBudW1iZXJPZkxvb3BzPzogbnVtYmVyOyBwbGF5QXVkaW9XaGVuU2NyZWVuSXNMb2NrZWQ/OiBib29sZWFuIH0pOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIFBhdXNlcyBwbGF5aW5nIGFuIGF1ZGlvIGZpbGUuXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICBwYXVzZSgpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIFJlbGVhc2VzIHRoZSB1bmRlcmx5aW5nIG9wZXJhdGluZyBzeXN0ZW0ncyBhdWRpbyByZXNvdXJjZXMuIFRoaXMgaXMgcGFydGljdWxhcmx5IGltcG9ydGFudCBmb3IgQW5kcm9pZCwgc2luY2UgdGhlcmUgYXJlIGEgZmluaXRlIGFtb3VudCBvZiBPcGVuQ29yZSBpbnN0YW5jZXMgZm9yIG1lZGlhIHBsYXliYWNrLiBBcHBsaWNhdGlvbnMgc2hvdWxkIGNhbGwgdGhlIHJlbGVhc2UgZnVuY3Rpb24gZm9yIGFueSBNZWRpYSByZXNvdXJjZSB0aGF0IGlzIG5vIGxvbmdlciBuZWVkZWQuXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICByZWxlYXNlKCk6IHZvaWQge31cblxuICAvKipcbiAgICogU2V0cyB0aGUgY3VycmVudCBwb3NpdGlvbiB3aXRoaW4gYW4gYXVkaW8gZmlsZS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1pbGxpc2Vjb25kcyBUaGUgdGltZSBwb3NpdGlvbiB5b3Ugd2FudCB0byBzZXQgZm9yIHRoZSBjdXJyZW50IGF1ZGlvIGZpbGVcbiAgICovXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoeyBzeW5jOiB0cnVlIH0pXG4gIHNlZWtUbyhtaWxsaXNlY29uZHM6IG51bWJlcik6IHZvaWQge31cblxuICAvKipcbiAgICogU2V0IHRoZSB2b2x1bWUgZm9yIGFuIGF1ZGlvIGZpbGUuXG4gICAqXG4gICAqIEBwYXJhbSB2b2x1bWUge251bWJlcn0gVGhlIHZvbHVtZSB0byBzZXQgZm9yIHBsYXliYWNrLiBUaGUgdmFsdWUgbXVzdCBiZSB3aXRoaW4gdGhlIHJhbmdlIG9mIDAuMCB0byAxLjAuXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICBzZXRWb2x1bWUodm9sdW1lOiBudW1iZXIpOiB2b2lkIHt9XG5cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgc2V0UmF0ZShzcGVlZFJhdGU6IG51bWJlcik6IHZvaWQge31cblxuICAvKipcbiAgICogU3RhcnRzIHJlY29yZGluZyBhbiBhdWRpbyBmaWxlLlxuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgc3RhcnRSZWNvcmQoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBTdG9wcyByZWNvcmRpbmdcbiAgICovXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoeyBzeW5jOiB0cnVlIH0pXG4gIHN0b3BSZWNvcmQoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBQYXVzZXMgcmVjb3JkaW5nXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICBwYXVzZVJlY29yZCgpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIFJlc3VtZXMgcmVjb3JkaW5nXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICByZXN1bWVSZWNvcmQoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBTdG9wcyBwbGF5aW5nIGFuIGF1ZGlvIGZpbGUuXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICBzdG9wKCk6IHZvaWQge31cbn1cblxuZXhwb3J0IHR5cGUgTWVkaWFTdGF0dXNVcGRhdGVDYWxsYmFjayA9IChzdGF0dXNDb2RlOiBudW1iZXIpID0+IHZvaWQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVkaWFFcnJvciB7XG4gIC8qKlxuICAgKiBFcnJvciBtZXNzYWdlXG4gICAqL1xuICBtZXNzYWdlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEVycm9yIGNvZGVcbiAgICovXG4gIGNvZGU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGVudW0gTUVESUFfU1RBVFVTIHtcbiAgTk9ORSA9IDAsXG4gIFNUQVJUSU5HLFxuICBSVU5OSU5HLFxuICBQQVVTRUQsXG4gIFNUT1BQRUQsXG59XG5cbmV4cG9ydCBlbnVtIE1FRElBX0VSUk9SIHtcbiAgQUJPUlRFRCA9IDEsXG4gIE5FVFdPUkssXG4gIERFQ09ERSxcbiAgU1VQUE9SVEVELFxufVxuXG5leHBvcnQgdHlwZSBNZWRpYUVycm9yQ2FsbGJhY2sgPSAoZXJyb3I6IE1lZGlhRXJyb3IpID0+IHZvaWQ7XG5cbi8qKlxuICogQG5hbWUgTWVkaWFcbiAqIEBwcmVtaWVyIG1lZGlhXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgcGx1Z2luIHByb3ZpZGVzIHRoZSBhYmlsaXR5IHRvIHJlY29yZCBhbmQgcGxheSBiYWNrIGF1ZGlvIGZpbGVzIG9uIGEgZGV2aWNlLlxuICogQHVzYWdlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBNZWRpYSwgTWVkaWFPYmplY3QgfSBmcm9tICdAYXdlc29tZS1jb3Jkb3ZhLXBsdWdpbnMvbWVkaWEvbmd4JztcbiAqXG4gKlxuICogY29uc3RydWN0b3IocHJpdmF0ZSBtZWRpYTogTWVkaWEpIHsgfVxuICpcbiAqXG4gKiAuLi5cbiAqXG4gKlxuICogLy8gQ3JlYXRlIGEgTWVkaWEgaW5zdGFuY2UuICBFeHBlY3RzIHBhdGggdG8gZmlsZSBvciB1cmwgYXMgYXJndW1lbnRcbiAqIC8vIFdlIGNhbiBvcHRpb25hbGx5IHBhc3MgYSBzZWNvbmQgYXJndW1lbnQgdG8gdHJhY2sgdGhlIHN0YXR1cyBvZiB0aGUgbWVkaWFcbiAqXG4gKiBjb25zdCBmaWxlOiBNZWRpYU9iamVjdCA9IHRoaXMubWVkaWEuY3JlYXRlKCdmaWxlLm1wMycpO1xuICpcbiAqIC8vIHRvIGxpc3RlbiB0byBwbHVnaW4gZXZlbnRzOlxuICpcbiAqIGZpbGUub25TdGF0dXNVcGRhdGUuc3Vic2NyaWJlKHN0YXR1cyA9PiBjb25zb2xlLmxvZyhzdGF0dXMpKTsgLy8gZmlyZXMgd2hlbiBmaWxlIHN0YXR1cyBjaGFuZ2VzXG4gKlxuICogZmlsZS5vblN1Y2Nlc3Muc3Vic2NyaWJlKCgpID0+IGNvbnNvbGUubG9nKCdBY3Rpb24gaXMgc3VjY2Vzc2Z1bCcpKTtcbiAqXG4gKiBmaWxlLm9uRXJyb3Iuc3Vic2NyaWJlKGVycm9yID0+IGNvbnNvbGUubG9nKCdFcnJvciEnLCBlcnJvcikpO1xuICpcbiAqIC8vIHBsYXkgdGhlIGZpbGVcbiAqIGZpbGUucGxheSgpO1xuICpcbiAqIC8vIHBhdXNlIHRoZSBmaWxlXG4gKiBmaWxlLnBhdXNlKCk7XG4gKlxuICogLy8gZ2V0IGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb25cbiAqIGZpbGUuZ2V0Q3VycmVudFBvc2l0aW9uKCkudGhlbigocG9zaXRpb24pID0+IHtcbiAqICAgY29uc29sZS5sb2cocG9zaXRpb24pO1xuICogfSk7XG4gKlxuICogLy8gZ2V0IGZpbGUgZHVyYXRpb25cbiAqIGxldCBkdXJhdGlvbiA9IGZpbGUuZ2V0RHVyYXRpb24oKTtcbiAqIGNvbnNvbGUubG9nKGR1cmF0aW9uKTtcbiAqXG4gKiAvLyBza2lwIHRvIDEwIHNlY29uZHMgKGV4cGVjdHMgaW50IHZhbHVlIGluIG1zKVxuICogZmlsZS5zZWVrVG8oMTAwMDApO1xuICpcbiAqIC8vIHN0b3AgcGxheWluZyB0aGUgZmlsZVxuICogZmlsZS5zdG9wKCk7XG4gKlxuICogLy8gcmVsZWFzZSB0aGUgbmF0aXZlIGF1ZGlvIHJlc291cmNlXG4gKiAvLyBQbGF0Zm9ybSBRdWlya3M6XG4gKiAvLyBpT1Mgc2ltcGx5IGNyZWF0ZSBhIG5ldyBpbnN0YW5jZSBhbmQgdGhlIG9sZCBvbmUgd2lsbCBiZSBvdmVyd3JpdHRlblxuICogLy8gQW5kcm9pZCB5b3UgbXVzdCBjYWxsIHJlbGVhc2UoKSB0byBkZXN0cm95IGluc3RhbmNlcyBvZiBtZWRpYSB3aGVuIHlvdSBhcmUgZG9uZVxuICogZmlsZS5yZWxlYXNlKCk7XG4gKlxuICpcbiAqXG4gKiAvLyBSZWNvcmRpbmcgdG8gYSBmaWxlXG4gKiBjb25zdCBmaWxlOiBNZWRpYU9iamVjdCA9IHRoaXMubWVkaWEuY3JlYXRlKCdwYXRoL3RvL2ZpbGUubXAzJyk7XG4gKlxuICogZmlsZS5zdGFydFJlY29yZCgpO1xuICpcbiAqIGZpbGUuc3RvcFJlY29yZCgpO1xuICpcbiAqXG4gKiBgYGBcbiAqXG4gKiBTb21lIGhpbnRzIGlmIHlvdSBhcmUgdXNpbmcgaU9TIGFuZCByZWNvcmRpbmcgZG9lc24ndCB3b3JrOlxuICogMS4pIFRyeSB0byB1c2UgYSBhYnNvbHV0ZSBmaWxlIHBhdGggYnV0IHJlbW92ZSBiZWdpbm5pbmcgXCJmaWxlOi8vXCIuXG4gKiBUaGVuIGl0IGxvb2tzIGxpa2U6IGAvdmFyL21vYmlsZS9Db250YWluZXJzL0RhdGEvQXBwbGljYXRpb24vQUY0MzhCOEItNzcyNC00RkJCLThFNjktMDgzNDYzMjI0RkM0L3RtcC9teV9maWxlLm00YWBcbiAqIEV4YW1wbGU6IGB0aGlzLm1lZGlhLmNyZWF0ZSh0aGlzLmZpbGUudGVtcERpcmVjdG9yeS5yZXBsYWNlKC9eZmlsZTpcXC9cXC8vLCAnJykgKyAnbXlfZmlsZS5tNGEnKWBcbiAqIDIuKSBJZiB0aGF0J3Mgbm90IHdvcmtpbmcsIHRvbywgY3JlYXRlIHRoZSBmaWxlIGJlZm9yZSB1c2luZy5cbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBNZWRpYSwgTWVkaWFPYmplY3QgfSBmcm9tICdAYXdlc29tZS1jb3Jkb3ZhLXBsdWdpbnMvbWVkaWEvbmd4JztcbiAqIGltcG9ydCB7IEZpbGUgfSBmcm9tICdAYXdlc29tZS1jb3Jkb3ZhLXBsdWdpbnMvZmlsZS9uZ3gnO1xuICpcbiAqIC4uLlxuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgbWVkaWE6IE1lZGlhLCBwcml2YXRlIGZpbGU6IEZpbGUpIHsgfVxuICpcbiAqIC4uLlxuICpcbiAqIHRoaXMuZmlsZS5jcmVhdGVGaWxlKHRoaXMuZmlsZS50ZW1wRGlyZWN0b3J5LCAnbXlfZmlsZS5tNGEnLCB0cnVlKS50aGVuKCgpID0+IHtcbiAqICAgbGV0IGZpbGUgPSB0aGlzLm1lZGlhLmNyZWF0ZSh0aGlzLmZpbGUudGVtcERpcmVjdG9yeS5yZXBsYWNlKC9eZmlsZTpcXC9cXC8vLCAnJykgKyAnbXlfZmlsZS5tNGEnKTtcbiAqICAgZmlsZS5zdGFydFJlY29yZCgpO1xuICogICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBmaWxlLnN0b3BSZWNvcmQoKSwgMTAwMDApO1xuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBZb3UgY2FuIGZpbmQgdGhlIHJlYXNvbnMgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL2lvbmljLXRlYW0vaW9uaWMtbmF0aXZlL2lzc3Vlcy8xNDUyI2lzc3VlY29tbWVudC0yOTk2MDU5MDZcbiAqIEBjbGFzc2VzXG4gKiBNZWRpYU9iamVjdFxuICogQGludGVyZmFjZXNcbiAqIE1lZGlhRXJyb3JcbiAqL1xuQFBsdWdpbih7XG4gIHBsdWdpbk5hbWU6ICdNZWRpYScsXG4gIHJlcG86ICdodHRwczovL2dpdGh1Yi5jb20vYXBhY2hlL2NvcmRvdmEtcGx1Z2luLW1lZGlhJyxcbiAgcGx1Z2luOiAnY29yZG92YS1wbHVnaW4tbWVkaWEnLFxuICBwbHVnaW5SZWY6ICdNZWRpYScsXG4gIHBsYXRmb3JtczogWydBbmRyb2lkJywgJ0Jyb3dzZXInLCAnaU9TJywgJ1dpbmRvd3MnXSxcbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWVkaWEgZXh0ZW5kcyBBd2Vzb21lQ29yZG92YU5hdGl2ZVBsdWdpbiB7XG4gIC8vIENvbnN0YW50c1xuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgTUVESUFfTk9ORSA9IDA7XG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBNRURJQV9TVEFSVElORyA9IDE7XG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBNRURJQV9SVU5OSU5HID0gMjtcbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIE1FRElBX1BBVVNFRCA9IDM7XG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBNRURJQV9TVE9QUEVEID0gNDtcblxuICAvLyBlcnJvciBjb2Rlc1xuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgTUVESUFfRVJSX0FCT1JURUQgPSAxO1xuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgTUVESUFfRVJSX05FVFdPUksgPSAyO1xuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgTUVESUFfRVJSX0RFQ09ERSA9IDM7XG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBNRURJQV9FUlJfTk9ORV9TVVBQT1JURUQgPSA0O1xuXG4gIC8qKlxuICAgKiBPcGVuIGEgbWVkaWEgZmlsZVxuICAgKlxuICAgKiBAcGFyYW0gc3JjIHtzdHJpbmd9IEEgVVJJIGNvbnRhaW5pbmcgdGhlIGF1ZGlvIGNvbnRlbnQuXG4gICAqIEByZXR1cm5zIHtNZWRpYU9iamVjdH1cbiAgICovXG4gIGNyZWF0ZShzcmM6IHN0cmluZyk6IE1lZGlhT2JqZWN0IHtcbiAgICBsZXQgaW5zdGFuY2U6IGFueTtcblxuICAgIGlmIChjaGVja0F2YWlsYWJpbGl0eShNZWRpYS5nZXRQbHVnaW5SZWYoKSwgbnVsbCwgTWVkaWEuZ2V0UGx1Z2luTmFtZSgpKSA9PT0gdHJ1ZSkge1xuICAgICAgLy8gQ3JlYXRlcyBhIG5ldyBtZWRpYSBvYmplY3RcbiAgICAgIGluc3RhbmNlID0gbmV3IChNZWRpYS5nZXRQbHVnaW4oKSkoc3JjKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE1lZGlhT2JqZWN0KGluc3RhbmNlKTtcbiAgfVxufVxuIl19