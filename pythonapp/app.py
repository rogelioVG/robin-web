
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

import requests, bs4
app = Flask(__name__)
CORS(app,supports_credentials = True)

@app.route('/_scrap')
def scrap():
	print("request")
	url = request.args.get('url','0',type = str)
	headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'}
	#url = sys.argv[1]
	print(url)
	res = requests.get(url, headers = headers)
	
	
	try:
		res.raise_for_status()
	except:
		print("pagina no encontrada")
		response = jsonify(name = None, price = None, thumbnail = None)
		return response
	
	amSoup = bs4.BeautifulSoup(res.text)
	pictures = amSoup.select('#landingImage')

	if len(pictures) == 0:
		print("fotos no encontradas")
		response = jsonify(name = None, price = None, thumbnail = None)
		return response
	else:
		sThumbnail = pictures[0].get('data-old-hires')
		sName = pictures[0].get('alt')
		priceBlock = amSoup.select('#priceblock_ourprice')
		
		if len(priceBlock) == 0:
			print("precio no encontrado")
			response = jsonify(name = None, price = None, thumbnail = None)
			return response
		else:
			sPrice = priceBlock[0].getText()
			print (sName + " " + sPrice +" " + sThumbnail)
			response = jsonify(name = sName, price = sPrice, thumbnail = sThumbnail)
			return response


@app.route('/')
def home():
	return "kk"

if __name__ == "__main__":
	app.run(debug = True)