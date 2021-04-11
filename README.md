# 2021-1 Capstone Front-End (React.js)

## 실행 방법

### 개발 환경

- macOS 11.2
- Git 2.31
- Node 14.16
- Yarn 1.22
- Visual Studio Code 1.54
- Chrome 89.0, Safari 14.0, Whale 2.9, Firefox 87.0

### 프로젝트 다운로드

```bash
> git clone https://github.com/capstone-2021-1/capstone-frontend.git
> cd capstone-frontend
> git checkout (브랜치 이름)
> yarn
```

프로젝트를 다운로드 받고 해당 폴더로 이동한 후 적절한 브랜치로 이동하고 프로젝트에 필요한 외부 패키지를 설치합니다.

그리고 프로젝트 폴더에서 VSCode를 실행하면 오른쪽 아래에 '권장 확장 프로그램 설치' 알림이 뜹니다.

프로젝트에서 권장하는 확장 프로그램(ESLint, Prettier 등)을 모두 설치해줍니다.

만약 이미 프로젝트를 다운로드 받았다면 다른 사람의 변경 사항을 반영하기 위해 `git fetch, git pull` 도 실행해줍니다.

### 환경 변수 설정

루트 폴더에 `.env.local` 파일을 생성하고 거기에 프로젝트에 필요한 환경 변수를 설정합니다.

### 개발 모드

```bash
> yarn dev
```

로컬 컴퓨터에서 개발 모드로 프로젝트를 실행하면, 수정한 파일을 저장했을 때 코드 변경 사항이 자동으로 브라우저에 반영됩니다.

### 빌드 후 프로덕션 모드

```bash
> yarn build
> yarn start
```

코드 변경 사항이 자동으로 반영되진 않지만 코드 최적화로 인해 실행 속도가 빠릅니다.

### 브라우저 실행

```
http://localhost:3000
```

브라우저에서 아래 주소로 접속하면 개발 중인 사이트를 볼 수 있습니다.

## 프로젝트 구조

#### .git

커밋 히스토리 등 Git 관련 파일이 들어 있습니다. 이 폴더는 직접 건들지 않아도 됩니다.

#### .github

이슈 템플릿, GitHub Actions 등 GitHub 관련 설정 파일이 들어 있습니다.

#### .husky

[git hook](https://www.atlassian.com/git/tutorials/git-hooks) 관련 설정 파일이 들어 있습니다. `yarn husky install` 시 자동으로 생성됩니다. 이 폴더는 직접 건들지 않아도 됩니다.

#### .next

`yarn build` 시 생성되는 폴더로서 최적화된 빌드 결과물이 들어 있습니다. 이 폴더에는 Node.js 기반 웹 서버 로직과 HTML 렌더링 로직, 정적 파일 등이 포함됩니다. 이 폴더는 직접 건들지 않아도 됩니다.

#### .vscode

권장 확장 프로그램, 편집기 설정, 코드 스니펫 등 VSCode 관련 설정 파일이 들어 있습니다.

#### node_modules

프로젝트에 필요한 외부 패키지가 모여 있습니다. 이 폴더는 직접 건들지 않아도 됩니다.

#### out

`yarn export` 시 생성되는 결과물이 들어 있습니다. 이 폴더에는 정적 파일(브라우저용 HTML, CSS, JS)만 포함됩니다. 이 폴더는 직접 건들지 않아도 됩니다.

#### public

웹 서버에 정적으로 올릴 파일을 지정합니다.

#### src

프로젝트에 필요한 소스 코드가 들어 있습니다.

#### components

React 컴포넌트가 모여 있습니다. (.tsx)

#### graphql

GraphQL operation 파일이 모여 있습니다.

- fragments : GraphQL Fragment 모음
- mutations : GraphQL Mutation 모음
- queries : GraphQL Query 모음

#### hooks

공통으로 쓰이는 React Custom Hook 이 모여 있습니다. (.ts)

#### pages

Next.js 의 동적 라우팅을 정의하는 페이지 컴포넌트가 모여 있습니다. (.tsx)

- api : Next.js 웹 서버에 REST API를 정의할 수 있습니다.

#### types

프로젝트 전체에 공통으로 쓰이는 type, interface가 모여 있습니다. (.ts)

REST API를 요청할 때 응답 데이터의 자료형 지정에 쓰이고, GraphQL 요청 시엔 쓰이지 않습니다.

#### utils

프로젝트 전체에 공통으로 쓰이는 함수가 모여 있습니다. (.ts)

#### test

프로젝트를 테스트하는 코드가 들어 있습니다.

#### .editorconfig

VSCode를 사용하지 않고 다른 편집기를 사용하는 경우 이 파일의 설정이 적용될 수 있습니다.

#### .env.local

프로젝트에 필요한 환경 변수를 설정할 수 있습니다.

#### .eslint.json

ESLint의 lint 규칙을 세부적으로 설정할 수 있습니다.

#### .gitattribute

개행 문자(line endings) 정규화 등 Git 관련 설정이 들어 있습니다.

#### .gitignore

Git에서 추적하지 않을 파일을 설정할 수 있습니다.

#### .prettier.json

Prettier의 코드 포맷 규칙을 세부적으로 설정할 수 있습니다.

#### babel.config.js

Babel을 설정할 수 있습니다. 이 프로젝트에선 Styled Components의 Server-Side Rendering을 설정하는데 사용됩니다.

#### codegen.yml

GraphQL Code Generator의 동작을 세부적으로 설정할 수 있습니다.

#### next-env.d.ts

Next 자료형을 지정합니다. Next 관련 명령어 실행 시 자동으로 생성됩니다. 이 파일은 직접 건들지 않아도 됩니다.
