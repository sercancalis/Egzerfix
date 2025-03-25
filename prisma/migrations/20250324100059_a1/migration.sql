-- CreateTable
CREATE TABLE "Faqs" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Faqs_pkey" PRIMARY KEY ("id")
);
