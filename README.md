<h1>BookUs!</h1>
<p>
    <img alt="travis" src="https://api.travis-ci.org/connect-foundation/2019-12.svg?branch=master" />
    <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
</p>

Bookus!는 이벤트 예약 서비스 [Festa!](https://festa.io/) 클론 프로젝트입니다. 순간적으로 많은 트래픽이 몰리더라도 중단되지 않는 **안정적인** 선착순 예약 서비스를 목표로 하고 있습니다. 따라서 다음과 같은 도전과제를 갖고 있습니다.

### 재사용성이 높고 테스트로 검증된 UI Component

- Atomic Desgin Pattern
- Test (Jest + Enzyme)
- Storybook + Cypress

### 과중한 트래픽이 몰려도 안정적으로 예약이 가능한 시스템

- Infra Architecture & Orchestration

  Docker swarm을 통한 Orchestration 이 가능하도록 설계
  - 인프라 구조
  
    <img width="80%" src="https://user-images.githubusercontent.com/10372359/69845512-40468c80-12b4-11ea-85c4-8296dfda7948.png"/>
    
    도커 Swarm을 통한 마스터 노드 2개에 Front와 Back의 서비스의 Replica를 각각 3개씩 만들어서 이를 서비스하는 방식.
    Swarm의 Ingress LoadBalancer는 모든 노드의 포트를 열어주기에 이곳에 Ncloud Load Balancer 를 붙여서 로드벨런싱을 함.
    
- Test (Jest, Supertest, Artillery)

## Built With

- `Language`: Typescript
- `Front-end`: React, Styled Component, Storybook
- `Back-end`: Node.js, Express
- `Test`: Jest, Cypress, Enzyme, Supertest, nGrinder
- `DevOps`: Docker, Travis

## Team

- 문종현 [@dobest27](https://github.com/dobest27)
- 육진혁 [@FullOfOrange](https://github.com/FullOfOrange)
- 이용호 [@inthewalter](https://github.com/inthewalter)
- 조성동 [@doong-jo](https://github.com/doong-jo)
