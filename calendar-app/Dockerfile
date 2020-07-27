FROM ruby:2.7.1

ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

ENV BUNDLE_PATH=/vendor/bundle \
    BUNDLE_JOBS=4

RUN apt-get update -q && apt-get upgrade -y && \
    gem install bundler

WORKDIR /app
