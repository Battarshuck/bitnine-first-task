FROM node
WORKDIR /app
COPY ./ ./
RUN rm -rf node_modules
RUN npm install
#RUN npm rebuild bcrypt --build-from-source
EXPOSE 3000
CMD ["node", "./index.js"]
