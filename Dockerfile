FROM sitespeedio/webbrowsers:firefox-50.1-chrome-55.0-1

ENV SITESPEED_IO_BROWSERTIME__XVFB true
ENV SITESPEED_IO_BROWSERTIME__CONNECTIVITY__ENGINE tc
ENV SITESPEED_IO_BROWSERTIME__CHROME__ARGS no-sandbox

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --production
COPY . /usr/src/app

COPY docker/scripts/start.sh /start.sh

ENTRYPOINT ["/start.sh"]
VOLUME /sitespeed.io
WORKDIR /sitespeed.io
