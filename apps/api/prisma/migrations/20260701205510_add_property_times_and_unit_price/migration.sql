-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "defaultCheckinTime" TEXT NOT NULL DEFAULT '14:00',
ADD COLUMN     "defaultCheckoutTime" TEXT NOT NULL DEFAULT '12:00';

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "defaultDailyPrice" DOUBLE PRECISION NOT NULL DEFAULT 0;
