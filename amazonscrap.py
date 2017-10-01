#! python3
import requests, bs4, sys

if len(sys.argv) > 1:
	url = sys.argv[1]
	res = requests.get(url)
	try:
		res.raise_for_status()
	except:
		print("Could not find page")
	amSoup = bs4.BeautifulSoup(res.text)
	pictures = amSoup.select('#landingImage')
	if len(pictures) == 0:
		print("Could not find page")
	else:
		thumbnail = pictures[0].get('data-old-hires')
		name = pictures[0].get('alt')
		priceBlock = amSoup.select('#priceblock_ourprice')
		if len(priceBlock) == 0:
			print("Could not find page")
		else:
			price = priceBlock[0].getText()
	print("Name: " + name)
	print("Price: " + price)
	print("Thumbnail" + thumbnail)
