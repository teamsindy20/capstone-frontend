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
