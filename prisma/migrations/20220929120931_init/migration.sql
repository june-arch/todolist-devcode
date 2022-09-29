-- CreateTable
CREATE TABLE `activity_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(70) NULL,
    `email` VARCHAR(70) NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL,
    `deleted_at` DATETIME(0) NULL,
    `is_deleted` VARCHAR(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todolist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(70) NULL,
    `is_active` VARCHAR(3) NULL,
    `priority` VARCHAR(10) NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL,
    `deleted_at` DATETIME(0) NULL,
    `is_deleted` VARCHAR(3) NULL,
    `activity_group_id` INTEGER NOT NULL,

    INDEX `activity_group_id`(`activity_group_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `todolist` ADD CONSTRAINT `activity_group_id` FOREIGN KEY (`activity_group_id`) REFERENCES `activity_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
