// @ts-ignore
import manifest from '__STATIC_CONTENT_MANIFEST';
import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import { jsxRenderer } from 'hono/jsx-renderer';

import { Layout } from './Layout';
import { Card, Item } from './Card';
import { getDate } from './utils';

declare module 'hono' {
  interface ContextRenderer {
    (content: string | Promise<string>, head: { title: string; description: string }): Response;
  }
}

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  jsxRenderer(({ children, title, description }) => (
    <Layout title={title} description={description}>
      {children}
    </Layout>
  ))
);

app.get('/favicon.ico', serveStatic({ path: './favicon.ico', manifest }));
app.get('/robots.txt', serveStatic({ path: './robots.txt', manifest }));

app.get('/', (c) => {
  return c.render(
    <main>
      <div class="flex flex-col p-6 gap-2 max-w-lg mx-auto my-0 font-sans">
        <h1 class="font-bold text-2xl text-center pt-3 pb-6 break-keep">
          沼津市の
          <wbr />
          ゴミ分別区分と出し方検索
        </h1>
        <div class="flex flex-col justify-center items-center gap-2">
          <label for="search" aria-label="検索">
            捨てるものを入力してください
          </label>
          <input
            id="search"
            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full"
            type="text"
            name="q"
            placeholder="例) カイロ"
            hx-post="/search"
            hx-trigger="keyup delay:500ms changed"
            hx-target="#result"
          />
          <div id="result" class="flex flex-col gap-4 pt-8 w-full"></div>
        </div>
      </div>
    </main>,
    {
      title: '沼津市-ゴミ分別区分・出し方検索',
      description: 'ごみの分別区分や出し方を検索することができます。',
    }
  );
});

app.post('/search', async (c) => {
  const q = (await c.req.formData()).get('q');
  if (typeof q !== 'string' || q === '') return c.text('');

  const { results } = await c.env.DB.prepare(
    `SELECT gomi.id, gomi.name, gomi_type.name AS type, gomi.type_id, gomi.type2, gomi.note FROM gomi INNER JOIN gomi_type ON gomi.type_id = gomi_type.id WHERE gomi.name LIKE ? ORDER BY gomi.type_id ASC;`
  )
    .bind(`%${q}%`)
    .all<Item>();
  const today = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
  today.setHours(0, 0, 0, 0);
  const items = results.map((r) => ({ ...r, nextDate: getDate(r['type_id'], today) }));

  return c.html(
    items.length > 0 ? (
      <>
        {items.map((item) => (
          <Card {...item} />
        ))}
      </>
    ) : (
      <p class="text-xl font-bold text-center py-5 break-keep">
        該当するものが
        <wbr />
        見つかりませんでした
      </p>
    )
  );
});

export default app;
