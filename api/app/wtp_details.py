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
    note_node_title = tasting_note.find("b")
    if note_node_title is None:
        return {
            "title": "",
            "value": tasting_note.text.strip()
        }

    else:
        title = note_node_title.text.strip()
        value = note_node_title.next_sibling.string.strip()
        return {
            "title": title,
            "value": value
        }
