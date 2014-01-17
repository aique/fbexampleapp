define(["require", "exports"], function(require, exports) {
    var Request = (function () {
        function Request(request, paramDelimiter) {
            this.requestParams = {};
            this.request = request;
            this.paramDelimiter = paramDelimiter;

            this.parseRequestParams();
        }
        Request.prototype.parseRequestParams = function () {
            var paramInfo = this.request.split(this.paramDelimiter);

            if (paramInfo.length == 2) {
                var requestParams = paramInfo[1].split("&");

                for (var i = 0; i < requestParams.length; i++) {
                    var pair = requestParams[i].split("=");

                    if (typeof requestParams[pair[0]] === "undefined") {
                        this.requestParams[pair[0]] = pair[1];
                    } else {
                        if (typeof this.requestParams[pair[0]] === "string") {
                            var arr = [this.requestParams[pair[0]], pair[1]];
                            this.requestParams[pair[0]] = arr;
                        } else {
                            this.requestParams[pair[0]].push(pair[1]);
                        }
                    }
                }
            }
        };

        Request.prototype.getParam = function (name) {
            for (var key in this.requestParams) {
                if (key == name) {
                    return this.requestParams[key];
                }
            }

            return null;
        };
        return Request;
    })();
    exports.Request = Request;
});
//# sourceMappingURL=Request.js.map
