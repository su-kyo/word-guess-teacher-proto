import svgPathsGreen from '../../imports/shared-svg-paths';
import svgPathsGold from '../../imports/golden-plate-svg-paths';
import type { RevealState } from '../types';

// Green stone plate SVG (for hidden/initials/full-not-completed states)
function GreenStoneSVG() {
  const s = svgPathsGreen as Record<string, string>;
  return (
    <div className="absolute inset-[0_4.48%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 382.355 280">
        <g>
          <path d={s['p462ff00']} fill="#524C14" />
          <path d={s['p2090fe00']} fill="#434213" />
          <path d={s['p390bed40']} fill="#515B16" />
          <path d={s['p12c425f0']} fill="#444517" />
          <path d={s['p6b32d00']} fill="#6E5A13" />
          <path d={s['p3281e680']} fill="#3E4C15" />
          <path d={s['p37c8f580']} fill="#404C13" />
          <path d={s['p2bdc4180']} fill="#434212" />
          <path d={s['p352f6440']} fill="#444210" />
          <path d={s['p30ae0900']} fill="#434414" />
          <path d={s['p1d45fc00']} fill="#444211" />
          <path d={s['p97c6d00']} fill="#474313" />
          <path d={s['p2ad5ff00']} fill="#454413" />
          <path d={s['p3dbd5500']} fill="#454214" />
          <path d={s['p19ed3300']} fill="#454213" />
          <path d={s['p2d197cc0']} fill="#444213" />
          <path d={s['p26e7f0c0']} fill="#635314" />
          <path d={s['p340e2d80']} fill="#3F4F16" />
          <path d={s['p3dba7500']} fill="#434313" />
          <path d={s['p19476a00']} fill="#424F14" />
          <path d={s['p29844e00']} fill="#415016" />
          <path d={s['p153df600']} fill="#415016" />
          <path d={s['p347d2df0']} fill="#424213" />
          <path d={s['p3dda9f00']} fill="#424413" />
          <path d={s['pcf1adc0']} fill="#414311" />
          <path d={s['p31b8ac80']} fill="#434514" />
          <path d={s['p108d6c80']} fill="#42430F" />
          <path d={s['p2ceb8280']} fill="#64780F" />
          <path d={s['p14ecdf00']} fill="#424113" />
          <path d={s['pc733440']} fill="#4F5A15" />
          <path d={s['p29577000']} fill="#505915" />
          <path d={s['p33182ee0']} fill="#4E5716" />
          <path d={s['p33789e40']} fill="#515C17" />
        </g>
      </svg>
    </div>
  );
}

// Golden plate SVG (for completed state)
function GoldenPlateSVG() {
  const s = svgPathsGold as Record<string, string>;
  return (
    <div className="absolute inset-[5.21%_5.82%_0_5.82%]">
      <div className="absolute inset-[5.21%_5.82%_0_5.82%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 424.143 303.339">
          <path d={s['p2b133a00']} fill="#B86400" />
        </svg>
      </div>
      <div className="absolute inset-[73.56%_5.82%_0_5.82%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 424.143 84.6011">
          <path d={s['p3256c200']} fill="#874000" />
        </svg>
      </div>
      <div className="absolute inset-[5.21%_11%_80.92%_6.13%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 397.755 44.401">
          <path d={s['p3710e780']} fill="#FED629" />
        </svg>
      </div>
      <div className="absolute inset-[6%_8.38%_3.18%_8.4%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 399.434 290.601">
          <defs>
            <linearGradient id="goldenGradient" x1="199.717" x2="199.717" y1="284.095" y2="4.77003" gradientUnits="userSpaceOnUse">
              <stop stopColor="#BF6D00" />
              <stop offset="1" stopColor="#F4AA00" />
            </linearGradient>
          </defs>
          <path d={s['p3594fe40']} fill="url(#goldenGradient)" />
        </svg>
      </div>
      {/* Decorative detail groups */}
      <div className="absolute inset-[14.37%_12.86%_9.16%_12.86%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 311.954 86.2117">
          <path d={s['pf8fbb00']} fill="#AC5C00" />
          <path d={s['p3a947400']} fill="#B76500" />
          <path d={s['p2afcbc80']} fill="#C06F00" />
          <path d={s['p21a13900']} fill="#BD6C00" />
          <path d={s['p32632b00']} fill="#B06000" />
          <path d={s['p1cbc9e00']} fill="#B06100" />
          <path d={s['p12a16700']} fill="#BA6900" />
          <path d={s['p39566c80']} fill="#AD5E00" />
          <path d={s['p24ed7200']} fill="#A95B00" />
          <path d={s['pa4ab800']} fill="#AE5F00" />
          <path d={s['p17767a00']} fill="#B15F00" />
          <path d={s['p1a1b500']} fill="#AE5E00" />
          <path d={s['pa93e680']} fill="#B96700" />
          <path d={s['pc2d9d00']} fill="#B56400" />
          <path d={s['p19d83400']} fill="#BD6C00" />
        </svg>
      </div>
    </div>
  );
}

