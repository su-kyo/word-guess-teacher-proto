# Word Guess Teacher Prototype

국어 수업용 `단어 추리하기` 선생님 화면 프로토타입입니다.

## 실행

```bash
npm install
npm run dev
```

## 배포 전 확인

```bash
npm run build
```

## Vercel 배포

- 가장 안전한 방식은 `figma-make` 폴더만 별도 Git 저장소로 사용하는 것입니다.
- 현재 폴더 전체를 저장소로 쓴다면 Vercel의 Root Directory를 `figma-make`로 지정하면 됩니다.
- 이 프로젝트는 현재 환경 변수 없이 동작합니다.

## Git에 올려도 되는 파일

- `src/`
- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `postcss.config.mjs`
- `index.html`
- `.gitignore`
- `.vercelignore`
- `.env.example`
- `README.md`
- `ATTRIBUTIONS.md`

## Git에 올리지 않는 파일

- `node_modules/`
- `dist/`
- `guidelines/`
- `.vite-dev.*`
- `.word-guess-home*.png`

위 항목들은 `.gitignore`와 `.vercelignore`로 이미 제외되도록 준비되어 있습니다.
