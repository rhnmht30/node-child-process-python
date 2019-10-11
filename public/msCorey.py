from bs4 import BeautifulSoup
import requests
import csv


source = requests.get('https://coreyms.com').text

csv_file = open('public/ms_corey_csv_file.csv','w')

csv_writer = csv.writer(csv_file)

csv_writer.writerow(['headline', 'video_link'])

soup = BeautifulSoup(source,'lxml')

for article in soup.find_all('article'):
    headline = article.h2.a.text
    print(headline)

    try:
        youtube_link = article.find('iframe',class_='youtube-player')['src']
        yt_link = youtube_link.split('/')[4]
        yt_link = yt_link.split('?')[0]
        yt_link = f'https://youtube.com/watch?v={yt_link}'
    except Exception as e:
        yt_link = None

    print(yt_link)
    print()

    csv_writer.writerow([headline,yt_link])

csv_file.close()
