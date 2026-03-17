import previewBackground from '../../assets/student-preview-background.png';
import { X } from 'lucide-react';
import type { RevealState, WordData, WordState } from '../types';
import { WordPlate } from './WordPlate';

interface StudentPreviewProps {
  word: WordData;
  state: WordState;
  onAdvanceReveal: () => void;
  onRevealStep: (target: RevealState) => void;
  onCloseMeaning: () => void;
  onCloseExample: () => void;
  onCloseAdditionalMaterial: () => void;
  onMeaningCta: () => void;
  onExampleCta: () => void;
}

interface StepIndicatorProps {
  revealState: RevealState;
  onRevealStep: (target: RevealState) => void;
}

interface ScrollPanelProps {
  label: string;
  text?: string;
  showCta: boolean;
  isHighlighted?: boolean;
  onCta: () => void;
  onClose: () => void;
}

const REVEAL_STEPS: Array<{ id: RevealState; label: string }> = [
  { id: 'hidden', label: '공개 전' },
  { id: 'initials', label: '초성 공개' },
  { id: 'full', label: '전체 공개' },
];

function StepIndicator({ revealState, onRevealStep }: StepIndicatorProps) {
  const currentIndex = REVEAL_STEPS.findIndex((step) => step.id === revealState);

  return (
    <div className="z-[2] flex items-center gap-[12px]" style={{ whiteSpace: 'nowrap' }}>
      {REVEAL_STEPS.map((step, index) => {
        const isActive = index === currentIndex;
        const isPast = index < currentIndex;
        const isClickable = index === currentIndex + 1;
        const className = [
          'flex h-[40px] min-w-[92px] items-center justify-center rounded-[12px] px-[16px] text-[15px] font-bold tracking-[-0.02em] transition-all duration-150',
          isActive && 'bg-[#02403d] text-white',
          isPast && 'bg-white/10 text-white/45',
          !isActive && !isPast && !isClickable && 'bg-white/5 text-white/25',
          isClickable &&
            'cursor-pointer bg-white/12 text-white/85 hover:bg-white/18 hover:text-white',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div key={step.id} className="flex items-center gap-[12px]">
            {isClickable ? (
              <button type="button" onClick={() => onRevealStep(step.id)} className={className}>
                {step.label}
              </button>
            ) : (
              <div className={className}>{step.label}</div>
            )}
            {index < REVEAL_STEPS.length - 1 && (
              <span className="text-[13px] text-white/45">▶</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ScrollPanel({
  label,
  text,
  showCta,
  isHighlighted,
  onCta,
  onClose,
}: ScrollPanelProps) {
  const isEmpty = !text;

  return (
    <div
      className="relative w-full"
      style={
        isHighlighted
          ? { filter: 'drop-shadow(0 0 20px rgba(46, 200, 92, 0.48))' }
          : undefined
      }
    >
      <div className="relative flex items-stretch">
        <div
          className="w-[22px] shrink-0 rounded-l-[10px]"
          style={{
            background:
              'linear-gradient(180deg, #f7e9b8 0%, #f4e4ac 45%, #f5e6b4 100%)',
            boxShadow: 'inset -1px 0 0 rgba(122, 90, 18, 0.14)',
          }}
        />
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            minHeight: '112px',
            background: '#e2cf92',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 0 1px rgba(140, 106, 33, 0.2)',
          }}
        >
          {!isEmpty && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-[14px] top-[12px] z-[1] flex size-[30px] items-center justify-center rounded-full bg-[#432000]/10 text-[#6f5522] transition-colors duration-150 hover:bg-[#432000]/18"
              aria-label={`${label} 닫기`}
            >
              <X className="size-[16px]" />
            </button>
          )}

          <div className="flex min-h-[112px] items-center justify-center px-[32px] py-[20px]">
            {isEmpty ? (
              showCta ? (
                <button
                  type="button"
                  onClick={onCta}
                  className="rounded-[16px] bg-[#4f2800] px-[22px] py-[8px] text-[21px] font-bold text-white transition-opacity duration-150 hover:opacity-88"
                >
                  보여주기
                </button>
              ) : (
                <div className="h-[48px] w-full rounded-[8px] bg-[#c9ae6f]/10" />
              )
            ) : (
              <p
                className="w-full text-left text-[20px] leading-[1.55] text-[#33270a]"
                style={{
                  fontFamily: "'Noto Sans KR', sans-serif",
                  letterSpacing: '-0.03em',
                  wordBreak: 'keep-all',
                  overflowWrap: 'break-word',
                }}
              >
                {text}
              </p>
            )}
          </div>
        </div>
        <div
          className="w-[22px] shrink-0 rounded-r-[10px]"
          style={{
            background:
              'linear-gradient(180deg, #f7e9b8 0%, #f4e4ac 45%, #f5e6b4 100%)',
            boxShadow: 'inset 1px 0 0 rgba(122, 90, 18, 0.14)',
          }}
        />
      </div>

      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full px-[22px] py-[4px] text-[18px] font-bold text-[#786940]"
        style={{
          background: 'linear-gradient(180deg, #c7b271 0%, #b9a35f 100%)',
          boxShadow: '0 2px 4px rgba(40, 24, 0, 0.12)',
          minWidth: '74px',
          textAlign: 'center',
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function StudentPreview({
  word,
  state,
  onAdvanceReveal,
  onRevealStep,
  onCloseMeaning,
  onCloseExample,
  onCloseAdditionalMaterial,
  onMeaningCta,
  onExampleCta,
}: StudentPreviewProps) {
  const displayedMeaning =
    state.displayedMeaningId !== null
      ? word.meanings.find((meaning) => meaning.id === state.displayedMeaningId)
      : undefined;

  const activeExample =
    state.activeExampleId !== null
      ? word.meanings
          .flatMap((meaning) => [...meaning.basicExamples, ...meaning.supplementaryExamples])
          .find((example) => example.id === state.activeExampleId)
      : undefined;

  const activeMaterial =
    state.activeAdditionalMaterialId !== null
      ? word.additionalMaterials?.find(
          (material) => material.id === state.activeAdditionalMaterialId
        )
      : undefined;

  const showMeaningCta = state.displayedMeaningId === null && state.visitedMeaningIds.size === 0;
  const showExampleCta = state.activeExampleId === null && state.visitedExampleIds.size === 0;

  return (
    <div className="relative min-w-0 flex-1 self-stretch">
      <img
        src={previewBackground}
        alt=""
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />

      <div className="relative z-[1] flex size-full min-h-0 flex-col items-center overflow-hidden px-[28px] py-[20px]">
        <div className="flex shrink-0 items-center justify-center pt-[2px]">
          <StepIndicator revealState={state.revealState} onRevealStep={onRevealStep} />
        </div>

        <div className="flex min-h-0 flex-1 w-full flex-col items-center justify-center gap-[18px] pt-[12px]">
          <WordPlate
            word={word.word}
            initials={word.initials}
            revealState={state.revealState}
            onAdvanceReveal={onAdvanceReveal}
          />
        </div>

        <div className="flex w-full max-w-[560px] shrink-0 flex-col gap-[16px] pb-[6px]">
          <ScrollPanel
            label="뜻"
            text={displayedMeaning?.text}
            showCta={showMeaningCta}
            isHighlighted={Boolean(displayedMeaning)}
            onCta={onMeaningCta}
            onClose={onCloseMeaning}
          />
          <ScrollPanel
            label="예문"
            text={activeExample?.text}
            showCta={showExampleCta}
            isHighlighted={Boolean(activeExample)}
            onCta={onExampleCta}
            onClose={onCloseExample}
          />
        </div>
      </div>

      {activeMaterial && (
        <div className="absolute inset-0 z-[3] flex items-center justify-center bg-black/55 p-[24px]">
          <div className="relative w-full max-w-[640px] overflow-hidden rounded-[18px] bg-black">
            <button
              type="button"
              onClick={onCloseAdditionalMaterial}
              className="absolute right-[16px] top-[16px] z-[1] flex size-[40px] items-center justify-center rounded-full bg-black/55 text-white transition-colors duration-150 hover:bg-black/70"
              aria-label="추가 자료 닫기"
            >
              <X className="size-[20px]" />
            </button>
            <img
              src={activeMaterial.url || activeMaterial.thumbnail}
              alt=""
              className="block w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
