import requests
from bs4 import BeautifulSoup

base_page = "https://www.masterofmalt.com/"

def get_whisky_details(id):
    r = requests.get(base_page + "whiskies/" + id)

    soup = BeautifulSoup(r.text, "html.parser")

    title = soup.find("h1").text.strip()

    img = soup.find(
        "img",
        id=lambda x: x and x.endswith("imgProductBig")
    )["src"]

    tasting_notes = soup.findAll(
        "p",
        id=lambda x: x and x.endswith('TastingNote')
    )

    notes = list(map(get_tasting_note, tasting_notes))

    return {
        "title": title,
        "tastingNotes": notes,
        "image": img
    }

def get_tasting_note(tasting_note):
    title = tasting_note.find("b").text.strip()
    value = tasting_note.find("b").next_sibling.string.strip()
    return {
        title: value
    }
