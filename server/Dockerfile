# 
FROM manimcommunity/manim:latest

ENV PATH="/manim/.local/bin:${PATH}"

# 
WORKDIR /code


COPY ./requirements.txt /code/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 
COPY . .

# 
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
