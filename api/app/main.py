# import libraries
from fastapi import FastAPI
from starlette.requests import Request

import mom_search
from mom_details import get_whisky_details

# set up api
app = FastAPI()

@app.get("/whiskies/{slug:path}")
def get_whisky(request: Request):
    vals = dict(request.path_params)
    return get_whisky_details(vals["slug"])

@app.get("/search")
def search(terms):
    return mom_search.search(terms)
