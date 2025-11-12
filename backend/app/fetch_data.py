from fastapi import APIRouter, HTTPException
import requests
from datetime import datetime, timedelta
import os


# intialize router
router = APIRouter()

ACCESS_KEY = os.getenv('VITE_APP_ACCESS_KEY') # grab API Key
print(ACCESS_KEY)

def get_last_7_dates():
    dates = []
    today = datetime.now()
    for i in range(7):
       d = today - timedelta(days=i)
       dates.append(d.strftime("%Y-%m-%d")) # format datetime objects into nicer format (YYYY-MM-DD)

    return list(reversed(dates)) # reverse so it is chronological


@router.get("/nfl/games")
def get_nfl_games():

    # need to fetch the last 7 dates and then make query
    dates = get_last_7_dates()
    dates_str = '&'.join([f'dates[]={date}' for date in dates])
    print(dates_str)

    query = f'https://api.balldontlie.io/nfl/v1/games?{dates_str}'
    headers = {
        'Authorization': ACCESS_KEY
    } if ACCESS_KEY else {}

    # call to BallDontLieAPI
    try:
        response = requests.get(query, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        print(data) # for debugging
        return {'data': data.get('data', [])}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))