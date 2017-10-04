
#from flask import Flask, jsonify, request
import requests, bs4, sys

res = requests.get('https://www.amazon.com.mx/gp/product/B01IX9Q4WM/')
print(res.text)
try:
	res.raise_for_status()
except:
	print("error")

amSoup = bs4.BeautifulSoup(res.text)
pictures = amSoup.select('#landingImage')
if len(pictures) == 0:
	print("error1")
else:
	sThumbnail = pictures[0].get('data-old-hires')
	sName = pictures[0].get('alt')
	priceBlock = amSoup.select('#priceblock_ourprice')
	
	if len(priceBlock) == 0:
		print("error2")
	else:
		sPrice = priceBlock[0].getText()
		print (sName + " " + sPrice +" " + sThumbnail)
