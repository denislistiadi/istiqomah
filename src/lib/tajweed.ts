import { TajweedRule, TajweedSegment, TajweedCategory } from '@/types';

/**
 * Complete Tajweed Rules Reference Dictionary
 * Aligned with official Ministry of Religious Affairs (Kemenag RI) and Madinah Mushaf Tajweed Standards.
 */
export const TAJWEED_RULES: Record<string, TajweedRule> = {
  // 1. Qalqalah
  q: {
    id: 'qalqalah',
    tag: 'q',
    name: 'Qalqalah',
    arabicName: 'قلقلة',
    category: 'Qalqalah',
    colorName: 'Biru Langit',
    colorHex: '#0284c7',
    textColorClass: 'text-sky-600 dark:text-sky-400',
    bgColorClass: 'bg-sky-50 dark:bg-sky-950/40',
    borderColorClass: 'border-sky-300 dark:border-sky-500/40',
    description: 'Memantulkan getaran suara huruf ketika sukun atau waqaf.',
    howToRead: 'Dipantulkan dengan jelas dan ringan tanpa terputus.',
    harakat: 'Sukun / Waqaf',
    letters: ['ق', 'ط', 'ب', 'ج', 'د'],
    exampleArabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۚ اللَّهُ الصَّمَدُ',
    exampleTrans: 'Qul huwallahu ahad... Allahus-samad',
  },

  // 2. Ghunnah Musyaddadah
  g: {
    id: 'ghunnah',
    tag: 'g',
    name: 'Ghunnah Musyaddadah',
    arabicName: 'غُنَّة مُشَدَّدَة',
    category: 'Ghunnah',
    colorName: 'Merah Muda / Rose',
    colorHex: '#e11d48',
    textColorClass: 'text-rose-600 dark:text-rose-400',
    bgColorClass: 'bg-rose-50 dark:bg-rose-950/40',
    borderColorClass: 'border-rose-300 dark:border-rose-500/40',
    description: 'Nun atau Mim yang bertasydid di mana pun posisinya.',
    howToRead: 'Didengungkan secara mantap di rongga hidung.',
    harakat: '2 Harakat (Ketukan)',
    letters: ['نّ', 'مّ'],
    exampleArabic: 'إِنَّ الْإِنسَانَ لَفِي خُسْرٍ',
    exampleTrans: 'Innal-insaana lafii khusr',
  },

  // 3. Ikhfa Haqiqi
  f: {
    id: 'ikhfa_haqiqi',
    tag: 'f',
    name: 'Ikhfa Haqiqi',
    arabicName: 'إِخْفَاء حَقِيقِي',
    category: 'Nun Sukun & Tanwin',
    colorName: 'Hijau Emerald',
    colorHex: '#16a34a',
    textColorClass: 'text-emerald-600 dark:text-emerald-400',
    bgColorClass: 'bg-emerald-50 dark:bg-emerald-950/40',
    borderColorClass: 'border-emerald-300 dark:border-emerald-500/40',
    description: 'Nun mati atau tanwin bertemu salah satu dari 15 huruf Ikhfa.',
    howToRead: 'Dibaca samar antara Idzhar dan Idgham disertai dengung.',
    harakat: '2 Harakat',
    letters: ['ت', 'ث', 'ج', 'د', 'ذ', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ف', 'ق', 'ك'],
    exampleArabic: 'مِن قَبْلِكَ وَمِن بَعْدِكَ',
    exampleTrans: 'Min qablika...',
  },

  // 4. Idgham Bighunnah
  a: {
    id: 'idgham_bighunnah',
    tag: 'a',
    name: 'Idgham Bighunnah',
    arabicName: 'إِدْغَام بِغُنَّة',
    category: 'Nun Sukun & Tanwin',
    colorName: 'Kuning Emas / Amber',
    colorHex: '#d97706',
    textColorClass: 'text-amber-600 dark:text-amber-400',
    bgColorClass: 'bg-amber-50 dark:bg-amber-950/40',
    borderColorClass: 'border-amber-300 dark:border-amber-500/40',
    description: 'Nun mati atau tanwin bertemu huruf Ya, Nun, Mim, atau Wawu (Yanmu).',
    howToRead: 'Meleburkan suara nun mati ke huruf berikutnya disertai dengung.',
    harakat: '2 Harakat',
    letters: ['ي', 'ن', 'م', 'و'],
    exampleArabic: 'فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ',
    exampleTrans: 'Famay-ya\'mal...',
  },

  // 5. Iqlab
  i: {
    id: 'iqlab',
    tag: 'i',
    name: 'Iqlab',
    arabicName: 'إِقْلَاب',
    category: 'Nun Sukun & Tanwin',
    colorName: 'Biru Toska / Cyan',
    colorHex: '#0891b2',
    textColorClass: 'text-cyan-600 dark:text-cyan-400',
    bgColorClass: 'bg-cyan-50 dark:bg-cyan-950/40',
    borderColorClass: 'border-cyan-300 dark:border-cyan-500/40',
    description: 'Nun mati atau tanwin bertemu dengan huruf Ba (ب).',
    howToRead: 'Mengubah bunyi nun mati menjadi bunyi Mim yang samar berdengung.',
    harakat: '2 Harakat',
    letters: ['ب'],
    exampleArabic: 'مِنۢ بَعْدِ مَا جَاءَتْهُمُ',
    exampleTrans: 'Mim-ba\'di...',
  },

  // 6. Idgham Bilaghunnah
  u: {
    id: 'idgham_bilaghunnah',
    tag: 'u',
    name: 'Idgham Bilaghunnah',
    arabicName: 'إِدْغَام بِلَا غُنَّة',
    category: 'Nun Sukun & Tanwin',
    colorName: 'Abu-abu / Slate',
    colorHex: '#64748b',
    textColorClass: 'text-slate-500 dark:text-slate-400',
    bgColorClass: 'bg-slate-100 dark:bg-slate-800/40',
    borderColorClass: 'border-slate-300 dark:border-slate-700',
    description: 'Nun mati atau tanwin bertemu dengan huruf Lam (ل) atau Ra (ر).',
    howToRead: 'Meleburkan suara nun mati langsung ke huruf Lam atau Ra tanpa dengung.',
    harakat: '1 Harakat (Tanpa Dengung)',
    letters: ['ل', 'ر'],
    exampleArabic: 'هُدًى لِّلْمُتَّقِينَ ۚ مِن رَّبِّهِمْ',
    exampleTrans: 'Hudal-lilmuttaqiin... Mir-rabbihim',
  },

  // 7. Ikhfa Syafawi
  c: {
    id: 'ikhfa_syafawi',
    tag: 'c',
    name: 'Ikhfa Syafawi',
    arabicName: 'إِخْفَاء شَفَوِي',
    category: 'Mim Sukun',
    colorName: 'Hijau Teal',
    colorHex: '#0d9488',
    textColorClass: 'text-teal-600 dark:text-teal-400',
    bgColorClass: 'bg-teal-50 dark:bg-teal-950/40',
    borderColorClass: 'border-teal-300 dark:border-teal-500/40',
    description: 'Mim sukun bertemu dengan huruf Ba (ب).',
    howToRead: 'Menyembunyikan bunyi mim dengan merapatkan kedua bibir secara ringan disertai dengung.',
    harakat: '2 Harakat',
    letters: ['ب'],
    exampleArabic: 'تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ',
    exampleTrans: 'Tarmiihim bihijaarah...',
  },

  // 8. Idgham Mimi (Mitslain)
  w: {
    id: 'idgham_mimi',
    tag: 'w',
    name: 'Idgham Mimi / Mitslain',
    arabicName: 'إِدْغَام مِثْلَيْن',
    category: 'Mim Sukun',
    colorName: 'Ungu / Violet',
    colorHex: '#9333ea',
    textColorClass: 'text-purple-600 dark:text-purple-400',
    bgColorClass: 'bg-purple-50 dark:bg-purple-950/40',
    borderColorClass: 'border-purple-300 dark:border-purple-500/40',
    description: 'Mim sukun bertemu dengan sesama huruf Mim (م).',
    howToRead: 'Memasukkan mim pertama ke mim kedua disertai dengung sempurna.',
    harakat: '2 Harakat',
    letters: ['م'],
    exampleArabic: 'لَهُم مَّا يَشَاءُونَ',
    exampleTrans: 'Lahum-maa yasyaa\'uun',
  },

  // 9. Mad Lazim
  m: {
    id: 'mad_lazim',
    tag: 'm',
    name: 'Mad Lazim / Wajib Panjang',
    arabicName: 'مَدّ لَازِم',
    category: 'Mad (Panjang)',
    colorName: 'Merah Crimson',
    colorHex: '#dc2626',
    textColorClass: 'text-red-600 dark:text-red-400',
    bgColorClass: 'bg-red-50 dark:bg-red-950/40',
    borderColorClass: 'border-red-300 dark:border-red-500/40',
    description: 'Huruf mad bertemu huruf bertasydid atau sukun lazim (asli).',
    howToRead: 'Dipanjangkan secara wajib selama 6 harakat penuh.',
    harakat: '6 Harakat (Ketukan)',
    letters: ['الٓمٓ', 'الٓر', 'الضَّالِّينَ'],
    exampleArabic: 'غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    exampleTrans: 'Walad-daaaalliiin (6 ketukan)',
  },

  // 10. Mad Wajib Muttashil & Mad Jaiz Munfashil
  o: {
    id: 'mad_wajib_jaiz',
    tag: 'o',
    name: 'Mad Wajib / Mad Jaiz',
    arabicName: 'مَدّ وَاجِب / مَدّ جَائِز',
    category: 'Mad (Panjang)',
    colorName: 'Oranye Coral',
    colorHex: '#ea580c',
    textColorClass: 'text-orange-600 dark:text-orange-400',
    bgColorClass: 'bg-orange-50 dark:bg-orange-950/40',
    borderColorClass: 'border-orange-300 dark:border-orange-500/40',
    description: 'Huruf mad bertemu hamzah dalam satu kata (Wajib) atau di kata terpisah (Jaiz).',
    howToRead: 'Dipanjangkan selama 4 sampai 5 harakat.',
    harakat: '4 - 5 Harakat',
    letters: ['آ', 'ـٰٓ', 'ُوٓ', 'ِيٓ'],
    exampleArabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',
    exampleTrans: 'Idzaa jaaa\'a...',
  },

  // 11. Mad Thobi'i & 'Aridh Lissukun
  p: {
    id: 'mad_thobii',
    tag: 'p',
    name: 'Mad Thobi\'i / \'Aridh Lissukun',
    arabicName: 'مَدّ طَبِيعِي / عَارِض لِلسُّكُون',
    category: 'Mad (Panjang)',
    colorName: 'Amber / Cokelat Emas',
    colorHex: '#b45309',
    textColorClass: 'text-amber-700 dark:text-amber-500',
    bgColorClass: 'bg-amber-50 dark:bg-amber-950/40',
    borderColorClass: 'border-amber-300 dark:border-amber-500/40',
    description: 'Huruf mad asli (Alif setelah fathah, Wawu setelah dhammah, Ya setelah kasrah).',
    howToRead: 'Dipanjangkan 2 harakat biasa, atau 2/4/6 harakat jika berhenti di akhir ayat.',
    harakat: '2 - 6 Harakat',
    letters: ['ا', 'و', 'ي'],
    exampleArabic: 'الرَّحْمَٰنِ الرَّحِيمِ ۚ مَالِكِ يَوْمِ الدِّينِ',
    exampleTrans: 'Ar-Rahmaanir-Rahiim...',
  },

  // 12. Huruf Tidak Dibaca (Silent / Washal)
  h: {
    id: 'hamzah_washal',
    tag: 'h',
    name: 'Hamzah Washal',
    arabicName: 'هَمْزَة وَصْل',
    category: 'Huruf Khusus',
    colorName: 'Abu-abu Pucat (Silent)',
    colorHex: '#9ca3af',
    textColorClass: 'text-zinc-400 dark:text-zinc-500 opacity-60',
    bgColorClass: 'bg-zinc-100 dark:bg-zinc-800/40',
    borderColorClass: 'border-zinc-300 dark:border-zinc-700',
    description: 'Hamzah tambahan di awal kata yang dibaca hanya saat memulai bacaan (ibtida\').',
    howToRead: 'Dilewati (tidak dibaca) jika disambung dengan kata sebelumnya.',
    harakat: 'Silent saat Washal',
    letters: ['ٱ'],
    exampleArabic: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ',
    exampleTrans: 'Bismillaahir-Rahmaan...',
  },

  l: {
    id: 'lam_syamsiyyah',
    tag: 'l',
    name: 'Alif Lam Syamsiyyah',
    arabicName: 'لَام شَمْسِيَّة',
    category: 'Huruf Khusus',
    colorName: 'Abu-abu Pucat (Silent)',
    colorHex: '#9ca3af',
    textColorClass: 'text-zinc-400 dark:text-zinc-500 opacity-60',
    bgColorClass: 'bg-zinc-100 dark:bg-zinc-800/40',
    borderColorClass: 'border-zinc-300 dark:border-zinc-700',
    description: 'Huruf Lam pada Al-Ta\'rif yang melebur langsung ke huruf syamsiyyah berikutnya.',
    howToRead: 'Huruf Lam tidak dilafalkan dan langsung ditasydidkan ke huruf berikutnya.',
    harakat: 'Silent / Peleburan',
    letters: ['ل'],
    exampleArabic: 'وَٱلشَّمْسِ وَضُحَىٰهَا',
    exampleTrans: 'Wasy-syamsi...',
  },

  s: {
    id: 'huruf_zaidah',
    tag: 's',
    name: 'Huruf Zaidah (Silent)',
    arabicName: 'حَرْف زَائِد',
    category: 'Huruf Khusus',
    colorName: 'Abu-abu Pucat (Silent)',
    colorHex: '#9ca3af',
    textColorClass: 'text-zinc-400 dark:text-zinc-500 opacity-60',
    bgColorClass: 'bg-zinc-100 dark:bg-zinc-800/40',
    borderColorClass: 'border-zinc-300 dark:border-zinc-700',
    description: 'Huruf tambahan dalam tulisan rasm Utsmani (misal Alif/Wawu di akhir kata jamak).',
    howToRead: 'Tidak dilafalkan sama sekali.',
    harakat: 'Tidak Dibaca',
    letters: ['اْ', 'وْ'],
    exampleArabic: 'قَالُواْ ءَامَنَّا',
    exampleTrans: 'Qaaluu aamannaa',
  },

  n: {
    id: 'alif_khanjariah',
    tag: 'n',
    name: 'Alif Khanjariah / Mad Kecil',
    arabicName: 'أَلِف خَنْجَرِيَّة',
    category: 'Mad (Panjang)',
    colorName: 'Kuning Emas',
    colorHex: '#ca8a04',
    textColorClass: 'text-yellow-600 dark:text-yellow-400',
    bgColorClass: 'bg-yellow-50 dark:bg-yellow-950/40',
    borderColorClass: 'border-yellow-300 dark:border-yellow-500/40',
    description: 'Tanda alif kecil tegak penunjuk panjang bacaan 2 harakat.',
    howToRead: 'Dipanjangkan 2 harakat.',
    harakat: '2 Harakat',
    letters: ['ـٰ', 'َٲ'],
    exampleArabic: 'هَٰذَا كِتَٰبُنَا',
    exampleTrans: 'Haadzaa kitaabunaa',
  },

  d: {
    id: 'idgham_lainnya',
    tag: 'd',
    name: 'Idgham Mutajanisain / Mutaqaribain',
    arabicName: 'إِدْغَام مُتَجَانِسَيْن',
    category: 'Hukum Idgham Lainnya',
    colorName: 'Emas Tua',
    colorHex: '#a16207',
    textColorClass: 'text-yellow-700 dark:text-yellow-500',
    bgColorClass: 'bg-yellow-50 dark:bg-yellow-950/40',
    borderColorClass: 'border-yellow-300 dark:border-yellow-500/40',
    description: 'Dua huruf yang makhrajnya sama tetapi sifatnya berbeda, atau makhraj dan sifatnya berdekatan.',
    howToRead: 'Meleburkan huruf pertama ke dalam huruf kedua.',
    harakat: 'Melebur',
    letters: ['ت-د', 'ط-ت', 'ث-ذ', 'ق-ك'],
    exampleArabic: 'قَد تَّبَيَّنَ الرُّشْدُ',
    exampleTrans: 'Qat-tabayyanar-rusydu',
  },
};

/**
 * Grouped Tajweed Categories for the Guide Modal
 */
export const TAJWEED_CATEGORIES: TajweedCategory[] = [
  {
    id: 'nun_tanwin',
    title: 'Hukum Nun Sukun & Tanwin',
    description: 'Kaidah membaca ketika Nun Mati (نْ) atau Tanwin bertemu salah satu dari 28 huruf hijaiyah.',
    rules: [
      TAJWEED_RULES.f, // Ikhfa
      TAJWEED_RULES.a, // Idgham Bighunnah
      TAJWEED_RULES.u, // Idgham Bilaghunnah
      TAJWEED_RULES.i, // Iqlab
    ],
  },
  {
    id: 'qalqalah',
    title: 'Hukum Qalqalah (Pantulan)',
    description: 'Bunyi pantulan yang keluar ketika salah satu dari 5 huruf qalqalah mati/sukun.',
    rules: [TAJWEED_RULES.q],
  },
  {
    id: 'ghunnah',
    title: 'Hukum Ghunnah & Musyaddadah',
    description: 'Kaidah mendengungkan suara di pangkal hidung selama 2 ketukan pada huruf bertasydid.',
    rules: [TAJWEED_RULES.g],
  },
  {
    id: 'mim_sukun',
    title: 'Hukum Mim Sukun',
    description: 'Kaidah membaca ketika Mim Mati (مْ) bertemu huruf hijaiyah lainnya.',
    rules: [
      TAJWEED_RULES.c, // Ikhfa Syafawi
      TAJWEED_RULES.w, // Idgham Mimi
    ],
  },
  {
    id: 'mad',
    title: 'Hukum Aneka Mad (Panjang)',
    description: 'Tingkatan pemanjangan harakat dari 2 harakat (Thobi\'i) hingga 6 harakat (Lazim).',
    rules: [
      TAJWEED_RULES.m, // Mad Lazim (6)
      TAJWEED_RULES.o, // Mad Wajib & Jaiz (4-5)
      TAJWEED_RULES.p, // Mad Thobi'i (2-6)
      TAJWEED_RULES.n, // Alif Khanjariah (2)
    ],
  },
  {
    id: 'silent',
    title: 'Huruf Khusus & Tidak Dibaca',
    description: 'Kaidah peleburan (washal) dan huruf yang ditulis namun dilewati saat membaca.',
    rules: [
      TAJWEED_RULES.h, // Hamzah Washal
      TAJWEED_RULES.l, // Lam Syamsiyyah
      TAJWEED_RULES.s, // Zaidah
      TAJWEED_RULES.d, // Mutajanisain
    ],
  },
];

/**
 * Robust Stack-Based Tajweed Token Parser
 * Parses annotated text (e.g. `[q:15[قْ]]`, `[o[ُوٓ[s[اْ]]]]`) into structured segments.
 */
export function parseTajweed(annotatedText: string): TajweedSegment[] {
  if (!annotatedText) return [];

  const stack: string[] = [];
  const segments: TajweedSegment[] = [];
  let curText = '';
  let curTag = '';

  function flush() {
    if (curText) {
      const rule = curTag ? TAJWEED_RULES[curTag] : undefined;
      segments.push({
        text: curText,
        tag: curTag || undefined,
        rule,
      });
      curText = '';
    }
  }

  let i = 0;
  while (i < annotatedText.length) {
    if (annotatedText[i] === '[') {
      const match = annotatedText.slice(i).match(/^\[([a-z0-9_:]+)\[/);
      if (match) {
        flush();
        const tag = match[1].split(':')[0];
        stack.push(tag);
        curTag = tag;
        i += match[0].length;
        continue;
      }
    }

    if (annotatedText[i] === ']' && stack.length > 0) {
      flush();
      stack.pop();
      curTag = stack.length > 0 ? stack[stack.length - 1] : '';
      i++;
      continue;
    }

    curText += annotatedText[i];
    i++;
  }

  flush();
  return segments;
}

/**
 * Strips all Tajweed annotation brackets to return raw clean Arabic text
 */
export function stripTajweedTags(annotatedText: string): string {
  if (!annotatedText) return '';
  return parseTajweed(annotatedText).map(s => s.text).join('');
}
