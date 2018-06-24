import requests
import pprint

url_template = r'http://data.calgary.ca/resource/{}.json'
transit_peace_officer_calls = url_template.format(r'w2wh-829k')
transit_person_crime_and_ridership = url_template.format(r'b6q3-smff')
pprint.pprint(requests.get(transit_peace_officer_calls).json())
pprint.pprint(requests.get(transit_person_crime_and_ridership).json())