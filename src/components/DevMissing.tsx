interface DevMissingProps {
  label: string
  where: string
}

/** 아직 제공되지 않은 링크·자료를 개발 모드에서만 알려 줍니다. 배포 빌드에는 나타나지 않습니다. */
export function DevMissing({ label, where }: DevMissingProps) {
  if (!import.meta.env.DEV) return null
  return (
    <span className="dev-missing">
      <span className="dev-badge">개발용</span>
      {label} 미연결 — <code>{where}</code>
    </span>
  )
}
