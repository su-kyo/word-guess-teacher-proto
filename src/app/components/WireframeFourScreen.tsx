import { useState, type ReactNode, type RefObject } from 'react';
import { Check, Layers3, X } from 'lucide-react';
import { StudentPreview } from './StudentPreview';
import type { Meaning, RevealState, WordData, WordState } from '../types';
import { SCROLL_THUMB_HEIGHT, useFigmaScrollbar } from './CustomScrollbar';

interface WireframeFourScreenProps {
  words: WordData[];
  selectedWordId: string;
  currentWord: WordData;
  state: WordState;
  isWordCompleted: (wordId: string) => boolean;
  onWordSelect: (wordId: string) => void;
  onAdvanceReveal: () => void;
  onRevealStep: (target: RevealState) => void;
  onMeaningTabChange: (meaningId: number) => void;
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

function DarkSectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-[4px]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/36">
        {eyebrow}
      </div>
      <div className="text-[18px] font-semibold text-white">{title}</div>
      {description && <p className="text-[13px] leading-[1.5] text-white/46">{description}</p>}
    </div>
  );
}

function DarkChip({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'active' | 'success';
}) {
  const toneClass =
    tone === 'active'
      ? 'border-white/20 bg-white text-black'
      : tone === 'success'
        ? 'border-[#3a6b5b] bg-[#183126] text-[#b8f1d8]'
        : 'border-white/10 bg-white/[0.04] text-white/62';

  return (
    <span
      className={`rounded-full border px-[10px] py-[6px] text-[12px] font-semibold ${toneClass}`}
    >
      {children}
    </span>
  );
}

