-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
