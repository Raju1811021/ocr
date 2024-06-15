import requests,json
API_KEY='K86926413688957'

def get_document_text(doc_file,doc_binary):
    url="https://api.ocr.space/parse/image"

    files = {'file': (doc_file.name, doc_binary, doc_file.content_type)}

    payload={
        "language":"eng",
        "apikey":API_KEY,
        "OCREngine":2,
        "isOverlayRequired":True,
        
    }

    try:
        res=requests.post(
                url=url,
                files=files,
                data=payload,
            )
        if res.status_code==200:
             return res.json()['ParsedResults'][0].get("ParsedText")
             
        else:
             return "Error in extraction"

    except Exception as e:
            print("Exception in extraction",e)
            return str(e)