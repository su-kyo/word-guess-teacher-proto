import type { WordData } from '../types';
import imgVideo1 from '../../assets/material-video-thumbnail.png';
import imgIslands from '../../assets/material-islands.png';
import imgSchool from '../../assets/material-school.png';

export const wordsData: WordData[] = [
  // ─────────────────────────────────────────
  // 대조
  // ─────────────────────────────────────────
  {
    id: 'daejo',
    word: '대조',
    initials: 'ㄷㅈ',
    meanings: [
      {
        id: 1,
        text: '둘 이상의 것을 맞대어 같고 다름을 살펴봄.',
        basicExamples: [
          {
            id: 'daejo-1-1',
            text: '살인 사건 현장에서 나온 지문과 용의자의 지문 대조 결과, 두 지문은 일치했다.',
            containsAnswer: true,
          },
          {
            id: 'daejo-1-2',
            text: '이 글의 원본과 번역본의 대조가 이뤄지면 이 번역이 정확한 것인지 알 수 있을 것이다.',
            containsAnswer: true,
          },
        ],
        supplementaryExamples: [],
      },
      {
        id: 2,
        text: '서로 달라서 대비가 됨.',
        basicExamples: [
          {
            id: 'daejo-2-1',
            text: '녹색과 적색은 눈에 띄는 대조를 이룬다.',
            containsAnswer: true,
          },
          {
            id: 'daejo-2-2',
            text: '외모는 똑 닮은 쌍둥이지만 성격은 완전히 달라 대조를 보이기도 한다.',
            containsAnswer: true,
          },
        ],
        supplementaryExamples: [
          {
            id: 'daejo-2-s1',
            text: '두 인물의 특징을 대조해 보았어요.',
            containsAnswer: true,
          },
          {
            id: 'daejo-2-s2',
            text: '친구가 내 가방이랑 같은 걸 가짜로 샀다고 해서 꼼꼼히 대조를 해 봤는데 진짜 모르겠더라.',
            containsAnswer: true,
          },
        ],
      },
    ],
    additionalMaterials: [
      {
        id: 'add-1',
        type: 'video',
        url: imgVideo1,
        thumbnail: imgVideo1,
      },
      {
        id: 'add-2',
        type: 'image',
        url: imgIslands,
        thumbnail: imgIslands,
      },
      {
        id: 'add-3',
        type: 'image',
        url: imgSchool,
        thumbnail: imgSchool,
      },
    ],
  },

  // ─────────────────────────────────────────
  // 주제
  // ─────────────────────────────────────────
  {
    id: 'juje',
    word: '주제',
    initials: 'ㅈㅈ',
    meanings: [
      {
        id: 1,
        text: '소설, 그림, 영화 등과 같은 예술 작품에서 지은이가 표현하고자 하는 주된 생각.',
        basicExamples: [
          {
            id: 'juje-1-1',
            text: '오 작가는 전쟁의 비극을 주제로 장편의 소설을 썼다.',
            containsAnswer: true,
          },
          {
            id: 'juje-1-2',
            text: '우리는 영화에서 가족의 소중함이라는 주제를 느낄 수 있었다.',
            containsAnswer: true,
          },
        ],
        supplementaryExamples: [
          {
            id: 'juje-1-s1',
            text: '이 글의 주제는 환경 보호의 중요성입니다.',
            containsAnswer: true,
          },
        ],
      },
      {
        id: 2,
        text: '대화나 연구 등에서 중심이 되는 문제.',
        basicExamples: [
          {
            id: 'juje-2-1',
            text: '나는 부의 양극화 현상을 주제로 신문에 글을 실었다.',
            containsAnswer: true,
          },
          {
            id: 'juje-2-2',
            text: '친구는 대화의 주제와 상관없는 얘기로 주변을 산만하게 했다.',
            containsAnswer: true,
          },
        ],
        supplementaryExamples: [
          {
            id: 'juje-2-s1',
            text: '오늘 강의는 환경 문제를 주제로 다루고 있다.',
            containsAnswer: true,
          },
          {
            id: 'juje-2-s2',
            text: '좋아하는 동물을 주제로 발표를 준비했어요.',
            containsAnswer: true,
          },
          {
            id: 'juje-2-s3',
            text: "오늘의 주제는 '학교에 매점을 설치해야 하는가'였어요.",
            containsAnswer: true,
          },
          {
            id: 'juje-2-s4',
            text: "우리는 이번 대화에서 '가장 기억에 남는 여행'을 주제로 정했어요.",
            containsAnswer: true,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 관점
  // ─────────────────────────────────────────
  {
    id: 'gwanjeom',
    word: '관점',
    initials: 'ㄱㅈ',
    meanings: [
      {
        id: 1,
        text: '사물이나 현상을 보고 생각하는 개인의 입장 또는 태도.',
        basicExamples: [
          {
            id: 'gwanjeom-1-1',
            text: '친구는 객관적인 관점에서 내 잘못을 지적해 주었다.',
            containsAnswer: true,
          },
          {
            id: 'gwanjeom-1-2',
            text: '고객의 관점에서 볼 때 이 상품은 충분히 매력적이다.',
            containsAnswer: true,
          },
          {
            id: 'gwanjeom-1-3',
            text: '김 교수는 이번 사건을 아주 새로운 관점에서 해석하는 논문을 썼다.',
            containsAnswer: true,
          },
          {
            id: 'gwanjeom-1-4',
            text: '서로 다른 관점으로 같은 사건을 보았어요.',
            containsAnswer: true,
          },
          {
            id: 'gwanjeom-1-5',
            text: '같은 문제라도 다양한 관점에서 바라볼 필요가 있습니다.',
            containsAnswer: true,
          },
          {
            id: 'gwanjeom-1-6',
            text: '다양한 관점에서 상황을 바라보는 것이 중요하다.',
            containsAnswer: true,
          },
          {
            id: 'gwanjeom-1-7',
            text: '관점이 다르면 해석도 달라진다.',
            containsAnswer: true,
          },
          {
            id: 'gwanjeom-1-8',
            text: '사람마다 관점이 다를 수 있어요.',
            containsAnswer: true,
          },
        ],
        supplementaryExamples: [],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 탐색
  // ─────────────────────────────────────────
  {
    id: 'tamsaek',
    word: '탐색',
    initials: 'ㅌㅅ',
    meanings: [
      {
        id: 1,
        text: '알려지지 않은 사물이나 현상을 찾아내거나 밝히기 위해 살펴 찾음.',
        basicExamples: [
          {
            id: 'tamsaek-1-1',
            text: '과학 기술의 발전으로 우주 탐색이 정교하게 가능해지고 있다.',
            containsAnswer: true,
          },
          {
            id: 'tamsaek-1-2',
            text: '학교는 학생들의 진로 탐색에 도움이 될 수 있도록 상담실을 운영했다.',
            containsAnswer: true,
          },
          {
            id: 'tamsaek-1-3',
            text: '공항에서는 불법 반입되는 물건을 찾기 위해 수화물의 탐색을 시작했다.',
            containsAnswer: true,
          },
        ],
        supplementaryExamples: [
          {
            id: 'tamsaek-1-s1',
            text: '학생들의 진로 탐색에 도움이 될 수 있도록 상담실을 운영했다.',
            containsAnswer: true,
          },
          {
            id: 'tamsaek-1-s2',
            text: '공항에서는 수화물의 탐색을 통해 불법 반입 물건을 확인한다.',
            containsAnswer: true,
          },
          {
            id: 'tamsaek-1-s3',
            text: '우리는 숲속을 탐색하며 숨겨진 보물을 찾았다.',
            containsAnswer: true,
          },
          {
            id: 'tamsaek-1-s4',
            text: '도서관 책장 사이를 돌아다니며 내가 읽고 싶은 책을 탐색했어요.',
            containsAnswer: true,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 접근
  // ─────────────────────────────────────────
  {
    id: 'jeopgeun',
    word: '접근',
    initials: 'ㅈㄱ',
    meanings: [
      {
        id: 1,
        text: '가까이 다가감.',
        basicExamples: [
          {
            id: 'jeopgeun-1-1',
            text: '경찰은 사건 현장의 주변으로 사람들의 접근을 막았다.',
            containsAnswer: true,
          },
          {
            id: 'jeopgeun-1-2',
            text: '나는 그의 접근을 피하기 위해 전화를 꺼 놓았다.',
            containsAnswer: true,
          },
          {
            id: 'jeopgeun-1-3',
            text: '지수는 내 접근이 부담스러운지 인사도 받아 주지 않았다.',
            containsAnswer: true,
          },
        ],
        supplementaryExamples: [],
      },
      {
        id: 2,
        text: '매우 친하고 가까운 관계를 가짐.',
        basicExamples: [
          {
            id: 'jeopgeun-2-1',
            text: '문제에 대한 이론적 접근만으로는 해답을 찾을 수 없다.',
            containsAnswer: true,
          },
        ],
        supplementaryExamples: [],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 공유
  // ─────────────────────────────────────────
  {
    id: 'gongyu',
    word: '공유',
    initials: 'ㄱㅇ',
    meanings: [
      {
        id: 1,
        text: '두 사람 이상이 어떤 것을 함께 가지고 있음.',
        basicExamples: [
          {
            id: 'gongyu-1-1',
            text: '민족의식은 고유한 역사적 경험의 공유에서 싹틀 수 있다.',
            containsAnswer: true,
          },
          {
            id: 'gongyu-1-2',
            text: '인터넷의 발달은 시간과 공간을 초월한 정보의 공유를 가능하게 했다.',
            containsAnswer: true,
          },
          {
            id: 'gongyu-1-3',
            text: '비슷한 생활 수준의 공유는 우리에게 동질감을 느끼게 해 주었다.',
            containsAnswer: true,
          },
        ],
        supplementaryExamples: [
          {
            id: 'gongyu-1-s1',
            text: '책을 읽고 쓴 독서 감상문을 친구들과 공유했어요.',
            containsAnswer: true,
          },
          {
            id: 'gongyu-1-s2',
            text: '친구들과 여행 경험을 공유하는 시간을 가졌어요.',
            containsAnswer: true,
          },
          {
            id: 'gongyu-1-s3',
            text: '활동 사진을 가족과 공유했어요.',
            containsAnswer: true,
          },
          {
            id: 'gongyu-1-s4',
            text: '자녀와 친해지기 위해서는 무엇보다 감정 공유가 중요하다.',
            containsAnswer: true,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 경제적
  // ─────────────────────────────────────────
  {
    id: 'gyeongjejok',
    word: '경제적',
    initials: 'ㄱㅈㅈ',
    meanings: [
      {
        id: 1,
        text: '인간의 생활에 필요한 재화나 용역을 생산·분배·소비하는 모든 활동에 관한 것. (명사)',
        basicExamples: [
          {
            id: 'gyeongjejok-1-1',
            text: '경제적인 기회균등.',
            containsAnswer: true,
          },
          {
            id: 'gyeongjejok-1-2',
            text: '경제적으로 어렵다.',
            containsAnswer: true,
          },
          {
            id: 'gyeongjejok-1-3',
            text: '국가들 간에 경제적인 면에서 많은 협력이 이루어지고 있다.',
            containsAnswer: true,
          },
        ],
        supplementaryExamples: [
          {
            id: 'gyeongjejok-1-s1',
            text: '경제적 안정을 이루는 것은 많은 사람들의 중요한 목표이다.',
            containsAnswer: true,
          },
          {
            id: 'gyeongjejok-1-s2',
            text: '지역의 경제적 성장은 주민들의 삶의 질에도 영향을 준다.',
            containsAnswer: true,
          },
        ],
      },
      {
        id: 2,
        text: '돈이나 시간, 노력을 적게 들이는 것. (명사)',
        basicExamples: [
          {
            id: 'gyeongjejok-2-1',
            text: '계획을 짜서 시간을 경제적으로 이용했다.',
            containsAnswer: true,
          },
          {
            id: 'gyeongjejok-2-2',
            text: '최초의 설비 투자에 비용이 많이 들지만 이렇게 하는 것이 장기적으로 보아 훨씬 더 경제적이다.',
            containsAnswer: true,
          },
        ],
        supplementaryExamples: [
          {
            id: 'gyeongjejok-2-s1',
            text: '가까운 거리는 걸어 다니는 것이 더 경제적일 수 있다.',
            containsAnswer: true,
          },
          {
            id: 'gyeongjejok-2-s2',
            text: '남은 재료를 활용하면 식사를 더 경제적으로 준비할 수 있다.',
            containsAnswer: true,
          },
        ],
      },
      {
        id: 3,
        text: '인간의 생활에 필요한 재화나 용역을 생산·분배·소비하는 모든 활동에 관한. (관형사)',
        basicExamples: [
          {
            id: 'gyeongjejok-3-1',
            text: '경제적 빈곤.',
            containsAnswer: true,
          },
          {
            id: 'gyeongjejok-3-2',
            text: '경제적 독립.',
            containsAnswer: true,
          },
          {
            id: 'gyeongjejok-3-3',
            text: '경제적 여유.',
            containsAnswer: true,
          },
          {
            id: 'gyeongjejok-3-4',
            text: '경제적 능력을 갖추다.',
            containsAnswer: true,
          },
        ],
        supplementaryExamples: [
          {
            id: 'gyeongjejok-3-s1',
            text: '그 나라는 경제적 문제를 해결하기 위해 여러 정책을 마련했다.',
            containsAnswer: true,
          },
          {
            id: 'gyeongjejok-3-s2',
            text: '경제적 격차가 커지면 사회 갈등도 심해질 수 있다.',
            containsAnswer: true,
          },
        ],
      },
      {
        id: 4,
        text: '돈이나 시간, 노력을 적게 들이는. (관형사)',
        basicExamples: [
          {
            id: 'gyeongjejok-4-1',
            text: '경제적 구매.',
            containsAnswer: true,
          },
          {
            id: 'gyeongjejok-4-2',
            text: '경제적 소비.',
            containsAnswer: true,
          },
        ],
        supplementaryExamples: [
          {
            id: 'gyeongjejok-4-s1',
            text: '대중교통을 이용하는 것은 자동차보다 경제적 선택이 될 수 있다.',
            containsAnswer: true,
          },
          {
            id: 'gyeongjejok-4-s2',
            text: '이 제품은 가격이 저렴하고 오래 사용할 수 있어서 경제적이다.',
            containsAnswer: true,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 분류
  // ─────────────────────────────────────────
  {
    id: 'bullyu',
    word: '분류',
    initials: 'ㅂㄹ',
    meanings: [
      {
        id: 1,
        text: '여럿을 종류에 따라서 나눔.',
        basicExamples: [
          {
            id: 'bullyu-1-1',
            text: '소설은 길이에 따라 장편, 중편, 단편으로 분류가 가능하다.',
            containsAnswer: true,
          },
          {
            id: 'bullyu-1-2',
            text: '서점 직원은 새로 들어온 책들을 주제별로 분류를 해서 정리했다.',
            containsAnswer: true,
          },
        ],
        supplementaryExamples: [
          {
            id: 'bullyu-1-s1',
            text: '안 돼요. 게시판 분류 기준에 맞게 올려야죠.',
            containsAnswer: true,
          },
          {
            id: 'bullyu-1-s2',
            text: '여기 물품들은 분류 체계가 어떻게 되나요?',
            containsAnswer: true,
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 배경지식
  // ─────────────────────────────────────────
  {
    id: 'baekyeongjisik',
    word: '배경지식',
    initials: 'ㅂㄱㅈㅅ',
    meanings: [
      {
        id: 1,
        text: '어떤 분야나 문제에 대해 이미 가지고 있는 지식.',
        basicExamples: [
          {
            id: 'baekyeongjisik-1-1',
            text: '배경지식이 풍부하면 글의 내용을 더 쉽게 이해할 수 있다.',
            containsAnswer: true,
          },
          {
            id: 'baekyeongjisik-1-2',
            text: '배경지식이 있으면 어려운 글도 더 잘 이해할 수 있다.',
            containsAnswer: true,
          },
          {
            id: 'baekyeongjisik-1-3',
            text: '독서를 할 때는 자신의 배경지식을 활용하면 글의 내용을 더 잘 이해할 수 있다.',
            containsAnswer: true,
          },
        ],
        supplementaryExamples: [],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 속담 1: 길이 아니거든 가지 말고 말이 아니거든 듣지 말라
  // ─────────────────────────────────────────
  {
    id: 'proverb-gilgaji',
    word: '길이 아니거든 가지 말고 말이 아니거든 듣지 말라',
    initials: 'ㄱㅇ ㅇㄴㄱㄷ ㄱㅈ ㅁㄱ ㅁㅇ ㅇㄴㄱㄷ ㄷㅈ ㅁㄹ',
    meanings: [
      {
        id: 1,
        text: '옳지 않은 일은 처음부터 하지 말고, 이치에 맞지 않는 말도 함부로 받아들이지 말라는 뜻.',
        basicExamples: [
          {
            id: 'proverb-gilgaji-1-1',
            text: '친구들이 규칙을 어기자고 했지만, 나는 "길이 아니거든 가지 말고 말이 아니거든 듣지 말라"는 말처럼 거절했다.',
            containsAnswer: true,
          },
          {
            id: 'proverb-gilgaji-1-2',
            text: '근거 없는 소문을 믿지 말라고 하시며 선생님께서 "길이 아니거든 가지 말고 말이 아니거든 듣지 말라"는 속담을 들려주셨다.',
            containsAnswer: true,
          },
        ],
        supplementaryExamples: [],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 속담 2: 하룻강아지 범 무서운 줄 모른다
  // ─────────────────────────────────────────
  {
    id: 'proverb-harutgang',
    word: '하룻강아지 범 무서운 줄 모른다',
    initials: 'ㅎㄹㄱㅇㅈ ㅂ ㅁㅅㅇ ㄷ ㅁㄹㄷ',
    meanings: [
      {
        id: 1,
        text: '철없이 겁이 없거나, 힘의 차이를 모르고 함부로 덤비는 경우를 이르는 말.',
        basicExamples: [
          {
            id: 'proverb-harutgang-1-1',
            text: '형보다 한참 어린 동생이 자꾸 덤비는 모습을 보며 엄마는 하룻강아지 범 무서운 줄 모른다고 하셨다.',
            containsAnswer: true,
          },
          {
            id: 'proverb-harutgang-1-2',
            text: '경험도 부족한데 무작정 큰일에 뛰어드는 모습을 보니 정말 하룻강아지 범 무서운 줄 모른다는 말이 떠올랐다.',
            containsAnswer: true,
          },
        ],
        supplementaryExamples: [],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 속담 3: 콩 심은 데 콩 나고 팥 심은 데 팥 난다
  // ─────────────────────────────────────────
  {
    id: 'proverb-kong',
    word: '콩 심은 데 콩 나고 팥 심은 데 팥 난다',
    initials: 'ㅋ ㅅㅇ ㄷ ㅋ ㄴㄱ ㅍ ㅅㅇ ㄷ ㅍ ㄴㄷ',
    meanings: [
      {
        id: 1,
        text: '원인에 따라 결과가 생기며, 자기가 한 일의 결과는 그대로 돌아온다는 뜻.',
        basicExamples: [
          {
            id: 'proverb-kong-1-1',
            text: '평소에 꾸준히 연습한 친구가 좋은 결과를 얻자 선생님께서는 콩 심은 데 콩 나고 팥 심은 데 팥 난다며 칭찬하셨다.',
            containsAnswer: true,
          },
          {
            id: 'proverb-kong-1-2',
            text: '남을 배려하며 친절하게 행동하면 좋은 친구가 생기기 마련이니, 정말 콩 심은 데 콩 나고 팥 심은 데 팥 나는 셈이다.',
            containsAnswer: true,
          },
        ],
        supplementaryExamples: [],
      },
    ],
  },
];
