import type { ReactNode, RefObject } from 'react';
import { X } from 'lucide-react';
import type { Meaning, RevealState, WordData, WordState } from '../types';
import { SCROLL_THUMB_HEIGHT, useFigmaScrollbar } from './CustomScrollbar';

interface WireframeThreeScreenProps {
  words: WordData[];
  selectedWordId: string;
  currentWord: WordData;
  state: WordState;
  isWordCompleted: (wordId: string) => boolean;
  onWordSelect: (wordId: string) => void;
  onAdvanceReveal: () => void;
  onRevealStep: (target: RevealState) => void;
  onMeaningDisplayToggle: (meaningId: number) => void;
  onCloseMeaning: () => void;
  onExampleClick: (exampleId: string) => void;
  onCloseExample: () => void;
  onMeaningCta: () => void;
  onExampleCta: () => void;
  onSupplementaryToggle: (meaningId: number) => void;
  onAdditionalMaterialClick: (materialId: string) => void;
  onCloseAdditionalMaterial: () => void;
}

const REVEAL_LABELS: Record<RevealState, string> = {
  hidden: '공개 전',
  initials: '초성 공개',
  full: '전체 공개',
};

function getMaskedWord(text: string) {
  return text.replace(/\S/g, '□');
}

function getMeaningLabel(word: WordData, meaning: Meaning) {
  return word.meanings.length === 1 ? '뜻' : `뜻 ${meaning.id}`;
}

function getMeaningExamples(meaning: Meaning) {
  return [...meaning.basicExamples, ...meaning.supplementaryExamples];
}

function getExampleMeaningId(word: WordData, exampleId: string | null) {
  if (!exampleId) {
    return null;
  }

  for (const meaning of word.meanings) {
    if (getMeaningExamples(meaning).some((example) => example.id === exampleId)) {
      return meaning.id;
    }
  }

  return null;
}

function WireframeSectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[14px] font-semibold uppercase tracking-[0.08em] text-white/42">
      {children}
    </h2>
  );
}

