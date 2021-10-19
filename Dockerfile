FROM node:14-alpine

ENV PATH="$PATH:/home/node/.yarn/bin"

USER node

RUN mkdir -p /home/node

WORKDIR /home/node

COPY --chown=node package.json ${WORKDIR}

RUN yarn global add prisma@1.34.10

RUN yarn install

COPY --chown=node . ${WORKDIR}

EXPOSE 4000

CMD ["yarn", "start"]