/*
  Warnings:

  - You are about to drop the `chek_in` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chek_in" DROP CONSTRAINT "chek_in_gym_id_fkey";

-- DropForeignKey
ALTER TABLE "chek_in" DROP CONSTRAINT "chek_in_user_id_fkey";

-- DropTable
DROP TABLE "chek_in";

-- CreateTable
CREATE TABLE "chek_ins" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "gym_id" TEXT NOT NULL,

    CONSTRAINT "chek_ins_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chek_ins" ADD CONSTRAINT "chek_ins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chek_ins" ADD CONSTRAINT "chek_ins_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
