/*
  Warnings:

  - You are about to drop the column `userId` on the `userpreference` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userPreferenceId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `userpreference` DROP FOREIGN KEY `userPreference_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `userPreferenceId` VARCHAR(191) NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `userpreference` DROP COLUMN `userId`;

-- CreateIndex
CREATE UNIQUE INDEX `user_userPreferenceId_key` ON `user`(`userPreferenceId`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_userPreferenceId_fkey` FOREIGN KEY (`userPreferenceId`) REFERENCES `userPreference`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
