-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_lastDocumentId_fkey`;

-- AlterTable
ALTER TABLE `users` MODIFY `lastDocumentId` INTEGER;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_lastDocumentId_fkey` FOREIGN KEY (`lastDocumentId`) REFERENCES `documents`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
