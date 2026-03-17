import svgPaths from '../../imports/shared-svg-paths';
import type { Example, Meaning, WordData, WordState } from '../types';
import { FigmaScrollTrack, useFigmaScrollbar } from './CustomScrollbar';

function CheckIcon({ checked }: { checked: boolean }) {
  const paths = svgPaths as Record<string, string>;

  return (
    <div className="flex size-[20px] shrink-0 items-center justify-center">
      <svg fill="none" viewBox="0 0 16.6576 11.8937" className="size-[16px]">
        <path
          clipRule="evenodd"
          d={paths.p1844cf00}
          fill="white"
          fillOpacity={checked ? 1 : 0.14}
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
}

function ThumbnailVisitedBadge() {
  const paths = svgPaths as Record<string, string>;

  return (
    <div className="flex size-[24px] items-center justify-center rounded-full bg-[#1876d2]">
      <svg fill="none" viewBox="0 0 13.9083 9.93069" className="size-[14px]">
        <path clipRule="evenodd" d={paths.p31161780} fill="white" fillRule="evenodd" />
      </svg>
    </div>
  );
}

function MeaningTabVisitedBadge({ checked }: { checked: boolean }) {
  const paths = svgPaths as Record<string, string>;

  if (!checked) {
    return null;
  }

  return (
    <div className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#1876d2]">
      <svg fill="none" viewBox="0 0 13.9083 9.93069" className="size-[10px]">
        <path clipRule="evenodd" d={paths.p31161780} fill="white" fillRule="evenodd" />
      </svg>
    </div>
  );
}

function getMeaningLabel(word: WordData, meaning: Meaning) {
  return word.meanings.length === 1 ? '뜻' : `뜻 ${meaning.id}`;
}

function ContentCard({
  prefix,
  text,
  isActive,
  isVisited,
  showVisitedIndicator = true,
  onClick,
}: {
  prefix: string;
  text: string;
  isActive: boolean;
  isVisited: boolean;
  showVisitedIndicator?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full rounded-[16px] text-left transition-colors duration-150"
      style={{ background: isActive ? '#2578cf' : 'rgba(255,255,255,0.10)' }}
    >
      <div className="absolute inset-0 rounded-[inherit] bg-white/0 transition-colors duration-150 group-hover:bg-white/5" />
      <div className="relative flex items-start gap-[10px] p-[16px]">
        <div className="w-[28px] shrink-0 pt-[2px] text-[15px] font-medium text-white/60">
          {prefix}
        </div>
        <p
          className="min-w-0 flex-1 text-[19px] leading-[1.55] text-white"
          style={{
            fontFamily: "'Noto Serif KR', serif",
            letterSpacing: '-0.03em',
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
          }}
        >
          {text}
        </p>
        {showVisitedIndicator && <CheckIcon checked={isVisited} />}
      </div>
    </button>
  );
}

function SupplementaryToggleButton({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-center gap-[8px] rounded-full px-[8px] py-[8px] text-[16px] font-semibold text-white transition-colors duration-150 hover:bg-white/6"
    >
      <span>{expanded ? '∧' : '∨'}</span>
      <span>{expanded ? '보조 예문 닫기' : '보조 예문 보기'}</span>
    </button>
  );
}

function ExampleList({
  examples,
  activeExampleId,
  visitedExampleIds,
  showVisitedIndicator,
  onExampleClick,
}: {
  examples: Example[];
  activeExampleId: string | null;
  visitedExampleIds: Set<string>;
  showVisitedIndicator: boolean;
  onExampleClick: (exampleId: string) => void;
}) {
  return (
    <>
      {examples.map((example) => (
        <ContentCard
          key={example.id}
          prefix="예"
          text={example.text}
          isActive={activeExampleId === example.id}
          isVisited={visitedExampleIds.has(example.id)}
          showVisitedIndicator={showVisitedIndicator}
          onClick={() => onExampleClick(example.id)}
        />
      ))}
    </>
  );
}

interface ControlPanelProps {
  word: WordData;
  state: WordState;
  showExampleVisitedIndicators: boolean;
  showAdditionalMaterialVisitedIndicators: boolean;
  borderMode?: 'left' | 'both';
  onMeaningToggle: () => void;
  onMeaningTabChange: (tab: number) => void;
  onExampleClick: (exampleId: string) => void;
  onSupplementaryToggle: () => void;
  onAdditionalMaterialClick: (materialId: string) => void;
}

export function ControlPanel({
  word,
  state,
  showExampleVisitedIndicators,
  showAdditionalMaterialVisitedIndicators,
  borderMode = 'left',
  onMeaningToggle,
  onMeaningTabChange,
  onExampleClick,
  onSupplementaryToggle,
  onAdditionalMaterialClick,
}: ControlPanelProps) {
  const currentMeaning = word.meanings.find((meaning) => meaning.id === state.activeMeaningTab);
  const { scrollableRef, trackRef, thumbTop, handleScroll } = useFigmaScrollbar(24);
  const hasMeaningTabs = word.meanings.length > 1;

  if (!currentMeaning) {
    return null;
  }

  const isSupplementaryExpanded = state.expandedSupplementaryMeaningIds.has(currentMeaning.id);
  const borderClass = borderMode === 'both' ? 'border-x border-white/10' : 'border-l border-white/10';

  return (
    <div
      className={`relative flex h-full w-[520px] shrink-0 bg-[#212121] ${borderClass}`}
      data-name="content_control"
    >
      <div
        ref={scrollableRef}
        onScroll={handleScroll}
        className="hide-scrollbar min-w-0 flex-1 overflow-y-auto"
      >
        <div className="flex flex-col gap-[24px] px-[28px] py-[24px]">
          {hasMeaningTabs && (
            <div className="flex items-end gap-[18px] pb-[4px]">
              {word.meanings.map((meaning) => {
                const isActiveTab = state.activeMeaningTab === meaning.id;
                const isVisited = state.visitedMeaningIds.has(meaning.id);

                return (
                  <button
                    key={meaning.id}
                    type="button"
                    onClick={() => onMeaningTabChange(meaning.id)}
                    className="relative flex items-center gap-[6px] px-0 pb-[8px] pt-[2px] text-[16px] font-bold transition-colors duration-150 hover:text-white"
                    style={{
                      color: isActiveTab ? 'white' : 'rgba(255,255,255,0.72)',
                    }}
                  >
                    <span>{getMeaningLabel(word, meaning)}</span>
                    <MeaningTabVisitedBadge checked={isVisited} />
                    {isActiveTab && (
                      <span
                        className="absolute bottom-0 left-0 right-0"
                        style={{
                          height: '2.5px',
                          background: '#1876d2',
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[8px]">
              <ContentCard
                prefix="뜻"
                text={currentMeaning.text}
                isActive={state.displayedMeaningId === currentMeaning.id}
                isVisited={state.visitedMeaningIds.has(currentMeaning.id)}
                onClick={onMeaningToggle}
              />
            </div>

            <div className="flex flex-col gap-[8px]">
              <p className="pl-[4px] text-[14px] leading-[1.5] text-[#9e9e9e]">
                예문 공개시 단어가 전체 공개 됩니다.
              </p>

              <ExampleList
                examples={currentMeaning.basicExamples}
                activeExampleId={state.activeExampleId}
                visitedExampleIds={state.visitedExampleIds}
                showVisitedIndicator={showExampleVisitedIndicators}
                onExampleClick={onExampleClick}
              />

              {currentMeaning.supplementaryExamples.length > 0 && (
                <>
                  {!isSupplementaryExpanded && (
                    <SupplementaryToggleButton
                      expanded={false}
                      onToggle={onSupplementaryToggle}
                    />
                  )}

                  {isSupplementaryExpanded && (
                    <>
                      <ExampleList
                        examples={currentMeaning.supplementaryExamples}
                        activeExampleId={state.activeExampleId}
                        visitedExampleIds={state.visitedExampleIds}
                        showVisitedIndicator={showExampleVisitedIndicators}
                        onExampleClick={onExampleClick}
                      />
                      <SupplementaryToggleButton
                        expanded={true}
                        onToggle={onSupplementaryToggle}
                      />
                    </>
                  )}
                </>
              )}
            </div>

            {word.additionalMaterials && word.additionalMaterials.length > 0 && (
              <div className="grid grid-cols-2 gap-[16px]">
                {word.additionalMaterials.map((material) => {
                  const isActiveMaterial = state.activeAdditionalMaterialId === material.id;
                  const isVisited = state.visitedAdditionalMaterialIds.has(material.id);

                  return (
                    <button
                      key={material.id}
                      type="button"
                      onClick={() => onAdditionalMaterialClick(material.id)}
                      className="relative aspect-[160/90] overflow-hidden rounded-[10px] transition-transform duration-150 hover:scale-[1.01]"
                      style={{
                        outline: isActiveMaterial ? '3px solid white' : '3px solid transparent',
                        outlineOffset: '-3px',
                      }}
                    >
                      <img
                        src={material.thumbnail}
                        alt=""
                        className="absolute inset-0 size-full object-cover"
                      />

                      {material.type === 'video' && (
                        <div className="absolute left-1/2 top-1/2 flex size-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/75 text-[28px] text-white">
                          ▶
                        </div>
                      )}

                      {showAdditionalMaterialVisitedIndicators && isVisited && (
                        <div className="absolute right-[12px] top-[12px]">
                          <ThumbnailVisitedBadge />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <FigmaScrollTrack trackRef={trackRef} thumbTop={thumbTop} />
    </div>
  );
}
