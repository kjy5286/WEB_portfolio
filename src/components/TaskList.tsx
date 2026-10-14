import type { Task } from '../content/types'

interface TaskListProps {
  tasks: Task[]
  className?: string
}

/** 작업과 그 작업에 쓴 기술을 나란히 보여 줍니다. 기술은 작업보다 작게 표시합니다. */
export function TaskList({ tasks, className = '' }: TaskListProps) {
  return (
    <ul className={`task-list ${className}`}>
      {tasks.map((t) => (
        <li key={t.task}>
          <span className="task-list__task">{t.task}</span>
          {t.tools && <span className="tools">{t.tools}</span>}
        </li>
      ))}
    </ul>
  )
}
