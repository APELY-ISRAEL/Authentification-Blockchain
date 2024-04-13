import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

async function SaveCard(img: string, doc: string) {
  await prisma.contract.create({
    data: {
      imageHash: img,
      documentHash: doc,

    },
  })


}
export default SaveCard;

