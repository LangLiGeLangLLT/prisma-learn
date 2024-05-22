-- CreateTable
CREATE TABLE "_CampaignToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CampaignToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CampaignToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CampaignToPost_AB_unique" ON "_CampaignToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CampaignToPost_B_index" ON "_CampaignToPost"("B");
