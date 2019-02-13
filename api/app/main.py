# import libraries
from fastapi import FastAPI

import mom_search
from mom_details import get_whisky_details

# set up api
app = FastAPI()

@app.get("/whiskies/{id}")
def get_whisky(id):
    return get_whisky_details(id)

# TODO: Fold into above
@app.get("/whiskies/{distillery}/{id}")
def get_whisky2(distillery, id):
    return get_whisky_details(distillery + "/" + id)

@app.get("/search")
def search(terms):
    return mom_search.search(terms)
