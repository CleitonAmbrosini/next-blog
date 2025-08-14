import { eq } from 'drizzle-orm';
import { db } from '.';
import { postsTable } from './schemas';

(async () => {
  await db
    .update(postsTable)
    .set({
      title: '2 Rotina matinal de pessoas altamente eficazes',
      published: false,
    })
    .where(eq(postsTable.slug, 'rotina-matinal-de-pessoas-altamente-eficazes'));
})();
