# import libraries
from fastapi import FastAPI
from urllib.request import urlopen
from bs4 import BeautifulSoup

# set up api
app = FastAPI()

base_page = "https://www.masterofmalt.com/"

@app.get("/whiskies/{id}")
def read_root(id):
    return get_whisky_details(id)

def get_whisky_details(id):
    html = urlopen(base_page + "whiskies/" + id)
    
    soup = BeautifulSoup(html, "html.parser")

    title = soup.find("h1").text.strip()

    img = soup.find("img", id=lambda x: x and x.endswith("imgProductBig"))["src"]
    
    tasting_notes = soup.findAll("p", id=lambda x: x and x.endswith('TastingNote'))
    notes = list(map(get_tasting_note, tasting_notes))

    return {"title": title, "tastingNotes": notes, "image": img}

def get_tasting_note(tasting_note):
    title = tasting_note.find("b").text.strip()
    value = tasting_note.find("b").next_sibling.string.strip()
    return {title: value}
