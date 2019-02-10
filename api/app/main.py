# import libraries
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

import mom_search
from mom_details import get_whisky_details

# set up api
app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=['*'])

@app.get("/whiskies/{id}")
def get_whisky(id):
    return get_whisky_details(id)

# TODO: Fold into above
@app.get("/whiskies/{distillery}/{id}")
def get_whisky2(distillery, id):
    return get_whisky_details(distillery + "/" + id)

@app.get("/search/{terms}")
def search(terms):
    return mom_search.search(terms)
