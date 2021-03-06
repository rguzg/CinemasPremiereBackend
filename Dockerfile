FROM node:14-alpine

ARG ENVIRONMENT

ARG URL_BASE

ENV PATH="$PATH:/home/node/.yarn/bin"

USER node

RUN mkdir -p /home/node

WORKDIR /home/node

COPY --chown=node package.json ${WORKDIR}

RUN yarn global add prisma@1.34.10

RUN yarn install

COPY --chown=node . ${WORKDIR}

RUN prisma generate

EXPOSE 4000

CMD ["yarn", "start"]