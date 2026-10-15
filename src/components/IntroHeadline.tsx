import type { CSSProperties } from 'react'

interface IntroHeadlineProps {
  text: string
  /** 흔들리는(불편해 보이는) 단어 */
  trouble?: string
  /** 부드럽게 나타나며 강조되는 구절 */
  ease?: string
}

type Kind = 'plain' | 'trouble' | 'ease'
interface Piece {
  text: string
  kind: Kind
}

/** 문구를 단어 단위로 나누고, 단어 안에서 강조 구간(trouble/ease)을 표시합니다. */
function tokenize(text: string, trouble?: string, ease?: string) {
  const kindAt = (i: number): Kind => {
    if (trouble) {
      const t = text.indexOf(trouble)
      if (t >= 0 && i >= t && i < t + trouble.length) return 'trouble'
    }
    if (ease) {
      const e = text.indexOf(ease)
      if (e >= 0 && i >= e && i < e + ease.length) return 'ease'
    }
    return 'plain'
  }

  const lines: Piece[][][] = []
  let offset = 0
  for (const line of text.split('\n')) {
    const words: Piece[][] = []
    for (const word of line.split(' ')) {
      const pieces: Piece[] = []
      for (let i = 0; i < word.length; i++) {
        const kind = kindAt(offset + i)
        const last = pieces[pieces.length - 1]
        if (last && last.kind === kind) last.text += word[i]
        else pieces.push({ text: word[i], kind })
      }
      words.push(pieces)
      offset += word.length + 1
    }
    lines.push(words)
  }
  return lines
}

/**
 * 첫 화면 문구.
 * - 단어가 차례로 떠오르고, '불편함'은 글자마다 덜컹거리며 나타난 뒤 가끔 어긋나게 흔들립니다.
 * - '더 쉬운 경험'은 매끄럽게 나타나 강조색이 됩니다.
 * - 모션 감소 설정에서는 애니메이션 없이 바로 보입니다(CSS).
 */
export function IntroHeadline({ text, trouble, ease }: IntroHeadlineProps) {
  const lines = tokenize(text, trouble, ease)
  let wordIndex = 0

  return (
    <span className="intro">
      {lines.map((words, li) => (
        <span key={li} className="intro__line">
          {words.map((pieces, wi) => {
            const i = wordIndex++
            return (
              <span key={wi}>
                <span className="intro__word" style={{ '--i': i } as CSSProperties}>
                  {pieces.map((piece, pi) =>
                    piece.kind === 'trouble' ? (
                      <span key={pi} className="trouble">
                        <span className="sr-only">{piece.text}</span>
                        {[...piece.text].map((ch, ci) => (
                          <span key={ci} className="trouble__ch" aria-hidden="true" style={{ '--c': ci } as CSSProperties}>
                            {ch}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span key={pi} className={piece.kind === 'ease' ? 'ease' : undefined}>
                        {piece.text}
                      </span>
                    ),
                  )}
                </span>
                {wi < words.length - 1 && ' '}
              </span>
            )
          })}
          {li < lines.length - 1 && ' '}
        </span>
      ))}
    </span>
  )
}
