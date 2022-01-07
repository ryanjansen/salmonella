# 
FROM python:3.9

# 
WORKDIR /code

RUN apt-get update
RUN apt-get install libcairo2-dev libpango1.0-dev ffmpeg -y
# 
COPY ./requirements.txt /code/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 
COPY . .

# 
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