function DarkActionButton({
  children,
  onClick,
  disabled = false,
  active = false,
  fullWidth = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  fullWidth?: boolean;
}) {
  const widthClass = fullWidth ? 'w-full' : '';
  const className = [
    widthClass,
    'rounded-[14px] border px-[16px] py-[12px] text-[14px] font-semibold transition-colors duration-150',
    disabled
      ? 'cursor-default border-white/8 bg-white/[0.05] text-white/28'
      : active
        ? 'border-white/80 bg-white text-black hover:bg-white/92'
        : 'border-white/10 bg-[#171b21] text-white hover:bg-[#1d2229]',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

function DarkScrollTrack({
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
      <div className="absolute bottom-[18px] right-[7px] top-[18px] w-[6px] rounded-full bg-[#232831]" />
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

function WordSelectorLayer({
  words,
  selectedWordId,
  isWordCompleted,
  onSelect,
  onClose,
}: {
  words: WordData[];
  selectedWordId: string | null;
  isWordCompleted: (wordId: string) => boolean;
  onSelect: (wordId: string) => void;
  onClose: () => void;
}) {
  const { scrollableRef, trackRef, thumbTop, handleScroll } = useFigmaScrollbar(20);

  return (
    <div className="absolute inset-0 z-[30] flex items-center justify-center bg-[#0c1015]/38 p-[28px] backdrop-blur-[2px]">
      <div className="relative flex h-full max-h-[760px] w-full max-w-[1120px] flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[#14181e] shadow-[0_32px_120px_rgba(0,0,0,0.38)]">
        <div className="flex items-start justify-between gap-[16px] border-b border-white/8 px-[28px] py-[24px]">
          <DarkSectionTitle
            eyebrow="Step 1"
            title="단어 선택"
            description="진행할 단어를 먼저 고른 뒤 메인 화면에서 공개를 이어갑니다."
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 p-[10px] text-white/55 transition-colors duration-150 hover:bg-white/[0.04] hover:text-white"
            aria-label="단어 목록 닫기"
          >
            <X className="size-[18px]" />
          </button>
        </div>

        <div className="relative min-h-0 flex-1">
          <div
            ref={scrollableRef}
            onScroll={handleScroll}
            className="hide-scrollbar h-full overflow-y-auto px-[28px] py-[28px] pr-[38px]"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="grid grid-cols-[repeat(4,220px)] justify-center gap-[12px]">
              {words.map((word) => {
                const isSelected = selectedWordId !== null && word.id === selectedWordId;
                const completed = isWordCompleted(word.id);

                return (
                  <button
                    key={word.id}
                    type="button"
                    onClick={() => onSelect(word.id)}
                    className="group relative rounded-[20px] border px-[16px] py-[16px] text-left transition-transform duration-150 hover:-translate-y-[2px]"
                    style={{
                      borderColor: isSelected
                        ? 'rgba(255,255,255,0.72)'
                        : 'rgba(255,255,255,0.08)',
                      background: '#171b21',
                    }}
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-[20px] bg-white/[0.05] opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                    <div className="relative flex min-h-[148px] flex-col gap-[12px]">
                      <div className="flex items-start justify-end">
                        {completed && (
                          <div className="flex size-[24px] shrink-0 items-center justify-center rounded-full bg-white text-black">
                            <Check className="size-[14px]" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div
                          className="text-[18px] font-semibold leading-[1.45] text-white"
                          style={{
                            wordBreak: 'keep-all',
                            overflowWrap: 'anywhere',
                          }}
                        >
                          {word.word}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <DarkScrollTrack trackRef={trackRef} thumbTop={thumbTop} />
        </div>
      </div>
    </div>
  );
}

function InitialSelectionBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[20] flex">
      <div className="flex min-w-0 flex-1 flex-col border-r border-white/8 bg-[#11161c]">
        <div className="flex items-center justify-between gap-[16px] border-b border-white/8 px-[26px] py-[20px]">
          <div className="h-[34px] w-[240px] rounded-full bg-white/[0.08]" />
          <div className="h-[44px] w-[124px] rounded-[14px] border border-white/10 bg-[#181d24]" />
        </div>

        <div className="min-h-0 flex-1 px-[26px] py-[24px]">
          <div className="flex size-full min-h-0 overflow-hidden rounded-[28px] border border-white/8 bg-[#151b22]">
            <div className="size-full bg-white/[0.02]" />
          </div>
        </div>
      </div>

      <div className="flex w-[430px] shrink-0 flex-col bg-[#161b22]">
        <div className="flex min-h-0 flex-1 flex-col gap-[16px] px-[22px] py-[22px]">
          <div className="h-[152px] rounded-[22px] border border-white/8 bg-[#1c222b]" />
          <div className="h-[224px] rounded-[22px] border border-white/8 bg-[#1c222b]" />
          <div className="min-h-0 flex-1 rounded-[22px] border border-white/8 bg-[#1c222b]" />
        </div>
      </div>
    </div>
  );
}

function PreviewPane({
  word,
  state,
  onOpenSelector,
  onAdvanceReveal,
  onRevealStep,
  onCloseMeaning,
  onCloseExample,
  onCloseAdditionalMaterial,
  onMeaningCta,
  onExampleCta,
}: {
  word: WordData;
  state: WordState;
  onOpenSelector: () => void;
  onAdvanceReveal: () => void;
  onRevealStep: (target: RevealState) => void;
  onCloseMeaning: () => void;
  onCloseExample: () => void;
  onCloseAdditionalMaterial: () => void;
  onMeaningCta: () => void;
  onExampleCta: () => void;
}) {
  return (
    <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden border-r border-white/8 bg-[#0f1115]">
      <div className="flex items-center justify-between gap-[16px] border-b border-white/8 px-[26px] py-[20px]">
        <div className="min-w-0 text-[26px] font-semibold leading-[1.35] text-white">
          {word.word}
        </div>

        <DarkActionButton onClick={onOpenSelector}>
          <span className="inline-flex items-center gap-[8px]">
            <Layers3 className="size-[16px]" />
            단어 목록
          </span>
        </DarkActionButton>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-[26px] py-[24px]">
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex min-h-0 flex-1 overflow-hidden rounded-[28px] border border-white/8 bg-[#12161b]">
            <StudentPreview
              word={word}
              state={state}
              showRevealSteps={false}
              onAdvanceReveal={onAdvanceReveal}
              onRevealStep={onRevealStep}
              onCloseMeaning={onCloseMeaning}
              onCloseExample={onCloseExample}
              onCloseAdditionalMaterial={onCloseAdditionalMaterial}
              onMeaningCta={onMeaningCta}
              onExampleCta={onExampleCta}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlPane({
  word,
  state,
  onAdvanceReveal,
  onRevealStep,
  onMeaningTabChange,
  onMeaningDisplayToggle,
  onCloseMeaning,
  onExampleClick,
  onCloseExample,
  onSupplementaryToggle,
  onAdditionalMaterialClick,
  onCloseAdditionalMaterial,
}: {
  word: WordData;
  state: WordState;
  onAdvanceReveal: () => void;
  onRevealStep: (target: RevealState) => void;
  onMeaningTabChange: (meaningId: number) => void;
  onMeaningDisplayToggle: (meaningId: number) => void;
  onCloseMeaning: () => void;
  onExampleClick: (exampleId: string) => void;
  onCloseExample: () => void;
  onSupplementaryToggle: (meaningId: number) => void;
  onAdditionalMaterialClick: (materialId: string) => void;
  onCloseAdditionalMaterial: () => void;
}) {
  const { scrollableRef, trackRef, thumbTop, handleScroll } = useFigmaScrollbar(24);
  const currentMeaning =
    word.meanings.find((meaning) => meaning.id === state.activeMeaningTab) ?? word.meanings[0];
  const activeExampleMeaningId = getExampleMeaningId(word, state.activeExampleId);
  const activeMaterial =
    state.activeAdditionalMaterialId !== null
      ? word.additionalMaterials?.find(
          (material) => material.id === state.activeAdditionalMaterialId
        )
      : undefined;

  if (!currentMeaning) {
    return null;
  }

  const nextReveal =
    state.revealState === 'hidden'
      ? 'initials'
      : state.revealState === 'initials'
        ? 'full'
        : null;

  const isMeaningVisible = state.displayedMeaningId === currentMeaning.id;
  const isSupplementaryExpanded = state.expandedSupplementaryMeaningIds.has(currentMeaning.id);

  return (
    <aside className="relative flex h-full w-[430px] shrink-0 flex-col bg-[#13171d]">
      <div className="relative min-h-0 flex-1">
        <div
          ref={scrollableRef}
          onScroll={handleScroll}
          className="hide-scrollbar h-full overflow-y-auto px-[22px] py-[22px] pr-[34px]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex flex-col gap-[16px]">
            <section className="rounded-[22px] border border-white/8 bg-[#181d24] p-[16px]">
              <DarkSectionTitle
                eyebrow="1"
                title="단어 공개"
                description="공개 전에서 초성 공개, 전체 공개 순서로만 진행합니다."
              />

              <div className="mt-[14px] flex flex-wrap gap-[8px]">
                <DarkChip tone={state.revealState === 'hidden' ? 'active' : 'neutral'}>
                  공개 전
                </DarkChip>
                <DarkChip tone={state.revealState === 'initials' ? 'active' : 'neutral'}>
                  초성 공개
                </DarkChip>
                <DarkChip tone={state.revealState === 'full' ? 'active' : 'neutral'}>
                  전체 공개
                </DarkChip>
              </div>

              <div className="mt-[14px] grid grid-cols-2 gap-[10px]">
                <DarkActionButton
                  fullWidth={true}
                  disabled={state.revealState !== 'hidden'}
                  onClick={() => onRevealStep('initials')}
                >
                  초성 공개
                </DarkActionButton>
                <DarkActionButton
                  fullWidth={true}
                  disabled={state.revealState !== 'initials'}
                  onClick={() => onRevealStep('full')}
                >
                  전체 공개
                </DarkActionButton>
              </div>

              <div className="mt-[10px]">
                <DarkActionButton
                  fullWidth={true}
                  disabled={nextReveal === null}
                  onClick={onAdvanceReveal}
                >
                  {nextReveal === 'initials'
                    ? '다음 단계: 초성 공개'
                    : nextReveal === 'full'
                      ? '다음 단계: 전체 공개'
                      : '모든 공개 완료'}
                </DarkActionButton>
              </div>
            </section>

            <section className="rounded-[22px] border border-white/8 bg-[#181d24] p-[16px]">
              <DarkSectionTitle
                eyebrow="2"
                title="뜻 공개"
                description="뜻 탭을 선택한 뒤 실제로 보여주기나 숨기기를 눌러 학생 화면을 바꿉니다."
              />

              {word.meanings.length > 1 && (
                <div className="mt-[14px] flex flex-wrap gap-[8px]">
                  {word.meanings.map((meaning) => (
                    <button
                      key={meaning.id}
                      type="button"
                      onClick={() => onMeaningTabChange(meaning.id)}
                      className="rounded-full border px-[12px] py-[8px] text-[13px] font-semibold transition-colors duration-150"
                      style={{
                        borderColor:
                          state.activeMeaningTab === meaning.id
                            ? 'rgba(255,255,255,0.6)'
                            : 'rgba(255,255,255,0.08)',
                        background:
                          state.activeMeaningTab === meaning.id ? '#20262f' : '#161a20',
                        color:
                          state.activeMeaningTab === meaning.id
                            ? '#ffffff'
                            : 'rgba(255,255,255,0.62)',
                      }}
                    >
                      {getMeaningLabel(word, meaning)}
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-[14px] rounded-[18px] border border-white/8 bg-[#12161c] p-[14px]">
                <div className="mb-[10px] flex items-center justify-between gap-[12px]">
                  <div className="text-[15px] font-semibold text-white">
                    {getMeaningLabel(word, currentMeaning)}
                  </div>
                  <DarkChip tone={isMeaningVisible ? 'active' : 'neutral'}>
                    {isMeaningVisible ? '현재 표시 중' : '숨김'}
                  </DarkChip>
                </div>

                <p className="text-[14px] leading-[1.6] text-white/56">{currentMeaning.text}</p>

                <div className="mt-[12px] grid grid-cols-2 gap-[10px]">
                  <DarkActionButton
                    fullWidth={true}
                    active={isMeaningVisible}
                    disabled={isMeaningVisible}
                    onClick={() => onMeaningDisplayToggle(currentMeaning.id)}
                  >
                    {isMeaningVisible ? '표시 중' : '보여주기'}
                  </DarkActionButton>
                  <DarkActionButton
                    fullWidth={true}
                    disabled={!isMeaningVisible}
                    onClick={onCloseMeaning}
                  >
                    숨기기
                  </DarkActionButton>
                </div>
              </div>
            </section>

            <section className="rounded-[22px] border border-white/8 bg-[#181d24] p-[16px]">
              <DarkSectionTitle
                eyebrow="3"
                title="예문 공개"
                description="예문을 선택하면 단어는 전체 공개될 수 있지만 뜻은 자동으로 열리지 않습니다."
              />

              <div className="mt-[14px] rounded-[18px] border border-white/8 bg-[#12161c] p-[14px]">
                <div className="mb-[10px] flex items-center justify-between gap-[12px]">
                  <div className="text-[15px] font-semibold text-white">
                    {getMeaningLabel(word, currentMeaning)}
                  </div>
                  <DarkChip
                    tone={activeExampleMeaningId === currentMeaning.id ? 'active' : 'neutral'}
                  >
                    {activeExampleMeaningId === currentMeaning.id ? '이 뜻의 예문 표시 중' : '선택 대기'}
                  </DarkChip>
                </div>

                <div className="flex flex-col gap-[8px]">
                  {currentMeaning.basicExamples.map((example, index) => (
                    <WireframeExampleRow
                      key={example.id}
                      label={`예문 ${index + 1}`}
                      text={example.text}
                      active={state.activeExampleId === example.id}
                      onClick={() => onExampleClick(example.id)}
                    />
                  ))}

                  {currentMeaning.supplementaryExamples.length > 0 && (
                    <>
                      <DarkActionButton
                        fullWidth={true}
                        onClick={() => onSupplementaryToggle(currentMeaning.id)}
                      >
                        {isSupplementaryExpanded ? '보조 예문 닫기' : '보조 예문 보기'}
                      </DarkActionButton>

                      {isSupplementaryExpanded && (
                        <div className="rounded-[16px] border border-white/8 bg-[#151920] p-[10px]">
                          <div className="mb-[8px] text-[11px] font-semibold uppercase tracking-[0.12em] text-white/34">
                            Supplementary Examples
                          </div>
                          <div className="flex flex-col gap-[8px]">
                            {currentMeaning.supplementaryExamples.map((example, index) => (
                              <WireframeExampleRow
                                key={example.id}
                                label={`보조 예문 ${index + 1}`}
                                text={example.text}
                                active={state.activeExampleId === example.id}
                                onClick={() => onExampleClick(example.id)}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <DarkActionButton
                    fullWidth={true}
                    disabled={state.activeExampleId === null}
                    onClick={onCloseExample}
                  >
                    예문 숨기기
                  </DarkActionButton>
                </div>
              </div>
            </section>

            {word.additionalMaterials && word.additionalMaterials.length > 0 && (
              <section className="rounded-[22px] border border-white/8 bg-[#181d24] p-[16px]">
                <DarkSectionTitle
                  eyebrow="4"
                  title="추가 자료"
                  description="필요할 때만 학생 화면 위에 자료를 띄워 보여줍니다."
                />

                <div className="mt-[14px] grid grid-cols-2 gap-[10px]">
                  {word.additionalMaterials.map((material, index) => {
                    const isActive = state.activeAdditionalMaterialId === material.id;

                    return (
                      <button
                        key={material.id}
                        type="button"
                        onClick={() => onAdditionalMaterialClick(material.id)}
                        className="rounded-[16px] border p-[14px] text-left transition-colors duration-150 hover:bg-white/[0.03]"
                        style={{
                          borderColor: isActive
                            ? 'rgba(255,255,255,0.76)'
                            : 'rgba(255,255,255,0.08)',
                          background: isActive ? '#20262f' : '#161a20',
                        }}
                      >
                        <div className="mb-[8px] text-[11px] font-semibold uppercase tracking-[0.12em] text-white/34">
                          {material.type === 'video' ? 'Video' : 'Image'}
                        </div>
                        <div className="text-[14px] font-semibold text-white">
                          {material.type === 'video'
                            ? `영상 자료 ${index + 1}`
                            : `이미지 자료 ${index + 1}`}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-[12px] flex items-center justify-between gap-[12px] rounded-[16px] border border-white/8 bg-[#12161c] px-[14px] py-[12px]">
                  <div className="text-[13px] text-white/52">
                    {activeMaterial
                      ? `${activeMaterial.type === 'video' ? '영상' : '이미지'} 자료가 학생 화면에 열려 있습니다.`
                      : '현재 열려 있는 추가 자료가 없습니다.'}
                  </div>
                  <DarkActionButton disabled={!activeMaterial} onClick={onCloseAdditionalMaterial}>
                    자료 닫기
                  </DarkActionButton>
                </div>
              </section>
            )}
          </div>
        </div>

        <DarkScrollTrack trackRef={trackRef} thumbTop={thumbTop} />
      </div>
    </aside>
  );
}

function WireframeExampleRow({
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
        borderColor: active ? 'rgba(255,255,255,0.76)' : 'rgba(255,255,255,0.08)',
        background: active ? '#ffffff' : '#171c22',
        color: active ? '#111111' : '#ffffff',
      }}
    >
      <div className="mb-[4px] text-[11px] font-semibold uppercase tracking-[0.12em] opacity-55">
        {label}
      </div>
      <div className="text-[14px] leading-[1.55]">{text}</div>
    </button>
  );
}

export function WireframeFourScreen({
  words,
  selectedWordId,
  currentWord,
  state,
  isWordCompleted,
  onWordSelect,
  onAdvanceReveal,
  onRevealStep,
  onMeaningTabChange,
  onMeaningDisplayToggle,
  onCloseMeaning,
  onExampleClick,
  onCloseExample,
  onMeaningCta,
  onExampleCta,
  onSupplementaryToggle,
  onAdditionalMaterialClick,
  onCloseAdditionalMaterial,
}: WireframeFourScreenProps) {
  const [isSelectorOpen, setIsSelectorOpen] = useState(true);
  const [hasSelectedWord, setHasSelectedWord] = useState(false);

  const handleWordSelect = (wordId: string) => {
    setHasSelectedWord(true);
    onWordSelect(wordId);
    setIsSelectorOpen(false);
  };

  const handleSelectorClose = () => {
    if (!hasSelectedWord) {
      const firstWordId = words[0]?.id;
      if (firstWordId) {
        onWordSelect(firstWordId);
      }
      setHasSelectedWord(true);
    }

    setIsSelectorOpen(false);
  };

  return (
    <div className="relative flex size-full overflow-hidden bg-[#0f1115]">
      <PreviewPane
        word={currentWord}
        state={state}
        onOpenSelector={() => setIsSelectorOpen(true)}
        onAdvanceReveal={onAdvanceReveal}
        onRevealStep={onRevealStep}
        onCloseMeaning={onCloseMeaning}
        onCloseExample={onCloseExample}
        onCloseAdditionalMaterial={onCloseAdditionalMaterial}
        onMeaningCta={onMeaningCta}
        onExampleCta={onExampleCta}
      />

      <ControlPane
        word={currentWord}
        state={state}
        onAdvanceReveal={onAdvanceReveal}
        onRevealStep={onRevealStep}
        onMeaningTabChange={onMeaningTabChange}
        onMeaningDisplayToggle={onMeaningDisplayToggle}
        onCloseMeaning={onCloseMeaning}
        onExampleClick={onExampleClick}
        onCloseExample={onCloseExample}
        onSupplementaryToggle={onSupplementaryToggle}
        onAdditionalMaterialClick={onAdditionalMaterialClick}
        onCloseAdditionalMaterial={onCloseAdditionalMaterial}
      />

      {!hasSelectedWord && isSelectorOpen && <InitialSelectionBackdrop />}

      {isSelectorOpen && (
        <WordSelectorLayer
          words={words}
          selectedWordId={hasSelectedWord ? selectedWordId : null}
          isWordCompleted={isWordCompleted}
          onSelect={handleWordSelect}
          onClose={handleSelectorClose}
        />
      )}
    </div>
  );
}
