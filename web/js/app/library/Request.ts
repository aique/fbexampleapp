export class Request
{
    private requestParams: any;
    private request: any;
    private paramDelimiter: string;

    constructor(request, paramDelimiter)
    {
        this.requestParams = {};
        this.request = request;
        this.paramDelimiter = paramDelimiter;

        this.parseRequestParams()
    }

    private parseRequestParams()
    {
        var paramInfo = this.request.split(this.paramDelimiter);

        if(paramInfo.length == 2)
        {
            var requestParams: any = paramInfo[1].split("&");

            for(var i = 0 ; i < requestParams.length ; i++)
            {
                var pair = requestParams[i].split("=");

                if(typeof requestParams[pair[0]] === "undefined")
                {
                    this.requestParams[pair[0]] = pair[1];
                }
                else
                {
                    if(typeof this.requestParams[pair[0]] === "string")
                    {
                        var arr = [this.requestParams[pair[0]], pair[1]];
                        this.requestParams[pair[0]] = arr;
                    }
                    else
                    {
                        this.requestParams[pair[0]].push(pair[1]);
                    }
                }
            }
        }
    }

    public getParam(name: string)
    {
        for(var key in this.requestParams)
        {
            if(key == name)
            {
                return this.requestParams[key];
            }
        }

        return null;
    }
}