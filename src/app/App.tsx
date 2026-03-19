import { useState } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { DesignTwoThreeWordList } from './components/DesignTwoThreeWordList';
import { StudentPreview } from './components/StudentPreview';
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
            <span className="text-black/25">&gt;</span>
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
          <span className="border-b border-[#757575] pb-[2px] font-semibold">기본 화면</span>
        </div>
        <div className="h-[41px] w-px bg-black/10" />
        <div className="flex items-center gap-[8px]">
          <span className="text-[#ffb32f]">★</span>
          <span className="text-[#757575]">칭찬별</span>
          <span className="border-b border-[#757575] pb-[2px] font-semibold">16/24</span>
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

function HomeScreen({
  onOpenDesign,
  onOpenDesignTwoThree,
  onOpenDesignTwoFour,
}: {
  onOpenDesign: () => void;
  onOpenDesignTwoThree: () => void;
  onOpenDesignTwoFour: () => void;
}) {
  const buttonClass =
    'min-w-[196px] rounded-[20px] border border-white/15 bg-white px-[36px] py-[16px] text-[24px] font-bold text-black transition-all duration-150 hover:scale-[1.02] hover:bg-white/92';
  const primaryButtonClass =
    'min-w-[196px] rounded-[20px] border border-[#e87800] bg-[#e87800] px-[36px] py-[16px] text-[24px] font-bold text-white transition-all duration-150 hover:scale-[1.02] hover:bg-[#f08a17]';

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-[24px]">
      <div className="flex flex-col items-center gap-[16px]">
        <button type="button" onClick={onOpenDesign} className={primaryButtonClass}>
          디자인
        </button>
        <button type="button" onClick={onOpenDesignTwoThree} className={buttonClass}>
          디자인 2-3
        </button>
        <button type="button" onClick={onOpenDesignTwoFour} className={buttonClass}>
          디자인 2-4
        </button>
      </div>
    </div>
  );
}

type DesignLayout = 'master-detail' | 'connected-detail';

interface TeacherPrototypeScreenProps {
  designLayout?: DesignLayout;
  showRevealSteps: boolean;
  showExampleVisitedIndicators: boolean;
  showAdditionalMaterialVisitedIndicators: boolean;
  accentColor?: string;
  activeCardColor?: string;
  wordListTextClassName?: string;
  meaningTabVisitedIndicatorStyle?: 'badge' | 'check';
  meaningVisitedIndicatorVariant?: 'plain' | 'badge';
  meaningVisitedIndicatorSize?: number;
  meaningVisitedIndicatorIconSize?: number;
}

