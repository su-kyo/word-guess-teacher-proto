import svgPaths from '../../imports/shared-svg-paths';
import type { WordData } from '../types';
import { FigmaScrollTrack, useFigmaScrollbar } from './CustomScrollbar';

function CompletionIndicator({
  completed,
  accentColor = '#1876d2',
}: {
  completed: boolean;
  accentColor?: string;
}) {
  const paths = svgPaths as Record<string, string>;

  if (!completed) {
    return null;
  }

  return (
    <div
      className="flex size-[22px] shrink-0 items-center justify-center rounded-full"
      style={{ background: accentColor }}
    >
      <svg fill="none" viewBox="0 0 13.9083 9.93069" className="size-[12px]">
        <path clipRule="evenodd" d={paths.p31161780} fill="white" fillRule="evenodd" />
      </svg>
    </div>
  );
}

interface DesignTwoThreeWordListProps {
  words: WordData[];
  selectedWordId: string;
  isWordCompleted: (wordId: string) => boolean;
  onWordSelect: (wordId: string) => void;
  connected?: boolean;
  widthClassName?: string;
  accentColor?: string;
  wordTextClassName?: string;
}

export function DesignTwoThreeWordList({
  words,
  selectedWordId,
  isWordCompleted,
  onWordSelect,
  connected = false,
  widthClassName = 'w-[236px]',
  accentColor = '#1876d2',
  wordTextClassName = 'text-[16px]',
}: DesignTwoThreeWordListProps) {
  const { scrollableRef, trackRef, thumbTop, handleScroll, isScrollable } =
    useFigmaScrollbar(24);
  const wrapperClass = connected
    ? `relative flex h-full min-h-0 overflow-hidden rounded-l-[12px] ${widthClassName} shrink-0 bg-[#02403d]`
    : `relative flex h-full min-h-0 overflow-hidden rounded-l-[12px] ${widthClassName} shrink-0 border-r border-white/10 bg-[#212121]`;
  const scrollableClass = connected
    ? 'hide-scrollbar min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden'
    : 'hide-scrollbar min-h-0 min-w-0 flex-1 overflow-y-auto';
  const listClass = connected
    ? 'flex flex-col gap-[6px] pl-[16px] pr-0 py-[16px] pb-[20px]'
    : 'flex flex-col gap-[8px] pl-[16px] pr-[8px] py-[16px] pb-[88px]';
  const fadeClass = connected
    ? null
    : 'pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[92px] bg-gradient-to-b from-[#21212100] via-[#212121]/75 to-[#212121]';

  return (
    <div className={wrapperClass} data-name="word_list_design_2_3">
      <div
        ref={scrollableRef}
        onScroll={handleScroll}
        className={scrollableClass}
      >
        <div className={listClass}>
          {words.map((word) => {
            const isSelected = word.id === selectedWordId;
            const isCompleted = isWordCompleted(word.id);
            const itemClass = connected
              ? [
                  'group w-full text-left transition-all duration-150',
                  'rounded-l-[22px] rounded-r-none',
                  isSelected ? 'sticky top-[12px] z-[3]' : '',
                ]
                  .filter(Boolean)
                  .join(' ')
              : [
                  'group w-full rounded-[16px] text-left transition-all duration-150',
                  isSelected ? 'sticky top-[12px] z-[3]' : '',
                ]
                  .filter(Boolean)
                  .join(' ');
            const selectedShadow = connected ? 'none' : '0 6px 18px rgba(0,0,0,0.16)';
            const hoverClass = connected
              ? 'group-hover:bg-[#023a37]'
              : 'group-hover:bg-white/8';
            const itemBackground = connected
              ? isSelected
                ? '#232323'
                : 'transparent'
              : isSelected
                ? '#02403d'
                : 'transparent';

            return (
              <button
                key={word.id}
                type="button"
                onClick={() => onWordSelect(word.id)}
                className={itemClass}
                style={{
                  background: itemBackground,
                  boxShadow: isSelected ? selectedShadow : 'none',
                }}
              >
                <div
                  className="rounded-[inherit] transition-colors duration-150"
                  style={{ background: isSelected ? 'transparent' : 'rgba(255,255,255,0)' }}
                >
                  <div
                    className={`rounded-[inherit] bg-white/0 transition-colors duration-150 ${hoverClass}`}
                    style={{ background: isSelected ? itemBackground : undefined }}
                  >
                    <div
                      className="flex min-h-[58px] items-start gap-[10px] px-[16px] py-[14px]"
                      style={connected ? { paddingRight: '22px' } : undefined}
                    >
                      <p
                        className={`min-w-0 flex-1 font-bold leading-[1.45] text-white ${wordTextClassName}`}
                        style={{
                          fontFamily: "'Noto Serif KR', serif",
                          letterSpacing: '-0.03em',
                          wordBreak: 'keep-all',
                          overflowWrap: 'break-word',
                        }}
                      >
                        {word.word}
                      </p>
                      {isCompleted && (
                        <CompletionIndicator completed={isCompleted} accentColor={accentColor} />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {fadeClass && <div className={fadeClass} />}
      {!connected && isScrollable && <FigmaScrollTrack trackRef={trackRef} thumbTop={thumbTop} />}
    </div>
  );
}
