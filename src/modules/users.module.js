const express = require("express");
const prisma = require("../db/prisma/client.prisma.js");

const usersRouter = express.Router();

/**
 * 유저 목록 불러오기
 */
usersRouter.get("/", async (req, res, next) => {
  try {
    // 프리즈마에서 유저목록을 불러와야지.
    const users = await prisma.user.findMany();

    console.log(users);
    // 그러면 응답에 유저목록을 보내버리자.

    res.status(200).json(users); // json화 해서.
  } catch (e) {
    next(e);
  }
});

/**
 * 유저 하나만 가져오기
 */
usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    // 유저 하나만 가져와보자.
    const user = await prisma.user.findUnique({ where: { id: userId } });
    console.log(user);

    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
});

/**
 * 유저 등록하기
 */
usersRouter.post("/", async (req, res, next) => {
  try {
    // 유저 등록하려면 JSON으로 이루어진 유저 객체가 필요해.
    // 이것을 요청에서 받아와야해.

    // 프리즈마 트랜잭션 사용하기. $transaction tx
    await prisma.$transaction(async (tx) => {
      const data = req.body;
      const { email, name } = data;

      const createUser = await tx.user.create({ data: { email, name } });
      console.log(createUser);

      res.status(201).send("created");
    });

    console.log("create 작업 요청됨!");
  } catch (e) {
    next(e);
  }
});

/**
 * 유저 삭제하기
 */
usersRouter.delete("/:userId/delete", async (req, res, next) => {
  try {
    // 파람의 id와 같은 유저를 db에서 삭제.
    // 파람 꺼내.
    const userId = Number(req.params.userId);
    // 그리고 꺼낸 파람을 db와 비교
    // 트랜잭션으로 만들자.
    prisma.$transaction(async (tx) => {
      // 꺼낸 id를 가져와서 db에 where
      const deleteUser = await tx.user.delete({ where: { id: userId } });
      console.log(deleteUser);

      res.status(204).send("No Content");
    });

    console.log("delete 작업 요청됨!");
  } catch (e) {
    next(e);
  }
});

module.exports = usersRouter;
