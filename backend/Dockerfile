FROM python:3.12-alpine

# Install dependencies
RUN apk add --no-cache mariadb-connector-c-dev build-base

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy project
COPY . /app/

RUN ls -la /app

# Expose port 8000
EXPOSE 8000

# Run server
CMD /app/scripts-shell/wait.sh