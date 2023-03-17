FROM node:16

ENV NODE_ENV=production
ENV REACT_APP_KIS_APP_KEY=PSdySR77gPj9IPxj9gVo8grPKo9ukq2PA8L9
ENV REACT_APP_KIS_APP_SECRET=7cDFZtjo8rq7CcdB/TtV74nWImqh6xuWnmLk5iNouKetyq1lK4RLpUTQPJhsBDS55rn2utGMfKNJZ7rRdIfnHiQGb29wr/B8/b2sizKCWOWGtgkd4xlmeiJ87E5ug6c8PU2t66Tt/qljYPX7SeCwK0a5BHsq/6k9DFI70EjGTANRGXjxhyo=
ENV KIS_APP_KEY=PSdySR77gPj9IPxj9gVo8grPKo9ukq2PA8L9
ENV KIS_APP_SECRET=7cDFZtjo8rq7CcdB/TtV74nWImqh6xuWnmLk5iNouKetyq1lK4RLpUTQPJhsBDS55rn2utGMfKNJZ7rRdIfnHiQGb29wr/B8/b2sizKCWOWGtgkd4xlmeiJ87E5ug6c8PU2t66Tt/qljYPX7SeCwK0a5BHsq/6k9DFI70EjGTANRGXjxhyo=
ENV NAVER_CLIENT_ID=Q5zrCm6sySQGT0Yhlo06
ENV NAVER_CLIENT_SECRET=3dfIIvWdD7

# 앱 디렉터리 생성
WORKDIR /usr/src/app/stock

# 앱 소스 추가
COPY . .

RUN npm install
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production

EXPOSE 3001
CMD [ "nohup", "node", "server/index.js", "&" ]