// Pedestal (wooden log stand below the stone plate)
function Pedestal() {
  const s = svgPathsGreen as Record<string, string>;
  return (
    <div className="aspect-[544/180] relative shrink-0 w-full">
      {/* Group 1 - upper section of pedestal */}
      <div className="absolute contents inset-[0_5.43%_46.78%_5.43%]">
        <div className="absolute inset-[0_5.43%_46.78%_5.43%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 427.88 84.5217">
            <path d={s['pef5cd00']} fill="#4F3A12" />
          </svg>
        </div>
        <div className="absolute inset-[0_24.05%_57.91%_38.4%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 180.236 66.847">
            <path d={s['p17729000']} fill="#634315" />
          </svg>
        </div>
        <div className="absolute inset-[0_5.43%_56.95%_78.42%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.4835 68.3773">
            <path d={s['p3e3b0900']} fill="#624513" />
          </svg>
        </div>
        <div className="absolute inset-[0_63.34%_58.07%_5.43%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 149.91 66.5943">
            <path d={s['p17e5d2f0']} fill="#634516" />
          </svg>
        </div>
        <div className="absolute inset-[0_5.44%_83.97%_5.44%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 427.742 25.4649">
            <path d={s['p8accbc0']} fill="#8E5C14" />
          </svg>
        </div>
      </div>
      {/* Group 2 - lower section of pedestal */}
      <div className="absolute contents inset-[46.04%_0_0_0]">
        <div className="absolute inset-[48.62%_0_0_0]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 480 81.5959">
            <path d={s['p3896a40']} fill="#4A3711" />
          </svg>
        </div>
        <div className="absolute inset-[48.62%_28.87%_7.2%_24.43%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 224.143 70.1678">
            <path d={s['p2da49980']} fill="#614314" />
          </svg>
        </div>
        <div className="absolute inset-[48.62%_78.18%_7.4%_0]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104.759 69.8456">
            <path d={s['p37a0c200']} fill="#624316" />
          </svg>
        </div>
        <div className="absolute inset-[48.62%_0_7.47%_73.87%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 125.407 69.725">
            <path d={s['p3af91a00']} fill="#614414" />
          </svg>
        </div>
        <div className="absolute inset-[48.62%_28.46%_39.47%_0.04%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 343.176 18.9109">
            <path d={s['p2e7edef0']} fill="#8C5D14" />
          </svg>
        </div>
        <div className="absolute inset-[48.62%_0.12%_39.35%_73.07%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128.712 19.1031">
            <path d={s['p183ff400']} fill="#8D5C15" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Torch stand component (appears on both sides in completed state)
function TorchStand({ svgPaths: s }: { svgPaths: Record<string, string> }) {
  return (
    <div className="absolute inset-[65.65%_14.25%_0_14.25%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 108.678 150.09">
        <g>
          <path d={s['p1467900']} fill="#6A3E12" />
          <path d={s['p1e56d200']} fill="#513114" />
          <path d={s['p63f1000']} fill="#8E5112" />
          <path d={s['p2c19ea00']} fill="#A9600D" />
          <path d={s['p250fecf0']} fill="#543514" />
          <path d={s['p2b8f0100']} fill="#573616" />
        </g>
      </svg>
    </div>
  );
}

// Fire flame SVG (visible in completed state)
function FireFlameSVG({ svgPaths: s }: { svgPaths: Record<string, string> }) {
  return (
    <div className="absolute inset-[8.9%_12.5%_29.38%_12.5%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 114 269.712">
        <g>
          <path d={s['p2515100'] || s['p1550cd00']} fill="#F99E0F" />
          <path d={s['p2c2a8e00'] || s['p6d3dfc0']} fill="#F99E0F" />
          <path d={s['p9654d00']} fill="#F99E0F" />
          <path d={s['p4591370']} fill="#FCC22C" />
          <path d={s['p183e7500']} fill="#FCC22C" />
          <defs>
            <radialGradient id="fireGradient" cx="0" cy="0" gradientTransform="translate(57 212.712) scale(57)" gradientUnits="userSpaceOnUse" r="1">
              <stop stopColor="#FAEB2D" />
              <stop offset="1" stopColor="#FF9D00" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d={s['p73eba00']} fill="url(#fireGradient)" />
        </g>
      </svg>
    </div>
  );
}

// Fire torch (stand + flame)
export function FireTorch() {
  const s = svgPathsGold as Record<string, string>;
  return (
    <div className="relative h-[360px] w-[126px] shrink-0 overflow-clip">
      <FireFlameSVG svgPaths={s} />
      <TorchStand svgPaths={s} />
    </div>
  );
}

interface WordPlateProps {
  word: string;
  initials: string;
  revealState: RevealState;
  onAdvanceReveal?: () => void;
}

export function WordPlate({ word, initials, revealState, onAdvanceReveal }: WordPlateProps) {
  const showGolden = revealState === 'full';
  const showFires = showGolden;

  let plateText = '';
  let textColor = '#d4a417';
  if (revealState === 'initials') {
    plateText = initials;
    textColor = '#e8c45a';
  } else if (revealState === 'full') {
    plateText = word;
    textColor = '#432000';
  }

  return (
    <div className="flex w-full items-end justify-center px-[12px]">
      {showFires && (
        <div className="mr-[-10px] hidden shrink-0 items-end lg:flex">
          <FireTorch />
        </div>
      )}

      <div
        className="relative flex min-w-0 shrink-0 flex-col items-center justify-center"
        style={{ width: 'min(100%, 520px)' }}
      >
        <div className="relative aspect-[420/280] w-full overflow-visible">
          {showGolden ? <GoldenPlateSVG /> : <GreenStoneSVG />}

          {plateText &&
            (() => {
              const len = plateText.length;
              const fontSize =
                len > 32 ? '24px' : len > 20 ? '30px' : len > 10 ? '42px' : '56px';
              const textWidth = len > 14 ? '420px' : '360px';

              return (
                <div
                  className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 flex flex-col justify-center text-center"
                  style={{
                    width: textWidth,
                    height: '280px',
                    fontFamily: "'Pretendard Variable', sans-serif",
                    fontWeight: '700',
                    fontSize,
                    color: textColor,
                    letterSpacing: '-0.04em',
                    lineHeight: '1.38',
                    wordBreak: 'keep-all',
                    overflowWrap: 'break-word',
                    overflow: 'hidden',
                    textShadow:
                      revealState === 'full'
                        ? '0 1px 0 rgba(255, 255, 255, 0.18)'
                        : '0 0 18px rgba(255, 202, 82, 0.15)',
                  }}
                >
                  <span>{plateText}</span>
                </div>
              );
            })()}

          {revealState !== 'full' && onAdvanceReveal && (
            <button
              type="button"
              onClick={onAdvanceReveal}
              className="absolute left-1/2 -translate-x-1/2 rounded-[18px] px-[24px] py-[8px] transition-opacity duration-150 hover:opacity-90"
              style={{ bottom: '20px', background: '#3f39f1' }}
            >
              <span
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontWeight: '700',
                  fontSize: '22px',
                  color: 'white',
                  whiteSpace: 'nowrap',
                }}
              >
                {revealState === 'hidden' ? '초성 보여주기' : '전체 보여주기'}
              </span>
            </button>
          )}
        </div>
        <div className="-mt-[10px] w-full">
          <Pedestal />
        </div>
      </div>

      {showFires && (
        <div className="ml-[-10px] hidden shrink-0 items-end lg:flex">
          <FireTorch />
        </div>
      )}
    </div>
  );
}
