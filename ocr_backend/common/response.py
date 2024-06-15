from rest_framework.response import Response
import time

def simple_response(data,status_code,status):
    res={}
    res["status_code"]=status_code
    
    if "data" in data:
        res["data"]=data.get("data")
    
    if "msg" in data:
        res["msg"]=data.get("msg")
    
    res["status"]=status

    res["timestamp"]=int(time.time()*1000)

    return Response(res)
    


