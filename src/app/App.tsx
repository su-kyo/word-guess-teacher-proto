import { useState } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { StudentPreview } from './components/StudentPreview';
import { WordList } from './components/WordList';
import { wordsData } from './data/wordsData';
import type { Example, Meaning, RevealState, WordData, WordState } from './types';

const NEXT_REVEAL_STATE: Record<RevealState, RevealState | null> = {
  hidden: 'initials',
  initials: 'full',
  full: null,
};

function HeaderLesson() {
  return (
    <div
      className="sticky top-0 z-[2] flex h-[92px] w-full items-center border-b border-black/10 px-[24px]"
      style={{ background: '#eeeeee' }}
    >
      <div className="flex min-w-0 flex-1 items-center gap-[16px]">
        <div
          className="flex size-[48px] items-center justify-center rounded-full"
          style={{ background: 'rgba(255,255,255,0.7)' }}
        >
          <svg fill="none" viewBox="0 0 32 32" className="size-[22px]">
            <path
              d="M6 11.4L16 6l10 5.4-10 5.4L6 11.4Zm3.2 4.7v4.7c0 .6.3 1.1.9 1.4 1.6.9 3.8 1.5 6 1.5s4.4-.6 6-1.5c.6-.3.9-.8.9-1.4v-4.7L16 19.8 9.2 16.1Z"
              fill="#02403D"
            />
          </svg>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-[6px] text-[14px] font-semibold text-black/45">
            <span>대단원명</span>
            <span className="text-black/25">›</span>
            <span>중단원명</span>
          </div>
          <div className="mt-[6px] flex items-center gap-[12px]">
            <p className="text-[18px] font-semibold text-[#212121]">
              [1~2차시] 비유하는 표현 살펴보기
            </p>
            <div className="rounded-[5px] bg-[#eff4fa] px-[7px] py-[3px] text-[10px] text-[#757575]">
              국어 264~273p
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[16px] text-[14px] text-[#424242]">
        <div className="flex items-center gap-[8px]">
          <span className="text-[#1876d2]">✦</span>
          <span className="font-semibold">집중 화면</span>
          <button
            className="flex h-[24px] w-[56px] items-center justify-center rounded-[16px] bg-[#616161] text-[13px] font-semibold text-white"
            type="button"
          >
            OFF
          </button>
        </div>
        <div className="h-[41px] w-px bg-black/10" />
        <div className="flex items-center gap-[8px]">
          <span className="text-[#02403d]">▣</span>
          <span className="font-semibold">칠판 화면</span>
          <span className="border-b border-[#757575] pb-[2px] font-semibold">기본 화면 ∨</span>
        </div>
        <div className="h-[41px] w-px bg-black/10" />
        <div className="flex items-center gap-[8px]">
          <span className="text-[#ffb32f]">★</span>
          <span className="text-[#757575]">칭찬별</span>
          <span className="border-b border-[#757575] pb-[2px] font-semibold">16/24 ∨</span>
        </div>
        <div className="h-[41px] w-px bg-black/10" />
        <div className="flex items-center gap-[8px] text-[#212121]">
          <span>◷</span>
          <span className="font-mono text-[18px]">00:01</span>
        </div>
        <button
          className="flex h-[34px] items-center justify-center rounded-[17px] border border-black/10 bg-[#eaeef0] px-[24px] text-[16px] font-medium text-[#02403d]"
          type="button"
        >
          수업 종료
        </button>
      </div>
    </div>
  );
}

function HeaderContents() {
  return (
    <div
      className="sticky top-0 flex w-full items-center justify-between border-b border-black/10 px-[24px] py-[16px]"
      style={{ background: '#eeeeee' }}
    >
      <div className="flex items-center gap-[14px]">
        <div className="flex items-center gap-[8px]">
          <p className="text-[22px] font-bold text-[#02403d]">활동명 텍스트</p>
          <div className="flex size-[26px] items-center justify-center rounded-full border border-black/10 bg-white/80 text-[14px] text-[#02403d]">
            ?
          </div>
          <div className="flex h-[34px] items-center justify-center rounded-[17px] bg-[#02403d] px-[24px] text-[16px] font-medium text-white">
            ✓ 선생님과 진행 중
          </div>
        </div>
        <div className="flex items-center gap-[8px] text-[#212121]">
          <span className="text-black/45">◷</span>
          <span className="font-mono text-[18px]">00:00</span>
        </div>
      </div>

      <button
        className="flex h-[34px] items-center justify-center rounded-[17px] bg-[#02403d] px-[24px] text-[16px] font-medium text-white"
        type="button"
      >
        활동 종료하기
      </button>
    </div>
  );
}

function SectionSummary() {
  return (
    <div className="flex w-full items-center justify-between">
      <p className="text-[14px] font-semibold text-[#212121]">활동 화면</p>
      <div className="flex items-center gap-[16px] text-[14px]">
        <div className="flex items-center gap-[8px]">
          <span className="text-[#9e9e9e]">정답</span>
          <span className="font-semibold text-[#212121]">15</span>
        </div>
        <div className="h-[21px] w-px bg-[#e0e0e0]" />
        <div className="flex items-center gap-[8px]">
          <span className="text-[#9e9e9e]">오답</span>
          <span className="font-semibold text-[#212121]">12</span>
        </div>
        <div className="h-[21px] w-px bg-[#e0e0e0]" />
        <div className="flex items-center gap-[8px]">
          <span className="text-[#9e9e9e]">정답률</span>
          <span className="font-semibold text-[#212121]">87%</span>
        </div>
      </div>
    </div>
  );
}

function createWordState(word: WordData): WordState {
  return {
    revealState: 'hidden',
    activeMeaningTab: word.meanings[0]?.id ?? 1,
    displayedMeaningId: null,
    activeExampleId: null,
    visitedMeaningIds: new Set<number>(),
    visitedExampleIds: new Set<string>(),
    expandedSupplementaryMeaningIds: new Set<number>(),
    visitedAdditionalMaterialIds: new Set<string>(),
    activeAdditionalMaterialId: null,
  };
}

function getExampleMeaningId(word: WordData, exampleId: string | null) {
  if (!exampleId) {
    return null;
  }

  for (const meaning of word.meanings) {
    const examples = [...meaning.basicExamples, ...meaning.supplementaryExamples];
    if (examples.some((example) => example.id === exampleId)) {
      return meaning.id;
    }
  }

  return null;
}

function getFirstExample(meaning: Meaning | undefined): Example | null {
  if (!meaning) {
    return null;
  }

  return meaning.basicExamples[0] ?? meaning.supplementaryExamples[0] ?? null;
}

function isSequentialReveal(current: RevealState, target: RevealState) {
  return NEXT_REVEAL_STATE[current] === target;
}

function isWordCompleted(state: WordState | undefined) {
  return Boolean(state && state.revealState === 'full' && state.visitedMeaningIds.size > 0);
}

function App() {
  const initialWordId = wordsData[0]?.id ?? '';
  const [selectedWordId, setSelectedWordId] = useState(initialWordId);
  const [wordStates, setWordStates] = useState<Record<string, WordState>>(() =>
    Object.fromEntries(wordsData.map((word) => [word.id, createWordState(word)]))
  );

  const currentWord = wordsData.find((word) => word.id === selectedWordId) ?? wordsData[0];
  if (!currentWord) {
    return null;
  }

  const currentState = wordStates[currentWord.id] ?? createWordState(currentWord);

  const updateCurrentWordState = (updater: (state: WordState) => WordState) => {
    setWordStates((prev) => {
      const state = prev[currentWord.id];
      if (!state) {
        return prev;
      }

      return {
        ...prev,
        [currentWord.id]: updater(state),
      };
    });
  };

  const handleAdvanceReveal = () => {
    updateCurrentWordState((state) => {
      const nextRevealState = NEXT_REVEAL_STATE[state.revealState];
      if (!nextRevealState) {
        return state;
      }

      return {
        ...state,
        revealState: nextRevealState,
      };
    });
  };

  const handleRevealStep = (target: RevealState) => {
    updateCurrentWordState((state) => {
      if (!isSequentialReveal(state.revealState, target)) {
        return state;
      }

      return {
        ...state,
        revealState: target,
      };
    });
  };

  const handleMeaningTabChange = (meaningId: number) => {
    updateCurrentWordState((state) => ({
      ...state,
      activeMeaningTab: meaningId,
    }));
  };

  const handleMeaningToggle = () => {
    updateCurrentWordState((state) => {
      const meaningId = state.activeMeaningTab;

      if (state.displayedMeaningId === meaningId) {
        return {
          ...state,
          displayedMeaningId: null,
        };
      }

      const visitedMeaningIds = new Set(state.visitedMeaningIds);
      visitedMeaningIds.add(meaningId);

      let activeExampleId = state.activeExampleId;
      const exampleMeaningId = getExampleMeaningId(currentWord, state.activeExampleId);
      if (exampleMeaningId !== null && exampleMeaningId !== meaningId) {
        activeExampleId = null;
      }

      return {
        ...state,
        displayedMeaningId: meaningId,
        activeExampleId,
        visitedMeaningIds,
      };
    });
  };

  const handleCloseMeaning = () => {
    updateCurrentWordState((state) => ({
      ...state,
      displayedMeaningId: null,
    }));
  };

  const handleExampleClick = (exampleId: string) => {
    updateCurrentWordState((state) => {
      const visitedExampleIds = new Set(state.visitedExampleIds);
      visitedExampleIds.add(exampleId);

      const isClosing = state.activeExampleId === exampleId;
      const exampleMeaningId = getExampleMeaningId(currentWord, exampleId);
      const displayedMeaningId =
        !isClosing &&
        exampleMeaningId !== null &&
        state.displayedMeaningId !== null &&
        state.displayedMeaningId !== exampleMeaningId
          ? null
          : state.displayedMeaningId;

      return {
        ...state,
        revealState: 'full',
        activeExampleId: isClosing ? null : exampleId,
        displayedMeaningId,
        visitedExampleIds,
      };
    });
  };

  const handleCloseExample = () => {
    updateCurrentWordState((state) => ({
      ...state,
      activeExampleId: null,
    }));
  };

  const handlePreviewMeaningCta = () => {
    const firstMeaning = currentWord.meanings[0];
    if (!firstMeaning) {
      return;
    }

    updateCurrentWordState((state) => {
      const visitedMeaningIds = new Set(state.visitedMeaningIds);
      visitedMeaningIds.add(firstMeaning.id);

      let activeExampleId = state.activeExampleId;
      const exampleMeaningId = getExampleMeaningId(currentWord, state.activeExampleId);
      if (exampleMeaningId !== null && exampleMeaningId !== firstMeaning.id) {
        activeExampleId = null;
      }

      return {
        ...state,
        activeMeaningTab: firstMeaning.id,
        displayedMeaningId: firstMeaning.id,
        activeExampleId,
        visitedMeaningIds,
      };
    });
  };

  const handlePreviewExampleCta = () => {
    const firstMeaning = currentWord.meanings[0];
    const firstExample = getFirstExample(firstMeaning);

    if (!firstMeaning || !firstExample) {
      return;
    }

    updateCurrentWordState((state) => {
      const visitedExampleIds = new Set(state.visitedExampleIds);
      visitedExampleIds.add(firstExample.id);

      return {
        ...state,
        revealState: 'full',
        activeMeaningTab: firstMeaning.id,
        activeExampleId: firstExample.id,
        displayedMeaningId:
          state.displayedMeaningId !== null && state.displayedMeaningId !== firstMeaning.id
            ? null
            : state.displayedMeaningId,
        visitedExampleIds,
      };
    });
  };

  const handleSupplementaryToggle = () => {
    updateCurrentWordState((state) => {
      const expandedSupplementaryMeaningIds = new Set(state.expandedSupplementaryMeaningIds);

      if (expandedSupplementaryMeaningIds.has(state.activeMeaningTab)) {
        expandedSupplementaryMeaningIds.delete(state.activeMeaningTab);
      } else {
        expandedSupplementaryMeaningIds.add(state.activeMeaningTab);
      }

      return {
        ...state,
        expandedSupplementaryMeaningIds,
      };
    });
  };

  const handleAdditionalMaterialSelect = (materialId: string) => {
    updateCurrentWordState((state) => {
      const visitedAdditionalMaterialIds = new Set(state.visitedAdditionalMaterialIds);
      visitedAdditionalMaterialIds.add(materialId);

      return {
        ...state,
        activeAdditionalMaterialId: materialId,
        visitedAdditionalMaterialIds,
      };
    });
  };

  const handleCloseAdditionalMaterial = () => {
    updateCurrentWordState((state) => ({
      ...state,
      activeAdditionalMaterialId: null,
    }));
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden" style={{ background: '#eeeeee' }}>
      <HeaderLesson />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <HeaderContents />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-[24px]">
          <div className="flex min-h-0 flex-1 flex-col gap-[16px]">
            <SectionSummary />
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-[16px] bg-[#212121]">
              <div
                className="absolute inset-0 flex items-start overflow-hidden rounded-[inherit]"
                style={{ background: '#9e9e9e' }}
              >
                <WordList
                  words={wordsData}
                  selectedWordId={currentWord.id}
                  isWordCompleted={(wordId) => isWordCompleted(wordStates[wordId])}
                  onWordSelect={setSelectedWordId}
                />
                <StudentPreview
                  word={currentWord}
                  state={currentState}
                  onAdvanceReveal={handleAdvanceReveal}
                  onRevealStep={handleRevealStep}
                  onCloseMeaning={handleCloseMeaning}
                  onCloseExample={handleCloseExample}
                  onCloseAdditionalMaterial={handleCloseAdditionalMaterial}
                  onMeaningCta={handlePreviewMeaningCta}
                  onExampleCta={handlePreviewExampleCta}
                />
                <ControlPanel
                  word={currentWord}
                  state={currentState}
                  onMeaningToggle={handleMeaningToggle}
                  onMeaningTabChange={handleMeaningTabChange}
                  onExampleClick={handleExampleClick}
                  onSupplementaryToggle={handleSupplementaryToggle}
                  onAdditionalMaterialClick={handleAdditionalMaterialSelect}
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 rounded-[16px]"
                style={{ border: '4px solid white' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
