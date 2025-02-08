import { __decorate, __extends } from "tslib";
import { Injectable } from '@angular/core';
import { AwesomeCordovaNativePlugin, cordovaInstance, instancePropertyGet, instancePropertySet, checkAvailability } from '@awesome-cordova-plugins/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
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
var Media = /** @class */ (function (_super) {
    __extends(Media, _super);
    function Media() {
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
    Media.prototype.create = function (src) {
        var instance;
        if (checkAvailability(Media.getPluginRef(), null, Media.getPluginName()) === true) {
            // Creates a new media object
            instance = new (Media.getPlugin())(src);
        }
        return new MediaObject(instance);
    };
    Media.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: Media, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    Media.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: Media });
    Media.pluginName = "Media";
    Media.repo = "https://github.com/apache/cordova-plugin-media";
    Media.plugin = "cordova-plugin-media";
    Media.pluginRef = "Media";
    Media.platforms = ["Android", "Browser", "iOS", "Windows"];
    Media = __decorate([], Media);
    return Media;
}(AwesomeCordovaNativePlugin));
export { Media };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: Media, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQGF3ZXNvbWUtY29yZG92YS1wbHVnaW5zL3BsdWdpbnMvbWVkaWEvbmd4L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8seUZBS0wsaUJBQWlCLEVBQ2xCLE1BQU0sK0JBQStCLENBQUM7QUFDdkMsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQzs7O0lBb0MxQyxxQkFBb0IsZUFBb0I7UUFBeEMsaUJBZUM7UUFmbUIsb0JBQWUsR0FBZixlQUFlLENBQUs7UUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFVBQVUsQ0FBTSxVQUFDLFFBQXVCO1lBQzNELEtBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEQsT0FBTyxjQUFNLE9BQUEsQ0FBQyxLQUFJLENBQUMsZUFBZSxHQUFHLGNBQU8sQ0FBQyxDQUFDLEVBQWpDLENBQWlDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksVUFBVSxDQUFjLFVBQUMsUUFBK0I7WUFDekUsS0FBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRCxPQUFPLGNBQU0sT0FBQSxDQUFDLEtBQUksQ0FBQyxhQUFhLEdBQUcsY0FBTyxDQUFDLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxVQUFVLENBQWUsVUFBQyxRQUFnQztZQUNsRixLQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25ELE9BQU8sY0FBTSxPQUFBLENBQUMsS0FBSSxDQUFDLGNBQWMsR0FBRyxjQUFPLENBQUMsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQVFELHlDQUFtQjtJQVVuQix3Q0FBa0I7SUFVbEIsaUNBQVc7SUFZWCwwQkFBSSxhQUFDLFVBQThFO0lBTW5GLDJCQUFLO0lBTUwsNkJBQU87SUFRUCw0QkFBTSxhQUFDLFlBQW9CO0lBUTNCLCtCQUFTLGFBQUMsTUFBYztJQUd4Qiw2QkFBTyxhQUFDLFNBQWlCO0lBTXpCLGlDQUFXO0lBTVgsZ0NBQVU7SUFNVixpQ0FBVztJQU1YLGtDQUFZO0lBTVosMEJBQUk7MEJBaElnQix3Q0FBZTs7Ozs7OzBCQUtmLHNDQUFhOzs7Ozs7MEJBS2IsdUNBQWM7Ozs7OztzQkExQ3BDOzs7QUFpTEEsTUFBTSxDQUFOLElBQVksWUFNWDtBQU5ELFdBQVksWUFBWTtJQUN0QiwrQ0FBUSxDQUFBO0lBQ1IsdURBQVEsQ0FBQTtJQUNSLHFEQUFPLENBQUE7SUFDUCxtREFBTSxDQUFBO0lBQ04scURBQU8sQ0FBQTtBQUNULENBQUMsRUFOVyxZQUFZLEtBQVosWUFBWSxRQU12QjtBQUVELE1BQU0sQ0FBTixJQUFZLFdBS1g7QUFMRCxXQUFZLFdBQVc7SUFDckIsbURBQVcsQ0FBQTtJQUNYLG1EQUFPLENBQUE7SUFDUCxpREFBTSxDQUFBO0lBQ04sdURBQVMsQ0FBQTtBQUNYLENBQUMsRUFMVyxXQUFXLEtBQVgsV0FBVyxRQUt0Qjs7SUE2RzBCLHlCQUEwQjs7O1FBQ25ELFlBQVk7UUFDWjs7V0FFRztRQUNILGdCQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2Y7O1dBRUc7UUFDSCxvQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNuQjs7V0FFRztRQUNILG1CQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCOztXQUVHO1FBQ0gsa0JBQVksR0FBRyxDQUFDLENBQUM7UUFDakI7O1dBRUc7UUFDSCxtQkFBYSxHQUFHLENBQUMsQ0FBQztRQUVsQixjQUFjO1FBQ2Q7O1dBRUc7UUFDSCx1QkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDdEI7O1dBRUc7UUFDSCx1QkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDdEI7O1dBRUc7UUFDSCxzQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDckI7O1dBRUc7UUFDSCw4QkFBd0IsR0FBRyxDQUFDLENBQUM7OztJQUU3Qjs7Ozs7T0FLRztJQUNILHNCQUFNLEdBQU4sVUFBTyxHQUFXO1FBQ2hCLElBQUksUUFBYSxDQUFDO1FBRWxCLElBQUksaUJBQWlCLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDakYsNkJBQTZCO1lBQzdCLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDekM7UUFFRCxPQUFPLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7dUdBeERVLEtBQUs7MkdBQUwsS0FBSzs7Ozs7O0lBQUwsS0FBSyxrQkFBTCxLQUFLO2dCQTNTbEI7RUEyUzJCLDBCQUEwQjtTQUF4QyxLQUFLOzRGQUFMLEtBQUs7a0JBRGpCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb3Jkb3ZhSW5zdGFuY2UsXG4gIEluc3RhbmNlUHJvcGVydHksXG4gIEF3ZXNvbWVDb3Jkb3ZhTmF0aXZlUGx1Z2luLFxuICBQbHVnaW4sXG4gIGNoZWNrQXZhaWxhYmlsaXR5LFxufSBmcm9tICdAYXdlc29tZS1jb3Jkb3ZhLXBsdWdpbnMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGNsYXNzIE1lZGlhT2JqZWN0IHtcbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCBub3RpZmllcyB5b3Ugb24gYWN0aW9ucyBzdWNjZXNzXG4gICAqL1xuICBvblN1Y2Nlc3M6IE9ic2VydmFibGU8YW55PjtcblxuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IG5vdGlmaWVzIHlvdSB3aGVuIGFuIGVycm9yIG9jY3Vyc1xuICAgKi9cbiAgb25FcnJvcjogT2JzZXJ2YWJsZTxNRURJQV9FUlJPUj47XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCBub3RpZmllcyB5b3Ugd2hlbiB0aGUgZmlsZSBzdGF0dXMgY2hhbmdlc1xuICAgKi9cbiAgb25TdGF0dXNVcGRhdGU6IE9ic2VydmFibGU8TUVESUFfU1RBVFVTPjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgQEluc3RhbmNlUHJvcGVydHkoKSBzdWNjZXNzQ2FsbGJhY2s6IEZ1bmN0aW9uO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBASW5zdGFuY2VQcm9wZXJ0eSgpIGVycm9yQ2FsbGJhY2s6IEZ1bmN0aW9uO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBASW5zdGFuY2VQcm9wZXJ0eSgpIHN0YXR1c0NhbGxiYWNrOiBGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vYmplY3RJbnN0YW5jZTogYW55KSB7XG4gICAgdGhpcy5vblN1Y2Nlc3MgPSBuZXcgT2JzZXJ2YWJsZTxhbnk+KChvYnNlcnZlcjogT2JzZXJ2ZXI8YW55PikgPT4ge1xuICAgICAgdGhpcy5zdWNjZXNzQ2FsbGJhY2sgPSBvYnNlcnZlci5uZXh0LmJpbmQob2JzZXJ2ZXIpO1xuICAgICAgcmV0dXJuICgpID0+ICh0aGlzLnN1Y2Nlc3NDYWxsYmFjayA9ICgpID0+IHt9KTtcbiAgICB9KTtcblxuICAgIHRoaXMub25FcnJvciA9IG5ldyBPYnNlcnZhYmxlPE1FRElBX0VSUk9SPigob2JzZXJ2ZXI6IE9ic2VydmVyPE1FRElBX0VSUk9SPikgPT4ge1xuICAgICAgdGhpcy5lcnJvckNhbGxiYWNrID0gb2JzZXJ2ZXIubmV4dC5iaW5kKG9ic2VydmVyKTtcbiAgICAgIHJldHVybiAoKSA9PiAodGhpcy5lcnJvckNhbGxiYWNrID0gKCkgPT4ge30pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5vblN0YXR1c1VwZGF0ZSA9IG5ldyBPYnNlcnZhYmxlPE1FRElBX1NUQVRVUz4oKG9ic2VydmVyOiBPYnNlcnZlcjxNRURJQV9TVEFUVVM+KSA9PiB7XG4gICAgICB0aGlzLnN0YXR1c0NhbGxiYWNrID0gb2JzZXJ2ZXIubmV4dC5iaW5kKG9ic2VydmVyKTtcbiAgICAgIHJldHVybiAoKSA9PiAodGhpcy5zdGF0dXNDYWxsYmFjayA9ICgpID0+IHt9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgYW1wbGl0dWRlIG9mIHRoZSBjdXJyZW50IHJlY29yZGluZy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gUmV0dXJucyBhIHByb21pc2Ugd2l0aCB0aGUgYW1wbGl0dWRlIG9mIHRoZSBjdXJyZW50IHJlY29yZGluZ1xuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSgpXG4gIGdldEN1cnJlbnRBbXBsaXR1ZGUoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IHBvc2l0aW9uIHdpdGhpbiBhbiBhdWRpbyBmaWxlLiBBbHNvIHVwZGF0ZXMgdGhlIE1lZGlhIG9iamVjdCdzIHBvc2l0aW9uIHBhcmFtZXRlci5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gUmV0dXJucyBhIHByb21pc2Ugd2l0aCB0aGUgcG9zaXRpb24gb2YgdGhlIGN1cnJlbnQgcmVjb3JkaW5nXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKClcbiAgZ2V0Q3VycmVudFBvc2l0aW9uKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZHVyYXRpb24gb2YgYW4gYXVkaW8gZmlsZSBpbiBzZWNvbmRzLiBJZiB0aGUgZHVyYXRpb24gaXMgdW5rbm93biwgaXQgcmV0dXJucyBhIHZhbHVlIG9mIC0xLlxuICAgKlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGEgcHJvbWlzZSB3aXRoIHRoZSBkdXJhdGlvbiBvZiB0aGUgY3VycmVudCByZWNvcmRpbmdcbiAgICovXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoeyBzeW5jOiB0cnVlIH0pXG4gIGdldER1cmF0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBvciByZXN1bWVzIHBsYXlpbmcgYW4gYXVkaW8gZmlsZS5cbiAgICpcbiAgICogQHBhcmFtIGlvc09wdGlvbnNcbiAgICogQHBhcmFtIGlvc09wdGlvbnMubnVtYmVyT2ZMb29wc1xuICAgKiBAcGFyYW0gaW9zT3B0aW9ucy5wbGF5QXVkaW9XaGVuU2NyZWVuSXNMb2NrZWRcbiAgICovXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoeyBzeW5jOiB0cnVlIH0pXG4gIHBsYXkoaW9zT3B0aW9ucz86IHsgbnVtYmVyT2ZMb29wcz86IG51bWJlcjsgcGxheUF1ZGlvV2hlblNjcmVlbklzTG9ja2VkPzogYm9vbGVhbiB9KTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBQYXVzZXMgcGxheWluZyBhbiBhdWRpbyBmaWxlLlxuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgcGF1c2UoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBSZWxlYXNlcyB0aGUgdW5kZXJseWluZyBvcGVyYXRpbmcgc3lzdGVtJ3MgYXVkaW8gcmVzb3VyY2VzLiBUaGlzIGlzIHBhcnRpY3VsYXJseSBpbXBvcnRhbnQgZm9yIEFuZHJvaWQsIHNpbmNlIHRoZXJlIGFyZSBhIGZpbml0ZSBhbW91bnQgb2YgT3BlbkNvcmUgaW5zdGFuY2VzIGZvciBtZWRpYSBwbGF5YmFjay4gQXBwbGljYXRpb25zIHNob3VsZCBjYWxsIHRoZSByZWxlYXNlIGZ1bmN0aW9uIGZvciBhbnkgTWVkaWEgcmVzb3VyY2UgdGhhdCBpcyBubyBsb25nZXIgbmVlZGVkLlxuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgcmVsZWFzZSgpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGN1cnJlbnQgcG9zaXRpb24gd2l0aGluIGFuIGF1ZGlvIGZpbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtaWxsaXNlY29uZHMgVGhlIHRpbWUgcG9zaXRpb24geW91IHdhbnQgdG8gc2V0IGZvciB0aGUgY3VycmVudCBhdWRpbyBmaWxlXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICBzZWVrVG8obWlsbGlzZWNvbmRzOiBudW1iZXIpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdm9sdW1lIGZvciBhbiBhdWRpbyBmaWxlLlxuICAgKlxuICAgKiBAcGFyYW0gdm9sdW1lIHtudW1iZXJ9IFRoZSB2b2x1bWUgdG8gc2V0IGZvciBwbGF5YmFjay4gVGhlIHZhbHVlIG11c3QgYmUgd2l0aGluIHRoZSByYW5nZSBvZiAwLjAgdG8gMS4wLlxuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgc2V0Vm9sdW1lKHZvbHVtZTogbnVtYmVyKTogdm9pZCB7fVxuXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoeyBzeW5jOiB0cnVlIH0pXG4gIHNldFJhdGUoc3BlZWRSYXRlOiBudW1iZXIpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyByZWNvcmRpbmcgYW4gYXVkaW8gZmlsZS5cbiAgICovXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoeyBzeW5jOiB0cnVlIH0pXG4gIHN0YXJ0UmVjb3JkKCk6IHZvaWQge31cblxuICAvKipcbiAgICogU3RvcHMgcmVjb3JkaW5nXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICBzdG9wUmVjb3JkKCk6IHZvaWQge31cblxuICAvKipcbiAgICogUGF1c2VzIHJlY29yZGluZ1xuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgcGF1c2VSZWNvcmQoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBSZXN1bWVzIHJlY29yZGluZ1xuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgcmVzdW1lUmVjb3JkKCk6IHZvaWQge31cblxuICAvKipcbiAgICogU3RvcHMgcGxheWluZyBhbiBhdWRpbyBmaWxlLlxuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgc3RvcCgpOiB2b2lkIHt9XG59XG5cbmV4cG9ydCB0eXBlIE1lZGlhU3RhdHVzVXBkYXRlQ2FsbGJhY2sgPSAoc3RhdHVzQ29kZTogbnVtYmVyKSA9PiB2b2lkO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1lZGlhRXJyb3Ige1xuICAvKipcbiAgICogRXJyb3IgbWVzc2FnZVxuICAgKi9cbiAgbWVzc2FnZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBFcnJvciBjb2RlXG4gICAqL1xuICBjb2RlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBlbnVtIE1FRElBX1NUQVRVUyB7XG4gIE5PTkUgPSAwLFxuICBTVEFSVElORyxcbiAgUlVOTklORyxcbiAgUEFVU0VELFxuICBTVE9QUEVELFxufVxuXG5leHBvcnQgZW51bSBNRURJQV9FUlJPUiB7XG4gIEFCT1JURUQgPSAxLFxuICBORVRXT1JLLFxuICBERUNPREUsXG4gIFNVUFBPUlRFRCxcbn1cblxuZXhwb3J0IHR5cGUgTWVkaWFFcnJvckNhbGxiYWNrID0gKGVycm9yOiBNZWRpYUVycm9yKSA9PiB2b2lkO1xuXG4vKipcbiAqIEBuYW1lIE1lZGlhXG4gKiBAcHJlbWllciBtZWRpYVxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGlzIHBsdWdpbiBwcm92aWRlcyB0aGUgYWJpbGl0eSB0byByZWNvcmQgYW5kIHBsYXkgYmFjayBhdWRpbyBmaWxlcyBvbiBhIGRldmljZS5cbiAqIEB1c2FnZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgTWVkaWEsIE1lZGlhT2JqZWN0IH0gZnJvbSAnQGF3ZXNvbWUtY29yZG92YS1wbHVnaW5zL21lZGlhL25neCc7XG4gKlxuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgbWVkaWE6IE1lZGlhKSB7IH1cbiAqXG4gKlxuICogLi4uXG4gKlxuICpcbiAqIC8vIENyZWF0ZSBhIE1lZGlhIGluc3RhbmNlLiAgRXhwZWN0cyBwYXRoIHRvIGZpbGUgb3IgdXJsIGFzIGFyZ3VtZW50XG4gKiAvLyBXZSBjYW4gb3B0aW9uYWxseSBwYXNzIGEgc2Vjb25kIGFyZ3VtZW50IHRvIHRyYWNrIHRoZSBzdGF0dXMgb2YgdGhlIG1lZGlhXG4gKlxuICogY29uc3QgZmlsZTogTWVkaWFPYmplY3QgPSB0aGlzLm1lZGlhLmNyZWF0ZSgnZmlsZS5tcDMnKTtcbiAqXG4gKiAvLyB0byBsaXN0ZW4gdG8gcGx1Z2luIGV2ZW50czpcbiAqXG4gKiBmaWxlLm9uU3RhdHVzVXBkYXRlLnN1YnNjcmliZShzdGF0dXMgPT4gY29uc29sZS5sb2coc3RhdHVzKSk7IC8vIGZpcmVzIHdoZW4gZmlsZSBzdGF0dXMgY2hhbmdlc1xuICpcbiAqIGZpbGUub25TdWNjZXNzLnN1YnNjcmliZSgoKSA9PiBjb25zb2xlLmxvZygnQWN0aW9uIGlzIHN1Y2Nlc3NmdWwnKSk7XG4gKlxuICogZmlsZS5vbkVycm9yLnN1YnNjcmliZShlcnJvciA9PiBjb25zb2xlLmxvZygnRXJyb3IhJywgZXJyb3IpKTtcbiAqXG4gKiAvLyBwbGF5IHRoZSBmaWxlXG4gKiBmaWxlLnBsYXkoKTtcbiAqXG4gKiAvLyBwYXVzZSB0aGUgZmlsZVxuICogZmlsZS5wYXVzZSgpO1xuICpcbiAqIC8vIGdldCBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uXG4gKiBmaWxlLmdldEN1cnJlbnRQb3NpdGlvbigpLnRoZW4oKHBvc2l0aW9uKSA9PiB7XG4gKiAgIGNvbnNvbGUubG9nKHBvc2l0aW9uKTtcbiAqIH0pO1xuICpcbiAqIC8vIGdldCBmaWxlIGR1cmF0aW9uXG4gKiBsZXQgZHVyYXRpb24gPSBmaWxlLmdldER1cmF0aW9uKCk7XG4gKiBjb25zb2xlLmxvZyhkdXJhdGlvbik7XG4gKlxuICogLy8gc2tpcCB0byAxMCBzZWNvbmRzIChleHBlY3RzIGludCB2YWx1ZSBpbiBtcylcbiAqIGZpbGUuc2Vla1RvKDEwMDAwKTtcbiAqXG4gKiAvLyBzdG9wIHBsYXlpbmcgdGhlIGZpbGVcbiAqIGZpbGUuc3RvcCgpO1xuICpcbiAqIC8vIHJlbGVhc2UgdGhlIG5hdGl2ZSBhdWRpbyByZXNvdXJjZVxuICogLy8gUGxhdGZvcm0gUXVpcmtzOlxuICogLy8gaU9TIHNpbXBseSBjcmVhdGUgYSBuZXcgaW5zdGFuY2UgYW5kIHRoZSBvbGQgb25lIHdpbGwgYmUgb3ZlcndyaXR0ZW5cbiAqIC8vIEFuZHJvaWQgeW91IG11c3QgY2FsbCByZWxlYXNlKCkgdG8gZGVzdHJveSBpbnN0YW5jZXMgb2YgbWVkaWEgd2hlbiB5b3UgYXJlIGRvbmVcbiAqIGZpbGUucmVsZWFzZSgpO1xuICpcbiAqXG4gKlxuICogLy8gUmVjb3JkaW5nIHRvIGEgZmlsZVxuICogY29uc3QgZmlsZTogTWVkaWFPYmplY3QgPSB0aGlzLm1lZGlhLmNyZWF0ZSgncGF0aC90by9maWxlLm1wMycpO1xuICpcbiAqIGZpbGUuc3RhcnRSZWNvcmQoKTtcbiAqXG4gKiBmaWxlLnN0b3BSZWNvcmQoKTtcbiAqXG4gKlxuICogYGBgXG4gKlxuICogU29tZSBoaW50cyBpZiB5b3UgYXJlIHVzaW5nIGlPUyBhbmQgcmVjb3JkaW5nIGRvZXNuJ3Qgd29yazpcbiAqIDEuKSBUcnkgdG8gdXNlIGEgYWJzb2x1dGUgZmlsZSBwYXRoIGJ1dCByZW1vdmUgYmVnaW5uaW5nIFwiZmlsZTovL1wiLlxuICogVGhlbiBpdCBsb29rcyBsaWtlOiBgL3Zhci9tb2JpbGUvQ29udGFpbmVycy9EYXRhL0FwcGxpY2F0aW9uL0FGNDM4QjhCLTc3MjQtNEZCQi04RTY5LTA4MzQ2MzIyNEZDNC90bXAvbXlfZmlsZS5tNGFgXG4gKiBFeGFtcGxlOiBgdGhpcy5tZWRpYS5jcmVhdGUodGhpcy5maWxlLnRlbXBEaXJlY3RvcnkucmVwbGFjZSgvXmZpbGU6XFwvXFwvLywgJycpICsgJ215X2ZpbGUubTRhJylgXG4gKiAyLikgSWYgdGhhdCdzIG5vdCB3b3JraW5nLCB0b28sIGNyZWF0ZSB0aGUgZmlsZSBiZWZvcmUgdXNpbmcuXG4gKiBFeGFtcGxlOlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgTWVkaWEsIE1lZGlhT2JqZWN0IH0gZnJvbSAnQGF3ZXNvbWUtY29yZG92YS1wbHVnaW5zL21lZGlhL25neCc7XG4gKiBpbXBvcnQgeyBGaWxlIH0gZnJvbSAnQGF3ZXNvbWUtY29yZG92YS1wbHVnaW5zL2ZpbGUvbmd4JztcbiAqXG4gKiAuLi5cbiAqXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIG1lZGlhOiBNZWRpYSwgcHJpdmF0ZSBmaWxlOiBGaWxlKSB7IH1cbiAqXG4gKiAuLi5cbiAqXG4gKiB0aGlzLmZpbGUuY3JlYXRlRmlsZSh0aGlzLmZpbGUudGVtcERpcmVjdG9yeSwgJ215X2ZpbGUubTRhJywgdHJ1ZSkudGhlbigoKSA9PiB7XG4gKiAgIGxldCBmaWxlID0gdGhpcy5tZWRpYS5jcmVhdGUodGhpcy5maWxlLnRlbXBEaXJlY3RvcnkucmVwbGFjZSgvXmZpbGU6XFwvXFwvLywgJycpICsgJ215X2ZpbGUubTRhJyk7XG4gKiAgIGZpbGUuc3RhcnRSZWNvcmQoKTtcbiAqICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gZmlsZS5zdG9wUmVjb3JkKCksIDEwMDAwKTtcbiAqIH0pO1xuICogYGBgXG4gKlxuICogWW91IGNhbiBmaW5kIHRoZSByZWFzb25zIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9pb25pYy10ZWFtL2lvbmljLW5hdGl2ZS9pc3N1ZXMvMTQ1MiNpc3N1ZWNvbW1lbnQtMjk5NjA1OTA2XG4gKiBAY2xhc3Nlc1xuICogTWVkaWFPYmplY3RcbiAqIEBpbnRlcmZhY2VzXG4gKiBNZWRpYUVycm9yXG4gKi9cbkBQbHVnaW4oe1xuICBwbHVnaW5OYW1lOiAnTWVkaWEnLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL2FwYWNoZS9jb3Jkb3ZhLXBsdWdpbi1tZWRpYScsXG4gIHBsdWdpbjogJ2NvcmRvdmEtcGx1Z2luLW1lZGlhJyxcbiAgcGx1Z2luUmVmOiAnTWVkaWEnLFxuICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCcsICdCcm93c2VyJywgJ2lPUycsICdXaW5kb3dzJ10sXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lZGlhIGV4dGVuZHMgQXdlc29tZUNvcmRvdmFOYXRpdmVQbHVnaW4ge1xuICAvLyBDb25zdGFudHNcbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIE1FRElBX05PTkUgPSAwO1xuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgTUVESUFfU1RBUlRJTkcgPSAxO1xuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgTUVESUFfUlVOTklORyA9IDI7XG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBNRURJQV9QQVVTRUQgPSAzO1xuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgTUVESUFfU1RPUFBFRCA9IDQ7XG5cbiAgLy8gZXJyb3IgY29kZXNcbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIE1FRElBX0VSUl9BQk9SVEVEID0gMTtcbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIE1FRElBX0VSUl9ORVRXT1JLID0gMjtcbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIE1FRElBX0VSUl9ERUNPREUgPSAzO1xuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgTUVESUFfRVJSX05PTkVfU1VQUE9SVEVEID0gNDtcblxuICAvKipcbiAgICogT3BlbiBhIG1lZGlhIGZpbGVcbiAgICpcbiAgICogQHBhcmFtIHNyYyB7c3RyaW5nfSBBIFVSSSBjb250YWluaW5nIHRoZSBhdWRpbyBjb250ZW50LlxuICAgKiBAcmV0dXJucyB7TWVkaWFPYmplY3R9XG4gICAqL1xuICBjcmVhdGUoc3JjOiBzdHJpbmcpOiBNZWRpYU9iamVjdCB7XG4gICAgbGV0IGluc3RhbmNlOiBhbnk7XG5cbiAgICBpZiAoY2hlY2tBdmFpbGFiaWxpdHkoTWVkaWEuZ2V0UGx1Z2luUmVmKCksIG51bGwsIE1lZGlhLmdldFBsdWdpbk5hbWUoKSkgPT09IHRydWUpIHtcbiAgICAgIC8vIENyZWF0ZXMgYSBuZXcgbWVkaWEgb2JqZWN0XG4gICAgICBpbnN0YW5jZSA9IG5ldyAoTWVkaWEuZ2V0UGx1Z2luKCkpKHNyYyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBNZWRpYU9iamVjdChpbnN0YW5jZSk7XG4gIH1cbn1cbiJdfQ==