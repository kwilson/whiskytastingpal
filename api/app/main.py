# import libraries
from fastapi import FastAPI
from starlette.requests import Request

from wtp_search import search
from wtp_details import get_whisky_details

# set up api
app = FastAPI()

@app.get("/whiskies/{slug:path}")
def get_whisky(request: Request):
    vals = dict(request.path_params)
    return get_whisky_details(vals["slug"])

@app.get("/search")
def search_whisky(terms):
    return search(terms)
