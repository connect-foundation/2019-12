<h1>BookUs!</h1>
<p>
    <img alt="travis" src="https://api.travis-ci.org/connect-foundation/2019-12.svg?branch=master" />
    <img alt="Release" src="https://img.shields.io/github/v/release/connect-foundation/2019-12" />
    <img alt="Cypress.io tests" src="https://img.shields.io/badge/cypress.io-tests-green.svg" />
    <img alt="Storybook" src="https://github.com/storybookjs/brand/raw/master/badge/badge-storybook.svg?sanitize=true" />
    <img alt="Server Test Coverage" src="https://img.shields.io/badge/backend_coverage-85%25-success.svg" />
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
</p>

### 📕 [Storybook for Bookus](https://storybook.bookus.kr/)

### 🌲 [Cypress for Bookus](https://dashboard.cypress.io/projects/wauqe2/runs)

## ✍️ Writing

#### [Atomic Design for React](https://medium.com/@inthewalter/atomic-design-for-react-514660f93ba?) by [@inthewalter](https://github.com/inthewalter)

#### [실용적인 리액트 테스트 전략](https://velog.io/@sdong001/%EC%8B%A4%EC%9A%A9%EC%A0%81%EC%9D%B8-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%A0%84%EB%9E%B5) by [@doong-jo](https://github.com/doong-jo)

#### [주니어 개발자의 CI/CD 도입기](https://velog.io/@jdd04026/%EC%A3%BC%EB%8B%88%EC%96%B4-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9D%98-CICD-%EB%8F%84%EC%9E%85%EA%B8%B0-n6k3mkug47) by [@FullOfOrange](https://github.com/FullOfOrange)

#### [Express 기반 프로젝트에서 Typescript Typing에 대한 고민](https://medium.com/@dobest27/express-%EA%B8%B0%EB%B0%98-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90%EC%84%9C-typescript-typing-%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B3%A0%EB%AF%BC-cf282770595f) by [@dobest27](https://github.com/dobest27)

#### [React Hooks 로 전역스토어 만들기](https://velog.io/@jdd04026/React-Hooks-API로-Redux-따라해보기) by [@FullOfOrange](https://github.com/FullOfOrange)

## 소개

[Bookus!](https://www.bookus.kr/)는 이벤트 예약 서비스 [Festa!](https://festa.io/) 클론 프로젝트입니다. 순간적으로 많은 트래픽이 몰리더라도 중단되지 않는 **안정적인** 선착순 예약 서비스를 목표로 하고 있습니다. 따라서 다음과 같은 도전과제를 갖고 있습니다.

## 재사용성이 높고 테스트로 검증된 UI Component

#### Atomic Desgin Pattern

<img width="800" alt="AtomicDesign" src="https://user-images.githubusercontent.com/10372359/71318965-3db60c00-24db-11ea-985f-ce8ea1168e9d.png">

가장 작은 단위의 컴포넌트를 만들어, 큰 단위로 쌓아나가며 각각의 UI 단위를 만들어 나가는 디자인 패턴입니다. 이번 프로젝트에서는 재사용성이 뛰어난 UI를 위해 아토믹 디자인 패턴을 적용했습니다.

## 실용적인 프론트엔드 테스트

**1. Custom Hooks Testing**

  비동기로 API 요청에 대한 처리가 주가 되는 상태 관리에 대한 테스트

**2. Playground for UI components of Storybook**

  Storybook을 통한 독립된 환경에서의 컴포넌트 테스트

**3. Cypress를 이용한 End-to-End Testing**

  각 페이지와 컴포넌트 UI 테스트

## 과중한 트래픽이 몰려도 안정적으로 예약이 가능한 시스템

예약이 필요한 시점마다 늘어나는 트래픽을 감당하기 위한 Container Orchestration 툴로 Kubernetes를 선택했습니다.
[설정파일](https://github.com/connect-foundation/2019-12/tree/master/build/k8s)

![Kubernetes-infra](https://user-images.githubusercontent.com/10372359/70730811-ff855380-1d48-11ea-96c7-b7ee207cf926.png)


## DevOps

![CICD pipeline](https://user-images.githubusercontent.com/10372359/70730814-00b68080-1d49-11ea-9fcf-d0251da08d0b.png)

**[Travis CI](https://travis-ci.org/connect-foundation/2019-12/)**

**Docker hub**

[Frontend image](https://hub.docker.com/repository/docker/jdd04026/bu-front)

[Backend image](https://hub.docker.com/repository/docker/jdd04026/bu-back)

[Reserve Server image](https://hub.docker.com/repository/docker/jdd04026/bu-reserve)

## Test

테스트 커버리지 80를 목표로 하는 검증된 코드를 통한 안정적인 서비스를 목표로 합니다.

- Front-End : Jest + Enzyme + Stroybook + Cypress
- Back-End : Jest + Supertest

## Built With

![Dependancy](https://user-images.githubusercontent.com/10372359/70730864-14fa7d80-1d49-11ea-959f-b981d8460d90.png)

## Team

- 문종현 [@dobest27](https://github.com/dobest27)
- 육진혁 [@FullOfOrange](https://github.com/FullOfOrange)
- 이용호 [@inthewalter](https://github.com/inthewalter)
- 조성동 [@doong-jo](https://github.com/doong-jo)
