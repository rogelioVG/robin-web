
from flask import Flask, jsonify, request
import requests, bs4
app = Flask(__name__)


@app.route('/_scrap')
def scrap():
	
	url = request.args.get('url','0',type = str)
	res = requests.get(url)
	try:
		res.raise_for_status()
	except:
		return jsonify(name = None, price = None, thumbnail = None)

	amSoup = bs4.BeautifulSoup(res.text)
	pictures = amSoup.select('#landingImage')

	if len(pictures) == 0:
		return jsonify(name = None, price = None, thumbnail = None)
	else:
		sThumbnail = pictures[0].get('data-old-hires')
		sName = pictures[0].get('alt')
		priceBlock = amSoup.select('#priceblock_ourprice')
		
		if len(priceBlock) == 0:
			return jsonify(name = None, price = None, thumbnail = None)
		else:
			sPrice = priceBlock[0].getText()

	return jsonify(name = sName, price = sPrice, thumbnail = sThumbnail)

if __name__ == "__main__":
	app.run()