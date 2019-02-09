FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
RUN pip install requests
RUN pip install BeautifulSoup4
COPY ./app /app
