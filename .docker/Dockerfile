# start with official ruby docker image as base
FROM ruby:3.3-slim-bookworm

# install build dependencies
# (libcurl4: loaded at runtime by html-proofer, via typhoeus/ethon)
RUN apt update && apt install -y build-essential python3 python3-pip gcc g++ make libcurl4 && rm -rf /var/lib/apt/lists/*

# install ruby packages outside the app folder, so the repo's Gemfile.lock
# (mounted over /usr/src/app at runtime) can't pin gems the image doesn't have
WORKDIR /usr/src/deps
COPY Gemfile ./
RUN gem install bundler && bundle install
ENV BUNDLE_GEMFILE=/usr/src/deps/Gemfile

# set working directory within container
WORKDIR /usr/src/app

# pull in python (cite process) package info
COPY _cite/requirements.txt ./

# install python packages
RUN python3 -m pip install --no-cache-dir --upgrade --break-system-packages --requirement requirements.txt

# install python package for listening for file changes
RUN pip install --break-system-packages "watchdog[watchmedo]==3.0.0"

# ports used by jekyll
EXPOSE 4000
EXPOSE 35729

# run jekyll and cite process
COPY .docker/entrypoint.sh /var
CMD [ "/var/entrypoint.sh" ]
