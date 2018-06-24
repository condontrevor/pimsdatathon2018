import time
import random
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import google.cloud.firestore as fs

cred = credentials.Certificate('./adminsdk.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

while True:
    crawler_ref = db.collection(u'events')
    lat = random.uniform(51.035, 51.037)
    long = random.uniform(-114.090, -114.093)
    new_obj_ref = crawler_ref.add({
        'location': fs.GeoPoint(latitude=lat, longitude=long)
    })
    time.sleep(1)
