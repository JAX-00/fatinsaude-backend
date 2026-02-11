-- CreateEnum
CREATE TYPE "HospitalType" AS ENUM ('HOSPITAL', 'CLINIC', 'CENTRO', 'APOTIK');

-- CreateTable
CREATE TABLE "Hospital" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "phone" TEXT,
    "emergency" BOOLEAN NOT NULL DEFAULT false,
    "ambulance" BOOLEAN NOT NULL DEFAULT false,
    "diseases" JSONB,
    "operationTime" TEXT,
    "type" "HospitalType",
    "districtId" INTEGER NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_name_districtId_key" ON "Hospital"("name", "districtId");

-- AddForeignKey
ALTER TABLE "Hospital" ADD CONSTRAINT "Hospital_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
