# rest-mongo

[![Build Status](https://travis-ci.com/seoulstore/sinsa.svg?token=syzApJ6zq5vRUmtrKbsq&branch=dev)](https://travis-ci.com/seoulstore/sinsa)
[![codecov](https://codecov.io/gh/seoulstore/sinsa/branch/dev/graph/badge.svg?token=i49Qckge6V)](https://codecov.io/gh/seoulstore/sinsa)

MongoDB + Express.js 구성의 API 애플리케이션, [generator-rest](https://github.com/diegohaz/generator-rest)를 이용했습니다.

API 문서는 [Wiki](https://github.com/seoulstore/sinsa/wiki)에 있습니다.

## Commands

`package.json`에 정의된 다음 명령어로 실행이 가능합니다.

```bash
npm test # test using Jest
npm run postcoverage # post the coverage report to codecove
npm run coverage # test and post the coverage report to codecove
npm run lint # lint using ESLint
npm run dev # run the API in development mode
npm run prod # run the API in production mode
npm run docs # generate API docs
```

## Playing locally

로컬에서 띄우기 위해 준비해야 할 것은 다음과 같습니다.

* NodeJS >= 10.x.x
* _Docker Image_
* _docker-compose.yml_ 파일
* _.env_ 파일

도커 이미지 빌드
```
docker build . -t sinsa:latest
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
docker-compose up
```

복사한 docker-compose.yml 파일에는 MongoDB가 _link_ 되어 있습니다. 그리고 _.env_ 파일에는 _MONGO_URI_ 환경변수가 MongoDB 컨테이너 주소를 가리킵니다. 만약 로컬에서 다른 MongoDB를 연결하려면 위 환경변수를 변경하세요. 

## Environment

정상적인 동작을 위해서는 다음의 환경변수들이 설정되어 있어야 합니다. 

* MONGO_URI: 몽고디비에 접속할 주소
* ACCESS_KEY_ID: AWS IAM ACCESS_KEY_ID
* SECRET_ACCESS_KEY: AWS IAM SECRET_ACCESS_KEY
* MASTER_KEY: API 접근을 허용할 MASTER_KEY (Basic Auth), 아직 사용하지 않습니다. 
* JWT_SECRET: JWT Token에 사용할 SECRET, 아직 사용하지 않습니다. 

## Branches

`stage`, `master` 브랜치는 _protected branch_ 입니다. 풀 리퀘스트 생성시 Travis-CI 에서 _npm run lint_ 와 _npm test_ 를 실행합니다. 이것이 통과되어야 머지가 가능합니다. _npm run lint_ 는 커밋 전에 로컬에서 하신 후에 _push_ 하시는 것을 추천합니다. 

* **dev**: _default branch_ 개발 브랜치 입니다. 개발은 이 브랜치에서 해주세요.
* stage: _protected branch_ 
* master: _protected branch_ 

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

기타 문의 사항은 [issues](https://github.com/seoulstore/sinsa/issues)에 남겨주세요. 

