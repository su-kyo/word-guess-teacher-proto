import svgPaths from '../../imports/shared-svg-paths';
import type { WordData } from '../types';
import { FigmaScrollTrack, useFigmaScrollbar } from './CustomScrollbar';

function CompletionIndicator({ completed }: { completed: boolean }) {
  const paths = svgPaths as Record<string, string>;

  if (!completed) {
    return null;
  }

  return (
    <div className="flex size-[24px] shrink-0 items-center justify-center rounded-full bg-[#1876d2]">
      <svg fill="none" viewBox="0 0 13.9083 9.93069" className="size-[14px]">
        <path clipRule="evenodd" d={paths.p31161780} fill="white" fillRule="evenodd" />
      </svg>
    </div>
  );
}

interface WordListProps {
  words: WordData[];
  selectedWordId: string;
  isWordCompleted: (wordId: string) => boolean;
  onWordSelect: (wordId: string) => void;
}

export function WordList({
  words,
  selectedWordId,
  isWordCompleted,
  onWordSelect,
}: WordListProps) {
  const { scrollableRef, trackRef, thumbTop, handleScroll, isScrollable } =
    useFigmaScrollbar(24);

  return (
    <div
      className="relative flex h-full min-h-0 w-[320px] shrink-0 overflow-hidden rounded-l-[12px] border-r border-white/10 bg-[#212121]"
      data-name="word_list"
    >
      <div
        ref={scrollableRef}
        onScroll={handleScroll}
        className="hide-scrollbar min-h-0 min-w-0 flex-1 overflow-y-auto"
      >
        <div className="flex flex-col gap-[8px] px-[24px] py-[24px]">
          {words.map((word) => {
            const isSelected = word.id === selectedWordId;
            const isCompleted = isWordCompleted(word.id);

            return (
              <button
                key={word.id}
                type="button"
                onClick={() => onWordSelect(word.id)}
                className="group w-full rounded-[16px] text-left transition-colors duration-150"
                style={{ background: isSelected ? '#02403d' : 'transparent' }}
              >
                <div className="rounded-[inherit] bg-white/0 transition-colors duration-150 group-hover:bg-white/7">
                  <div className="flex items-start gap-[10px] px-[16px] py-[16px]">
                    <p
                      className="min-w-0 flex-1 text-[20px] font-bold leading-[1.5] text-white"
                      style={{
                        fontFamily: "'Noto Serif KR', serif",
                        letterSpacing: '-0.04em',
                        wordBreak: 'keep-all',
                        overflowWrap: 'break-word',
                      }}
                    >
                      {word.word}
                    </p>
                    {isCompleted && <CompletionIndicator completed={isCompleted} />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {isScrollable && <FigmaScrollTrack trackRef={trackRef} thumbTop={thumbTop} />}
    </div>
  );
}
