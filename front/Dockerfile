FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

# RUN npm run build



# 3000番ポートを公開
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "run", "dev"]
