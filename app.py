#from flask import Flask, jsonify, request
import requests, bs4, sys

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'}
res = requests.get('https://www.amazon.com.mx/gp/B01C93CWU6/', headers = headers)

#resText = res.text
#print (resText.encode('cp850', errors='replace'))
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
