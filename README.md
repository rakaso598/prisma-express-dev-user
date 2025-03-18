## 목표: 내가만든 `prisma-express-starter`로 유저관리 API 백엔드 로직을 작성하고 원격 DB에 직접 CRUD 해보자.

- [`사용한 스타터 저장소`](https://github.com/rakaso598/prisma-express-starter)

- 사용한 원격 데이터베이스: [`render.com`](https://render.com)

---

## API 목록

- `Health-Check`
- `유저 목록 불러오기`
- `유저 하나만 불러오기`
- `유저 등록하기`
- `유저 삭제하기`

---

## 유저 로직을 담당한 모듈

- `users.module.js`

---

## 프리즈마 트랜잭션 $transaction 사용

- 기본적인 형태

await prisma.$transaction(async (tx) => {
// 비동기 로직 추가  
});

---

## 사용한 프리즈마 스키마

model User {
id Int @id @default(autoincrement())
email String @unique
name String?
}

---
