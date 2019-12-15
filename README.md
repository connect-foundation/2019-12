<h1>BookUs!</h1>
<p>
    <img alt="travis" src="https://api.travis-ci.org/connect-foundation/2019-12.svg?branch=master" />
    <img alt="Release" src="https://img.shields.io/github/v/release/connect-foundation/2019-12" />
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
</p>

[![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)](https://cypress.io)

### 📺 [HomePage](http://www.bookus.kr/)

### 📕 [Storybook for Bookus](https://storybook-bookus.netlify.com/)

### 🌲 [Cypress for Bookus](https://dashboard.cypress.io/projects/wauqe2/runs)

[Bookus!](http://www.foorg.xyz/)는 이벤트 예약 서비스 [Festa!](https://festa.io/) 클론 프로젝트입니다. 순간적으로 많은 트래픽이 몰리더라도 중단되지 않는 **안정적인** 선착순 예약 서비스를 목표로 하고 있습니다. 따라서 다음과 같은 도전과제를 갖고 있습니다.

### 재사용성이 높고 테스트로 검증된 UI Component

- Atomic Desgin Pattern

<img width="799" alt="Atomic" src="https://user-images.githubusercontent.com/10372359/69915131-0aa9cb00-148f-11ea-95d4-797cbcb6f1b9.png">

가장 작은 단위의 컴포넌트를 만들어, 큰 단위로 쌓아나가며 각각의 UI 단위를 만들어 나가는 디자인 패턴입니다. 이번 프로젝트에서는 재사용성이 뛰어난 UI를 위해 아토믹 디자인 패턴을 적용했습니다.

- Storybook + Cypress

Storybook을 통한 컴포넌트의 독립된 테스팅, Cypress를 통한 UI의 테스트를 목표로 합니다.

### 과중한 트래픽이 몰려도 안정적으로 예약이 가능한 시스템

- Infra Architecture & Orchestration

![Kubernetes-infra](https://user-images.githubusercontent.com/10372359/70730811-ff855380-1d48-11ea-96c7-b7ee207cf926.png)

예약이 필요한 시점마다 늘어나는 트래픽을 감당하기 위한 Container Orchestration 툴로 Kubernetes를 선택했습니다.

### DevOps

![CICD pipeline](https://user-images.githubusercontent.com/10372359/70730814-00b68080-1d49-11ea-9fcf-d0251da08d0b.png)

**[Travis CI](https://travis-ci.org/connect-foundation/2019-12/)**

**Docker hub**

- [Frontend image](https://hub.docker.com/repository/docker/jdd04026/bu-front)
- [Backend image](https://hub.docker.com/repository/docker/jdd04026/bu-back)
- [Reserve Server image](https://hub.docker.com/repository/docker/jdd04026/bu-reserve)

### TEST

테스트 커버리지 80를 목표로 하는 검증된 코드를 통한 안정적인 서비스를 목표로 합니다.

- Front-End : Jest + Enzyme
- Back-End : Jest + Supertest

## Built With

![Dependancy](https://user-images.githubusercontent.com/10372359/70730864-14fa7d80-1d49-11ea-959f-b981d8460d90.png)

- Language: Typescript
- Front-end: React, Styled Component, Storybook
- Back-end: Node.js, Express
- Test: Jest, Cypress, Enzyme, Supertest, nGrinder
- DevOps: Docker, Travis

## Team

- 문종현 [@dobest27](https://github.com/dobest27)
- 육진혁 [@FullOfOrange](https://github.com/FullOfOrange)
- 이용호 [@inthewalter](https://github.com/inthewalter)
- 조성동 [@doong-jo](https://github.com/doong-jo)