function TeacherPrototypeScreen({
  designLayout = 'master-detail',
  showRevealSteps,
  showExampleVisitedIndicators,
  showAdditionalMaterialVisitedIndicators,
  accentColor = '#1876d2',
  activeCardColor = '#2578cf',
  wordListTextClassName = 'text-[16px]',
  meaningTabVisitedIndicatorStyle = 'badge',
  meaningVisitedIndicatorVariant = 'plain',
  meaningVisitedIndicatorSize = 24,
  meaningVisitedIndicatorIconSize = 14,
}: TeacherPrototypeScreenProps) {
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
    handleMeaningDisplayToggle(currentState.activeMeaningTab);
  };

  const handleMeaningDisplayToggle = (meaningId: number) => {
    updateCurrentWordState((state) => {
      if (state.displayedMeaningId === meaningId) {
        return {
          ...state,
          activeMeaningTab: meaningId,
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
        activeMeaningTab: meaningId,
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
        activeMeaningTab: exampleMeaningId ?? state.activeMeaningTab,
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

  const handleSupplementaryToggleForMeaning = (meaningId: number) => {
    updateCurrentWordState((state) => {
      const expandedSupplementaryMeaningIds = new Set(state.expandedSupplementaryMeaningIds);

      if (expandedSupplementaryMeaningIds.has(meaningId)) {
        expandedSupplementaryMeaningIds.delete(meaningId);
      } else {
        expandedSupplementaryMeaningIds.add(meaningId);
      }

      return {
        ...state,
        expandedSupplementaryMeaningIds,
      };
    });
  };

  const handleSupplementaryToggle = () => {
    handleSupplementaryToggleForMeaning(currentState.activeMeaningTab);
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

  const isConnectedDesign = designLayout === 'connected-detail';

  const wordListNode = (
    <DesignTwoThreeWordList
      words={wordsData}
      selectedWordId={currentWord.id}
      isWordCompleted={(wordId) => isWordCompleted(wordStates[wordId])}
      onWordSelect={setSelectedWordId}
      connected={isConnectedDesign}
      widthClassName={isConnectedDesign ? 'w-[248px]' : 'w-[236px]'}
      accentColor={accentColor}
      wordTextClassName={wordListTextClassName}
    />
  );

  const previewNode = (
    <StudentPreview
      word={currentWord}
      state={currentState}
      showRevealSteps={showRevealSteps}
      onAdvanceReveal={handleAdvanceReveal}
      onRevealStep={handleRevealStep}
      onCloseMeaning={handleCloseMeaning}
      onCloseExample={handleCloseExample}
      onCloseAdditionalMaterial={handleCloseAdditionalMaterial}
      onMeaningCta={handlePreviewMeaningCta}
      onExampleCta={handlePreviewExampleCta}
    />
  );

  const controlNode = (
    <ControlPanel
      word={currentWord}
      state={currentState}
      showExampleVisitedIndicators={showExampleVisitedIndicators}
      showAdditionalMaterialVisitedIndicators={showAdditionalMaterialVisitedIndicators}
      borderMode={isConnectedDesign ? 'none' : 'left'}
      widthClassName={isConnectedDesign ? 'w-[648px]' : 'w-[640px]'}
      surfaceTone={isConnectedDesign ? 'neutral' : 'emerald'}
      accentColor={accentColor}
      activeCardColor={activeCardColor}
      meaningTabVisitedIndicatorStyle={meaningTabVisitedIndicatorStyle}
      meaningVisitedIndicatorVariant={meaningVisitedIndicatorVariant}
      meaningVisitedIndicatorSize={meaningVisitedIndicatorSize}
      meaningVisitedIndicatorIconSize={meaningVisitedIndicatorIconSize}
      onMeaningToggle={handleMeaningToggle}
      onMeaningTabChange={handleMeaningTabChange}
      onExampleClick={handleExampleClick}
      onSupplementaryToggle={handleSupplementaryToggle}
      onAdditionalMaterialClick={handleAdditionalMaterialSelect}
    />
  );

  const screenContent = isConnectedDesign ? (
    <>
      <div className="relative flex h-full shrink-0 overflow-hidden rounded-l-[12px] border-r border-white/10 bg-[#232323]">
        {wordListNode}
        {controlNode}
      </div>
      {previewNode}
    </>
  ) : (
    <>
      {wordListNode}
      {controlNode}
      {previewNode}
    </>
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden" style={{ background: '#eeeeee' }}>
      <HeaderLesson />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <HeaderContents />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-[24px]">
          <div className="flex min-h-0 flex-1 flex-col gap-[16px]">
            <SectionSummary />
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-[16px] border-[4px] border-white bg-[#212121]">
              <div
                className="absolute inset-0 flex min-h-0 items-stretch overflow-hidden rounded-[inherit]"
                style={{ background: '#9e9e9e' }}
              >
                {screenContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'design' | 'design2-3' | 'design2-4'>(
    'home'
  );

  if (currentView === 'home') {
    return (
      <HomeScreen
        onOpenDesign={() => setCurrentView('design')}
        onOpenDesignTwoThree={() => setCurrentView('design2-3')}
        onOpenDesignTwoFour={() => setCurrentView('design2-4')}
      />
    );
  }

  if (currentView === 'design') {
    return (
      <TeacherPrototypeScreen
        designLayout="master-detail"
        showRevealSteps={false}
        showExampleVisitedIndicators={false}
        showAdditionalMaterialVisitedIndicators={false}
        accentColor="#e87800"
        activeCardColor="#e87800"
        wordListTextClassName="text-[18px]"
        meaningTabVisitedIndicatorStyle="check"
        meaningVisitedIndicatorVariant="badge"
        meaningVisitedIndicatorSize={30}
        meaningVisitedIndicatorIconSize={16}
      />
    );
  }

  if (currentView === 'design2-3') {
    return (
      <TeacherPrototypeScreen
        designLayout="master-detail"
        showRevealSteps={false}
        showExampleVisitedIndicators={false}
        showAdditionalMaterialVisitedIndicators={false}
      />
    );
  }

  if (currentView === 'design2-4') {
    return (
      <TeacherPrototypeScreen
        designLayout="connected-detail"
        showRevealSteps={false}
        showExampleVisitedIndicators={false}
        showAdditionalMaterialVisitedIndicators={false}
      />
    );
  }

  return null;
}

export default App;