function WireframeActionButton({
  children,
  disabled = false,
  active = false,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
}) {
  const className = [
    'rounded-[14px] border px-[16px] py-[12px] text-[15px] font-semibold transition-colors duration-150',
    disabled
      ? 'cursor-default border-white/8 bg-white/6 text-white/30'
      : active
        ? 'border-white/90 bg-white text-black hover:bg-white/92'
        : 'border-white/12 bg-[#1a1d22] text-white hover:bg-[#21252b]',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" disabled={disabled} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

function WireframeExampleButton({
  label,
  text,
  active,
  onClick,
}: {
  label: string;
  text: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-[14px] border px-[12px] py-[12px] text-left transition-colors duration-150"
      style={{
        borderColor: active ? 'rgba(255, 255, 255, 0.88)' : 'rgba(255, 255, 255, 0.08)',
        background: active ? '#ffffff' : '#1c2026',
        color: active ? '#111111' : '#ffffff',
      }}
    >
      <div className="mb-[4px] text-[11px] font-semibold uppercase tracking-[0.08em] opacity-55">
        {label}
      </div>
      <div className="text-[15px] leading-[1.5]">{text}</div>
    </button>
  );
}

function WireframeSupplementaryToggle({
  expanded,
  onClick,
}: {
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center rounded-[12px] border border-white/8 bg-[#15181d] px-[12px] py-[10px] text-[13px] font-semibold text-white/72 transition-colors duration-150 hover:bg-[#1b1f25] hover:text-white"
    >
      {expanded ? '보조 예문 닫기' : '보조 예문 보기'}
    </button>
  );
}

function WireframeScrollTrack({
  trackRef,
  thumbTop,
}: {
  trackRef: RefObject<HTMLDivElement>;
  thumbTop: number;
}) {
  return (
    <div
      ref={trackRef}
      className="pointer-events-none absolute bottom-0 right-0 top-0 z-[2] w-[18px]"
    >
      <div className="absolute bottom-[20px] right-[7px] top-[20px] w-[6px] rounded-full bg-[#232831]" />
      <div
        className="absolute right-[7px] w-[6px] rounded-full bg-[#606c80]"
        style={{
          top: thumbTop,
          height: `${SCROLL_THUMB_HEIGHT}px`,
          transition: 'top 0.08s linear',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
        }}
      />
    </div>
  );
}

function WireframeWordList({
  words,
  selectedWordId,
  isWordCompleted,
  onWordSelect,
}: {
  words: WordData[];
  selectedWordId: string;
  isWordCompleted: (wordId: string) => boolean;
  onWordSelect: (wordId: string) => void;
}) {
  const { scrollableRef, trackRef, thumbTop, handleScroll } = useFigmaScrollbar(24);

  return (
    <aside className="relative flex h-full w-[280px] shrink-0 flex-col border-r border-white/8 bg-[#14171c]">
      <div className="border-b border-white/8 px-[20px] py-[18px]">
        <WireframeSectionTitle>단어 목록</WireframeSectionTitle>
      </div>

      <div className="relative min-h-0 flex-1">
        <div
          ref={scrollableRef}
          onScroll={handleScroll}
          className="hide-scrollbar h-full overflow-y-auto px-[16px] py-[16px] pr-[24px]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex flex-col gap-[10px]">
            {words.map((word) => {
              const isSelected = word.id === selectedWordId;
              const isCompleted = isWordCompleted(word.id);

              return (
                <button
                  key={word.id}
                  type="button"
                  onClick={() => onWordSelect(word.id)}
                  className="rounded-[16px] border p-[14px] text-left transition-colors duration-150 hover:bg-white/[0.03]"
                  style={{
                    borderColor: isSelected ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.08)',
                    background: isSelected ? '#20242a' : '#181b20',
                  }}
                >
                  <div className="flex items-start gap-[10px]">
                    <div className="min-w-0 flex-1">
                      <div className="text-[17px] font-semibold leading-[1.45] text-white">
                        {word.word}
                      </div>
                    </div>
                    {isCompleted && (
                      <div className="rounded-full border border-white/12 bg-white px-[8px] py-[4px] text-[11px] font-semibold text-black">
                        완료
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <WireframeScrollTrack trackRef={trackRef} thumbTop={thumbTop} />
      </div>
    </aside>
  );
}

function PreviewCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[20px] border border-white/8 bg-[#171a1f] p-[20px]">
      <div className="mb-[14px] flex items-center justify-between">
        <WireframeSectionTitle>{title}</WireframeSectionTitle>
      </div>
      {children}
    </section>
  );
}

function WireframePreview({
  word,
  state,
  onAdvanceReveal,
  onCloseMeaning,
  onCloseExample,
  onMeaningCta,
  onExampleCta,
}: {
  word: WordData;
  state: WordState;
  onAdvanceReveal: () => void;
  onCloseMeaning: () => void;
  onCloseExample: () => void;
  onMeaningCta: () => void;
  onExampleCta: () => void;
}) {
  const displayedMeaning =
    state.displayedMeaningId !== null
      ? word.meanings.find((meaning) => meaning.id === state.displayedMeaningId)
      : undefined;

  const activeExample =
    state.activeExampleId !== null
      ? word.meanings
          .flatMap((meaning) => getMeaningExamples(meaning))
          .find((example) => example.id === state.activeExampleId)
      : undefined;

  const showMeaningCta = state.displayedMeaningId === null && state.visitedMeaningIds.size === 0;
  const showExampleCta = state.activeExampleId === null && state.visitedExampleIds.size === 0;

  const wordText =
    state.revealState === 'hidden'
      ? getMaskedWord(word.word)
      : state.revealState === 'initials'
        ? word.initials
        : word.word;

  return (
    <main className="flex min-w-0 flex-1 flex-col bg-[#0f1115] px-[28px] py-[24px]">
      <div className="mb-[18px] flex items-center justify-between">
        <WireframeSectionTitle>학생 화면</WireframeSectionTitle>
        <div className="rounded-full border border-white/10 bg-white/6 px-[12px] py-[6px] text-[12px] font-semibold text-white/62">
          상태: {REVEAL_LABELS[state.revealState]}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[620px] flex-1 flex-col justify-center gap-[16px]">
        <PreviewCard title="단어">
          <div className="rounded-[16px] border border-white/8 bg-[#101216] px-[20px] py-[28px] text-center">
            <div className="text-[30px] font-bold leading-[1.4] tracking-[-0.04em] text-white">
              {wordText}
            </div>
            {state.revealState !== 'full' && (
              <div className="mt-[18px]">
                <WireframeActionButton active={true} onClick={onAdvanceReveal}>
                  {state.revealState === 'hidden' ? '초성 보여주기' : '전체 보여주기'}
                </WireframeActionButton>
              </div>
            )}
          </div>
        </PreviewCard>

        <PreviewCard title="뜻">
          {displayedMeaning ? (
            <div className="rounded-[16px] border border-white/8 bg-[#101216] p-[18px]">
              <div className="mb-[10px] flex justify-end">
                <button
                  type="button"
                  onClick={onCloseMeaning}
                  className="text-[13px] font-semibold text-white/45 transition-colors hover:text-white"
                >
                  닫기
                </button>
              </div>
              <p className="text-[18px] leading-[1.6] text-white">{displayedMeaning.text}</p>
            </div>
          ) : showMeaningCta ? (
            <div className="rounded-[16px] border border-white/8 bg-[#101216] p-[18px] text-center">
              <WireframeActionButton active={true} onClick={onMeaningCta}>
                보여주기
              </WireframeActionButton>
            </div>
          ) : (
            <div className="rounded-[16px] border border-white/8 bg-[#101216] px-[18px] py-[24px] text-center text-[15px] text-white/34">
              현재 표시 중인 뜻이 없습니다.
            </div>
          )}
        </PreviewCard>

        <PreviewCard title="예문">
          {activeExample ? (
            <div className="rounded-[16px] border border-white/8 bg-[#101216] p-[18px]">
              <div className="mb-[10px] flex justify-end">
                <button
                  type="button"
                  onClick={onCloseExample}
                  className="text-[13px] font-semibold text-white/45 transition-colors hover:text-white"
                >
                  닫기
                </button>
              </div>
              <p className="text-[18px] leading-[1.6] text-white">{activeExample.text}</p>
            </div>
          ) : showExampleCta ? (
            <div className="rounded-[16px] border border-white/8 bg-[#101216] p-[18px] text-center">
              <WireframeActionButton active={true} onClick={onExampleCta}>
                보여주기
              </WireframeActionButton>
            </div>
          ) : (
            <div className="rounded-[16px] border border-white/8 bg-[#101216] px-[18px] py-[24px] text-center text-[15px] text-white/34">
              현재 표시 중인 예문이 없습니다.
            </div>
          )}
        </PreviewCard>
      </div>
    </main>
  );
}

function WireframeControlPanel({
  word,
  state,
  onRevealStep,
  onMeaningDisplayToggle,
  onExampleClick,
  onSupplementaryToggle,
  onAdditionalMaterialClick,
}: {
  word: WordData;
  state: WordState;
  onRevealStep: (target: RevealState) => void;
  onMeaningDisplayToggle: (meaningId: number) => void;
  onExampleClick: (exampleId: string) => void;
  onSupplementaryToggle: (meaningId: number) => void;
  onAdditionalMaterialClick: (materialId: string) => void;
}) {
  const { scrollableRef, trackRef, thumbTop, handleScroll } = useFigmaScrollbar(24);
  const activeExampleMeaningId = getExampleMeaningId(word, state.activeExampleId);

  return (
    <aside className="relative flex h-full w-[420px] shrink-0 flex-col border-l border-white/8 bg-[#14171c]">
      <div className="border-b border-white/8 px-[20px] py-[18px]">
        <WireframeSectionTitle>교사 조작</WireframeSectionTitle>
      </div>

      <div className="relative min-h-0 flex-1">
        <div
          ref={scrollableRef}
          onScroll={handleScroll}
          className="hide-scrollbar h-full overflow-y-auto px-[20px] py-[18px] pr-[28px]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex flex-col gap-[18px]">
            <section className="rounded-[20px] border border-white/8 bg-[#1a1d22] p-[16px]">
              <div className="mb-[12px] flex items-center justify-between">
                <WireframeSectionTitle>단어 공개</WireframeSectionTitle>
                <span className="text-[12px] font-semibold text-white/46">
                  {REVEAL_LABELS[state.revealState]}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-[10px]">
                <WireframeActionButton
                  disabled={state.revealState !== 'hidden'}
                  onClick={() => onRevealStep('initials')}
                >
                  초성 공개
                </WireframeActionButton>
                <WireframeActionButton
                  disabled={state.revealState !== 'initials'}
                  onClick={() => onRevealStep('full')}
                >
                  전체 공개
                </WireframeActionButton>
              </div>
            </section>

            <section className="rounded-[20px] border border-white/8 bg-[#1a1d22] p-[16px]">
              <div className="mb-[8px]">
                <WireframeSectionTitle>뜻과 예문</WireframeSectionTitle>
              </div>
              <p className="mb-[14px] text-[13px] leading-[1.5] text-white/46">
                예문을 선택하면 단어는 전체 공개되지만 뜻은 자동으로 열리지 않습니다.
              </p>

              <div className="flex flex-col gap-[12px]">
                {word.meanings.map((meaning) => {
                  const isMeaningVisible = state.displayedMeaningId === meaning.id;
                  const isContextActive =
                    isMeaningVisible || activeExampleMeaningId === meaning.id;
                  const isSupplementaryExpanded = state.expandedSupplementaryMeaningIds.has(
                    meaning.id
                  );

                  return (
                    <div
                      key={meaning.id}
                      className="rounded-[18px] border p-[14px]"
                      style={{
                        borderColor: isContextActive
                          ? 'rgba(255, 255, 255, 0.78)'
                          : 'rgba(255, 255, 255, 0.08)',
                        background: isContextActive ? '#22262d' : '#171a1f',
                      }}
                    >
                      <div className="flex items-center justify-between gap-[12px]">
                        <div className="text-[15px] font-semibold text-white">
                          {getMeaningLabel(word, meaning)}
                        </div>
                        <WireframeActionButton
                          active={isMeaningVisible}
                          onClick={() => onMeaningDisplayToggle(meaning.id)}
                        >
                          {isMeaningVisible ? '뜻 닫기' : '뜻 보기'}
                        </WireframeActionButton>
                      </div>

                      <p className="mt-[12px] text-[15px] leading-[1.55] text-white/68">
                        {meaning.text}
                      </p>

                      <div className="mt-[14px] flex flex-col gap-[8px]">
                        {meaning.basicExamples.map((example, index) => (
                          <WireframeExampleButton
                            key={example.id}
                            label={`예문 ${index + 1}`}
                            text={example.text}
                            active={state.activeExampleId === example.id}
                            onClick={() => onExampleClick(example.id)}
                          />
                        ))}

                        {meaning.supplementaryExamples.length > 0 && (
                          <>
                            <WireframeSupplementaryToggle
                              expanded={isSupplementaryExpanded}
                              onClick={() => onSupplementaryToggle(meaning.id)}
                            />

                            {isSupplementaryExpanded && (
                              <div className="flex flex-col gap-[8px] rounded-[14px] border border-white/8 bg-[#15181d] p-[10px]">
                                <div className="px-[2px] text-[11px] font-semibold uppercase tracking-[0.08em] text-white/38">
                                  보조 예문
                                </div>
                                {meaning.supplementaryExamples.map((example, index) => (
                                  <WireframeExampleButton
                                    key={example.id}
                                    label={`보조 ${index + 1}`}
                                    text={example.text}
                                    active={state.activeExampleId === example.id}
                                    onClick={() => onExampleClick(example.id)}
                                  />
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {word.additionalMaterials && word.additionalMaterials.length > 0 && (
              <section className="rounded-[20px] border border-white/8 bg-[#1a1d22] p-[16px]">
                <div className="mb-[12px]">
                  <WireframeSectionTitle>추가 자료</WireframeSectionTitle>
                </div>
                <div className="grid grid-cols-2 gap-[10px]">
                  {word.additionalMaterials.map((material, index) => {
                    const isActive = state.activeAdditionalMaterialId === material.id;
                    const label =
                      material.type === 'video'
                        ? `영상 자료 ${index + 1}`
                        : `이미지 자료 ${index + 1}`;

                    return (
                      <button
                        key={material.id}
                        type="button"
                        onClick={() => onAdditionalMaterialClick(material.id)}
                        className="aspect-[4/3] rounded-[16px] border transition-colors duration-150"
                        style={{
                          borderColor: isActive
                            ? 'rgba(255, 255, 255, 0.88)'
                            : 'rgba(255, 255, 255, 0.08)',
                          background: isActive ? '#20242a' : '#171a1f',
                        }}
                      >
                        <div className="flex h-full items-center justify-center px-[12px] text-center text-[14px] font-semibold text-white/70">
                          {label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>

        <WireframeScrollTrack trackRef={trackRef} thumbTop={thumbTop} />
      </div>
    </aside>
  );
}

export function WireframeThreeScreen({
  words,
  selectedWordId,
  currentWord,
  state,
  isWordCompleted,
  onWordSelect,
  onAdvanceReveal,
  onRevealStep,
  onMeaningDisplayToggle,
  onCloseMeaning,
  onExampleClick,
  onCloseExample,
  onMeaningCta,
  onExampleCta,
  onSupplementaryToggle,
  onAdditionalMaterialClick,
  onCloseAdditionalMaterial,
}: WireframeThreeScreenProps) {
  const activeMaterial =
    state.activeAdditionalMaterialId !== null
      ? currentWord.additionalMaterials?.find(
          (material) => material.id === state.activeAdditionalMaterialId
        )
      : undefined;

  const activeMaterialLabel = activeMaterial
    ? activeMaterial.type === 'video'
      ? '영상 자료 미리보기'
      : '이미지 자료 미리보기'
    : '';

  return (
    <div className="relative flex size-full overflow-hidden bg-[#0f1115]">
      <div className="flex size-full overflow-hidden">
        <WireframeWordList
          words={words}
          selectedWordId={selectedWordId}
          isWordCompleted={isWordCompleted}
          onWordSelect={onWordSelect}
        />
        <WireframePreview
          word={currentWord}
          state={state}
          onAdvanceReveal={onAdvanceReveal}
          onCloseMeaning={onCloseMeaning}
          onCloseExample={onCloseExample}
          onMeaningCta={onMeaningCta}
          onExampleCta={onExampleCta}
        />
        <WireframeControlPanel
          word={currentWord}
          state={state}
          onRevealStep={onRevealStep}
          onMeaningDisplayToggle={onMeaningDisplayToggle}
          onExampleClick={onExampleClick}
          onSupplementaryToggle={onSupplementaryToggle}
          onAdditionalMaterialClick={onAdditionalMaterialClick}
        />
      </div>

      {activeMaterial && (
        <div className="absolute inset-0 z-[20] flex items-center justify-center bg-black/45 p-[24px]">
          <div className="w-full max-w-[720px] rounded-[24px] border border-white/8 bg-[#171a1f] p-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.32)]">
            <div className="mb-[16px] flex items-center justify-between">
              <WireframeSectionTitle>{activeMaterialLabel}</WireframeSectionTitle>
              <button
                type="button"
                onClick={onCloseAdditionalMaterial}
                className="rounded-full border border-white/10 p-[8px] text-white/60 transition-colors hover:bg-white/[0.03] hover:text-white"
                aria-label="추가 자료 닫기"
              >
                <X className="size-[18px]" />
              </button>
            </div>
            <div className="flex aspect-[16/9] items-center justify-center rounded-[20px] border border-white/8 bg-[#0f1115] text-[22px] font-semibold text-white/42">
              {activeMaterialLabel}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
