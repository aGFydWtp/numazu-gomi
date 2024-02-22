import { raw } from 'hono/html';

export type Item = {
  id: string;
  name: string;
  type: string;
  type2?: string;
  note?: string;
};

const fontColor: Record<string, string> = {
  燃やすごみ: 'text-gray-900',
  プラスチック製容器包装: 'text-gray-900',
  資源回収の日: 'text-gray-900',
  埋め立てごみの日: 'text-gray-900',
  処理できません: 'text-gray-50',
};

const color: Record<string, string> = {
  燃やすごみ: 'bg-red-400',
  プラスチック製容器包装: 'bg-blue-400',
  資源回収の日: 'bg-green-400',
  埋め立てごみの日: 'bg-yellow-400',
  処理できません: 'bg-gray-800',
};

export const Card = ({ name, type, type2, note }: Item) => (
  <div class="flex flex-col gap-2 w-full border border-gray-300 text-gray-900 rounded-lg p-3">
    <h2 class="font-bold text-lg">{name}</h2>
    <div
      class={`${color[type] ?? 'bg-gray-300'} ${fontColor[type] ?? 'text-gray-900'} rounded-md w-fit px-2 font-medium text-sm`}
    >
      {type}
    </div>
    {{ type2 } && <p class="text-sm text-gray-600">{type2}</p>}
    {note && <p>〔備考〕{raw(note)}</p>}
  </div>
);
