# express-mongo-scaffold

MongoDB + Express.js 구성의 API 애플리케이션

## Playing locally

로컬에서 띄우기 위해 준비해야 할 것은 다음과 같습니다.

* NodeJS >= 20.x.x
* _Docker Image_
* _docker-compose.yml_ 파일
* _.env_ 파일

도커 이미지 빌드
```
docker build . -t api:latest
```

_docker-compose.yml_ 파일은 _docker-compose.example.yml_ 파일을 복사하세요. 
```
cp docker-compose.example.yml docker-compose.yml
```

_.env_ 파일은 _.env.example_ 파일을 복사하세요. 

```
cp .env.example .env
```

이제 준비가 되었습니다. 다음 명령어를 타이핑 하세요. 
```
docker compose up
```

복사한 docker-compose.yml 파일에는 MongoDB가 _link_ 되어 있습니다. 그리고 _.env_ 파일에는 _MONGO_URI_ 환경변수가 MongoDB 컨테이너 주소를 가리킵니다. 만약 로컬에서 다른 MongoDB를 연결하려면 위 환경변수를 변경하세요. 

## Environment

정상적인 동작을 위해서는 다음의 환경변수들이 설정되어 있어야 합니다. 

* MONGO_URI: 몽고디비에 접속할 주소
* ACCESS_KEY_ID: AWS IAM ACCESS_KEY_ID
* SECRET_ACCESS_KEY: AWS IAM SECRET_ACCESS_KEY
* MASTER_KEY: API 접근을 허용할 MASTER_KEY (Basic Auth), 아직 사용하지 않습니다. 
* JWT_SECRET: JWT Token에 사용할 SECRET, 아직 사용하지 않습니다. 

## Directory structure

```
src/
├─ api/
│  ├─ user/
│  │  ├─ controller.js
│  │  ├─ index.js
│  │  ├─ index.test.js
│  │  ├─ model.js
│  │  └─ model.test.js
│  └─ index.js
├─ services/
│  ├─ express/
│  ├─ facebook/
│  ├─ mongoose/
│  ├─ passport/
│  ├─ sendgrid/
│  └─ your-service/
├─ app.js
├─ config.js
└─ index.js
```

## Scripts

### npm run dev

로컬에서 개발 할 때는 Docker를 이용하므로 불필요한 스크립트이지만, `docker-compose.yml` 파일에서는 이 명령어로 정의가 되어있습니다. nodemon이 실행되며 `*.test.js`를 제외한 `js`, `yml`파일 변경시 재시작됩니다. 

로컬 개발 시 Docker를 사용하는 이유는 모듈에 바이너리가 포함되는 경우가 있기 때문입니다. 바이너리가 포함되는 경우 빌드 환경(OS)에 따라서 동작이 안될 수도 있습니다. 따라서 모든 npm 모듈은 alpine 환경에서 설치되고 테스트 해야 합니다.

### npm test

자신이 작성한 코드가 원하는 대로 응답하는지 확인하는 방법은 여러가지가 있지만, 테스트 케이스를 작성하는게 가장 좋습니다. Postman 쓰지 마시고 테스트 케이스를 작성하세요. `npm test` 명령어를 이용하여 확인할 수 있습니다. 특정 파일을 테스트 하고 싶으면 아래와 같은 명령어를 사용하세요.

사용 예제
```
# 하위 폴더까지 테스트
npm test api/user

# 특정 파일 테스트
npm test api/user/index.test.js
```

### npm run lint & npm run fixlint

코드를 다른 사람과 공유하기 위해 커밋, 푸쉬 하기 전에 반드시 `lint`를 실행하세요. 물론 경험상 귀찮아 한다는 것을 저도 알기에 _husky_ 가 지키고 있습니다. _.huskyrc_ 파일을 확인하세요.

### npm run prod

프로덕션 실행은 pm2를 이용하고 있습니다. 예기치 않은 오류로 서버가 죽더라도 pm2가 재시작을 합니다.

## Mocking for testing

테스트 환경에서 글로벌 mocking이 필요한 경우 _test/global.js_ 에 정의하세요. 

테스트 케이스에 외부 API 호출이 필요한 경우 [nock.js](https://github.com/nock/nock) 를 통해 할 수 있습니다. 미리 정의된 응답을 _test/mock/replies_ 폴더에 저장해놓고 아래와 같이 사용할 수 있습니다. 

```
nock('https://www.googleapis.com')
  .get(/\/androidpublisher\/v3\/applications.+/g)
  .replyWithFile(200, `${root}/test/mock/replies/google.iap.validation.json`, {
    'Content-Type': 'application/json',
  })
```
